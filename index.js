const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Fix dirname to __dirname
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Fix dirname to __dirname

let posts = [
    {
        id: uuidv4(),
        username: "Apna College",
        content: "I love coding!"
    },
    { 
        id: uuidv4(),
        username: "Delta Course",
        content: "I love Development!"
    },
    {
        id: uuidv4(),
        username: "Sigma Course",
        content: "I love coding in both DSA & web development!"
    }
];

// Show all posts
app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

// Form to create a new post
app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
});

// Create a new post
app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect('/posts');
});

// Show a single post by ID
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => id === p.id);
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});
// Update a post by ID
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find(p => p.id === id);
    if (post) {
        post.content = newContent;
        console.log(post.content);  // Confirm content is being updated
        res.redirect('/posts');    // Redirect to the posts list or the updated post page
    } else {
        res.status(404).send("Post not found");
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); // Corrected string interpolation
});