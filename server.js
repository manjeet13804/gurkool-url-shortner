const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()
const bodyParser=require("body-parser")
const userRoutes = require("./routes/user")
app.use(bodyParser.json())
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log("db connected")).catch((err)=>{console.log(err)})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use("/",userRoutes)
app.get('/', async (req, res) => {
  
  res.render('index')
})
app.get('/home', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('home', { shortUrls: shortUrls })
})
app.get('/signup', async (req, res) => {
  
  res.render('signup')
})
app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })

  res.redirect('/home')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(8000,() => console.log("The server is up at 8000 port"));