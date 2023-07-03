const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const app = express();
const PORT = process.env.PORT || 5000; // You can change the port number as needed

// Middleware
app.use(express.json());

// Routes
app.use('/v1/tasks', taskRoutes);

// Connect to MongoDB

mongoose.connect('mongodb+srv://yadvendras20:NTydCDcUHAZkG7Rh@cluster0.ieau7ff.mongodb.net/?retryWrites=true&w=majority').then(e=>{
    console.log("success")
}).catch(err=>{
    console.log(err)
})



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
