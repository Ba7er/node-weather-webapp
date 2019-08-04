const path = require('path')
const express = require("express");
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
// below is to get the port number provided by our host and it is accessable using 'process.env.PORT'
const port = process.env.PORT || 3000 

// define Paths for express config 
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// set up static directory to serve , also express looking for pages depending on what rout is being requested 
app.use(express.static(publicDirPath))

app.get('',(req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Abodi'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title : 'About Me',
        name: 'Abodi'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        message: 'this is a message ',
        title: 'Help',
        name: 'Abodi'
    })
})

app.get("/weather", (req, res) => {
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({error: "You Must provide a location "})
    }
    geocode(req.query.address,(error, {lat, long, location}={}) =>{
        if(error){
            console.log(error)
            return res.send({
               error
            })
        }
        forecast(lat, long, (error, forecastData) =>{
            if(error){
               return res.send({
                   error
               })
            }
            // console.log('this is the location',location)
            // console.log('this is the forecast',forecastData)
            //res.send({forecast:'it is hot', location: 'Dubai',address: req.query.address});
            res.send({forecast:forecastData,location,address:req.query.address});
        })
    })
        
});

// make sure to not response twice to a request 
// app.get('/products', (req, res) =>{
//     if(!req.query.search){
//         return res.send({
//             err:'you must provide a search'
//         })

//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })

// })

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404 help',
        name: 'Abodi',
        message: 'Help Artical Not Found'
    })

})

app.get('*',(req, res) =>{
    res.render('404',{
        title : '404',
        name: 'Abodi',
        message: 'Page Not Found'
    })
})

app.listen(port, () => {
  console.log("Server is up on port "+ port);
});
