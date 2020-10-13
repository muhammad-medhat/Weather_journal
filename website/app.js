// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&';
const apiKey = 'appid=4a680307260866ee4a7c5e5560cb59ba';
const fullUrl = baseUrl + apiKey
const month = [
    "January", "February", "March",  "April", "May", "June",
    "July", "August", "September", "October",  "November",  "December"
]





// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction)
window.addEventListener('DOMContentLoaded', bindCountries)

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = month[d.getMonth()]+'-'+ d.getDate()+'-'+ d.getFullYear();

// Helper functions

function getUserFeelings(){
    return document.getElementById('feelings').value
}

function getZipCode(){
    return document.getElementById('zip').value
}
function logMsg(msg){
    document.getElementById('err').innerText = msg
}
function clearOutput(){
    document.getElementById('date').innerText = '';
    document.getElementById('temp').innerText =''
    document.getElementById('content').innerText = ''
    document.getElementById('err').innerText = '';
}

/* Function called by event listener */
function performAction(e){
    e.preventDefault
    const zip = getZipCode()
    // check for zipcode before connection to API
    if(zip){
        getWeatherData(zip)
        .then((data)=>{
            console.log(data)
            if(data.cod != 200){
                clearOutput()
                logMsg( data.message)
            } else {
                postData('/feelings', {temp:data.main.temp, date: newDate, feelings: getUserFeelings()})
                .then(updateUI())
            }
        })
    } else{
        alert('Please Enter a valid zipcode')
    }
}

/* Function to GET Web API Data*/
const getWeatherData = async(zip)=>{
    const res = await fetch(`${fullUrl}&zip=${zip}`)
        try {
            const data = await res.json();
             console.log(data)
            return data
        }  catch(error) {
            document.getElementById('err').innerText = error
            return error
        }
}


/* Function to POST data */
const postData = async (url='', data) => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });
      try{
        const newData = await response.json()
        console.log(newData)
        return newData 
      }
      catch(err){
        console.log(err)
    }
} 



const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();    
        console.log(allData)
        setInput('date', 'date', allData, 'Date: ' + allData.date)
        setInput('temp', 'temp', allData, 'Temp: ' + allData.temp + ' °F')
        setInput('content','feelings', allData, 'Feelings: '+ allData.feelings)
        document.getElementById('err').innerHTML = '';
  
    }catch(error){

      console.log("error", error);
    }
}

function ddlCountries(){
    const ddl = document.getElementById('countryDDL')
    getCountries()
    .then(bindCountries)
}

function setInput(id, key, obj, val){
  //  const inpText = document.getElementById(id).value
    if(key in obj && obj[key].toString().trim()!=''){
            document.getElementById(id).innerHTML = val   
    } else {
        document.getElementById(id).innerHTML = ''   
    }

}
function bindCountries(){
    const countries = getCountries()
}
async function getCountries(){
    const res = await fetch(`${restcountriesURL}`)
        try {
            const data = await res.json();
             console.log(data)
            return data
        }  catch(error) {
            document.getElementById('err').innerText = error
            return error
        }
}


