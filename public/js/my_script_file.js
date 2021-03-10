jQuery(document).ready(function($) {
  $(".career-register").click(function() {
    var $idCareer = $(this).data("register-career");
    var data = {
      action: "my_ajax_function", //the function in php functions to call
      data_to_pass: $idCareer,
      nonce: frontEndAjax.nonce
    };
    $.post(
      frontEndAjax.ajaxurl,
      data,
      function(response) {
        if (data.data_to_pass === $idCareer) {
          var dataContent =
            '<h1 class="job-title">' +
            response.post_title +
            "</h1><h2 class='job-subtitle'>" +
            response.category_name +
            " , " +
            response.data_location +
            "</h2><div class='content'>" +
            response.post_content +
            "</div>";
          $("#myModal .content").html(dataContent);
          $("#myModal").css("display", "block");
        } else {
          $("#myModal .content").text(
            "Đang update nội dung.Vui lòng đợi mình trong giây lát..."
          );
        }
      },
      "json"
    );
  });
});
