const express = require('express')
const app = express()
const path = require('path')

const items = [
    {
        id: 1,
        name: "pan",
        price: 1.50,
        image: "img/pan.jpg"
    },
    {
        id: 2,
        name: "cocacola",
        price: 1,
        image: "img/coke.jpg"
    },
    {
        id: 3,
        name: "bocadillo",
        price: 3,
        image: "img/sandwitch.png"
    },
    {
        id: 4,
        name: "helado",
        price: 2,
        image: "img/icecream.jpg"
    },
    {
        id: 5,
        name: "fanta",
        price: 1,
        image: "img/fanta.jpg"
    }
]

app.use(express.static(path.join(__dirname, "./resources")))

function searchItem(id) {
    for (let i = 0; i < items.length; i++) 
        if (items[i].id == id) 
            return items[i]
    return null
}

app.get("/query", (req, res) => {
    if (req.query.id) {
        const result = searchItem(parseInt(req.query.id))
        if (result) {
            res.send(result)
        } else res.send({ error: "Item not Found"})
    } else {
        res.send({
            error: "Send an id as query parameter"
        })
    }
})

module.exports = app