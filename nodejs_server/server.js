const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Node.js API
app.get('/api/node', (req, res) => {
    res.json({ message: "Hello from Node.js server!" });
});

// Proxy to Python server
app.get('/api/proxy', async (req, res) => {
    try {
        const pythonResponse = await axios.get('http://python-server:5000/api/game');
        res.json({ nodeMessage: "Hello from Node.js!", pythonMessage: pythonResponse.data });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(3000, () => {
    console.log('Node.js server running on port 3000');
});
