'use strict';

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pokemon/:name', function(req, res) {
    var url = `http://pokeapi.co/api/v2/pokemon/${ req.params.name }/`;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.send(data);
        }
    });
});

app.get('/attack/:attack', function(req,res){
    var url = `http://pokeapi.co/api/v2/move/${ req.params.attack }/`;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200 ){
            var data = JSON.parse(body);
            res.send(data);
        }
    });
});


app.get('/fight/:pokemon1/:pokemon2', function(req,res){
    var poke1 = {};
    var poke2 = {};
    var player1 = {};
    var player2 = {};
    var fightSummary = {};
    
    getRequest(`http://pokeapi.co/api/v2/pokemon/${ req.params.pokemon1 }/`).then(function (body1) {
        poke1 = JSON.parse(body1);
        return getRequest(`http://pokeapi.co/api/v2/pokemon/${ req.params.pokemon2 }/`);
    }).then(function (body2) {
        poke2 = JSON.parse(body2);
        player1.name = poke1.name;
        player2.name = poke2.name;
        player1.hp = poke1.stats[5].base_stat;
        player2.hp = poke2.stats[5].base_stat;
        
        player1.attack = [poke1.moves[Math.floor(Math.random() * poke1.moves.length)].move, poke1.moves[Math.floor(Math.random() * poke1.moves.length)].move];
        player2.attack = [poke2.moves[Math.floor(Math.random() * poke2.moves.length)].move, poke2.moves[Math.floor(Math.random() * poke2.moves.length)].move];
        
        return getRequest(player1.attack[0].url);
    }).then(function (body3) {
        player1.attack[0].power = ((JSON.parse(body3)).power) ? ((JSON.parse(body3)).power) : 0;
        return getRequest(player1.attack[1].url);
    }).then(function (body4) {
        player1.attack[1].power = ((JSON.parse(body4)).power) ? ((JSON.parse(body4)).power) : 0;
        return getRequest(player2.attack[0].url);
    }).then(function (body5) {
        player2.attack[0].power = ((JSON.parse(body5)).power) ? ((JSON.parse(body5)).power) : 0;
        return getRequest(player2.attack[1].url);
    }).then(function (body6) {
        player2.attack[1].power = ((JSON.parse(body6)).power) ? ((JSON.parse(body6)).power) : 0;
        var p1turn = 1;
        var attack;
        fightSummary.events = [];
        while( player1.hp > 0 && player2.hp > 0) {
            if (p1turn) {
                //player 1 turn
                attack = player1.attack[Math.floor(Math.random() * player1.attack.length)];
                player2.hp = player2.hp - (0.1 * attack.power);
                fightSummary.events.push({
                    turn: player1.name,
                    attack: attack.name,
                    damage: 0.1 * attack.power,
                    [`${player1.name}-hp`]: player1.hp,
                    [`${player2.name}-hp`]: player2.hp
                });
                p1turn = 0;
            } else {
                //player 2 turn
                attack = player2.attack[Math.floor(Math.random() * player2.attack.length)];
                player1.hp = player1.hp - (0.1 * attack.power);
                fightSummary.events.push({
                    turn: player2.name,
                    attack:attack.name,
                    damage: 0.1 * attack.power,
                    [`${player1.name}-hp`]: player1.hp,
                    [`${player2.name}-hp`]: player2.hp
                });
                p1turn = 1;
            }
        }
        
        if(player1.hp <= 0) {
            fightSummary.winner = player2.name;
        } else {
            fightSummary.winner = player1.name;
        }
        res.send(fightSummary);
    });
});

function getRequest(url) {
    return new Promise(function (success, failure) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                success(body);
            } else {
                failure(error);
            }
        });
    });
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('App starting');
});

