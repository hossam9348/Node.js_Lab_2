const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
app.listen(PORT, (err)=>{
    if(!err) return console.log(`ok on post ${PORT}`);
    console.log(err);
})
app.use(express.json());
const myFuntions = require('./myFunctions');


app.post("/todos", (req, res)=> {
    res.send(myFuntions.add(req.body));
})

app.put("/todos/:id", (req, res)=> {
    const id = req.params.id;
    res.send(myFuntions.edit(id, req.body, req.query));
})

app.get("/todos/:id", (req, res)=> {
    const id = req.params.id;
    res.send(myFuntions.getById(id));
})

app.get("/todos", (req, res)=> {
    res.send(myFuntions.list(req.query));
})

app.delete("/todos/:id", (req, res)=> {
    const id = req.params.id;
    res.send(myFuntions.remove(id));
})



