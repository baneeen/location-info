
let Temp_API_Key ='a5a73e8b74e7fc6f36707476db3f414c'
let Temp_API_Call = 'http://api.openweathermap.org/data/2.5/weather?q='
let Time_API_Key='TiGpydHTFPsYLUPNBMxUwkP4gD7jSk'

const locations=[
    "Paris",
    "London",
    "Washington"
]

function getResult(Temp_Url,loc){
    
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
    let xhrForTemp = new XMLHttpRequest()
    let xhrForTime = new XMLHttpRequest()

    xhrForTemp.open("GET", Temp_Url)

    xhrForTemp.send()

    xhrForTemp.onload = function() {
        
        if (xhrForTemp.status != 200) { 
         
            console.log(`Temperature Request : Error ${xhrForTemp.status}: ${xhrForTemp.statusText}`)
         
        } else {      
           
            let result = JSON.parse(xhrForTemp.responseText) 
            let Loc_Temperature = result.main.temp
            let Loc_Longitude = result.coord.lon
            let Loc_latitude = result.coord.lat

            console.log(loc+" Temperature :" + Loc_Temperature)
           
            
            getResultForTime(xhrForTime,loc)
          
        }
        
      }

    xhrForTemp.onprogress = function(event) { 

        console.log(`Temperature Request : Received ${event.loaded} of ${event.total}`);
      }

    xhrForTemp.onerror = function() { 
                  console.log(`Temperature Request : Network Error`);
       }
}

function getResultForTime(xhrForTime,loc)
{
    let Time_Url =  'https://www.amdoren.com/api/timezone.php?api_key='+Time_API_Key+'&loc='+loc
    xhrForTime.open("GET", Time_Url)

    xhrForTime.send()

    xhrForTime.onload = function() {
        
        if (xhrForTime.status != 200) { 
         
            console.log(`Time Request : Error ${xhrForTime.status}: ${xhrForTime.statusText}`)
         
        } else {      
           
            let result = JSON.parse(xhrForTime.responseText) 
            let Loc_Time = result.time
            console.log(loc+" Time :" + Loc_Time)   
        }
        
      }

    xhrForTime.onprogress = function(event) { 

        console.log(`Time Request: Received ${event.loaded} of ${event.total}`);
      }

    xhrForTime.onerror = function() { 
                  console.log(`Time Request : Network Error`);
       }
}
   

function findLocInfo(loc){
     
        let Temp_API_Url = Temp_API_Call + loc + '&units=metric&APPID='+ Temp_API_Key
        getResult(Temp_API_Url,loc)

  }

 
for (let i = 0; i < locations.length; i++)
  findLocInfo(locations[i])
  