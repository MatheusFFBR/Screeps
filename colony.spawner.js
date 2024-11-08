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
        if(!this.controllCreepMiner()){
            if(!this.controllCreepQuery()){
                this.controllCreepBuilder();
            }
        }
    },

    // Controla o Spawn de Mineradores para cada Fonte de Energia no Spawn1
    controllCreepMiner: function(){
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES); 
        var creeps = Game.creeps;

        for(var source in sources){
            var creepQnt = 0;
            var creepQntMax = 1;

            //Verifica a quantidade de Miner
            for(var creep in creeps){
                if(Game.creeps[creep].memory.sourceID == sources[source].id && Game.creeps[creep].memory.role == 'Miner'){
                    creepQnt++;
                }
            }

            //Verifica se a mina de energia não está sendo consumida totalmente a tada ciclo e permite o spawn de novos creeps adicionais
                if(sources[source].energy > 1000 && sources[source].ticksToRegeneration < 10){
                    if(Game.spawns['Spawn1'].room.findPath(Game.spawns['Spawn1'].pos, sources[source].pos , {ignoreCreeps: false}).length > 1){
                        console.log('Mina não consumida' + creepQntMax + ' | ' + creepQnt)
                        creepQntMax = creepQnt + 1;
                    }
                }
            //


            //Verifica a quantidade de Miner atuais e realiza o spawn de novos creeps
            if(creepQnt < creepQntMax){
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
                return true;
            }   
        }
        return false;
    },

    // Controla o Spawn e Query's para cada fonte de Energia no Spawn1
    controllCreepQuery: function(){
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        var creeps = Game.creeps;

        for(var source in sources){

            //Verifica a quantidade de Querys
            var creepQnt = 0;
            var creepQntMax = 2;

            for(var creep in creeps){
                if(Game.creeps[creep].memory.sourceID == sources[source].id && Game.creeps[creep].memory.role == 'Query'){
                    creepQnt++;
                }
            }

            //Verifica a quantidade de itens dropados no Chão e permite o spawn de Querys adicionais
            var resourceDropped = Game.spawns['Spawn1'].room.find(FIND_DROPPED_RESOURCES);
            var resourceDroppedQnt = null;
            for(var qnt of resourceDropped){
                resourceDroppedQnt =+ qnt.amount;
            }
            if(resourceDroppedQnt >= 100){
                creepQntMax = creepQnt++;
            }

            //Verifica a quantidade de Querys atuais e realiza o spawn de novos creeps
            if(creepQnt < creepQntMax){
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
                return true;
            }
        }
        return false;
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
        return true;
    }
};