import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// Conditional SSL setting based on the environment
const isProduction = process.env.NODE_ENV === "production";

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:POSTgresisthebest!@localhost:5432/world",
  ssl: isProduction
    ? { rejectUnauthorized: false }  // Enable SSL in production (Heroku)
    : false  // Disable SSL locally
});

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
db.connect(err => {
  if (err) {
    console.error("Failed to connect to the database", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

let quiz = [];

// Fetch data from the 'flags' table when the app starts
db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();  // Close the database connection after the query is done
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST an answer
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

// Function to select the next random question
async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
