function printReceipt(itemCodes) {
  var barcodeCounts = loadPurchasedItem(itemCodes);
  var cartItems = loadAllInfoOfItem(barcodeCounts);
  var discountItems = calculateDiscount(cartItems);
  console.log(getReceipt(discountItems));
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
  var discountItems = [];
  for (var i = 0; i < cartItems.length; i++) {
    var type = getPromotion(cartItems[i].item.barcode);
    var totalPrice = 0, reducedPrice = 0;
    if (type === 'BUY_TWO_GET_ONE_FREE') {
      reducedPrice = parseInt(cartItems[i].count / 3, 10) * cartItems[i].item.price;
    }

    totalPrice = cartItems[i].count * cartItems[i].item.price;
    discountItems.push({ cartItem: cartItems[i], totalPrice: totalPrice, reducedPrice: reducedPrice });
  }
  return discountItems;
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

function getReceipt(discountItems) {
  var amount = 0, reducedAmount = 0;
  var receipt = '***<没钱赚商店>收据***\n';
  for (var i = 0; i < discountItems.length; i++) {
    var itemSummary = getItemSummary(discountItems[i]);
    receipt += itemSummary;
    amount += discountItems[i].totalPrice;
    reducedAmount += discountItems[i].reducedPrice;
  }

  receipt = receipt + '----------------------\n' +
  '总计：' + (amount - reducedAmount).toFixed(2) + '(元)\n' +
  '节省：' + reducedAmount.toFixed(2) + '(元)\n' +
  '**********************';
  return receipt;
}

function getItemSummary(discountItems) {
  var cartItem = discountItems.cartItem;
  var totalPrice = discountItems.totalPrice;
  var reducedPrice = discountItems.reducedPrice;

  var itemSummary =
  '名称：' + cartItem.item.name + '，' +
  '数量：' + cartItem.count + cartItem.item.unit + '，' +
  '单价：' + cartItem.item.price.toFixed(2) +
  '(元)，小计：'+( totalPrice - reducedPrice ).toFixed(2) +
  '(元)\n'

  return itemSummary;
}
