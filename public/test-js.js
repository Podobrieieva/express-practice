const path = require('path');
const fs = require('fs')

const pathToHtml = path.join(__dirname, '../index.html');
const data = fs.readFileSync(pathToHtml, 'utf-8');

function filteredRegexp(tag) {
    return new RegExp(`</${tag}>`, 'g');
};

function calculateAmount(tag) {
    const regExp = filteredRegexp(tag);
    const findedTags = data.match(regExp) || [];

    return findedTags.length;
};

async function calculateTags() {
    const tags = [
        "title",
        "script",
        "head",
        "i",
        "div",
        "a",
        "iframe",
        "body",
        "html"
    ];

    const gatherData = tags.map(tag => ({
            tag,
            amount: calculateAmount(tag),
        }));

    return gatherData;
}

calculateTags().then(data => console.log(data))