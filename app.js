// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMstring = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expensesList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: parseInt(document.querySelector(DOMstring.inputValue).value),
      };
    },
    getDom: function () {
      return DOMstring;
    },
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstring.inputDescription + ", " + DOMstring.inputValue
      );
      // Convert list to array
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });
      fieldsArr[0].focus();
      // for (i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },
    tusuviigUzuuleh: function (tusuv) {
      document.querySelector(DOMstring.tusuvLabel).textContent = tusuv.tusuv;
      document.querySelector(DOMstring.incomeLabel).textContent =
        tusuv.totalInc;
      document.querySelector(DOMstring.expenseLabel).textContent =
        tusuv.totalsExp;
      if (tusuv.huvi === 0) {
        document.querySelector(DOMstring.percentageLabel).textContent =
          tusuv.huvi;
      } else {
        document.querySelector(DOMstring.percentageLabel).textContent =
          tusuv.huvi + "%";
      }
    },
    addListItem: function (item, type) {
      // Орлого зарлагын элементийг агуулсан HTML-ийг бэлтгэнэ
      var html, list;
      if (type === "inc") {
        list = DOMstring.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstring.expensesList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Тэрхүү HTML дотороо орлого зарлагуудыг replace ашиглаж өөрчилж өгнө
      html = html.replace("%id%", item.id);
      html = html.replace("$description$", item.description);
      html = html.replace("$$value$$", item.value);
      // Бэлтгэсэн HTML-ээ DOM-руу өгнө
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
  };
  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
    tusuv: 0,
    huvi: 0,
  };
  return {
    tusuvTootsooloh: function () {
      // Нийт орлогийн нийлбэрийг тооцоолно
      calculateTotal("inc");
      // Нийт зарлагийн нийлбэрийг тооцоолно
      calculateTotal("exp");
      // Төсөвийг шинээр тооцоолно
      data.tusuv = data.totals.inc - data.totals.exp;
      // Орлого зарлагын хувийн тооцоолно
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    tusuviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalsExp: data.totals.exp,
      };
    },
    addItem: function (type, description, value) {
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
      return item;
    },
    data: function () {
      return data;
    },
  };
})();
// Программын холбогч контроллер
var appController = (function (uiController, finController) {
  var ctrlAddItem = function () {
    // Оруулах өгөгдлийг дэлгэцнээс авах
    var input = uiController.getInput();
    if (input.description !== "" && input.value !== "") {
      // Оруулсан өгөгдлийг санхүүгийн хэсэгт хадгална
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      // Олж авсан өгөгдлүүдээ дэлгэцэн дээр гаргана
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      // Төсөв тооцно
      financeController.tusuvTootsooloh();
      // Эцсийн үлдэгдэл
      var tusuv = financeController.tusuviigAvah();
      // Төсөвийн тооцоог дэлгэцэнд гаргана
      uiController.tusuviigUzuuleh(tusuv);
    }
  };
  var setupEventListener = function () {
    var DOM = uiController.getDom();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function () {
      console.log("Application starting ...");
      uiController.tusuviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalsExp: 0,
      });
      setupEventListener();
    },
  };
})(uiController, financeController);
appController.init();
