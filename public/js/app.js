


// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     // if(error){
//     //     return console.log(error)
//     // }
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })







const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const message1  = document.querySelector('#message-1');
const message2  = document.querySelector("#message-2");




weatherForm.addEventListener('submit',(e)=>{
    message1.textContent= 'Loading.....'
    message2.textContent=''
    e.preventDefault();
    const location = search.value;
    // console.log(location)
    // if(!location){
    //     return console.log("Please enter a search location")
    // }
   
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        // console.log("http://localhost:3000/weather?address="+location)
    // if(error){
    //     return console.log(error)
    // }
    response.json().then((data)=>{
        //console.log(data)
        if(data.error){
            return  message1.textContent=data.error //console.log(data.error)
        }
        
        message1.textContent=data.Location;
        message2.textContent=data.Forecast;
        // console.log(data.Location)
        // console.log(data.Forecast)
    })
})

    
    
    
   
})
