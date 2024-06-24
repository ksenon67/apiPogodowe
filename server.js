const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

function handleRequest(req, res) {
    res.setHeader('Content-Type', 'text/html');

    switch (req.url) {
        case '/':
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Błąd wczytywania pliku index.html');
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
            break;
        case '/main.js':
            fs.readFile(path.join(__dirname, 'main.js'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Błąd wczytywania pliku main.js');
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
            break;
        case '/main.css':
            fs.readFile(path.join(__dirname, 'main.css'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Błąd wczytywania pliku main.css');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
            break;
        case '/localisation.json':
            fs.readFile(path.join(__dirname, 'localisation.json'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Błąd wczytywania pliku localisation.json');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(data);
                }
            });
            break;
        case '/saveLocation':
            if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    try {
                        const location = JSON.parse(body);
                        saveLocation(location, (err) => {
                            if (err) {
                                res.writeHead(500);
                                res.end('Błąd zapisu lokalizacji');
                            } else {
                                res.writeHead(200);
                                res.end('Lokalizacja została zapisana');
                            }
                        });
                    } catch (error) {
                        console.error(error);
                        res.writeHead(400);
                        res.end('Nieprawidłowe dane zapisu lokalizacji');
                    }
                });
            } else {
                res.writeHead(405);
                res.end('Metoda nieobsługiwana');
            }
            break;
        case '/deleteLocation':
            if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    try {
                        const { id } = JSON.parse(body);
                        deleteLocation(id, (err) => {
                            if (err) {
                                res.writeHead(500);
                                res.end('Błąd usuwania lokalizacji');
                            } else {
                                res.writeHead(200);
                                res.end('Lokalizacja została usunięta');
                            }
                        });
                    } catch (error) {
                        console.error(error);
                        res.writeHead(400);
                        res.end('Nieprawidłowe dane usunięcia lokalizacji');
                    }
                });
            } else {
                res.writeHead(405);
                res.end('Metoda nieobsługiwana');
            }
            break;
        default:
            res.writeHead(404);
            res.end('Strona nie znaleziona');
            break;
    }
}

function saveLocation(location, callback) {
    fs.readFile(path.join(__dirname, 'localisation.json'), (err, data) => {
        if (err) {
            callback(err);
        } else {
            let locations = JSON.parse(data);
            locations.push(location);
            fs.writeFile(path.join(__dirname, 'localisation.json'), JSON.stringify(locations), callback);
        }
    });
}

function deleteLocation(id, callback) {
    fs.readFile(path.join(__dirname, 'localisation.json'), (err, data) => {
        if (err) {
            callback(err);
        } else {
            let locations = JSON.parse(data);
            locations = locations.filter(location => location.id !== id);
            fs.writeFile(path.join(__dirname, 'localisation.json'), JSON.stringify(locations), callback);
        }
    });
}

const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});
