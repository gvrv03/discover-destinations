const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
const port = 8080;
app.use(express.json());
app.listen(port, () => console.log(`Server Started on port ${port}...`));

const initDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(
      "mongodb+srv://amisha:amisha@cluster0.zaufrqj.mongodb.net/ContactForm"
    );
    console.log(`mongoDB connection `);
  } catch (err) {
    console.log(`No connection : ` + err);
  }
};
initDB();

const contactSchema = {
  name: String,
  email: String,
  sub: String,
  msg: String,
};
const Contact = mongoose.model("Contact", contactSchema);
app.set("view engine", "ejs");

//Contact form
app.post("/contact", async (req, res) => {
  const { name, email, sub, msg } = req.body;
  try {
    if (!email || !name || !sub || !msg) {
      throw new Error("Please fill all the fields!");
    }

    const addContacts = await Contact.create({
      name,
      email,
      sub,
      msg,
    });

    return res.json({
      isSuccess: true,
      data: addContacts,
    });
  } catch (error) {
    return res.json({
      isSuccess: false,
      error: error.message,
    });
  }
});

// Register Form

const registerSchema = {
  firstName: String,
  lastName: String,
  gender: String,
  email: String,
  password: String,
  number: String,
};
const Register = mongoose.model("Register", registerSchema);

app.post("/register", async (req, res) => {
  const { firstName, lastName, gender, email, password, number } = req.body;
  try {
    if (!firstName || !lastName || !gender || !email || !password || !number) {
      throw new Error("Please fill all the fields!");
    }

    const addRegister = await Register.create({
      firstName,
      lastName,
      gender,
      email,
      password,
      number,
    });

    return res.json({
      isSuccess: true,
      data: addRegister,
    });
  } catch (error) {
    return res.json({
      isSuccess: false,
      error: error.message,
    });
  }
});
