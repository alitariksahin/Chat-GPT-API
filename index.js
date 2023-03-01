const express = require("express");
const app = express();
const chat = require("./controllers/chat");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/", (req,res) => {
    res.status(200).json({msg: "ChatGPT API is ready to use"});
});

app.post("/", async (req, res, next) => {
  try {
    const input = req.body.input;
    const output = await chat(input);
    res.status(200).json({output: output});
  }catch(err) {
    res.status(500).json({msg: "Something is wrong with ChatGPT, please try again later."})
  }
    
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});






