/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('colony.spawner');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run(){
        this.controllCreepMiner();
        this.controllCreepQuery();
        this.controllCreepBuilder();
    },

    // Controla o Spawn de Mineradores para cada Fonte de Energia no Spawn1
    controllCreepMiner: function(){
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES); 
        var creeps = Game.creeps;

        for(var source in sources){
            var creepQnt = 0;

            for(var creep in creeps){
                if(Game.creeps[creep].memory.sourceID == sources[source].id && Game.creeps[creep].memory.role == 'Miner'){
                    creepQnt++;
                }
            }

            if(creepQnt < 1){
                Game.spawns['Spawn1'].spawnCreep(
                    [WORK,WORK,MOVE], 
                    'Miner' + Game.time, 
                    {
                        memory: {
                            role: 'Miner',
                            sourceID: sources[source].id
                        }
                    }
                );
            }
        }
    },

    // Controla o Spawn e Query's para cada fonte de Energia no Spawn1
    controllCreepQuery: function(){
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        var creeps = Game.creeps;

        for(var source in sources){
            var creepQnt = 0;

            for(var creep in creeps){
                if(Game.creeps[creep].memory.sourceID == sources[source].id && Game.creeps[creep].memory.role == 'Query'){
                    creepQnt++;
                }
            }

            if(creepQnt < 2){
                Game.spawns['Spawn1'].spawnCreep(
                    [MOVE,CARRY,WORK],
                    'Query' + Game.time,
                    {
                        memory: {
                            role: 'Query',
                            sourceID: sources[source].id,
                            task: 'void'
                        }
                    }
                )
            }
        }
    },

    // Controla o Spawn de Builder's para para o Spawn1
    controllCreepBuilder: function(){
        var creeps = Game.creeps;
        var creepQnt = 0;

        for(var creep in creeps){
            if(Game.creeps[creep].memory.role == 'Builder'){
                creepQnt++;
            }
        }

        if(creepQnt < 2){
            Game.spawns['Spawn1'].spawnCreep(
                [MOVE,CARRY,WORK],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'Builder'
                    }
                }
            )
        }
    }
};