$("#target").click(function(){
    var theBuntton = document.getElementById('target');
    this.style.display = 'none';
    var theBuntton1 = document.getElementById('target1');
    theBuntton1.style.display = 'none';
    //alert('OK')
    $.getScript("./javascript/delivery-bot.js");
  })


  $("#target1").click(function(){
    var theBuntton1 = document.getElementById('target1');
    theBuntton1.style.display = 'none';
    var theBuntton = document.getElementById('target');
    theBuntton.style.display = 'none';


    //alert('OK')
    $.getScript("./javascript/find_Application.js");
  })