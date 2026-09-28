const express = require("express");

const app = express();
const PORT = 3001;
const submissions = [];

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {

    const {
        name,
        email,
        age,
        role,
        password,
        message
    } = req.body;

    const errors = [];

    if (!name || name.trim().length < 3) {
        errors.push("Name must contain at least 3 characters.");
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    const userAge = Number(age);

    if (!age || isNaN(userAge) || userAge < 18 || userAge > 60) {
        errors.push("Age must be between 18 and 60.");
    }

    if (!role) {
        errors.push("Please select your role.");
    }

    if (!password || password.length < 6) {
        errors.push("Password must contain at least 6 characters.");
    }

    if (!message || message.trim().length < 10) {
        errors.push("Message must contain at least 10 characters.");
    }

    if (errors.length > 0) {
        return res.status(400).render("error", {
            errors
        });
    }

    const submission = {
        id: submissions.length + 1,
        name: name.trim(),
        email: email.trim(),
        age: userAge,
        role,
        message: message.trim(),
        submittedAt: new Date().toLocaleString()
    };

    submissions.push(submission);

    console.log("New submission:", submission);

    res.render("result", {
        submission
    });
});

app.get("/submissions", (req, res) => {
    res.json(submissions);
});

app.listen(PORT, () => {
    console.log(`🚀 Task 2 server running at http://localhost:${PORT}`);
});