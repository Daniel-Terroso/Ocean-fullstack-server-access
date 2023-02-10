const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// const DB_URL = "mongodb+srv://admin:C4dqiihlUXHYT7cc@cluster0.03neohq.mongodb.net";
const DB_URL = "mongodb+srv://admin:8Nu02Zu4AETbS5hi@cluster0.xxtkbxr.mongodb.net";
const DB_NAME = "backdata-svtd";

async function main() {

console.log("Conectando com o banco de dados...");
const client = await MongoClient.connect(DB_URL);
const db = client.db(DB_NAME);
const collection = db.collection("itens");
console.log("Banco de dados conectado com sucesso");

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Não está");
});
app.get("/oi", function (req, res) {
  res.send("Está");
});

const itens = ["Sonic", "Tales", "Knuckles"];

app.get("/item",  async function (req, res) {
  const documentos = await collection.find().toArray();
  res.send(documentos);
});

// Endpoint read single by ID -> [GET] /item/:id
app.get("/item/:id", async function(req, res) {
  const id = req.params.id;
  const item = await collection.findOne({ _id: new ObjectId(id) });
  res.send(item);
});

// Endpoint create -> [POST] /  item
app.post("/item", function (req, res) {
  // console.log(req.body);
  const item = req.body;
  collection.insertOne(item);
  res.send(item);
});

app.put("/item/:id", async function(req, res) {
const id = req.params.id;
const body = req.body;
await collection.updateOne({
  _id: new ObjectId(id)
}, {$set: body}
);
console.log(id, body);

res.send(body);
});
app.listen(3000);
}
main();
