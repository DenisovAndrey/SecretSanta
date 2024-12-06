// File: app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PORT = 3000;

// Middleware setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
let participants = ["Andrey", "Maria", "Kirill", "Eva", "Tanya", "Alexey", "Arseniy", "Vasya"];
let assignments = {};
let alreadySelected = new Set();

// Disallowed assignments
const disallowedPairs = {
    "Eva": ["Kirill"],
    "Kirill": ["Eva"],
    "Andrey": ["Maria"],
    "Maria": ["Andrey"]
};

// Route: Home Page
app.get('/', (req, res) => {
    res.render('index', {
        participants,
        assignments,
        alreadySelected
    });
});

// Route: Add Participant
app.post('/add-participant', (req, res) => {
    const { name } = req.body;

    // Validate input: no duplicates, non-empty name
    if (!name || participants.includes(name.trim())) {
        return res.status(400).send('Invalid name or duplicate participant.');
    }

    participants.push(name.trim());
    console.log("Added new member:", name);
    res.redirect('/');
});

// Assign Secret Santa and render recipient reveal page
app.post('/assign', (req, res) => {
    const { participant } = req.body;

    if (alreadySelected.has(participant)) {
        return res.status(400).send('You have already selected a Secret Santa recipient.');
    }

    // First attempt: Exclude already selected and disallowed pairs
    let availableRecipients = participants.filter(
        (name) =>
            name !== participant && // Cannot assign themselves
            !Object.values(assignments).includes(name) && // Exclude already assigned
            !(disallowedPairs[participant]?.includes(name)) // Exclude disallowed pairs
    );

    // Fallback: If no valid recipients, allow previously assigned ones
    if (availableRecipients.length === 0) {
        availableRecipients = participants.filter(
            (name) =>
                name !== participant && // Cannot assign themselves
                !(disallowedPairs[participant]?.includes(name)) // Exclude disallowed pairs
        );
    }

    if (availableRecipients.length === 0) {
        return res.status(400).send('No valid recipients left.');
    }

    const recipient = availableRecipients[Math.floor(Math.random() * availableRecipients.length)];
    assignments[participant] = recipient;
    alreadySelected.add(participant);
    
    console.log(`Added new connection ${participant} -> ${recipient}`)

    res.render('reveal', { participant, recipient });
});

// Route: Reset Assignments
app.post('/reset', (req, res) => {
    assignments = {};
    alreadySelected = new Set();
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Secret Santa app running on port: ${PORT}`);
});
