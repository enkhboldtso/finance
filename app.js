// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  var DOMstring = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: document.querySelector(DOMstring.inputValue).value
      };
    },
    getDom: function() {
      return DOMstring;
    }
  };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function() {
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      totalIncomes: 0,
      totalExpense: 0
    }
  };
  return {
    addItem: function(type, description, value) {
      var item, id;
      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, description, value);
      } else {
        item = new Expense(id, description, value);
      }
      data.items[type].push(item);
    },
    data: function() {
      return data;
    }
  };
})();
// Программын холбогч контроллер
var appController = (function(uiController, finController) {
  var ctrlAddItem = function() {
    // Оруулах өгөгдлийг дэлгэцнээс авах
    var input = uiController.getInput();
    // Оруулсан өгөгдлийг санхүүгийн хэсэгт хадгална
    financeController.addItem(input.type, input.description, input.value);
    // Олж авсан өгөгдлүүдээ дэлгэцэн дээр гаргана
    // Төсөв тооцно
    // Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана
  };
  var setupEventListener = function() {
    var DOM = uiController.getDom();
    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function() {
      console.log("Application starting ...");
      setupEventListener();
    }
  };
})(uiController, financeController);
appController.init();
