const server = require('./src/server');
const vars = require('./template-vars.json');
server(process.env.PORT || vars.port);
