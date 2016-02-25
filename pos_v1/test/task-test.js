//Task loadPurchasedItem
describe('loadPurchasedItem', function() {
  var allItems;
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
      {barcode:'ITEM000001',num:5},
      {barcode:'ITEM000003',num:2},
      {barcode:'ITEM000005',num:3}
    ];

    expect(output).toEqual(expectObject);
  });
});

//Task loadAllInfoOfItem
describe('loadAllInfoOfItem', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    inputs = [
      {barcode:'ITEM000001',num:5},
      {barcode:'ITEM000003',num:2},
      {barcode:'ITEM000005',num:3}
    ];

  });

  it('should output correct array', function() {

    var output = loadAllInfoOfItem(inputs);

    var expectObject = [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00,
        num: 5
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        num: 2
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        num: 3
      }
    ];

    expect(output).toEqual(expectObject);
  });
});
