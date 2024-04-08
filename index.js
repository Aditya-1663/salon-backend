const connectTomongo = require("./db");
const express = require("express");
connectTomongo();
var cors = require("cors");
var app = express();
app.use(cors());

const port =process.env.PORT|| 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/availability", require("./routes/availability"));
app.use("/api/available-slots", require("./routes/availability"));
app.use("/api/booking", require("./routes/bookiing"));

app.get("/", (req, res) => {
  res.send("hello ");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
