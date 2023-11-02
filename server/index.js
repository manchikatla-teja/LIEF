const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userModel = require("./models/user.js");
const injuredModel = require("./models/injuredData.js");

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://cs21b031:Yk06s31fMSSSGIga@lief.ftk3qpe.mongodb.net/?retryWrites=true&w=majority")

app.post("/login", (req, res)=>{
    const {email, password} = req.body;
    userModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password ===password){
                res.json(user.id);
            }
            else{
                res.json("Invalid password")
            }

        }
        else{
            res.json("No such record exists");
        }
    })
})
app.post("/signup", (req, res) => {
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err=>res.json(err))
});

app.post("/injuryPost", (req, res)=>{
    injuredModel.create(req.body)
    .then(injuries => res.json(injuries))
    .catch(err => res.json(err))
});


app.get('/injuryPost', async (req, res) => {
    try {
      const items = await injuredModel.find(); // Fetch items from your MongoDB collection
      res.json(items); // Send the data as JSON
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

app.listen(4000, ()=>{
    console.log("server is runnig");
})