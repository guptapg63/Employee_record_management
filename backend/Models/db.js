import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/recordData';

mongoose.connect(url)
   .then(() => {
      console.log('mongoDB connected');
   })
   .catch((err) => {
      console.log('mongoDB connection error: ', err);
   })
