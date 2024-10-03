// Create web server
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Load comments from file
const fs = require('fs');
const comments = JSON.parse(fs.readFileSync('comments.json'));

// Add static files
app.use(express.static(path.join(__dirname, 'public')));

// Add middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add route for getting comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Add route for posting comments
app.post('/comments', (req, res) => {
    comments.push(req.body);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json({ message: 'Comment added' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});