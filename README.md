# Workshop Node.js : Twitter API

### What is it ?
This app displays the pseudonyms of the Twitter users who activated their localization. 😈
Of course it doesn't actually shows the location.

The initial idea was to show recent tweets origin on an interactive map. 
Hovever, the free Twitter API does not allow us to locate any user.

### Install

Setup the project :
````
npm install
````

Start the server :
````
node main.js
````

If you get the error 'Error: Cannot find module 'ws'
' (got it on Ubuntu), run the following command :
````
npm install ws
````