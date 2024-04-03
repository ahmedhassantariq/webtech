const express = require("express")
const mongoose = require("mongoose");
const app = express()

const port = 5000
let Person = require("./items");
app.use(express.json());


app.post("/api/persons", async function(req, res){
    let data = req.body;
    let person = new Person(data);
    await person.save();
    res.send(person);
});

app.delete("/api/persons/:id", async function(req, res){
    let person = await Person.findByIdAndDelete(req.params.id);
    if(!person) return res.status(404).send("Person not found");
    res.send(person);
});

app.put("api/persons/:id", async function(req, res){
    let person = await Person.findById(req.params.id);
    if(person) return res.status(404).send("Person not found");
    Person.name = req.body.name;
    person.address = req.body.address;
    await person.save();
    res.send(person);
});

app.get("api/persons/:id", async function(req, res){
    let person = await Person.findById(req.params.id);
    res.send(person);
});

app.get("api/persons", async function(req, res){
    let persons = await Person.find();
    req.send(persons);
})



const connectionString = "mongodb+srv://ahmedhassantariq:ahmedhassantariq@cluster0.wt9ns.mongodb.net/";

app.listen(port, ()=> console.log(`Server running on port${port}`))
mongoose.connect(connectionString).then(
    () =>{
        console.log("Connected to Database");
    }
).catch(
    (err) =>{
        console.log("Connection Error");
    }
);