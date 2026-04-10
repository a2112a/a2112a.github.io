(function (window) {
  var dc = {};

   var categoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

   dc.loadHome = function () {
    $ajaxUtils.sendGetRequest(
      "snippets/home-snippet.html",
      function (responseText) {

        var randomCategoryShortName = "";

        $ajaxUtils.sendGetRequest(
          categoriesUrl,
          function (categories) {

            var randomIndex = Math.floor(Math.random() * categories.length);
            randomCategoryShortName = categories[randomIndex].short_name;

            var homeHtml = responseText;
            homeHtml = homeHtml.replace(
              "{{randomCategoryShortName}}",
              "'" + randomCategoryShortName + "'"
            );

            document.querySelector("#main-content").innerHTML = homeHtml;
          },
          true
        );
      },
      false
    );
  };

   dc.loadMenuItems = function (categoryShort) {

    var menuItemsUrl =
      "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" +
      categoryShort + ".json";

    $ajaxUtils.sendGetRequest(
      menuItemsUrl,
      buildAndShowMenuItemsHTML,
      true
    );
  };

   function buildAndShowMenuItemsHTML(categoryMenuItems) {

    $ajaxUtils.sendGetRequest(
      "snippets/menu-items-snippet.html",
      function (menuItemsHtml) {

        var finalHtml = menuItemsHtml;

        document.querySelector("#main-content").innerHTML = finalHtml;
      },
      false
    );
  }

   window.$dc = dc;

})(window);
