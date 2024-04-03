

function showtext() {
    console.log("Hello");
}

$(document).ready(function () {
    $(document).on("click", ".img", showtext);
  });