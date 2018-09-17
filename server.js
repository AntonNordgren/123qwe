
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 3000

let database = [
    {
        title: 'Harry Potter',
        nrOfPages: 500
    },
    {
        title: 'The Lord of the Rings',
        nrOfPages: 900
    },
]

app.prepare()
    .then(() => {
        const server = express()

        server.get('/getDatabase', (req ,res) => {
            res.write(JSON.stringify(database))
            res.end()
        })

        server.get('/api', (req, res) => {
            const actualPage = '/';

            database.push({
                title: req.query.title,
                nrOfPages: req.query.nrOfPages
            })

            app.render(req, res, actualPage)
        })

        server.get('/delete', (req, res) => {
            const actualPage = '/';

            for(let i = 0; i < database.length; i++) {
                if(database[i].title === req.query.title) {
                    database.splice(i, 1)
                }
            }

            app.render(req, res, actualPage)
        })

        server.get('*', (req, res) => {
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