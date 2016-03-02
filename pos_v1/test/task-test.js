//Task loadPurchasedItem
describe('loadPurchasedItem', function() {
  var inputs;

  beforeEach(function() {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];

  });

  it('should output correct array', function() {

    var output = loadPurchasedItem(inputs);

    var expectObject = [
      { barcode:'ITEM000001', count:5 },
      { barcode:'ITEM000003', count:2 },
      { barcode:'ITEM000005', count:3 }
    ];

    expect(output).toEqual(expectObject);
  });
});

//Task loadAllInfoOfItem
describe('loadAllInfoOfItem', function() {
  var inputs;

  beforeEach(function() {
    inputs = [
      { barcode:'ITEM000001', count:5 },
      { barcode:'ITEM000003', count:2 },
      { barcode:'ITEM000005', count:3 }
    ];

  });

  it('should output correct array', function() {

    var output = loadAllInfoOfItem(inputs);

    var expectObject = [
      {
        item:
        {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item:
        {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item:
        {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }
    ];

    expect(output).toEqual(expectObject);
  });
});

//Task calculateDiscount
describe('calculateDiscount', function() {
  var inputs;

  beforeEach(function() {
    inputs = [
      {
        item:
        {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item:
        {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item:
        {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }
    ];
  });

  it('should output correct array', function() {

    var output = calculateDiscount(inputs);

    var expectObject = [
      { cartItem:inputs[0], totalPrice:15.00, reducedPrice:3.00 },
      { cartItem:inputs[1], totalPrice:30.00, reducedPrice:0.00 },
      { cartItem:inputs[2], totalPrice:13.50, reducedPrice:4.50 }
    ];

    expect(output).toEqual(expectObject);
  });
});

//Task getReceipt
describe('getReceipt', function() {
  var inputs;
  var cartItems;
  beforeEach(function() {
    cartItems = [
      {
        item:
        {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item:
        {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item:
        {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }
    ];

    inputs = [
      { cartItem:cartItems[0], totalPrice:15.00, reducedPrice:3.00 },
      { cartItem:cartItems[1], totalPrice:30.00, reducedPrice:0.00 },
      { cartItem:cartItems[2], totalPrice:13.50, reducedPrice:4.50 }
    ];
  });

  it('should output correct string', function() {

    var output = getReceipt(inputs);

    var expectText =
      '***<没钱赚商店>收据***\n' +
      '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
      '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
      '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
      '----------------------\n' +
      '总计：51.00(元)\n' +
      '节省：7.50(元)\n' +
      '**********************';

    expect(output).toEqual(expectText);
  });
});
