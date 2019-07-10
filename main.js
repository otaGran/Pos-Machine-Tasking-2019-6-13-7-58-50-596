const printReceipt = barcodes => {
    if (isAllBracodeValid(barcodes)) {
        return renderReceipt(generateReceiptData(barcodes));
    } else {
        return "[ERROR]:";
    }
}
const isAllBracodeValid = barcodes => {
    for (let i = 0; i < barcodes.length; i++) {
        if (isBarcodeValid(barcodes[i]) === false)
            return false;
    }
    return true;
}
const isBarcodeValid = barcode => {
    const database = getAllItemInfo();
    for (let i = 0; i < database.length; i++) {
        if (barcode === database[i].id)
            return true;
    }
    return false;
}

const getAllItemInfo = () => {
    return [
        {"id": "0001", "name": "Coca Cola", "price": 3},
        {"id": "0002", "name": "Diet Coke", "price": 4},
        {"id": "0003", "name": "Pepsi-Cola", "price": 5},
        {"id": "0004", "name": "Mountain Dew", "price": 6},
        {"id": "0005", "name": "Dr Pepper", "price": 7},
        {"id": "0006", "name": "Sprite", "price": 8},
        {"id": "0007", "name": "Diet Pepsi", "price": 9},
        {"id": "0008", "name": "Diet Mountain Dew", "price": 10},
        {"id": "0009", "name": "Diet Dr Pepper", "price": 11},
        {"id": "0010", "name": "Fanta", "price": 12}
    ];

}


const generateReceiptData = barcodes => {

    const map = {};
    const allReceiptItem = [];

    for (let i = 0; i < barcodes.length; i++) {
        if (!map[barcodes[i]]) {
            map[barcodes[i]] = 1;
        } else {
            map[barcodes[i]]++;
        }
    }
    barcodes = [...new Set(barcodes)];


    for (let i = 0; i < barcodes.length; i++) {
        const tmpItem = getItemInfo(barcodes[i]);
        allReceiptItem.push({"name": tmpItem.name, "price": tmpItem.price, "count": map[barcodes[i]]});
    }
    return {"allReceiptItem": allReceiptItem, "totalPrice": getTotalPrice(allReceiptItem)};


}

const getItemInfo = barcode => {
    const database = getAllItemInfo();
    for (let i = 0; i < database.length; i++) {
        if (barcode === database[i].id)
            return database[i];
    }


}

const getTotalPrice = allReceiptItem => {
    let totalPrice = 0;
    for (let i = 0; i < allReceiptItem.length; i++) {
        totalPrice += getItemTotalPrice(allReceiptItem[i]);
    }
    return totalPrice;
}
const getItemTotalPrice = ReceiptItem => {
    return ReceiptItem.count * ReceiptItem.price;
}


const renderReceiptHeader = () => {
    return `Receipts
    ------------------------------------------------------------
    `

}
const renderTotalPrice = totalPrice => {
    return `------------------------------------------------------------
    Price: ${totalPrice}`

}

const renderItem = ReceiptItem => {
    return `${ReceiptItem.name}                       ${ReceiptItem.price}          ${ReceiptItem.count}
    `

}

const renderAllItem = allReceiptItem => {
    let receipItem = '';
    for (let i = 0; i < allReceiptItem.length; i++) {
        receipItem += renderItem(allReceiptItem[i]);
    }
    return receipItem;

}


const renderReceipt = allReceiptData => {
    return renderReceiptHeader() + renderAllItem(allReceiptData.allReceiptItem) + renderTotalPrice(allReceiptData.totalPrice);

}


// module.exports = {
//     isSmallerOrEqual:isSmallerOrEqual,
//     isInRange:isInRange,
//     generateSingleMultiplication:generateSingleMultiplication
// }
exports.getItemInfo = getItemInfo

exports.isBarcodeValid = isBarcodeValid;
exports.isAllBracodeValid = isAllBracodeValid;
exports.getItemTotalPrice = getItemTotalPrice;
exports.getTotalPrice = getTotalPrice;
exports.generateReceiptData = generateReceiptData;
exports.renderReceipt = renderReceipt;
exports.printReceipt = printReceipt