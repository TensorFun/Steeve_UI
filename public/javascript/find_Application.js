const botui = new BotUI("delivery-bot");
let company_name;
let job_name;
let content_arr = [];
var data ;

const mes = $("#m");
const send = $("#send");

$(".alert.alert-warning").hide();
$(".btn").attr("disabled", true);
$("#cv-file").attr("disabled", true);

botui.message
  .bot({
    delay: 300,
    content: "Hello, I am Steeve!"
  })
  .then(function() {
    botui.message
      .bot({
        delay: 600,
        content: "It seems you need employee."
      })
      .then(function() {
        botui.message
          .bot({
            delay: 800,
            content: "Please tell me your company name."
          })
          .then(function() {
            send.on("click", companyfunc);
          });
      });
  });

function companyfunc(e) {
  company_name = mes.val();
  mes.val("");

  if (!company_name.trim()) {
    $(".alert.alert-warning").html(
      "<strong>Warning!</strong>  Please input your company name."
    );
    mes.val("");
    $(".alert.alert-warning").show();

    return false;
  }
  $(".alert.alert-warning").hide();
  send.off("click", companyfunc);

  botui.message
    .human({
      delay: 500,
      content: company_name
    })
    .then(function() {
      botui.message.bot({
        delay: 700,
        content: "Well..., wait..."
      });
      send.off("click", companyfunc);
    })
    .then(function() {
      botui.message.bot({
        delay: 900,
        content: "What is the position name you want to recruit?"
      });
    })
    .then(function() {
      send.on("click", want_recruit);
    });
}

function want_recruit() {
  job_name = mes.val();
  mes.val("");

  if (job_name == "") {
    $(".alert.alert-warning").html(
      "<strong>Warning!</strong> Please enter position name."
    );
    mes.val("");
    $(".alert.alert-warning").show();

    return false;
  }
  $(".alert.alert-warning").hide();
  send.off("click", companyfunc);
  send.off("click", want_recruit);

  botui.message
    .human({
      delay: 500,
      content: job_name
    })
    .then(function() {
      botui.message.bot({
        delay: 700,
        content: "OK, you want to recruit someone for the job: " + job_name
      });
    })
    .then(function() {
      botui.message.bot({
        delay: 1200,
        content:
          "Please tell me what kind of the talent or expertise the applicant need."
      });
    })
    .then(function() {
      send.on("click", Type_content);
    });
}

function Type_content() {
  var content = mes.val();
  mes.val("");
  content_arr.push(content);

  // console.log(content_arr);
  botui.message
    .human({
      delay: 500,
      content: content
    })
    .then(function() {
      botui.message.bot({
        delay: 700,
        content: "Anything else you want to add?"
      });
    })
    .then(function() {
      return botui.action.button({
        delay: 800,
        action: [
          {
            text: "Nope, that’s all",
            value: "No"
          }
        ]
      });
    })
    .then(function(res) {
      if (res.value == "No") {
        send.off("click", Type_content);
        botui.message.bot({
          delay: 900,
          content: "Well..., wait..."
        });
      }
    })
    .then(function() {
      get_user();
    });
}



function end_type(){
  end = mes.val();
  mes.val("");

  botui.message
    .human({
      content: end
  })

  botui.message
    .add({
      content: "I can't understand what you say."
  })
}


function get_user() {

  send.on("click", end_type);

  var fd = new FormData();
  var strr = content_arr.join("\n");
  console.log(strr)
  //var Data = JSON.stringify({company_name:company_name,job_name:job_name,content:strr})
  //fd.append('username',name)
  //fd.append('email',email)
  fd.append("post", strr);
  //console.log(Data)
  $.ajax({
    type: "POST",
    url: "http://nlp-ryze.cs.nthu.edu.tw:9998/Recruit",
    // url: 'https://steevebot.ml/Recruit',
    data: fd,
    contentType: false,
    processData: false,
    success: function(Data) {

      data = Data
      //console.log(data.length)

      botui.message.bot({
        delay: 1000,
        content: "Submitting successfully!!"
      });

     
      //console.log(data[key_word])
      if (data.length==0){
       
        botui.message.bot({
          delay: 2000,
          content: "Don't match anything.........."
      }).then(function() {
        return botui.action.button({
          delay: 1000,
          action: [
            {
              text: "Leave",
              value: "L"
            }
          ]
        });
      })
      .then(function(res) {
        if (res.value == "L") {
          window.location.reload();
        }
      });
       
      
      }

      else{

        botui.message.bot({
          delay: 1000,
          content: "There are some applicants for you, please wait."
        });
        

      for (i = 0 ; i < 3 ; i++){

        botui.message
          .bot({
              delay: 2000,
              content: data[i].username + '</br>' + data[i].email +'</br>' + data[i].PL.replace(/,/g, ", ") 
        })

      }

    
    botui.message.bot({
        delay: 2000,
        content: "Wanna see more applicants?"
    }).then(function() {
      console.log(data)
      
      return botui.action.button({
        delay: 1000,
        action: [
          {
            text: "Sure!",
            value: "Y"
          }, {
            text: 'Nope',
            value: 'N'
          }
        ]
      })
    }).then(function (res) {
      console.log(data)

      if(res.value == 'Y') {

        
        for (i = 4 ; i <= data.length ; i++){

          if(i<=6){

          botui.message
            .bot({
                delay: 1000,
                content: data[i].username + '</br>' + data[i].email +'</br>'+ data[i].PL.replace(/,/g, ", ") 
          })

        }
  
        }
      } else {

        botui.message.bot({
          delay: 1000,
          content: "All the best to getting a suitable job."
        });

      }

    }).then(function(){

      return botui.action.button({
        delay: 1000,
        action: [
          {
            text: "Leave",
            value: "L"
          }
        ]
      }).then(function(res) {
        if (res.value == "L") {
          window.location.reload();
        }
      });

    })

  }
      
    },
    error: function() {
      console.log("process error");
    }
  });

}

mes.keydown(function(event) {
  if (event.which == 13) {
    send.click();
  }
});
