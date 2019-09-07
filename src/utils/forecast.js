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
        console.log(body.daily.data[0])
        callback(undefined,body.daily.data[0].summary + "It is currently "+ body.currently.temperature + " And there is "+ body.currently.precipProbability+ " of rain today \n Temperature high: " +body.daily.data[0].temperatureHigh +"\n"+"  Temperature low:"+body.daily.data[0].temperatureLow)
      
    }
  });
};

module.exports = forecast