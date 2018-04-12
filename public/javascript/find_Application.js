var botui = new BotUI('delivery-bot')
var company_name;
var job_name;
var content_arr = [];

$('.btn').attr('disabled',true);
$('#myfile1').attr('disabled',true);

botui.message
.bot('Hello, I am Steeve')

botui.message
  .bot({
    delay: 1000,
    content: 'Please tell me Company name.'
  }).then(function(){
    $('#send').on("click",companyfunc);
})


function companyfunc(e){
  company_name = $('#m').val();
  $('#m').val('');
  botui.message.human({
    delay: 1000,
    content: company_name
  }).then(function(){
    botui.message.bot({
      delay: 1000,
      content: "Well…"
    })
    $('#send').off("click",companyfunc);
  }).then(function(){
    botui.message.bot({
      delay: 1000,
      content: "What kind of the Job title you want to recruit ?"
    })
  }).then(function(){
    $('#send').on("click",want_recruit);
  })


}



function want_recruit() {

  job_name = $('#m').val();
  $('#m').val('');
  $('#send').off("click",want_recruit);
  botui.message.human({
    delay: 1000,
    content: job_name
  }).then(function(){
    botui.message.bot({
      delay: 1000,
      content: "OK, you want to recruit someone for the job "+ job_name
    })
  }).then(function(){
    botui.message.bot({
      delay: 2000,
      content: "Please tell me what kind of the talent or expertise the applicant need."
    })
  }).then(function(){
    $('#send').on("click",Type_content);
  })

}

function Type_content(){

  var content =  $('#m').val();
  $('#m').val('');
  content_arr.push(content)

  console.log(content_arr)
  botui.message
    .human({
      delay: 1000,
      content: content
  }).then(function(){
    botui.message
    .bot({
      delay: 1000,
      content: "Anything else you want to add?"
    })
  }).then(function(){
    return botui.action.button({
    delay: 1000,
    action: [{
      text: '“Nope, that’s all”',
      value: 'No'
      }]
    })
  }).then(function(res){
    if(res.value == 'No') {
      $('#send').off("click",Type_content);
      botui.message
      .bot({
        delay: 1000,
        content: "Well............"
      })
    }
  }).then(function(){
    botui.message
    .bot({
      delay: 2000,
      content: "There are some applicants for you"
    })
  }).then(function(){
    
  })

}




$("#m").keydown(function(event){
  if ( event.which == 13 ){
    $('#send').click();  
  }
})
