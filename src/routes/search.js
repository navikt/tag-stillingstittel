const fetchPamResult = require('../fetchPamResult');
const transformPamResult = require('../transformPamResult');
module.exports = async function(req, reply) {
  const pamResult = await fetchPamResult(req.query["q"]);
  const payload = await transformPamResult(pamResult);
  reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(payload);
};
