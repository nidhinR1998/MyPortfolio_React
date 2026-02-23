const https = require('https');

// Load from environment variable. Create a .env file or set VITE_GEMINI_API_KEY in your shell.
const API_KEY = process.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
const MODEL = 'gemini-1.5-flash-latest';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function testGemini() {
    return new Promise((resolve) => {
        const urlObj = new URL(ENDPOINT);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000 // 5 seconds
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({ success: res.statusCode === 200, status: res.statusCode, body: data });
            });
        });

        req.on('error', (e) => resolve({ success: false, error: e.message }));
        req.on('timeout', () => { req.destroy(); resolve({ success: false, error: 'timeout' }); });

        // Gemini REST API Payload Structure
        const payload = JSON.stringify({
            contents: [{
                parts: [{
                    text: "Hello! Please reply with exactly: 'Gemini is active!'"
                }]
            }]
        });

        req.write(payload);
        req.end();
    });
}

(async () => {
    console.log("Starting Google Gemini model test...");
    console.log(` -> Model: ${MODEL}`);
    const result = await testGemini();

    if (result.success) {
        try {
            const parsed = JSON.parse(result.body);
            console.log(`\n\n[SUCCESS] Key works! Gemini replied:`);
            console.log(parsed.candidates[0].content.parts[0].text);
        } catch (e) {
            console.log("Failed to parse response body", result.body);
        }
    } else {
        console.log(`\n\n[ERROR] Request failed with status code: ${result.status}`);
        console.log(result.body);
    }
})();
