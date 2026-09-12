const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

const inputPath = 'C:/Users/anura/.gemini/antigravity/scratch/gopal-bakery/assets/community-biscuits-plate.png';
const outputPath = 'C:/Users/anura/.gemini/antigravity/scratch/gopal-bakery/assets/community-biscuits-plate-clean.png';

fs.createReadStream(inputPath)
    .pipe(new PNG({ filterType: 4 }))
    .on('parsed', function() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                let r = this.data[idx];
                let g = this.data[idx + 1];
                let b = this.data[idx + 2];
                if (r < 32 && g < 32 && b < 32) {
                    this.data[idx + 3] = 0; // alpha = 0 (transparent)
                }
            }
        }
        this.pack().pipe(fs.createWriteStream(outputPath))
            .on('finish', () => console.log('Successfully processed transparency!'));
    });
