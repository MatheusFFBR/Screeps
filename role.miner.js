/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run(creep){

        var creepObj = Game.creeps[creep];

        //Verifica a quantidade de energia dropada para evitar perdas nos ticks
        const dropEnergy = creepObj.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {filter: (resource) => resource.resourceType === RESOURCE_ENERGY});
        var energyQnt = 0;

        for(var resource of dropEnergy){
            energyQnt =+ resource.amount;
        }

        //Controla a mineração
        if(energyQnt < 100){
            if(creepObj.harvest(Game.getObjectById(creepObj.memory.sourceID), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creepObj.moveTo(Game.getObjectById(creepObj.memory.sourceID));
            }
        }
        
    }

};