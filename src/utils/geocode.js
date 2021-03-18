const request = require('request')

const geocode = (address , callback) => {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2h5YWFtIiwiYSI6ImNrbTNkbTlpejJ5Y20ydXM1djkxZXd5eHcifQ.U3WgmBEhD0tuHuQz9HST3Q&limit=1'
    //request( { url : url , json : true}, (error, response) => {  --before shorthand and destructuring
    request( { url , json : true}, (error, { body }) => {

        if (error){
            callback('Unable to connect to Location service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined , {
                Latitude: body.features[0].center[1] ,
                Longitude : body.features[0].center[0],
                Location : body.features[0].place_name
            })
        }
    })

}

module.exports= geocode