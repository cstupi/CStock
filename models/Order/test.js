const assert = require('assert');
const Order = require('./index');
function CreateOrder(){
    return new Order('abc-123', 'MSFT', 'MARKET', 'BUY', 10);
}
describe('Order input validation', async () => {
    describe('All values', async () => {
        it('Should contain all values', async () => {
            let o = CreateOrder();
            assert.strictEqual(o.Owner, 'abc-123');
            assert.strictEqual(o.Identifier, 'MSFT');
            assert.strictEqual(o.OrderType, 'MARKET');
            assert.strictEqual(o.TransactionType, 'BUY');
            assert.strictEqual(o.Quantity, 10);
        });
    });
    describe('Valid inputs', async () => {
        it('Should reject bad status', async (done) => {
            let o = CreateOrder();
            try {
                o.Status = 'TEST';
                throw 'Bad status allowed';
            } catch(err){
                if(err == 'Status must be one of: COMPLETE,CANCELED,PENDING')
                    return done();
                else 
                    done(err);
            }
        });
        it('Should reject bad transaction type', async (done) => {
            let o = CreateOrder();
            try {
                o.TransactionType = 'TEST';
                throw 'Bad transaction type allowed';
            } catch(err){
                if(err == 'Transaction Type must be one of: BUY,SELL,BUYSHORT,SELLSHORT')
                    return done();
                else 
                    done(err);
            }
        });
        it('Should reject bad order type', async (done) => {
            let o = CreateOrder();
            try {
                o.OrderType = 'TEST';
                throw 'Bad order type allowed';
            } catch(err){
                if(err == 'Order Type must be one of: MARKET,LIMIT,STOP')
                    return done();
                else 
                    done(err);
            }
        });
    });
});