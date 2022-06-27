//REQUIRE DEPENDENCIES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

//DECLARED DB VARIABLES
let db,
    dbConnectionString = process.env.DB_STRING
    dbName = 'alien-database'

//CONNECT TO MONGO DB
MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//SET MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (request, response) => {
    let contents = db.collection('aliens').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.speciesName)
            console.log(nameList)
            response.render('index.ejs', {info: nameList})
        })
        .catch(error => console.log(error))
})

//SET UP LOCAL HOST ON PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`server is running on port ${PORT}`)
}) 

app.post('/api', (request, respons) => {
    console.log('post heard')
    db.collection('aliens').insertOne(
        request.body
    )
    .then(result => {
        console.log(result)
        respons.redirect('/')
    })

})

app.put('/updateEntry', (req,res) => {
    console.log(req.body)
    Object.keys(req.body).forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined || req.body[key] === '') {
          delete req.body[key];
        }
      });
    console.log(req.body)
    db.collection('aliens').findOneAndUpdate(
        {name: req.body.name},
        {
            $set:  req.body  
        },
        // {
        //     upsert: true
        // }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteEntry', (request, response) => {
    db.collection('aliens').deleteOne({name: request.body.name})
    .then(result => {
        console.log('Entry Deleted')
        response.json('Entry Deleted - JSON response')
    })
    .catch(error => console.error(error))
    

})

