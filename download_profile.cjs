const fs = require('fs');
const https = require('https');

const fileUrl = 'https://drive.google.com/uc?export=download&id=1pLuS2Xc5_d8DFmfsYj4aJ-RJALHJ8EA5';
const dest = './public/assets/about-pic.png';

https.get(fileUrl, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
            const fileStream = fs.createWriteStream(dest);
            redirectRes.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log('Download completed');
            });
        });
    } else {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            console.log('Download completed directly');
        });
    }
}).on('error', (err) => {
    console.error('Error downloading:', err.message);
});
