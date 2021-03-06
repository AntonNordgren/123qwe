
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 3000

const uniqid = require('uniqid');

let idCounter = 2

let database = [
    {
        title: 'Harry Potter',
        nrOfPages: 500,
        id: uniqid()
    },
    {
        title: 'The Lord of the Rings',
        nrOfPages: 900,
        id: uniqid()
    },
]

app.prepare()
    .then(() => {
        const server = express()

        server.get('/api/getDatabase', (req ,res) => {
            res.write(JSON.stringify(database))
            res.end()
        })

        server.get('/api/add', (req, res) => {
            const actualPage = '/';

            let id = uniqid()

            database.push({
                title: req.query.title,
                nrOfPages: req.query.nrOfPages,
                id: id
            })

            res.send({
                title: req.query.title,
                nrOfPages: req.query.nrOfPages,
                id: id,
                status: 200
            })
            res.end()
        })

        server.get('/api/delete', (req, res) => {
            const actualPage = '/';

            for(let i = 0; i < database.length; i++) {
                if(database[i].id === req.query.id) {
                    database.splice(i, 1)
                }
            }

            res.send({
                id: req.query.id,
                status: 200
            })
            res.end()
        })

        server.get('/api/edit', (req, res) => {
            let newItem = {
                title: req.query.title,
                nrOfPages: req.query.nrOfPages,
                id: req.query.id
            }

            console.log('new item ' + JSON.stringify(newItem))

            for(let i = 0; i < database.length; i++) {
                if(database[i].id == req.query.id) {
                    database[i] = newItem
                }
            }

            console.log('database after ' + JSON.stringify(database))

            res.send({
                title: req.query.title,
                nrOfPages: req.query.nrOfPages,
                id: req.query.id,
                status: 200
            })
            res.end()

        })

        server.get('*', (req, res) => {
            console.log('asd'+req.url)
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:' + port)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })