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
