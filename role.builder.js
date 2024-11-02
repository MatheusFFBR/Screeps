/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run(creep){

        // Verifica se deve construir algum novo caminho de tempo em tempo
        if(Game.time % 100 == 0){
            this.constructionSiteRoads(creep);
        }

        this.buildRoads(creep);
    },

    //Busca novos caminhos para construir
    constructionSiteRoads: function(creep){

        //Busca camihos entre as fontes de recursos e o Spawn
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES); 
        for(var source in sources){

            var path = Game.spawns['Spawn1'].room.findPath(sources[source].pos, Game.spawns['Spawn1'].pos, {ignoreCreeps: true});
            for (var position in path){
                Game.spawns['Spawn1'].room.createConstructionSite(path[position].x, path[position].y, STRUCTURE_ROAD);
            }
        }

        //Busca caminhos entre o Spawn e o room controller
        for(var spawn in Game.spawns){
            var path = Game.spawns[spawn].room.findPath(Game.spawns[spawn].room.controller.pos, Game.spawns[spawn].pos, {ignoreCreeps: true});
            for (var position in path){
                Game.spawns[spawn].room.createConstructionSite(path[position].x,path[position].y, STRUCTURE_ROAD);
            }
        }
    },

    //Busca locais de construções pendentes
    buildRoads: function(creep){
        var target = Game.creeps[creep].pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(target){
            if(Game.creeps[creep].build(target) ){
                Game.creeps[creep].moveTo(target);
            }

            if(Game.creeps[creep].build(target) == ERR_NOT_ENOUGH_ENERGY || Game.creeps[creep].build(target) == ERR_NOT_ENOUGH_RESOURCES){
                if(Game.creeps[creep].withdraw(Game.spawns['Spawn1'],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    Game.creeps[creep].moveTo(Game.spawns['Spawn1'])
                }
            }
        }
    }
};