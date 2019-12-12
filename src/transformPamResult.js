const logger = require('pino')();
module.exports = function(res) {
  if (res.hits && res.hits.hits && Array.isArray(res.hits.hits)) {
    const output = [];
    res.hits.hits.forEach(hit => {
      output.push({
        label: hit._source.label,
        styrk08: parseInt(hit._source.styrk08),
      });
    });
    return output;
  } else {
    logger.warn({
      msg: 'Cant parse data.',
    });
    return [];
  }
};
