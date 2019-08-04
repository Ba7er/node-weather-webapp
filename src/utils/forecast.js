//refactored with object destructuring 


const request = require("request");

const forecast = (lat, long, callback) => {
  const url = "https://api.darksky.net/forecast/18af1bf49ca7517b63903bdc36bc3dcd/"+lat+","+long+"?lang=en";

  request({url, json: true }, (err, {body}) => {
    if (err) {
      callback("Unable to connect",undefined)
    } else if (body.error) {
      callback("Unable to find location",undefined);
    } else {
       
        callback(undefined,body.daily.data[0].summary + "It is currently "+ body.currently.temperature + " And there is "+ body.currently.precipProbability+ " of reain today")
      
    }
  });
};

module.exports = forecast