# Weather-Journal App Project
## Overview

This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI.

_Before starting the project_
    > Some dependancies are installed and included in packages.json file 
    > express, cors, bodyparser 

### server.js modifications

* Creating a global endpoint to hold all the required data projectData
* An instance of the app requires express().
* The Express app instance is pointed to the project folder "website" 
   > app.use(express.static('website'));.
* Middlewares are configured to be used by express
* Creating a port to allow our app listening to it.
* Adding the following routes
    * app.get('/all', (req, res)=>{})
        > GET request to /all
        > Sends projectData object to the user
    * app.post('/feelings', (req, res) => {})
        > POST request to /feelings
        > Allow user to send the input to that server

### API Credentials
    > API credentials on OpenWeatherMap.com has been created by registering and getting the API key

### app.js modifications
    * Integrating OpenWeatherMap API
        > API key and URL are stored in a const variable
        > This variable is passed as a parameter to fetch() to return the result.
    * const variable to be array of monthes
    * Adding an asynchronous function **getWeatherData** to fetch the API request using the user input zi[ code
    * Adding an asynchronous function **postData** to post the user input to the server
    * Adding an asynchronous function **updateUI** to dynamicaly update UI with the user properties saved in the posted data to the server

### Event Listeners

The button **generare** calls a function **performAction** in the click event for sending request to the API















Instructions
This will require modifying the server.js file and the website/app.js file. You can see index.html for element references, and once you are finished with the project steps, you can use style.css to style your application to customized perfection.

Extras
If you are interested in testing your code as you go, you can use tests.js as a template for writing and running some basic tests for your code.
