const https = require('https');

// Load from environment variable. Set AZURE_API_KEY in your shell.
const KEY = process.env.AZURE_API_KEY || 'YOUR_AZURE_API_KEY_HERE';
const MODELS = [
    'azure/genailab-maas-gpt-35-turbo',
    'azure/genailab-maas-gpt-4o',
    'azure/genailab-maas-gpt-4o-mini',
    'azure_ai/genailab-maas-DeepSeek-R1',
    'azure_ai/genailab-maas-Llama-3.3-70B-Instruct'
];

const ENDPOINTS = [
    'https://api.openai.com/v1/chat/completions',
    'https://models.inference.ai.azure.com/chat/completions',
    'https://genailab-maas.azure-api.net/v1/chat/completions',
    'https://genailab.com/v1/chat/completions',
    'http://localhost:4000/v1/chat/completions'
];

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
                if (res.statusCode === 200 || res.statusCode === 402 || res.statusCode === 429) {
                    resolve({ success: res.statusCode === 200, status: res.statusCode, body: data.substring(0, 100) });
                } else {
                    resolve({ success: false, status: res.statusCode, body: data.substring(0, 100) });
                }
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
    console.log("Starting model tests...");
    for (const endpoint of ENDPOINTS) {
        console.log(`\nTesting Endpoint: ${endpoint}`);
        for (const model of MODELS.slice(0, 2)) {
            console.log(` -> Model: ${model}`);
            const result = await testEndpoint(endpoint, model);
            console.log(`    Result:`, result);
        }
    }
})();
