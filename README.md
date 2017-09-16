# Pokemon API

This is a simple API layered upon an existing API provided by pokeapi.co. It does not implement database caching and so does not scale well for multiple users.

## API Usage

### Pokemon Overview

This is a straight shot from the existing public pokeapi.co. Endpoint for this call is https://pokemon-app-mkhan62.c9users.io/pokemon/{id or name} where id or name corresponds with the id or name of the pokemon.

An example of the returned data can be found at http://pokeapi.co/api/v2/pokemon/{id or name}

### Pokemon Attack

This is also a straight shot from the existing public pokeapi.co. Endpoint for this call is https://pokemon-app-mkhan62.c9users.io/attack/{id or name} where id or name cooresponds with the id or name of the attack.

An example of the returned data can be found at http://pokeapi.co/api/v2/move/{id or name}

### Pokemon Battle

This api call will take two pokemon and assign them two random attakcs from their repertoire (just like in the games). The pokemon will then alternate in moves until one pokemon's HP goes to zero (or below) resulting in the other pokemon to win. It returns a JSON string containing the history of the events with the winner of the battle.

API Endpoint:  https://pokemon-app-mkhan62.c9users.io/fight/{id or name}/{id or name} where id or name corresponds to an id or name of the pokemon.

As an example the call to https://pokemon-app-mkhan62.c9users.io/fight/charizard/weedle will return:

```
{ 
 events: 
   [ { turn: 'charizard',
       attack: 'submission',
       damage: 8,
       'charizard-hp': 78,
       'weedle-hp': 32 },
     { turn: 'weedle',
       attack: 'electroweb',
       damage: 5.5,
       'charizard-hp': 72.5,
       'weedle-hp': 32 },
     { turn: 'charizard',
       attack: 'submission',
       damage: 8,
       'charizard-hp': 72.5,
       'weedle-hp': 24 },
     { turn: 'weedle',
       attack: 'electroweb',
       damage: 5.5,
       'charizard-hp': 67,
       'weedle-hp': 24 },
     { turn: 'charizard',
       attack: 'submission',
       damage: 8,
       'charizard-hp': 67,
       'weedle-hp': 16 },
     { turn: 'weedle',
       attack: 'electroweb',
       damage: 5.5,
       'charizard-hp': 61.5,
       'weedle-hp': 16 },
     { turn: 'charizard',
       attack: 'submission',
       damage: 8,
       'charizard-hp': 61.5,
       'weedle-hp': 8 },
     { turn: 'weedle',
       attack: 'bug-bite',
       damage: 6,
       'charizard-hp': 55.5,
       'weedle-hp': 8 },
     { turn: 'charizard',
       attack: 'dynamic-punch',
       damage: 10,
       'charizard-hp': 55.5,
       'weedle-hp': -2 } ],
 winner: 'charizard'
}
```