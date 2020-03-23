// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {})();
// Санхүүтэй ажиллах контроллер
var financeController = (function() {})();
// Программын холбогч контроллер
var appController = (function(uiController, finController) {
  var ctrlAddItem = function() {
    // Оруулах өгөгдлийг дэлгэцнээс авах
    // Оруулсан өгөгдлийг санхүүгийн хэсэгт хадгална
    // Олж авсан өгөгдлүүдээ дэлгэцэн дээр гаргана
    // Төсөв тооцно
    // Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана
  };
  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
