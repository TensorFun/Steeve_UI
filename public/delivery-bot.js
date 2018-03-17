var botui = new BotUI('delivery-bot'),
    address = 'House 1, First Ave.';

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
      delay: 500,
      content: 'Please input your CV or tell me some experience.'
    })
    .then(function () {

        var searchResult = $('.botui-actions-container');
        //var htmlFrag = "<div id='input1'>\n"+"<form>"+"<textarea cols='50' rows='5'>"+"Input your CV..."+"</textarea>"+"</form>"+"</div>"
        var htmlFrag = '<form id ="xxx" class="formNewsLetter" action="" method="POST" target="id_iframe">'+"<textarea cols='50' rows='5' name='name'>"+"Input your CV..."+"</textarea>"+'<p><input id="button" type="submit" value="送出表單" onclick="return foo()"></p>'+"</form>"
        var othertag = '<iframe id="id_iframe" name="id_iframe" style="display:none;"></iframe> '
        searchResult.html(htmlFrag+othertag);

        }
      
      )    
  }

  function foo(){
    document.getElementById("xxx").style.display="none";
    botui.message
    .bot('Waiting..............I will search jobs for youuuu')

  }

  
  var button = $('.botui-actions-buttons-button');
  
  
  


  


  

  


  
    
