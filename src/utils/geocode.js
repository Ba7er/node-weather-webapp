const request = require('request')

//refactored with object destructuring 
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWJkZWxlbGxhaCIsImEiOiJjanl1NW90amwwYW9yM2hwZ3EzN2V4cXd6In0.12WjLAPWzXe811xwnC0Nrw&limit=1'
    request({url, json:true}, (err, {body}) =>{
        if(err){
            callback('Unable to connect',undefined)
        }else if(body.features.length === 0 ){
            callback('Unable to find the requested location!',undefined)
        }else {
            callback(undefined, {
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode