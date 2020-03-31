const https = require('https');
const fs = require('fs');
const baseUrl = 'https://arbeidsgiver.nav.no/stillingstitler/search?q=';
const targetPath = 'stillingstitler-mock.json';

function genCharArray(charA, charZ) {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

const fetchUrl = async function(url) {
    return new Promise(function(resolve, reject) {
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const fetchMockData = async () => {
    const chars = genCharArray('a', 'z');
    const requests = [];
    chars.forEach(c => {
        requests.push(fetchUrl(baseUrl + c));
    });
    const res = await Promise.all(requests);
    const all = [];
    const unique = {};
    res.forEach(a => a.forEach(b => {
        if (!unique[b.konseptId]) {
            unique[b.konseptId] = all.push(b);
        }
    }));
    return all;
};
const generateMock = async () => {
    const mockdata = await fetchMockData();
    fs.writeFileSync(targetPath, JSON.stringify(mockdata));
};

generateMock()
