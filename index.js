const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { ThemeConsumer } = require('styled-components')

const app = express()

const article = []

app.get('/',(req,res) =>{ 
    res.json('welcome to my climate chage api')
})

app.get('/news',(req, res)=>{

    axios.get('https://www.theguardian.com/international')
    .then((response)=>{

    const html=response.data
   const $ = cheerio.load(html)
   $('a:contains("Russia")', html).each(function (){

    const title = $(this).text()
    const url = $(this).attr('href')
    article.push({title, url})})

    res.json(article)}).catch((err)=>console.log(err))
   })



app.listen(PORT, ()=>console.log('Server running on port ${PORT}'))