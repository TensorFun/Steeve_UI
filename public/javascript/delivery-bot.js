const botui = new BotUI("delivery-bot");
let name, email;
let content_arr = [];

const mes = $("#m");
const send = $("#send");
const reminder = $("#reminder");

$(".alert.alert-warning").hide();
$(".btn").attr("disabled", true);
$("#cv-file").attr("disabled", true);

botui.message
  .bot({
    delay: 300,
    content: "Hello, I am Steeve."
  })
  .then(function() {
    botui.message
      .bot({
        delay: 700,
        content: "It seems that you need a job. No worries, I can help you!"
      })
      .then(function() {
        botui.message.bot({
          delay: 700,
          content: "Alright, what's your name?"
        });
      })
      .then(function() {
        send.on("click", namefunc);
      });
  });

function namefunc(e) {
  name = mes.val();
  if (!name.trim()) {
    $(".alert.alert-warning")
      .html("<strong>Warning!</strong>  Please input your name.")
      .show();
    return false;
  }
  $(".alert.alert-warning").hide();
  mes.val("");
  send.off("click", namefunc);

  //console.log(text)
  botui.message
    .human({
      delay: 200,
      content: name
    })
    .then(function() {
      botui.message.bot({
        delay: 1000,
        content: "Oh, Hi! " + name + "."
      });
    })
    .then(function(e) {
      // send.attr('disabled',false)
    })
    .then(function() {
      botui.message.bot({
        delay: 1700,
        content: "Then, what’s your email?"
      });

      send.on("click", emailfunc);
    });
}

function emailfunc(e) {

  email = mes.val();
  mes.val("");

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //console.log(validateEmail(email))

  if (validateEmail(email) == false) {
    $(".alert.alert-warning").html(
      "<strong>Warning!</strong>  Email is not valid"
    );

    $(".alert.alert-warning").show();

    return false;
  } else {
    $(".alert.alert-warning").hide();
    send.off("click", emailfunc);
  }

  botui.message
    .human({
      delay: 100,
      content: email
    })
    .then(function() {
      botui.message.bot({
        delay: 1000,
        content: "Well, " + name
      });
    })
    .then(function() {
      botui.message.bot({
        delay: 2000,
        content: "What are you expert in?"
      });
    })
    .then(function() {
      botui.message.bot({
        delay: 3000,
        content: "Or you can upload your CV."
      });
    })
    .then(function() {

      setTimeout(() => {
        reminder.show();
        $(".btn").attr("disabled", false);
        $("#cv-file").attr("disabled", false);
        send.on("click", CV_type);
      }, 4000);

    });
  //send.attr('disabled',true);
  //e.preventDefault();
}

function CV_type() {
  $(".btn").attr("disabled", true);
  $("#cv-file").attr("disabled", true);
  reminder.hide();

  var content = mes.val();
  mes.val("");
  content_arr.push(content);

  //console.log(content_arr)
  botui.message
    .human({
      delay: 1000,
      content: content
    })
    .then(function() {
      botui.message.bot({
        delay: 1000,
        content: "Anything else you want to add?"
      });
    })
    .then(function() {
      return botui.action.button({
        delay: 1000,
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
        send.off("click", CV_type);
        get_job();
        botui.message.bot({
          delay: 900,
          content: "Well, please wait for a second ..."
        });
      }
    });
}

function error_type() {

  error = mes.val();
  mes.val("");

  botui.message
    .human({
      content: error
  })

  botui.message
    .add({
      content: 'Well, please wait for a second ...'
  })

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
      content: "Oops, could you repeat that ?"
  })
}





function get_job() {

  send.on("click", error_type);

  var fd = new FormData();
  var strr = content_arr.join("\n");
  fd.append("username", name);
  fd.append("email", email);
  fd.append("CV", strr);
  //var Data = JSON.stringify({username: name,email:email,CV:strr})
  //console.log(Data)
  $.ajax({
    type: "POST",
    url: "https://steevebot.ml/api/CV/text",
    data: fd,
    contentType: false,
    processData: false,
    //dataType: 'json',
    success: function(data) {

      send.off("click", error_type);
      send.on("click",end_type);

      var key_word = Object.keys(data)[0];

      console.log(key_word);

      botui.message.bot({
        content: "Ohh! Got it!"
      });

      if (typeof key_word == "undefined") {
        botui.message
          .bot({
            delay: 500,
            content: "Sorry, we don't match anything... Could you type more details?"
          })
          .then(function() {
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

      else {
        botui.message
          .bot({
            delay: 1000,
            content: "Hi, " + name
          })
          .then(function() {
            botui.message.add({
              delay: 1000,
              content: "Here are some jobs for you!"
            });
          })
          .then(function() {
            for (i = 0; i < 3; i++) {
              botui.message.bot({
                delay: 1000,
                content:
                  data[key_word][i].Title +
                  "</br>" +
                  data[key_word][i].Employer +
                  "</br>" +
                  '<a href="' +
                  data[key_word][i].url +
                  '" target="_blank"> Job Link' +
                  "</a>"
              });
            }

            botui.message
              .bot({
                delay: 2000,
                content: "Wanna get more job?"
              })
              .then(function() {
                return botui.action.button({
                  delay: 1000,
                  action: [
                    {
                      text: "Sure",
                      value: "Y"
                    },
                    {
                      text: "Nope",
                      value: "N"
                    }
                  ]
                });
              })
              .then(function(res) {
                if (res.value == "Y") {
                  for (i = 3; i < 6; i++) {
                    botui.message.bot({
                      delay: 1000,
                      content:
                        data[key_word][i].Title +
                        "</br>" +
                        data[key_word][i].Employer +
                        "</br>" +
                        '<a href ="' +
                        data[key_word][i].url +
                        '" target="_blank"> Job Link' +
                        "</a>"
                    });
                  }
                } else {
                  botui.message.bot({
                    delay: 1000,
                    content: "All the best to getting a suitable job."
                  });
                }
              })
              .then(function() {
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
          });
      }
    },
    error: function() {
      console.log("process error");
    }
  });
}


$("#cv-file").change(function() {

  send.off("click", CV_type);
  send.on("click",error_type);


  reminder.hide();

  $(".btn").attr("disabled", true);

  botui.message.bot({
    delay: 1000,
    content: "Please wait for a second..."
  });

  var fd = new FormData();
  var myFile = $("#cv-file").prop("files")[0];
  //console.log(myFile)
  fd.append("username", name);
  fd.append("email", email);
  fd.append("file", myFile);
  //console.log(fd)

  var ajaxUrl = "https://steevebot.ml/api/CV/pdf";

  $.ajax({
    url: ajaxUrl,
    type: "POST",
    data: fd,
    contentType: false,
    processData: false
  })
    .done(function(response) {
      send.off("click", CV_type);
      $(".btn").attr("disabled", true);
      $("#cv-file").attr("disabled", true);

      //console.log(response);
      CV_pdf_continue(response);
    })
    .fail(function() {
      console.log("fail");
      // Here you should treat the http errors (e.g., 403, 404)
    });
});

function CV_pdf_continue(response) {

  send.off("click", error_type);
  send.on("click",end_type);

  var data = response;
  var key_word = Object.keys(data)[0];

  botui.message.bot({
    delay: 500,
    content: "Ohh! Got it!"
  });

  if (typeof key_word == "undefined") {
    botui.message
      .bot({
        delay: 2000,
        content: "Sorry, we don't match anything... Could you type more details?"
      })
      .then(function() {
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

  } else {
    botui.message
      .bot({
        delay: 1000,
        content: "Hi, " + name
      })
      .then(function() {
        botui.message.bot({
          delay: 1000,
          content: "Here are some jobs for you"
        });
      })
      .then(function() {
        for (i = 0; i < 3; i++) {
          botui.message.bot({
            delay: 1000,
            content:
              data[key_word][i].Title +
              "</br>" +
              data[key_word][i].Employer +
              "</br>" +
              '<a href ="' +
              data[key_word][i].url +
              '" target="_blank"> Job Link' +
              "</a>"
          });
        }
      })
      .then(function() {
        botui.message.bot({
          delay: 1000,
          content: "Wanna get more jobs?"
        });
      })
      .then(function() {
        return botui.action.button({
          delay: 1000,
          action: [
            {
              text: "Sure",
              value: "Y"
            },
            {
              text: "Nope",
              value: "N"
            }
          ]
        });
      })
      .then(function(res) {
        if (res.value == "Y") {
          for (i = 3; i < data.length; i++) {
            botui.message.bot({
              delay: 1000,
              content:
                data[key_word][i].Title +
                "</br>" +
                data[key_word][i].Employer +
                "</br>" +
                '<a href ="' +
                data[key_word][i].url +
                '"> Job Link' +
                "</a>"
            });
          }
        } else {
          botui.message.bot({
            delay: 1000,
            content: "All the best to getting a suitable job."
          });
        }
      })
      .then(function() {
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
}

mes.keydown(function(event) {
  if (event.which == 13) {
    send.click();
  }
});
