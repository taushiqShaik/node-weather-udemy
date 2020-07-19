const geocode = require('../../../weather-app/utils/geocode.js');
const forecast = require('../../../weather-app/utils/forecast');
const fs = require('fs');
const jsdom = require('jsdom');
const{JSDOM} = jsdom;

const dom = new JSDOM(fs.readFileSync('./templates/views/weather.hbs','utf8'));

var loca =dom.window.document.getElementById('location');
var search = dom.window.document.getElementById('search');
var weatherblk = dom.window.document.getElementById('weatherblock');

weatherblk.style.display='none';

search.addEventListener('click',()=>{
    geocode(loca.value, (error, data)=>{
        if(!local.value){
            //console.log(city);
            return console.log('please provide the city name')
        }
        if (error){
            console.log(error);
        }else{
            forecast(latitude,longitude,(error,forecast)=>{
                if(error){
                   return console.log(error);
    
                }
                    weatherblk.style.display='block';
                    console.log(forecast);
                    return forecast
                
                
            })
        }
    });
});
