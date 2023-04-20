const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect("mongodb+srv://admin:mir1z7kMyV8iUxro@cluster0.dbq3hkb.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const carSchema = new mongoose.Schema({
  phoneNumber: String,
  numberPlate: String,
  carModel: String,
  carSeats: Number,
  source: String,
  destination: String,
  date: Date,
  time: String,
});

const riderRequestSchema= new mongoose.Schema({
    source:String,
    destination:String,
    date:Date,
    time:String,
});

const Car = mongoose.model("Car", carSchema);
const RideReq = mongoose.model("RideReq", riderRequestSchema);

app.post("/submit", async (req, res) => {
  try {
    const newCar = new Car({
      phoneNumber: req.body.phoneNumber,
      numberPlate: req.body.numberPlate,
      carModel: req.body.carModel,
      carSeats: req.body.carSeats,
      source: req.body.source,
      destination: req.body.destination,
      date: req.body.date,
      time: req.body.time,
    });
    await newCar.save();
    res.send("Car data saved successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving car data");
  }
});

app.post("/rider-request", async (req,res)=> {
    try {
        const newRideReq = new RideReq({
           source: req.body.source,
           destination: req.body.destination,
           date: req.body.date,
           time: req.body.time
        });
        await newRideReq.save();
        //res.send("Request Received");
    } catch (error) {
        console.log(error);
        //res.status(500).send("Error receiving data");
    }
    
    try {
      const newRideReq = new RideReq({
        source: req.body.source,
        destination: req.body.destination
      });
      const matches= await Car.find({
        source: newRideReq.source,
        destination: newRideReq.destination
      });
      console.log(matches)
      res.json(matches);
    } catch (error) {
      console.log(error);
    }
});

app.listen(5000, () => {
  console.log("server is listening to port 5000");
});