const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
// This should already be declared in your API file



const app = express();
const port = process.env.PORT || 5000;




app.use(cors({origin: true, credentials: true}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const playlistsRouter = require('./routes/playlists');

app.use('/playlists', playlistsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
