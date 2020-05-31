const request = require('request')
// mapbox api_key = pk.eyJ1IjoibXVrZXNoZHlwIiwiYSI6ImNrYW9xcWl4OTFkejcyeWxvaG1seTB5bnMifQ._4tJr36kLR5NTm-HpDHwDw

const geoCode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibXVrZXNoZHlwIiwiYSI6ImNrYW9xcWl4OTFkejcyeWxvaG1seTB5bnMifQ._4tJr36kLR5NTm-HpDHwDw&limit=1"

    // ES6 shorthand feature  {url:url} is replace url
    // ES6 destructing feature is used replace "response" by { body }
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to connect to MapBox service',undefined)
        } else if(body.features.length === 0){
            callback('Unable to find Location. Try another search!',undefined)
        }else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
        }
    })
}

module.exports = geoCode