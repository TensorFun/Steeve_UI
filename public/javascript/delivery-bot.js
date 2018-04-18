var botui = new BotUI("delivery-bot");
var email;
var name;
var content_arr = [];

$(".alert.alert-warning").hide();

$(".btn").attr("disabled", true);
$("#myfile1").attr("disabled", true);

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
          content: "First, what's your name?"
        });
      })
      .then(function() {
        $("#send").on("click", namefunc);
      });
  });

function namefunc(e) {
  name = $("#m").val();
  if (!name.trim()) {
    $(".alert.alert-warning").html(
      "<strong>Warning!</strong>  Please input your name."
    ).show();
    return false;
  }
  $(".alert.alert-warning").hide();
  $("#m").val("");
  $("#send").off("click", namefunc);

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
      //$('#send').attr('disabled',false)
    })
    .then(function() {
      botui.message.bot({
        delay: 1700,
        content: "Then, what’s your email?"
      });

      $("#send").on("click", emailfunc);
    });
  //$('#send').attr('disabled', 'disabled');

  //e.preventDefault();
}

function emailfunc(e) {
  email = $("#m").val();
  $("#m").val("");

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //console.log(validateEmail(email))

  if (validateEmail(email) == false) {
    $(".alert.alert-warning").html(
      "<strong>Warning!</strong>  Email is not valid "
    );

    $(".alert.alert-warning").show();

    return false;
  } else {
    $(".alert.alert-warning").hide();
    $("#send").off("click", emailfunc);
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
        var div_animate = $("#reminder");
        div_animate.animate({ left: "5px" }, "slow");
        $(".btn").attr("disabled", false);
        $("#myfile1").attr("disabled", false);
        $("#send").on("click", CV_type);
      }, 4000);
    });
  //$('#send').attr('disabled',true);
  //e.preventDefault();
}

function CV_type() {
  $(".btn").attr("disabled", true);
  $("#myfile1").attr("disabled", true);
  $("#reminder").hide();

  var content = $("#m").val();
  $("#m").val("");
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
        get_job();
        botui.message
          .bot({
            delay: 1000,
            content: "Hi, " + name
          })
          .then(function() {
            botui.message.bot({
              delay: 1000,
              content: "There are some jobs for you"
            });
          });
        
      }
    })
    
}

function get_job() {
  var fd = new FormData();
  var strr = content_arr.join("\n");
  fd.append("username", name);
  fd.append("email", email);
  fd.append("CV", strr);
  //var Data = JSON.stringify({username: name,email:email,CV:strr})
  //console.log(Data)
  $.ajax({
    type: "POST",
    url: "http://nlp-ryze.cs.nthu.edu.tw:9998/CV/text",
    data: fd,
    contentType: false,
    processData: false,
    //dataType: 'json',
    success: function(data) {
      console.log(data);
    },
    error: function() {
      console.log("process error");
    }
  });
}

function Filed_type() {
  $("#send").off("click", Filed_type);
  var Filed = $("#m").val();
  $("#m").val("");
  alert(Filed);
}

$("#myfile1").change(function() {
  $("#reminder").hide();

  var fd = new FormData(),
    myFile = document.getElementById("myfile1").files[0];
  fd.append("username", name);
  fd.append("email", email);
  fd.append("file", myFile);
  //console.log(fd)

  var ajaxUrl = "http://nlp-ryze.cs.nthu.edu.tw:9998/CV/pdf";
  // var ajaxUrl = "https://steevebot.ml/CV/pdf";
  //console.log(fromData)
  $.ajax({
    url: ajaxUrl,
    type: "POST",
    data: fd,
    // both 'contentType' and 'processData' parameters are
    // required so that all data are correctly transferred
    contentType: false,
    processData: false
  })
    .done(function(response) {
      $("#send").off("click", CV_type);
      $(".btn").attr("disabled", true);
      $("#myfile1").attr("disabled", true);
      $("#send").off("click", Filed_type);

      console.log(response);
      CV_pdf_continue();
    })
    .fail(function() {
      console.log("fail");
      // Here you should treat the http errors (e.g., 403, 404)
    });
});

function CV_pdf_continue() {
  botui.message
    .bot({
      delay: 2000,
      content: "Submit Successful"
    })
    .then(function() {
      botui.message.bot({
        delay: 2000,
        content:
          name +
          ", Is there any field you prefer to work in ? For example, front end , security …"
      });
      $("#send").on("click", Filed_type);
    })
    .then(function() {
      return botui.action.button({
        delay: 3000,
        action: [
          {
            text: "Fine for me",
            value: "Yes"
          }
        ]
      });
    })
    .then(function(res) {
      if (res.value == "Yes") {
        botui.message
          .bot({
            delay: 1000,
            content: "Hi, " + name
          })
          .then(function() {
            botui.message.bot({
              delay: 1000,
              content: "there are some jobs for you"
            });
          });
      }
    });
}

$("#m").keydown(function(event) {
  if (event.which == 13) {
    $("#send").click();
  }
});
