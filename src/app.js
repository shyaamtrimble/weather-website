const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configuration
console.log(__dirname, __filename)
console.log(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// }) 

app.get('', (req, res) => {
     res.render('index', {
         title: 'Weather App',
         Name: 'Shyaam'
     })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        Name: 'Shyaam'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'This is some help text',
        Name: 'Shyaam'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : "You must Add address"
        })
    }

    geocode(req.query.address, (error, { Latitude, Longitude, Location } = {}) => {
        if (error){
            //return console.log(chalk.red(error))
            return res.send({ error })
        }
        
        forecast(Latitude, Longitude , (error, forecastData) => {
            if (error){
                //return console.log(chalk.red(error))
                return res.send({ error })
            }
            //console.log(chalk.green(Location))
            //console.log(chalk.blue(forecastData))
            res.send({
                forecast : forecastData,
                Location,
                address: req.query.address
            })
        })

    
    })  

    

   
})

// app.com
// app.com/help
// app.com/about
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        Name: 'Shyaam',
        errorMsg: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        Name: 'Shyaam',
        errorMsg: 'Page not found'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})