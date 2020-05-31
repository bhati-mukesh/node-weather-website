const request = require('request')
// weatherstack api_key = 1df99d88ce49397200a721e0535fc88a

const foreCast = (lat,lon,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=1df99d88ce49397200a721e0535fc88a&%20query='+lat+','+lon
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weatherstack API service',undefined)
        }else if(response.body.error){
            callback('Unable to find Location!',undefined)
        }else{
            callback(undefined,{
                weather_descriptions: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                timezone: response.body.location.timezone_id,
                timezone_id:response.body.location.timezone_id,
                location : response.body.location.name +", " +response.body.location.region +", "+ response.body.location.country
            })
        }
    })
}

module.exports = foreCast