const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes.js');

const app = express();
const SERVER_PORT = 3000;
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
const mongodb_atlas_url = process.env.MONGODB_URL;

//TODO - Replace you Connection String here
mongoose.connect(mongodb_atlas_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(UserRoutes);

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`));