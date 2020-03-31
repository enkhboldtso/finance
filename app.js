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
        value: document.querySelector(DOMstring.inputType).value
      };
    },
    getDom: function() {
      return DOMstring;
    }
  };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function() {
  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }
  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }
  var data = {
    allItems = {
      incomes: [],
      expense: [],
    },
    totals = {
      totalIncomes: 0,
      totalExpense: 0
    }
  }
})();
// Программын холбогч контроллер
var appController = (function(uiController, finController) {
  var ctrlAddItem = function() {
    // Оруулах өгөгдлийг дэлгэцнээс авах
    console.log(uiController.getInput());
    // Оруулсан өгөгдлийг санхүүгийн хэсэгт хадгална
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
    return {
      init = function(){
        console.log("Application starting ...");
        setupEventListener();
      }
    };
  };
})(uiController, financeController);

appController.init()
