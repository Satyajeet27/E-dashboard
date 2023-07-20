const express = require("express");
const cors = require("cors");
const dbConnect = require("./database/dbConnect");
const USER = require("./model/User");
const PRODUCT = require("./model/Product");
const JWT = require("jsonwebtoken");
const verifyToken = require("./auth");
const SECRET_KEY = "thisisSecretKey";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const data = await USER.find({});
  res.send({ message: "live from server", data });
});

app.route("/register").post(async (req, res) => {
  const result = await USER.create(req.body);
  const user = {
    name: result.name,
    email: result.email,
  };
  JWT.sign({ user }, SECRET_KEY, { expiresIn: "2h" }, (error, token) => {
    return res.send({ user, token });
  });
});

app.route("/login").post(async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    if (email && password) {
      const data = await USER.findOne({ email, password }).select("-password");
      if (!data) return res.send({ error: "user or password is incorrect" });
      JWT.sign({ data }, SECRET_KEY, { expiresIn: "2h" }, (error, token) => {
        return res.send({ data, token });
      });
      // console.log(token);
    }
    return;
  } catch (error) {
    console.log(error);
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    const result = await PRODUCT.create(data);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products", verifyToken, async (req, res) => {
  const data = await PRODUCT.find({});
  if (!data) return res.send({ message: "No product found" });
  return res.send(data);
});

app.delete("/product/:_id", verifyToken, async (req, res) => {
  const { _id } = req.params;
  const result = await PRODUCT.deleteOne({ _id });
  return res.send(result);
});

app
  .route("/update/:_id")
  .get(verifyToken, async (req, res) => {
    const { _id } = req.params;
    const result = await PRODUCT.findById({ _id });
    if (result) {
      return res.send(result);
    } else {
      return res.send({ message: "Data not found" });
    }
  })
  .put(verifyToken, async (req, res) => {
    const { _id } = req.params;
    // const data = await PRODUCT.findById({ _id });
    const result = await PRODUCT.updateOne({ _id }, { $set: req.body });
    // console.log(data);
    if (result) {
      return res.send(result);
    } else {
      return res.send({ message: "Data not found" });
    }
  });

app.route("/search/:key").get(verifyToken, async (req, res) => {
  const result = await PRODUCT.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(3000, () => {
      console.log("server is running on port: 3000");
    });
  } catch (error) {}
};
startServer();
