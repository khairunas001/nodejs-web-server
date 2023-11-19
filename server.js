const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
    // response.statusCode = 200;
 
    // rounting request
    const { method, url } = request;

    if(url === '/') {
        
        // TODO 2: logika respons bila url bernilai '/'
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }
    } else if(url === '/about') {
        
        // TODO 3: logika respons bila url bernilai '/about'
        if(method === 'GET') {
            response.statusCode = 200;
            // respons bila client menggunakan GET
            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
        } else if(method === 'POST') {
            // respons bila client menggunakan POST
            let body = [];
 
            request.on('data', (chunk) => {
              body.push(chunk);
            });
    
            request.on('end', () => {
              body = Buffer.concat(body).toString();
              const {name} = JSON.parse(body);
              response.statusCode = 200;
              response.end(JSON.stringify({
                message: `Halo, ${name}! Ini adalah halaman about`,
                }));
            });
            
        } else {
            response.statusCode = 400;
            // respons bila client tidak menggunakan GET ataupun POST
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method}, request`
            }));
        }
    } else {
        response.statusCode = 404;
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});