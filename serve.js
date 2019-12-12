const server = require('./src/server');
const vars = require('./src/template-vars.json');
server(process.env.PORT || vars.port);
