const express = require('express')
const router = express.Router()
const path = require('path')
const sanitizeHtml = require('sanitize-html')
const template = require('../lib/template_express.js')
const fs = require('fs')


router.get('/create', (req, res) => {
    title = 'WEB - create'
    var list = template.list(req.list)
    var html= template.HTML(title, list, `
        <form action="/topic/create_process" method="post">
            <p>
                <input type="text" name="title" placeholder="title">
            </p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `, '')
    res.send(html)
})

router.post('/create_process', (req, res) => {
    /*
    let body = ''
    req.on('data', (data) => {
        body = body + data
    })
    req.on('end', () => {
        const post = qs.parse(body)
        const title = post.title
        const description = post.description
        fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
            res.writeHead(302, {Location: `/?id=${title}`})
            res.end()
        })
    })
    */
    const post = req.body
    const title = post.title
    const description = post.description
    fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
        res.writeHead(302, {Location: `/topic/${title}`})
        res.end()
    })
})

router.get('/update/:pageId', (req, res) => {
    const filteredId = path.parse(req.params.pageId).base
    fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
        const title = req.params.pageId
        const list = template.list(req.list)
        const html= template.HTML(title, list, 
        `
        <form action="/topic/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"</p>
            <p>
                <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
        `,
        `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
        )
        res.send(html)
    })
})

router.post('/update_process', (req, res) => {
    const post = req.body
    const id = post.id
    const title = post.title
    const description = post.description
    fs.rename(`data/${id}`, `data/${title}`, (error) => {
        fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
            res.redirect(`/topic/${title}`)
        })
    })
})

router.post('/delete_process', (req, res) => {
    const post = req.body
    const id = post.id
    const filteredId = path.parse(id).base
    fs.unlink(`data/${filteredId}`, (error) => {
        res.redirect(`/`)
    })
})

router.get('/:pageId', (req, res, next) => {
    const filteredId = path.parse(req.params.pageId).base
    fs.readFile(`data/${filteredId}`, 'utf-8', (err, description) => {
        if(err){
            next(err)
        } else {
            const title = req.params.pageId
            const sanitizedTitle = sanitizeHtml(title)
            const sanitizedDescription = sanitizeHtml(description, {
                allowedTags:['h1']
            })
            const list = template.list(req.list)
            const html= template.HTML(sanitizedTitle, list, sanitizedDescription, 
                `
                <a href="/topic/create">create</a>
                <a href="/topic/update/${sanitizedTitle}">update</a>
                <form action="/topic/delete_process" method="POST">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                </form>
                `
            )
            res.send(html)
        }
    })
    console.log(req)
})


module.exports = router