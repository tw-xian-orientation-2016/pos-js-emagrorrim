//TODO: Please write code in this file.

//Task loadPurchasedItem
function loadPurchasedItem(barcodes) {
  var codes = divideBarcodes(barcodes);
  var cartCodes = mergeSameBarcode(codes);
  return cartCodes;
}

function divideBarcodes(barcodes) {
  var codes = [];
  for (var i = 0; i < barcodes.length; i++) {
    var codeArr = barcodes[i].split('-');
    if (codeArr.length < 2) {
      codes.push({barcode:codeArr[0],num:1});
    }else {
      codes.push({barcode:codeArr[0],num:parseInt(codeArr[1])});
    }
  }
  return codes;
}

function mergeSameBarcode(codes) {
  var cartCodes = [];
  var count = 1;
  for (var i = 1; i < codes.length; i++) {
    if (codes[i].barcode == codes[i-1].barcode) {
      count ++;
    } else {
      cartCodes.push({barcode:codes[i-1].barcode,num:count});
      count = codes[i].num;
    }
  }
  cartCodes.push({barcode:codes[codes.length - 1].barcode,num:count})
  return cartCodes;
}

//Task loadAllInfoOfItem
function loadAllInfoOfItem(cartCodes) {
  var cartItems = [];
  for (var i = 0; i < cartCodes.length; i++) {
    var oneItem = searchItem(cartCodes[i].barcode);
    cartItems.push({ item: oneItem,num: cartCodes[i].num });
  }
  return cartItems;
}

function searchItem(barcode) {
  var allItems = loadAllItems();
  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i].barcode == barcode) {
      return allItems[i];
    }
  }
  return null;
}


//Task calculateDiscount
function calculateDiscount(cartItems) {
  var discountItems = [];
  for (var i = 0; i < cartItems.length; i++) {
    var type = checkPromotion(cartItems[i].item.barcode);
    var totalP = 0,discountP = 0;
    if (type != null) {
      discountP = parseInt(cartItems[i].num / 3) * cartItems[i].item.price;
    }
    totalP = cartItems[i].num * cartItems[i].item.price;
    discountItems.push({ cartItem:cartItems[i],totalPrice:totalP,discountPrice:discountP });
  }
  return discountItems;
}

function checkPromotion(barcode) {
  var promotions = loadPromotions();
  for (var i = 0; i < promotions.length; i++) {
    for (var j = 0; j < promotions[i].barcodes.length; j++) {
      if (promotions[i].barcodes[j] == barcode) {
        return promotions[i].type;
      }
    }
  }
  return null;
}

//Task getReceipt
function getReceipt(discountItems) {
  var recept = '***<没钱赚商店>收据***\n';
  for (var i = 0; i < discountItems.length; i++) {
    recept = recept +
    '名称：'+discountItems[i].cartItem.item.name+
    '，数量：'+discountItems[i].cartItem.num+discountItems[i].cartItem.item.unit+
    '，单价：'+discountItems[i].cartItem.item.price.toFixed(2)+
    '(元)，小计：'+(discountItems[i].totalPrice-discountItems[i].discountPrice).toFixed(2)+'(元)\n'
  }
  recept = recept + '----------------------\n'+
  '总计：'+calculateTotalPrice(discountItems).toFixed(2)+'(元)\n'+
  '节省：'+ calculateDiscountPrice(discountItems).toFixed(2) +'(元)\n' +
  '**********************';
  return recept;
}

function calculateTotalPrice(discountItems) {
  var sum = 0;
  for (var i = 0; i < discountItems.length; i++) {
    sum += (discountItems[i].totalPrice - discountItems[i].discountPrice);
  }
  return sum;
}

function calculateDiscountPrice(discountItems) {
  var sum = 0;
  for (var i = 0; i < discountItems.length; i++) {
    sum += discountItems[i].discountPrice;
  }
  return sum;
}
