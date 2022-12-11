const express = require('express')
const app = express()
app.use(express.json())
const courses = [
    {
        id: 1,
        name: "yousaf"
    },
    {
        id: 2,
        name: "wasif"
    }
]
const myLogger = function(req,res,next){
    console.log("i am going to excute")
    next()
}
app.use(myLogger);

app.get('/', function (req, res) {
    res.send('Hello Bro')
})
app.get('/data', function (req, res) {
    res.status(200).send(courses)
})
app.post('/data', (req, res) => {
console.log("name :: ", req.body.name)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})
app.put("/data/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("id not found");
        return;
    }
    course.name = req.body.name;
    res.send(course)
});
app.delete("/data/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("id not found");
        return;
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});
app.listen(8080)