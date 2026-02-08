//get = give me data (reading)
//post = add new data (creating)
//patch = update data (editing)
//delete = literal delete (deleting)
// /api is just a convention but it signifies json data

//import stuff
const express = require('express');
const cors = require('cors');

//init app
const app = express();

app.use(cors());
app.use(express.json());

//routes
const path = require('path');
app.use(express.static(path.join(__dirname, "..", "public")));

//temp memory
let lists = [
    {
       name: "school",
       todos: []
    },
    {
        name: "personal", 
        todos: []
    },
    {
        name: "locked out", 
        todos: []
    }
];

let currListIndex = 0;

//get curr list
app.get("/api/list", (req, res) => {
  res.json({
    currListIndex,
    list: lists[currListIndex]
  });
});

//switch lists
app.post("/api/list/next", (req, res) => {
    currListIndex = (currListIndex + 1) % lists.length;
    res.sendStatus(200);
})
app.post("/api/list/prev", (req, res) => {
  currListIndex = (currListIndex - 1 + lists.length) % lists.length;
  res.sendStatus(200);
});

//add todo
app.post("/api/todo", (req, res) => {
    const { text, deadline } = req.body;
    lists[currListIndex].todos.push({
        text,
        deadline,
        done: false
    });
    res.sendStatus(200);
});

//delete todo
app.delete("/api/todo/:index", (req, res) => {
    lists[currListIndex].todos.splice(req.params.index, 1);
    res.sendStatus(200);
});

//delete
app.delete("/api/list", (req, res) => {
  if (lists.length <= 1) {
    return res.status(400).json({ error: "Cannot delete last list" });
  }

  lists.splice(currListIndex, 1);
  currListIndex = Math.max(0, currListIndex - 1);

  res.sendStatus(200);
});

//edit
app.patch("/api/todo/:index", (req, res) => {
  const { text } = req.body;
  lists[currListIndex].todos[req.params.index].text = text;
  res.sendStatus(200);
});

app.post("/api/list", (req, res) => {
    const { name } = req.body;
    lists.push({ name, todos: []});
    currListIndex = lists.length-1;
    res.sendStatus(200);
})


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});