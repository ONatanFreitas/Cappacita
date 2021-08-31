const express = require('express')
const app = express()
const dataBase = require('./database/dataBaseKnex')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}))

app.get('/pokemons', async (req, res) => {
    const pokemons = await dataBase.mostrarPokemons()
    res.send(pokemons)
})

app.get('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.mostrarPokemon(req.params.id))
})

app.post('/pokemons', async (req, res) => {
    const pokemon = await dataBase.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        geracao: req.body.geracao,
        origem: req.body.origem,        
    })
    res.send(pokemon)
})

app.put('/pokemons/:id', async (req, res) => {
    const pokemon = await dataBase.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        geracao: req.body.geracao,
        origem: req.body.origem,            
    })
    res.send(pokemon)
})

app.delete('/pokemons/:id', (req, res) => {
    res.send(dataBase.deletarPokemon(req.params.id))
})

app.post('/batalha', (req, res) =>{
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
})

app.put('/cura/:id', (req, res) => {
    res.send(dataBase.curaPokemon(req.params.id))
})

app.listen(3003)