const express = require('express')
const router = express.Router()
const template = require('../lib/template_express.js')


router.get('/', (req, res) => {
    const title = 'Welcome'
    const description = 'Hello, Node.js & Express'
    const list = template.list(req.list)
    const html = template.HTML(title, list, 
        `
        ${description}
        <img src="/images/coding.jpg" style="width:300px; display:block; margin-top:10px;"
        `,
        `<a href="/topic/create">create</a>`
    )
    res.send(html)
})

module.exports = router