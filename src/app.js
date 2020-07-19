const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();



console.log(__dirname);
console.log(__filename);

//console.log(path.join(__dirname,'../public'));

// Define paths for express config
const publicDirPath =  path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials') 
// const helppage = path.join(publicDirPath,'/help.html');
// const aboutpage = path.join(publicDirPath,'/about.html');


// app.get('',(req,res)=>{
//     res.send('Hello Rashiq...!!')
// });

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath); 
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

// app.use('/help',express.static(helppage));
// app.use('/about',express.static(aboutpage));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        //source: 'from app.js',
        name:'Rashiq'
    });
});



app.get('/help',(req,res)=>{
    res.render('help',{
        message:'To know more about me, come to ADP',
        title:'Help',
        name:'Rashiq'
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Rashiq',
        source:'hbs',
        title:'About'
    })
});

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "Please provide address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if (error){
            return res.send({
                error:error
            })
        }
        forecast(data.latitude, data.longitude ,(error,forecast)=>{
            if(error){
                return res.send({Error:error+"error here"})
            }
            res.send({
                Address:req.query.address,
                Location:data.location,
                Forecast:forecast
            })
        })
    })
    
});

app.get('/json',(req, res)=>{
    res.send([{
        name:'Rashiq',
        age:27,
        Profession: 'software'
    },{
        education:'B.tech',
        college:'JNTU',
        graduation:2015
    }]);
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Rashiq',
        title:'Help page',
        message:'Help page your looking for is not found'
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        name:'Rashiq',
        title:'404',
        message:'Page not found'
    });
});



app.listen(3000,()=>{
    console.log('Server is up on the port 3000');
});




