const request = require('request');
const geocode = (city, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(city)+'.json?access_token=pk.eyJ1IjoicmFzaGlxMjMxIiwiYSI6ImNrY2dkYTd3YTBwZTIzM284d20zMHE1OXcifQ.-JzsYOLXW2oZ5svw7aMnWg';
    request({url, json:true},(error,{body}={})=>{
        if(error){
            console.log(error)
            callback("There is a network error",undefined);
    
        }else if(body.message){
            //console.log(response.body.message);
            callback(body.message,undefined);
        }

        else if(body.features.length===0){
            //console.log(response.body.features)
            //console.log("Location not found");
            callback("Location not found, try another search", undefined);
    
        }else{
            
            callback(undefined, {
                
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
            
        }
        
    });
    
    
};

module.exports=geocode;