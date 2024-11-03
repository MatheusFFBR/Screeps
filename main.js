var colonySpawner = require("colony.spawner");
var roleMiner = require("role.miner");
var roleQuery = require("role.query");
var roleBuilder = require("role.builder");
var colonyCreaterController = require("colony.createrController");

var creeps = Game.creeps;

console.log(Game.time, " | ", Game.time % 10);
if(Game.time % 10 === 0){

    //Limpa a memoria de Creeps mortos
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
            console.log('Removendo memoria do Creep Morto');
        }
    }

    //Ativa o controle de Spawn
    colonySpawner.run();
}

if(Game.time % 100 === 0){
  colonyCreaterController.run();
}

//Controla o comportamento dos Miner's
for (var creep in creeps){

    if(Game.creeps[creep].memory.role == 'Miner'){
        roleMiner.run(creep);
    }
}

//Controla o comportamento dos Querys
for (creep in creeps){
    if(Game.creeps[creep].memory.role == 'Query'){
        roleQuery.run(creep);
    }
}

//Controla o comportamento dos Builder
for (creep in creeps){
    if(Game.creeps[creep].memory.role == 'Builder'){
        roleBuilder.run(creep);
    }
}

