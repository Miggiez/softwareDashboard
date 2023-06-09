const express = require("express");
const app = express();
const port = 5000;
const user = require("./routes/user")
const sof = require("./routes/salesOffice")
const operate = require('./routes/operation')
const cors = require('cors')
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors())
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/user", user)
app.use("/salesoffice", sof)
app.use("/operation", operate)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});