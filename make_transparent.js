const fs = require('fs');
const jpeg = require('jpeg-js');
const PNG = require('pngjs').PNG;

const inputPath = 'C:/Users/anura/.gemini/antigravity/scratch/gopal-bakery/assets/community-biscuits-plate.png';
const outputPath = 'C:/Users/anura/.gemini/antigravity/scratch/gopal-bakery/assets/community-biscuits-plate-clean.png';

const jpegData = fs.readFileSync(inputPath);
const rawImageData = jpeg.decode(jpegData, { useTArray: true });

const png = new PNG({
    width: rawImageData.width,
    height: rawImageData.height
});

for (let y = 0; y < rawImageData.height; y++) {
    for (let x = 0; x < rawImageData.width; x++) {
        let idx = (rawImageData.width * y + x) * 4;
        let r = rawImageData.data[idx];
        let g = rawImageData.data[idx + 1];
        let b = rawImageData.data[idx + 2];
        
        png.data[idx] = r;
        png.data[idx + 1] = g;
        png.data[idx + 2] = b;

        if (r < 32 && g < 32 && b < 32) {
            png.data[idx + 3] = 0; // transparent
        } else {
            png.data[idx + 3] = 255; // opaque
        }
    }
}

png.pack().pipe(fs.createWriteStream(outputPath))
    .on('finish', () => console.log('Successfully created clean transparent PNG!'));
