# SpotifyAI
Sometime people just prefer what's treated to them based on how they are feeling, instead putting in the effort and finding it themselves. Same applies with people's song or music experience. Sometimes users are too lazy, too busy or too clouded and dont even know what they'd prefer listening, which might further irritate them and the work they're doing. To solve this issue and enhance the ever evolving lifestyle. The proposed application, would just require the user to click a selfie or upload a picture of themselves, based on which the application would detect their mood and emotion, and further recommend the best spotify playlists based on how they're feeling. And not just what's told, this feature could also add a fun and exciting timepass and game for users to explore as they can experiment with diff selfies and pull up different experiences from it.

## Demo Link: [click here](https://drive.google.com/file/d/1-lyPRiCSMASmjIpHJSEWovlr73SOQelA/view?usp=sharing)




![smiling analysis pic](https://github.com/soumyadeeptadas/Spotify-faceAPI/blob/master/Screenshots/Screenshot%20(961).png)

![smiling analysis pic](https://github.com/soumyadeeptadas/Spotify-faceAPI/blob/master/Screenshots/Screenshot%20(962).png)

## Getting Started
Follow these steps to get started!
1. Clone this repository to download the code
2. run `npm install` in `project folder`, `MERN` folder and `backend` folder inside MERN folder.
3. Retrieve free API key and corresponding endpoint for [Microsoft Face](https://azure.microsoft.com/en-us/services/cognitive-services/face/) from Azure Cognitive Services
4. Set up [MongoDB](https://www.mongodb.com/) database and retrieve custom uri by connecting by network
5. Add API key, MongoDB URI, and custom endpoint (if different from code) to .env file as follows
 ```
    ATLAS_URI=<custom_uri>
    API_KEY=<azure_key>
    ENDPOINT=<azure_endpoint>
 ```
5. Open up two terminal window, in one terminal, navigate to project folder and run ``npm start``.
6. In the other terminal navigate to `MERN` folder and run ``npm start``.
7. Test out your web app with different image urls! (backend on port 5000 and webapp on port 3000)

## Features
### Analyze your Image
Type in the url of your image and click the "analyze image" button to display the detected happiness index and recommended playlist. A playlist link corresponding to your mood ill be pulled from the MongoDB database. The code for this component can be found under [**detect.component.js**]

### Playlists
This page will display the current playlists in your MongoDB database. To edit or delete entries, simply click the link to the right of the playlist and change the values. The code for this component can be found under [**playlist-list.component.js**]

### Add Playlists
To add your own playlists, enter the Add Playlists page. Here, a user can input the link to a playlist, their happiness index, and their age. These fields will then be added as an entry into the MongoDB database. The code for this component can be found under [**create-playlist.js**]

### Menu
The menu is home to the three main pages: Analyze your Image, Playlists, and Add Playlists. The code for this component can be found under [**navbar.component.js**]

## How it Works
Spotif.ai was created using the MERN stack (MongoDB, Express, React, Node.js). After connections are made to both the database and localhost, [Microsoft Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/) is used to access the emotional indices for each face in an uploaded image. The Face API detects the relative positions of facial features such as lips and eys to calculate a happiness level and the age of the face. 



