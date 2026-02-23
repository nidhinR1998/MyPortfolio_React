const https = require('https');

// Load from environment variable. Create a .env file or set OPENAI_API_KEY in your shell.
const KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';
const MODELS = [
    'gpt-3.5-turbo',
    'gpt-4o',
    'gpt-4o-mini',
    'o1-mini'
];

const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

async function testEndpoint(endpoint, model) {
    return new Promise((resolve) => {
        const urlObj = new URL(endpoint);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${KEY}`
            },
            timeout: 5000 // 5 seconds
        };

        const req = (urlObj.protocol === 'https:' ? https : require('http')).request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({ success: res.statusCode === 200, status: res.statusCode, body: data.substring(0, 500) });
            });
        });

        req.on('error', (e) => resolve({ success: false, error: e.message }));
        req.on('timeout', () => { req.destroy(); resolve({ success: false, error: 'timeout' }); });

        req.write(JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: 'Say hello!' }],
            max_tokens: 10
        }));
        req.end();
    });
}

(async () => {
    console.log("Starting OpenAI model tests...");
    console.log(`\nTesting Endpoint: ${ENDPOINT}`);
    for (const model of MODELS) {
        console.log(` -> Model: ${model}`);
        const result = await testEndpoint(ENDPOINT, model);
        console.log(`    Result:`, result);
        if (result.success) {
            console.log(`\n\n[SUCCESS] Model '${model}' works! We will use this one.`);
            break;
        }
    }
})();
