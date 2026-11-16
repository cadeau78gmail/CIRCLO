
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Our simple data storage
const file = "./data.json";

if (!fs.existsSync(file)) {
  fs.writeFileSync(
    file,
    JSON.stringify({
      listings: [],
      messages: []
    }, null, 2)
  );
}

// Read information from our data file
function readData() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Save information into our data file
function saveData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Test whether the backend is running
app.get("/", (req, res) => {
  res.send("CIRCLO backend is running!");
});

// Get all listings
app.get("/api/listings", (req, res) => {
  const data = readData();
  res.json(data.listings);
});

// Create a new listing
app.post("/api/listings", (req, res) => {
  const data = readData();

  const newListing = {
    id: Date.now(),
    ...req.body
  };

  data.listings.push(newListing);
  saveData(data);

  res.status(201).json(newListing);
});

// Get all messages
app.get("/api/messages", (req, res) => {
  const data = readData();
  res.json(data.messages);
});

// Send a message
app.post("/api/messages", (req, res) => {
  const data = readData();

  const newMessage = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  data.messages.push(newMessage);
  saveData(data);

  res.status(201).json(newMessage);
});

// Simple CIRCLO chatbot
app.post("/api/chat", (req, res) => {
  const question = String(req.body.question || "").toLowerCase();

  let answer = "I'm the CIRCLO assistant. I can help you understand selling, donating, exchanging and recycling items.";

  if (question.includes("donate")) {
    answer = "To donate an item, create a listing and choose the donation option. Other users can then discover your item.";
  } else if (question.includes("sell")) {
    answer = "To sell an item, create a listing, describe the item and provide its price and location.";
  } else if (question.includes("exchange") || question.includes("swap")) {
    answer = "To exchange an item, create a listing and choose the exchange option. You can then connect with someone interested in swapping.";
  } else if (question.includes("recycl")) {
    answer = "CIRCLO encourages responsible reuse and recycling. Explore available items and find ways to give materials another life.";
  } else if (question.includes("hello") || question.includes("hi")) {
    answer = "Hello! Welcome to CIRCLO. How can I help you give an item another life?";
  }

  res.json({ answer });
});

// Start the server
app.listen(PORT, () => {
  console.log(`CIRCLO backend running at http://localhost:${PORT}`);
});
