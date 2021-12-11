import http from 'http';
import app from './';
import { PORT } from './utils/constants';

const portNumber = PORT || 3001;

app.set('port', portNumber);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(portNumber);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 * @param {object} error
 */
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof portNumber === 'string' ? 'Pipe ' + portNumber : 'Port ' + portNumber;
    console.error(bind, 'error:', error);

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            // eslint-disable-next-line no-undef
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            // eslint-disable-next-line no-undef
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : addr ? 'port ' + addr.port : 'port ' + portNumber;
    console.log('Listening on ', bind);
}
