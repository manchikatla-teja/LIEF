const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userModel = require("./models/user.js");

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://cs21b031:Yk06s31fMSSSGIga@lief.ftk3qpe.mongodb.net/?retryWrites=true&w=majority")

app.post("/login", (req, res)=>{
    const {email, password} = req.body;
    userModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password ===password){
                res.json("success")
            }
            else{
                res.json("the password is incorrect")
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

app.listen(4000, ()=>{
    console.log("server is runnig");
})