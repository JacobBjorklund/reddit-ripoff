const express = require('express')
const { db } = require('./db')

const server = express()
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

server.get('/api/messages', async (req, res) => {
    const rows = await db('message').select()
    res.status(200).send(rows)
})

server.post('/api/messages/:id/up', async (req, res) => {
    await db('message').where({ id: req.params.id }).increment({ upVotes: 1 })
    const message = await db('message').where({ id: req.params.id }).first('upVotes')
    res.status(200).send(message)
})

server.post('/api/messages/:id/down', async (req, res) => {
    await db('message').where({ id: req.params.id }).increment({ downVotes: 1 })
    const message = await db('message').where({ id: req.params.id }).first('downVotes')
    res.status(200).send(message)
})

server.post('/api/messages', async (req, res) => {
    if (!req.body.content || req.body.content.length == 0) {
        res.status(400).send('Error: No Content Sent...')
        return;
    }
    await db('message').insert({
        content: req.body.content,
        upVotes: 0,
        downVotes: 0
    })
    res.redirect('back')
})


server.listen(3000) 