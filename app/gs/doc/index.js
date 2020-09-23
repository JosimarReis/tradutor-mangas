"use strict";

$("#sidebar").before("<div class='menuTrigger'></div>");
$(void 0).show;
$('.menuTrigger').click(function () {
  $(this).toggleClass('selected');
  $('#sidebar').slideToggle("slow", function () {});
});