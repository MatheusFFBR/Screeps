/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('colony.createrController');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run(){
        this.verifyExtencionConstructor();
        //this.verifyContainerConstructor();
    },

    //Verifica a capacidade de energia dos Spawn's e gera novas extenções
    verifyExtencionConstructor: function(){

        var spawns = Game.spawns;
        for(var spawn in spawns){
            
            if(spawns[spawn].store.getFreeCapacity(RESOURCE_ENERGY) < 50){

                //Tenta gerar uma extenção proxima do Spawn
                var area = spawns[spawn].room.lookAtArea(
                    spawns[spawn].pos.y -1,
                    spawns[spawn].pos.x -1,
                    spawns[spawn].pos.y +1,
                    spawns[spawn].pos.x +1,
                    true
                )

                let buildPos = null;

                for(const position of area){
                    if(position.type === 'terrain' && position.type != 'wall' && spawns[spawn].room.lookForAt(LOOK_STRUCTURES,position.x,position.y).length === 0){
                        buildPos = [position.x, position.y];
                        break;
                    }
                }
      
                if(buildPos != null){
                    Game.spawns['Spawn1'].room.createConstructionSite(buildPos[0],buildPos[1], STRUCTURE_EXTENSION);
                }
            }
        }
    },

    verifyContainerConstructor: function(){

    }

};