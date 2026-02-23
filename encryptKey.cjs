// Key Encryption Utility
// Run with: node encryptKey.cjs
// This generates Base64-encoded encrypted blobs from plain API keys.
// The seed/password is HARDCODED in the decryption logic — change it here
// and in the corresponding decrypt calls in your source files.

const SEED = 'NidhinPF2024'; // Change this to any string you want

function encrypt(text, seed) {
    const key = seed.split('').map(c => c.charCodeAt(0));
    return Buffer.from(
        text.split('').map((c, i) =>
            String.fromCharCode(c.charCodeAt(0) ^ key[i % key.length])
        ).join('')
    ).toString('base64');
}

const keys = {
    GEMINI: process.env.GEMINI_KEY || 'paste_your_gemini_key_here',
    OPENAI: process.env.OPENAI_KEY || 'paste_your_openai_key_here',
    AZURE: process.env.AZURE_KEY || 'paste_your_azure_key_here',
};

console.log('\n==== ENCRYPTED KEYS ====\n');
for (const [name, key] of Object.entries(keys)) {
    if (!key.includes('paste_')) {
        console.log(`${name}: '${encrypt(key, SEED)}'`);
    } else {
        console.log(`${name}: (not set — pass via env variable)`);
    }
}
console.log('\n========================\n');
console.log('Copy the Base64 values into your source files.\n');
