/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.query');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run(creep){

        var creepObj = Game.creeps[creep];

        // Verifica se está vazio e busca um local de carga
        if(creepObj.memory.task == 'void'){
            //creepObj.moveTo(Game.getObjectById(creepObj.memory.sourceID));
            var source = Game.getObjectById(creepObj.memory.sourceID);
            var target = source.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

            if(creepObj.pickup(target) == ERR_NOT_IN_RANGE){
                creepObj.moveTo(target);
            }

            //Verifica se esta carregado totalmente
            if(creepObj.store.getFreeCapacity(RESOURCE_ENERGY) <= 0){
                creepObj.memory.task = 'loaded';
            }
        }
        //Verifica se esta carregado e busca um local de descarga 
        else {

            //Busca uma Extenção com capacidade suficiente para utilizar caso não possuir outro local de descarga
            var targetTransfer = null; //Possivel alvo
            var constructionExtencion = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});

            for(var construction of constructionExtencion){
                if(construction.store.getFreeCapacity(RESOURCE_ENERGY) >= creepObj.store.getUsedCapacity(RESOURCE_ENERGY)){
                    targetTransfer = construction;
                    break;
                }
            }
            
            //Busca um Spawn com capacidade sucificente
            if(Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) >= creepObj.store.getUsedCapacity(RESOURCE_ENERGY)){
                if(creepObj.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creepObj.moveTo(Game.spawns['Spawn1']);
                }
                
            } 
            //Caso não encontre um Spawn, move para um local de expanção
            else if(targetTransfer != null){
                if(creepObj.transfer(targetTransfer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creepObj.moveTo(targetTransfer.pos);
                }
            }
            //Busca um Controlador para fazer upgrade
            else if (creepObj.upgradeController(Game.spawns['Spawn1'].room.controller) == ERR_NOT_IN_RANGE){
                creepObj.moveTo(creepObj.room.controller);
            }

            //Verifica se esta vazio totalmente
            if(creepObj.store.getUsedCapacity(RESOURCE_ENERGY) <= 0){
                creepObj.memory.task = 'void';
            }

        }

    }


};