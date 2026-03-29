const express = require("express");
const userRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const profileRouter = require("./routes/profile.routes");
const jobRouter = require("./routes/job.routes");
const applicantsRouter = require("./routes/applicants.routes");
const dashboardRouter = require("./routes/dashboard.routes");
const messageRouter = require("./routes/message.routes");

const app = express();

app.use(express.json());

// ----------------
// cors origin
// ----------------
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())


// ----------------
// user api
// -----------------
app.use("/api/user", userRouter);

// ----------------
// dashboard api
// -----------------
app.use("/api/dashboard", dashboardRouter);

// -----------------
// profile api
// ------------------
app.use("/api/user", profileRouter);

//--------------
// job api 
// --------------
app.use("/api/job", jobRouter);

// -----------------
// applicants api
// ------------------
app.use("/api/applicants", applicantsRouter);

// ----------------
// message api
// -----------------
app.use("/api/message", messageRouter)


module.exports = app;