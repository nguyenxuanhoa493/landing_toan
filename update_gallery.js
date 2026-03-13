const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'assets', 'gallery');
const dataJsonPath = path.join(__dirname, 'data.json');

function getGroupedFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    const groups = {};

    files.forEach(function(folderName) {
        const folderPath = path.join(dirPath, folderName);
        if (fs.statSync(folderPath).isDirectory()) {
            const innerFiles = fs.readdirSync(folderPath);
            const list_image = [];
            
            innerFiles.forEach(file => {
                if (file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
                    let relPath = path.join('assets/gallery', folderName, file);
                    relPath = relPath.replace(/\\/g, '/');
                    list_image.push(relPath);
                }
            });
            
            if (list_image.length > 0) {
                groups[folderName] = {
                    name: folderName,
                    list_image: list_image
                };
            }
        }
    });

    return Object.values(groups);
}

const allCategories = getGroupedFiles(galleryDir);
const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
data.gallery.categories = allCategories;
fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2));
console.log(`Updated data.json with ${allCategories.length} categories.`);
