const assert = require('assert');
const Asset = require('./index');

describe('Asset input validation', async () => {
  describe('All values', async () => {
    it('Should contain all values', async () => {
        let a = new Asset('MSFT', 10, 58.10, 'abc-123', 'game-1');
        assert.strictEqual(a.Identifier, 'MSFT');
        assert.strictEqual(a.Quantity, 10);
        assert.strictEqual(a.Price, 58.10);
        assert.strictEqual(a.Owner, 'abc-123');
    });
  });
});