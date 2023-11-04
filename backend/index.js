const express = require("express");
const programRoutes = require("./routes/programs/programs");
const registerRoutes = require("./routes/register/register");
const clubUserRoutes = require("./routes/club_user/clubUser");
const transactionRoutes = require("./routes/transactions/transactions");
const bookingRoutes = require("./routes/bookings/bookings");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use("/programs", programRoutes);
app.use("/register", registerRoutes);
app.use("/clubuser", clubUserRoutes);
app.use("/transactions", transactionRoutes);
app.use("/bookings", bookingRoutes);

const port = 3000;
app.listen(port);
console.log(`API is running on port ${port}`);
