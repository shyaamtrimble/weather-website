const request = require('request')

const forecast= (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9ec51e4ac309530cb59007621e3d06ea&query=' + latitude + ',' + longitude //+ '&units=f' for farenheit

    //request( { url : url , json : true}, (error, response) => {  --before shorthand and destructuring{
    request({ url , json : true }, (error, { body }) => {

        if (error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, (body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out")
            )
        }
})
}

module.exports=forecast