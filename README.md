# Workshop Node.js : Twitter API

### What is it ?
This app displays the pseudonyms of the Twitter users who activated their localization. 😈
Of course it doesn't actually show the location.

It starts with the keyword 'clinton'. Then the user can add an other keyword.

The initial idea was to show recent tweets origin on an interactive map. 
Hovever, the free Twitter API does not allow us to locate any user.

Sometimes the API crashes, I don't know why.

### Install

1/ Setup the project :
````
npm install
````

2/ Create a new .env file based on .env.demo and put your API credentials in.

3/ Start the server :
````
node main.js
````

4/ If you get the error 'Cannot find module 'ws'
' (got it on Ubuntu), run the following command :
````
npm install ws
````
