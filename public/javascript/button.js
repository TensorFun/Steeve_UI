var initial = $( ".botui-app-container" );
var initial_mes = $( ".mes" );
initial.hide();
initial_mes.hide();


$("#target").click(function(){
    var theBuntton = document.getElementById('target');
    this.style.display = 'none';
    var theBuntton1 = document.getElementById('target1');
    theBuntton1.style.display = 'none';
    
    //alert('OK')
    $.getScript("./javascript/delivery-bot.js");
    initial.show();
    initial_mes.show();

    $(".flex").hide()

    
    

  })


  $("#target1").click(function(){
    var theBuntton1 = document.getElementById('target1');
    theBuntton1.style.display = 'none';
    var theBuntton = document.getElementById('target');
    theBuntton.style.display = 'none';
    //alert('OK')
    $.getScript("./javascript/find_Application.js");
    initial.show();
    initial_mes.show();

    $(".flex").hide()

  })

  
