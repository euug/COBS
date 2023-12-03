const express = require("express");
const cors = require("cors");
const prisma = require("./prisma/db.js");
const programRoutes = require("./routes/programs/programs");
const registerRoutes = require("./routes/register/register");
const clubUserRoutes = require("./routes/club_user/clubUser");
const transactionRoutes = require("./routes/transactions/transactions");
const bookingRoutes = require("./routes/bookings/bookings");

const app = express();

//Allowing the frontend to access the backend.
app.use(cors());

app.use(express.static(__dirname + "/dist"));

app.use(express.json());
app.use("/programs", programRoutes);
app.use("/register", registerRoutes);
app.use("/clubuser", clubUserRoutes);
app.use("/transactions", transactionRoutes);
app.use("/bookings", bookingRoutes);

app.delete("/reset", async (req, res) => {
  console.log("inside reset method");

  try {
    await prisma.booking.deleteMany({});
    await prisma.transaction.deleteMany({});

    return res.status(200).send({
      success: true,
      message: "Successfully reset",
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Unable to reset: " + e,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`API is running on port ${port}`);
