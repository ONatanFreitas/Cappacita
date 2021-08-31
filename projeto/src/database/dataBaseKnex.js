const { databaseConnection } = require('./connection')

const pokemons = []

async function salvarPokemons(pokemon){

    const insertPokemon = {
        nome_pokemon: pokemon.nome,
        tipo_pokemon: pokemon.tipo,
        fraqueza: pokemon.fraqueza,
        resistencia: pokemon.resistencia,
        geracao: pokemon.geracao,
        origem_pokemon: pokemon.origem
    }

    const result = await databaseConnection('pokemons').insert(insertPokemon)

      if(result){
       return{
           ...pokemon,
           id: result
   }
}else{
       console.error("Deu erro!")
       return {
           error: "Deu erro na inserção"
       }
   }

}

async function mostrarPokemons() {   

    const result = await databaseConnection('pokemons')

    return result
}

async function mostrarPokemon(id){
   
    const result = await databaseConnection('pokemons').where({ id })

    return result
}



async function atualizarPokemon(id, pokemon){

    const updatePokemon = {
        nome_pokemon: pokemon.nome,
        tipo_pokemon: pokemon.tipo,
        fraqueza: pokemon.fraqueza,
        resistencia: pokemon.resistencia,
        geracao: pokemon.geracao,
        origem_pokemon: pokemon.origem
    }

    const result = await databaseConnection('pokemons').where({ id }).update(updatePokemon)

      if(result){
       return{
           ...pokemon,
           id
   }
}else{
       console.error("Deu erro!")
       return {
           error: "Deu erro na inserção"
       }
   }

}

function deletarPokemon(id){
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if(pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado
}

function batalhaPokemon(id1, id2){
    
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if(pokemon1.hp != 0 && pokemon2.hp != 0){
        if(pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
        } else if(pokemon1.tipo == pokemon2.resistencia){
            pokemon2.hp = pokemon2.hp - naoEfetivo
        } else {
            pokemon2.hp = pokemon2.hp - efetivo
        }
    }

    if(pokemon1.hp != 0 && pokemon2.hp != 0){
        if(pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
        } else if(pokemon2.tipo == pokemon1.resistencia){
            pokemon1.hp = pokemon1.hp - naoEfetivo
        } else {
            pokemon1.hp = pokemon1.hp - efetivo
        }
    }

    if(pokemon1.hp < 0) pokemon1.hp = 0
    if(pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

function curaPokemon(id){
    
    const pokemon1 = pokemons[id]
    const pocaoCura = 20

    pokemon1.hp = pokemon1.hp + pocaoCura

    if(pokemon1.hp > 100) pokemon1.hp = 100

    return `${pokemon1.nome}: ${pokemon1.hp}`
}

module.exports = { 
    salvarPokemons, 
    mostrarPokemon, 
    mostrarPokemons, 
    atualizarPokemon, 
    deletarPokemon, 
    batalhaPokemon, 
    curaPokemon }