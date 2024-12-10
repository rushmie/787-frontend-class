describe('MenuService', function () {
    var MenuService, $httpBackend, ApiPath;
  
    beforeEach(function () {
      module('common'); // Load the module containing the MenuService
  
      inject(function (_MenuService_, _$httpBackend_, _ApiPath_) {
        MenuService = _MenuService_;
        $httpBackend = _$httpBackend_;
        ApiPath = _ApiPath_;
      });
    });
   
    it('should return the menu item data when a valid menu number is provided', function () {
      var menuNumber = "A1";
      var category = "A";
      var dishNumber = 0;
  
      var mockResponse = { id: 1, name: "Test Dish", description: "Delicious test dish" };
  
      // Mock the backend response
      $httpBackend
        .expectGET(ApiPath + '/menu_items/' + category + '/menu_items/' + dishNumber + '.json')
        .respond(mockResponse);
  
      MenuService.getMenuItem(menuNumber).then(function (data) {
        expect(data).toEqual(mockResponse);
      });
  
      $httpBackend.flush();
    });
  
    it('should return null if the menu number format is invalid', function () {
      var menuNumber = "InvalidFormat";
  
      var result = MenuService.getMenuItem(menuNumber);
      expect(result).toBeNull(); // Immediately returns null for invalid input
    });
  
    it('should return null if the menu number is empty or null', function () {
      expect(MenuService.getMenuItem(null)).toBeNull();
      expect(MenuService.getMenuItem("")).toBeNull();
    });
  
    it('should handle a non-existent menu item', function () {
      var menuNumber = "A99"; // Assuming A99 does not exist
      var category = "A";
      var dishNumber = 98;
  
      $httpBackend
        .expectGET(ApiPath + '/menu_items/' + category + '/menu_items/' + dishNumber + '.json')
        .respond(404, 'Not Found');
  
      MenuService.getMenuItem(menuNumber).then(function (data) {
        expect(data).toBeUndefined(); // No data returned for non-existent item
      });
  
      $httpBackend.flush(); // Flush pending requests
    });
  });
  