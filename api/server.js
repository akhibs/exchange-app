const app = require("./app");
const mongoose = require("mongoose");

const databaseServer =
  process.env.MODE === "development"
    ? "mongodb://localhost:27017/sixteen"
    : "mongodb+srv://akhibs:08164637953@cluster0.sty0yk2.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(databaseServer).then(() => {
  console.log("DATABASE connected");
});

//=====================================================
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
