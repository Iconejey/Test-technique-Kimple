import express from 'express';
const app = express();
const port = 8020;

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

// Start the server
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
