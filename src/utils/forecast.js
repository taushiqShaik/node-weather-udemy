const request = require('request');
const chalk = require('chalk');


let url;

const forecast =(lat,long,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=52629b106a822d1efda86ae758a58792&query='+lat+','+long+'&units=m';
    //console.log(url);
    request({url, json:true}, (error,{body})=>{
        //const data= JSON.parse(response.body);
        //console.log(response.body.current);
        if(error){
            callback("No network", undefined)
        }else if(body.error){
            switch(body.error.code){
                case 601:
                    callback(body.error.info, undefined);
                    
                    break;
                case 615:
                    callback(body.error.info);
                    break;
                default:
                    callback("Other error", undefined)
            }
    
            
        }else{
            
            //fs.writeFileSync('./data.json', JSON.stringify(response));
            let temp = body.current.temperature;
            let precip = body.current.precip;
            let location = body.location.name;
            let weathercondi = body.current.weather_descriptions[0];
            callback(undefined,weathercondi+'. It is currently '+temp+' degrees in '+location+' with '+precip+'% chance of rain');
        }
    });

}

module.exports=forecast;