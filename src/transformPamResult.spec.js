const {describe, it} = require('mocha');
const assert = require('assert');
const transformPamResult = require('./transformPamResult');
const pamResult = require('../examples/pam-result');
describe('transform-pam-result', function() {
  it('transform-pam-result', function() {
    const transformedResult = transformPamResult(pamResult);
    assert.strictEqual(Array.isArray(transformedResult), true);
    assert.strictEqual(transformedResult.length > 2, true);
    assert.strictEqual(typeof transformedResult[0],'object');
  });
});
