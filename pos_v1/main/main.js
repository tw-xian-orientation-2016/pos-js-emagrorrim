function printReceipt(itemCodes) {
  var barcodeCounts = loadPurchasedItem(itemCodes);
  var cartItems = loadAllInfoOfItem(barcodeCounts);
  var receiptItems = calculateDiscount(cartItems);
  console.log(getReceipt(receiptItems));
}

function loadPurchasedItem(tags) {
  var barcodeCounts = [];

  tags.forEach(function(tag) {
    var barcodeCount = getBarcodeCount(tag);
    var element = findElement(barcodeCount.barcode, barcodeCounts);

    if (element) {
      element.count += barcodeCount.count;
    } else {
      barcodeCounts.push(barcodeCount);
    }
  });

  return barcodeCounts;
}

function getBarcodeCount(tag) {
  var components = tag.split('-');
  var barcode = components[0];
  var count = parseFloat(components[1] || 1);

  return { barcode: barcode, count: count };
}

function findElement(barcode, barcodeCounts) {
  for (var i = 0; i < barcodeCounts.length; i++) {
    if (barcodeCounts[i].barcode === barcode) {
      return barcodeCounts[i];
    }
  }
}

function loadAllInfoOfItem(barcodeCounts) {
  var cartItems = [];
  for (var i = 0; i < barcodeCounts.length; i++) {
    var item = getItem(barcodeCounts[i].barcode);
    cartItems.push({ item: item, count: barcodeCounts[i].count });
  }

  return cartItems;
}

function getItem(barcode) {
  var allItems = loadAllItems();
  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i].barcode === barcode) {
      return allItems[i];
    }
  }
}

function calculateDiscount(cartItems) {
  var receiptItems = [];
  for (var i = 0; i < cartItems.length; i++) {
    var type = getPromotion(cartItems[i].item.barcode);
    var totalPrice = 0;
    var reducedPrice = getReducedPrice(type, cartItems[i]);

    totalPrice = cartItems[i].count * cartItems[i].item.price;
    receiptItems.push({ cartItem: cartItems[i], totalPrice: totalPrice, reducedPrice: reducedPrice });
  }
  return receiptItems;
}

function getPromotion(barcode) {
  var promotions = loadPromotions();
  for (var i = 0; i < promotions.length; i++) {
    for (var j = 0; j < promotions[i].barcodes.length; j++) {
      if (promotions[i].barcodes[j] === barcode) {
        return promotions[i].type;
      }
    }
  }
}

function getReducedPrice(type, cartItem) {
  if (type === 'BUY_TWO_GET_ONE_FREE') {
    return parseInt(cartItem.count / 3) * cartItem.item.price;
  }
  return 0;
}

function getReceipt(receiptItems) {
  var amount = 0, reducedAmount = 0;
  var receipt = '***<没钱赚商店>收据***\n';
  for (var i = 0; i < receiptItems.length; i++) {
    var itemSummary = getItemSummary(receiptItems[i]);
    receipt += itemSummary;
    amount += receiptItems[i].totalPrice;
    reducedAmount += receiptItems[i].reducedPrice;
  }

  receipt = receipt + '----------------------\n' +
  '总计：' + (amount - reducedAmount).toFixed(2) + '(元)\n' +
  '节省：' + reducedAmount.toFixed(2) + '(元)\n' +
  '**********************';
  return receipt;
}

function getItemSummary(receiptItems) {
  var cartItem = receiptItems.cartItem;
  var totalPrice = receiptItems.totalPrice;
  var reducedPrice = receiptItems.reducedPrice;

  var itemSummary =
  '名称：' + cartItem.item.name + '，' +
  '数量：' + cartItem.count + cartItem.item.unit + '，' +
  '单价：' + cartItem.item.price.toFixed(2) +
  '(元)，小计：'+( totalPrice - reducedPrice ).toFixed(2) +
  '(元)\n'

  return itemSummary;
}
