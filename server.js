const express = require('express');
const path = require('path');
const app = express();
const port = 8080; // Running on port 8080

// Serve static files (CSS, JS, images) from the root
app.use(express.static(path.join(__dirname, '/')));  // Serve static files from the root directory

// Serve static files (images, CSS, JS) from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to serve static files (if you have any static files like HTML, CSS, JS)
app.use(express.static('public'));

// Route to handle the root URL
app.get('/', (req, res) => {
    res.redirect('/landing_page');
});

// You can add more routes as needed
app.get('/app', (req, res) => {
    res.render('landing_page');
});

app.get('/app/', (req, res) => {
    res.render('landing_page');
});

app.get('/landing_page', (req, res) => {
    res.render('landing_page');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Other pages (you can add more routes as needed)
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/web-design', (req, res) => {
    res.render('web_design');
});

app.get('/development', (req, res) => {
    res.render('development');
});

app.get('/seo', (req, res) => {
    res.render('seo');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server on port 8080
app.listen(port, () => {
    console.log(`Node.js app is listening on port ${port}`);
});
