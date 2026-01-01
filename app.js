require('dotenv').config();
const express = require('express');
const os = require('os');
const app = express();

// CRITICAL: Hostinger needs to inject the port
const PORT = process.env.PORT || 3000;

// Simple API for the Bitcoin price
app.get('/api/crypto', async (req, res) => {
    try {
        const response = await fetch('https://api.coinlore.net/api/ticker/?id=90');
        const data = await response.json();
        res.json({ price: data[0].price_usd });
    } catch (err) {
        res.json({ price: "Error" });
    }
});

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Node.js Pro V2</title>
        <style>
            body { font-family: sans-serif; background: #0f172a; color: white; text-align: center; padding-top: 50px; }
            .box { background: #1e293b; display: inline-block; padding: 2rem; border-radius: 15px; border: 1px solid #334155; min-width: 300px; }
            h1 { color: #38bdf8; }
            .btn { background: #38bdf8; color: #0f172a; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 15px; }
            .status { color: #10b981; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="box">
            <h1>Node.js is Live 🚀</h1>
            <p>Status: <span class="status">Online</span></p>
            <p>Env: <strong>${process.env.NODE_ENV || 'standard'}</strong></p>
            <p>Msg: ${process.env.MY_MESSAGE || 'Ready'}</p>
            <hr style="border-color:#334155">
            <div id="crypto">Loading Bitcoin...</div>
            <button class="btn" onclick="getBTC()">Update Price</button>
        </div>

        <script>
            async function getBTC() {
                const el = document.getElementById('crypto');
                el.innerText = 'Updating...';
                const res = await fetch('/api/crypto');
                const data = await res.json();
                el.innerText = 'Bitcoin: $' + data.price;
            }
            getBTC();
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Application started on port ${PORT}`);
});