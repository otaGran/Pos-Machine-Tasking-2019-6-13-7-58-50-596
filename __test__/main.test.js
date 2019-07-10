const getItemInfo = require('../main').getItemInfo
const isBarcodeValid = require('../main').isBarcodeValid
const isAllBracodeValid = require('../main').isAllBracodeValid
const getItemTotalPrice = require('../main').getItemTotalPrice
const getTotalPrice = require('../main').getTotalPrice
const generateReceiptData = require('../main').generateReceiptData
const renderReceipt = require('../main').renderReceipt
const printReceipt = require('../main').printReceipt
it('should return true when startNumber is smaller than endNumber', ()=>{
    expect(getItemInfo('0001')).toStrictEqual( {"id": "0001", "name": "Coca Cola", "price": 3});
})

//isBarcodeValid
it('should return false when barcode is 0011', ()=>{
    expect(isBarcodeValid('0011')).toBe( false);
})
it('should return true when barcode is 0001', ()=>{
    expect(isBarcodeValid('0001')).toBe( true);
})

//isAllBracodeValid
it('should return false when barcode is [0011,0001]', ()=>{
    expect(isAllBracodeValid(['0011','0001'])).toBe( false);
})
it('should return true when barcode is [0011,0001]', ()=>{
    expect(isAllBracodeValid(['0001','0003'])).toBe( true);
})

//getItemTotalPrice
it('should return false when barcode is [0011,0001]', ()=>{
    expect(getItemTotalPrice({"name":"test","price":5,"count":2})).toBe( 10);
})

//getTotalPrice
it('should return false when barcode is [0011,0001]', ()=>{
    expect(getTotalPrice([{"name":"test","price":5,"count":2},{"name":"test2","price":10,"count":3}])).toBe(40);
})

//generateReceiptData
it('should return false when barcode is [0011,0001]', ()=>{
    expect(generateReceiptData(['0001','0003','0003'])).toStrictEqual({
        "allReceiptItem":[{"name":"Coca Cola","price":3,"count":1},{"name":"Pepsi-Cola","price":5,"count":2}],
    "totalPrice": 13
    });
})
//renderReceipt
it('should return false when barcode is [0011,0001]', ()=>{
    expect(renderReceipt({
        "allReceiptItem":[{"name":"Coca Cola","price":3,"count":1},{"name":"Pepsi-Cola","price":5,"count":2}],
        "totalPrice": 13
    })).toBe(`Receipts
    ------------------------------------------------------------
    Coca Cola                       3          1
    Pepsi-Cola                       5          2
    ------------------------------------------------------------
    Price: 13`);
})

//printReceipt

it('should return false when barcode is [0011,0001]', ()=>{
    expect(printReceipt(['0001', '0003', '0005', '0003'])).toBe(`Receipts
    ------------------------------------------------------------
    Coca Cola                       3          1
    Pepsi-Cola                       5          2
    Dr Pepper                       7          1
    ------------------------------------------------------------
    Price: 20`);
})