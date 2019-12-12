const fastify = require('fastify')({logger: false});
const vars = require('./template-vars.json');

fastify.get('/',async (req, rep) => rep.redirect(vars.path_prefix));
fastify.get(vars.path_prefix, require('./routes/index'));
fastify.get(vars.path_prefix + '/search', require('./routes/search'));
fastify.get(vars.liveness_path, async () => ({is: 'alive'}));
fastify.get(vars.readiness_path, async () => ({is: 'ready'}));

module.exports = async (port) => {
  try {
    await fastify.listen(port, '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  return fastify;
};
