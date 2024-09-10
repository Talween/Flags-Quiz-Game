# Flags-Quiz-Game
This is a simple quiz game built using Node.js, Express, PostgreSQL, and EJS templating. The application displays a random country flag, and the player has to guess the correct country name. The score is kept based on correct answers.

**Installation**

Install dependencies:
npm install

Set up PostgreSQL database:
- Create a PostgreSQL database named world.
- Import the flags.csv data into a table called flags.
- Configure the database connection in the index.js file if needed.

Run the application:

node index.js

**Usage**

- After running the app, go to http://localhost:3000 to play the quiz.
- You will be shown a random country flag, and you need to type in the name of the country.
- Each correct answer will increase your score.

**Dependencies**

This project uses the following libraries:

Express - Web framework for Node.js
Body-Parser - Middleware to parse request bodies
pg - PostgreSQL client for Node.js
EJS - Embedded JavaScript templating engine

You can view the full list of dependencies in the package.json file.
