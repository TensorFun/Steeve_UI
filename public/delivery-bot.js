var botui = new BotUI('delivery-bot'),
    address = 'House 1, First Ave.';

var company = ''

botui.message
  .bot('May I help you?')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, // so we could the address in message instead if 'Existing Address'
      action: [{
        text: 'find job',
        value: 'job'
      }, {
        text: 'find applicant',
        value: 'applicant'
      }]
    })
}).then(function (res) {
  if(res.value == 'job') {
    botui.message.bot({
      delay: 500,
      content: 'You choose "find job."'
    });
    askAddress();
  } if(res.value == 'applicant') {
    botui.message.human({
      delay: 500,
      content: 'You choose "find applicant.'
    });
    end();
  }
});



var askAddress = function () {
  botui.message
    .bot({
      delay: 2000,
      content: 'Please input your CV or tell me some experience.'

    }).then(function () {

        var searchResult = $('.botui-actions-container');
        var htmlFrag = '<form id=xxx class="formNewsLetter" action="send_save" target="id_iframe">'+'Name: <input type="text" name="Name"> <br></br>'+"<textarea id='fooo' cols='20' rows='4' name='content'>"+"Input your CV..."+"</textarea>"+'<p><input id="button" type="submit" value="送出表單" ></p>'+"</form>"
        //Fixed Page
        var othertag = '<iframe id="id_iframe" name="id_iframe" style="display:none;"></iframe> '
        searchResult.html(htmlFrag+othertag);
        formclick();

    })
        
      
  }

  function formclick(){

      $(".formNewsLetter").submit(function(e){
              
      var content = $('#fooo').val();
      chat_it_post(content);
      document.getElementById("xxx").style.display="none";
      botui.message.bot('Waittinggggggggggg') 

  });

  }

  function chat_it_post(query){
    $.ajax({
      type:"POST",
      url: "https://steevebot.ml/random",
      data: JSON.stringify({text: query}),
      dataType: 'json',
      success: function(data){
        //console.log(data)
        //console.log('process sucess');
        company = data.Employer
        //console.log(company)
        botui.message.bot({
          delay: 3000,
          content: 'Steeve help you choose : '+ company
        });
        
      },
      error: function() { 
        console.log('process error');
      } 
    })
  }

  
  

  
  
  
  
  


  


  

  


  
    
