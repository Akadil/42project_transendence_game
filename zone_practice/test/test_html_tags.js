import express from 'express';
import { createServer } from 'node:http';

const app = express();
// const server = createServer(app);

// Define a static route to serve static files, including your HTML file
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(new URL('./static/test_html_tags.html', import.meta.url).pathname)
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
