const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
app.use(bodyParser.json());
 
// VERIFY TOKEN (for GET request)
app.get("/webhook", (req, res) => {
  const verify_token = "usama";
 
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
 
  if (mode && token && mode === "subscribe" && token === verify_token) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});
 
// HANDLE INCOMING WHATSAPP MESSAGES (POST request)
app.post("/webhook", (req, res) => {
  console.log("Incoming:", JSON.stringify(req.body, null, 2));
 
  // Important: Facebook requires 200 response
  res.sendStatus(200);
 
  // Extract user message
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
 
    if (message && message.type === "text") {
      console.log("User replied:", message.text.body);
    }
  } catch (err) {
    console.log("Error:", err);
  }
});
 
app.listen(3000, () => console.log("Webhook running on port 3000"));
