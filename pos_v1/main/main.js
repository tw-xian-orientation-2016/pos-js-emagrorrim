//TODO: Please write code in this file.
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
