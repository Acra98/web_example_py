const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const port = 8080; // Running on port 8080
const DB_connection = require('./DB_connection.js'); // Import your database connection module

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


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

// Route to render the registration page
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // Validate inputs
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Check if user already exists
        const existingUser = await DB_connection.findUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'Username already taken' });
        }
        
        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save user to database
        await DB_connection.registerUser(username, hashedPassword, email);
        
        // Redirect to landing page with success parameter
        res.redirect('/landing_page?success=true');

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed', message: error.message });
    }
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
