//importer le package HTTP pour créer un serveur
const http = require('http');
const app = require('./app');

//normalizePort renvoie un port valide(numéro/chaîne)
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
    //si la plateforme propose un port par défaut, elle sera en écoute sur la variable process.env.PORT
    // sinon elle prend le port 3000 par défault
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  
  //errorHandler gère les erreurs, ensuite enregistrée dans le serveur.
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  const server = http.createServer(app);
  //écouteur d'évènements consigne le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  
  server.listen(port);