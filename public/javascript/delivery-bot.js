var botui = new BotUI('delivery-bot')
var email;
var name;
var content_arr = [];

$('.btn').attr('disabled',true);
$('#myfile1').attr('disabled',true);

botui.message
  .bot('Hello, I am Steeve')

botui.message
  .bot({
    delay: 1000,
    content: 'You choose job'
  }).then(function(){
    botui.message
    .bot({
      delay: 1000,
      content: "What's your name"
      })
    }).then(function(){
      $('#send').on("click",namefunc);
  })


 

function namefunc(e){

  name = $('#m').val();
  $('#m').val('');
  //console.log(text)
  botui.message.human({
    delay: 1000,
    content: name
  }).then(function(){
    botui.message
    .bot({
      delay: 1000,
      content: "Oh,"+name
    })
  }).then(function(e){
      
      $('#send').attr('disabled',false)
  }).then(function(){
    botui.message
    .bot({
      delay: 2000,
      content: "What’s your email?"
    })  
    $('#send').on("click",emailfunc);
  })
  $('#send').attr('disabled', 'disabled');
  $('#send').off("click",namefunc);
  e.preventDefault();

}

function emailfunc(e){

  email = $('#m').val();
  $('#m').val('');
  botui.message.human({
    delay: 100,
    content: email
  }).then(function(){
      botui.message
      .bot({
        delay: 1000,
        content: "Well,"+name
      })
  }).then(function(){
      botui.message
        .bot({
          delay: 2000,
          content: "What are you expert in ?"
      })
  }).then(function(){
      botui.message
        .bot({
          delay: 3000,
          content: "Or, you can give us your CV."
        })
    
  })
  
  $('#send').off("click",emailfunc);
  $('.btn').attr('disabled',false);
  $('#myfile1').attr('disabled',false);

  $('#send').on("click",CV_type);
  //$('#send').attr('disabled',true);
  e.preventDefault();

}


function CV_type(){
  $('.btn').attr('disabled',true);
  $('#myfile1').attr('disabled',true);
  
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
      $('#send').off("click",CV_type);
      botui.message
      .bot({
        delay: 2000,
        content: name + ", Is there any field you prefer to work in ? For example, front end , security …"
      })
      $('#send').on("click",Filed_type);
      return botui.action.button({
        delay: 2000,
        action: [{
          text: 'Fine for me',
          value: 'Yes'
          }]
      })
    }
  }).then(function(res){
    if(res.value == 'Yes') {

      botui.message
        .bot({
          delay: 1000,
          content: "Hi, "+name
        }).then(function(){
          botui.message
            .bot({
              delay: 1000,
              content: "there are some jobs for you"
          })
      })



    }

  })
}

function Filed_type(){
  var Filed =  $('#m').val();
  $('#m').val('');
  alert(Filed);

  

}








 

  $("#myfile1").change(function(){


    var fd = new FormData(),
    myFile = document.getElementById("myfile1").files[0];

    fd.append( 'file',  myFile);
    
    var ajaxUrl = "http://nlp-ultron.cs.nthu.edu.tw:9997/CV";
    //console.log(fromData)
    $.ajax({
      url : ajaxUrl,
      type : "POST",
      data : fd,
      // both 'contentType' and 'processData' parameters are
      // required so that all data are correctly transferred
      contentType : false,
      processData : false
    }).done(function(response){
      $('#send').off("click",CV_type);
      $('.btn').attr('disabled',true);
      $('#myfile1').attr('disabled',true);
      $('#send').off("click",Filed_type);


      console.log(response)
      CV_pdf_continue()
      
    }).fail(function(){
      console.log("fail")
      // Here you should treat the http errors (e.g., 403, 404)
    })

})

function CV_pdf_continue(){

  botui.message
      .bot({
        delay: 2000,
        content: "Submit Successful"
      }).then(function(){
        botui.message
          .bot({
            delay: 2000,
            content: name + ", Is there any field you prefer to work in ? For example, front end , security …"
        })
        $('#send').on("click",Filed_type);
      }).then(function(){
        return botui.action.button({
          delay: 3000,
          action: [{
            text: 'Fine for me',
            value: 'Yes'
            }]
        })
      }).then(function(res){
          if(res.value == 'Yes') {

          botui.message
            .bot({
              delay: 1000,
              content: "Hi, "+name
            }).then(function(){
              botui.message
                .bot({
                  delay: 1000,
                  content: "there are some jobs for you"
              })
        })
      }
    })

}






$("#m").keydown(function(event){
  if ( event.which == 13 ){
    $('#send').click();  
  }
});
