const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const port = process.env.PORT || 3000


// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

// setup handlerbar  engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup  static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/',(request,response)=>{
    response.render('index',{
        title:'HOME',
        name: 'Mukesh Bhati'
    })
})

app.get('/help',(request,response)=>{
    response.render('help',{
        title:'HELP',
        name: 'Mukesh Bhati'
    })
})

app.get('/products',(request,response)=>{
  if(!request.query.search){
      return response.send({
          Error: "Search must be provided!"
      })
  }
    console.log(request.query)
    response.send({products:[]})
})

app.get('/weather',(request,response)=>{
    if(!request.query.address || request.query.address === '' ){
        return response.send({
            error: 'Please Enter Location!'
        })
    }
    geoCode(request.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return response.send({error: error})
        }
        foreCast(latitude,longitude,(error,foreCastData)=>{
            if(error){
                return response.send({error: error})
            }
            console.log(latitude,longitude)
            console.log(location)
            console.log(foreCastData)
            response.send({
                foreCastData,
                address: request.query.address
            })

        })
    })

})

app.get('/about',(request,response)=>{
    response.render('about',{
        title:'ABOUT',
        name: 'Mukesh Bhati',
    })
})

app.get('/help/*',(request,response)=>{
    response.render('error',{errorMessage:'Help Article Not Found!',title:'404',name:"Mukesh Bhati"})
})

app.get('*',(request,response)=>{
    response.render('error',{errorMessage:'Page Not Found!',title:'404',name:"Mukesh Bhati"})
})

app.listen(port,()=>{
    console.log('Server is up on Port ',port)
})

// With this command nodemon also watch the change in file with .js and hbs extensions
// nodemon app.js -e js.hbss