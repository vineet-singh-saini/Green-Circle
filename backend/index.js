const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors({
  origin: 'https://green-circle-delta.vercel.app',
  credentials: true 
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('MB running on port 5000')))
  .catch((err) => console.error(err));

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');



app.use('/auth',authRoutes);
app.use('/feed',postRoutes);

app.listen(port , (req,res)=> {
    console.log(`server is running on port ${port}`);
});