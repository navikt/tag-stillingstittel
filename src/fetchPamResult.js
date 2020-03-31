const {Client} = require('@elastic/elasticsearch');
const elNode = process.env.STILLINGESBACKEND_URL ? process.env.STILLINGESBACKEND_URL : 'http://localhost:9200';
const client = new Client({ node: elNode });
module.exports = async function(query) {
  const result = await client.search({
    index: 'ontologi-stillingstittel',
    body: {
      'query': {
        'match_phrase': {
          'navn_ngram_completion': {
            'query': query,
            'slop': '5',
          },
        },
      },
      'size': 25,
    },
  });
  return result.body;
};
