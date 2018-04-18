var bot_container = $(".botui-app-container");
var bot_mes = $(".mes");
bot_container.hide();
bot_mes.hide();

$("#job-btn").click(function() {
  $("#landing-btn").hide();
  
  $.getScript("./javascript/delivery-bot.js");
  bot_container.show();
  bot_mes.show();

  $(".flex").hide();
});

$("#applicant-btn").click(function() {
  $("#landing-btn").hide();

  $.getScript("./javascript/find_Application.js");
  bot_container.show();
  bot_mes.show();

  $(".flex").hide();
});
