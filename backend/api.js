import express from "express";
import { database } from "./database.js";
import cors from "cors";

const app = express();
const port = 5005;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/bog/users", (req, res) => {
  res.json(database).status(200);
});

app.get("/api/bog/users/:id", (req, res) => {
  const user = database.filter((user) => user.id === req.params.id)[0];
  res.json(user).status(200);
});

app.post("/api/bog/users", (req, res) => {
  try {
    const fields = [
      "name",
      "avatar",
      "hero_project",
      "notes",
      "email",
      "phone",
      "rating",
      "status",
    ];
    for (const field of fields) {
      if (!(field in req.body)) {
        return res
          .status(400)
          .json({ error: `Missing '${field}' in request body` });
      }
    }
    const lastId =
      database.length === 0 ? 0 : parseInt(database[database.length - 1].id);
    let user = {
      name: req.body.name,
      avatar: req.body.avatar,
      hero_project: req.body.hero_project,
      notes: req.body.notes,
      email: req.body.email,
      phone: req.body.phone,
      rating: req.body.rating,
      status: req.body.status,
      id: (lastId + 1).toString(),
    };
    database.push(user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/bog/users/:id", (req, res) => {
  const id = req.params.id;
  const fields = [
    "name",
    "avatar",
    "hero_project",
    "notes",
    "email",
    "phone",
    "rating",
    "status",
  ];
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      for (const field of fields) {
        if (field in req.body) {
          database[i][field] = req.body[field];
        }
      }
      return res.status(200).json(database[i]);
    }
  }
  res.status(400).json({ error: "ID does not exist" });
});

app.delete("/api/bog/users/:id", (req, res) => {
  const ids = req.params.id.split(",");
  ids.forEach((id) => {
    const ind = getIndexOfId(id);
    if (ind === -1) {
      return;
    }
    database.splice(getIndexOfId(id), 1);
  });
  return res.status(200).json(database);
});

const getIndexOfId = (id) => {
  for (let i = 0; i < database.length; i++) {
    if (id === database[i].id) {
      return i;
    }
  }
  return -1;
};

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
