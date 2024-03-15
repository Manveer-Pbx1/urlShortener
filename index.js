const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require("./connect");
const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth.middleware');
const URL = require("./models/url.model");
const userRoute = require("./routes/user.route");
const staticRoute = require("./routes/staticRouter.route");
const urlRoute = require("./routes/url.route");
const app = express();
const PORT = 3000;


// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/shorten-url").then(() =>
  console.log("MongoDB connected!")
);

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware order matters!

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute); //here the order matters for the middleware! restrict should run first and then proceed to the next middleware
app.use("/", checkAuth, staticRoute); // this is the default route for the app and should be at the end of all routes
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId,
     },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

//   if (!entry) {
//     return res.status(404).send("URL not found");
//   }

  res.redirect(entry.redirectURL);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
