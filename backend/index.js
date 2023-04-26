const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');

// Middleware
app.use(express.json())

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});