const mongoose = require("mongoose");
      

//User schema
const roomSchema = new mongoose.Schema({
  
    room: {
        type: String,
        required: true 
    },
     description: {
        type: String,
        
    },
    
});


module.exports = mongoose.model("Room", roomSchema);