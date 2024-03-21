// Function to fetch and display stories
function displayStories() {
    $.ajax({
      url: "http://localhost:8080/api/user/getUsers",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var storiesList = $("#storiesList");
        storiesList.empty();
  
        $.each(data, function (index, story) {
          storiesList.append(
            `<div class="mb-3">
                  <h3>${story.firstName} ${story.lastName}</h3>
                  <div>${story.accountNumber}</div>
  
                  <div class='man-button-container'>
                  <button class="edit-button" data-id="${story.accountNumber}">Edit</button>
                  <button class="delete-button" data-accountNumber="${story.accountNumber}">Delete</button>

              </div>
              </div>
              <hr />
              `
          );
        });
      },
      error: function (error) {
        console.error("Error fetching stories:", error);
      },
    });
  }
  function deleteStory() {
    let accountNumber = $(this).attr("data-accountNumber");
    $.ajax({
      url: "http://localhost:8080/api/user/delete",
      dataType: 'json',
      data:{accountNumber},
      method: "POST",
      success: function () {
        displayStories();
        console.log("Successfully Deleted " + storyId)
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }
  function handleFormSubmission(event) {
    event.preventDefault();
    let storyId = $("#createBtn").attr("data-id");
    var title = $("#crud-title").val();
    var description = $("#crud-description").val();
    if (storyId) {
      $.ajax({
        url: "https://fakestoreapi.com/products/" + storyId,
        method: "POST",
        data: { title, description },
        success: function () {
          displayStories();
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    } else {
      $.ajax({
        url: "https://fakestoreapi.com/products/",
        method: "POST",
        data: { title, description },
        success: function () {
          displayStories();
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    }
  }
  function editBtnClicked(event) {
    event.preventDefault();
    let storyId = $(this).attr("data-id");
    $.ajax({
      url: "https://fakestoreapi.com/products/" + storyId,
      method: "GET",
      success: function (data) {
        console.log(data);
        $("#clearBtn").show();
        $("#crud-title").val(data.title);
        $("#crud-description").val(data.description);
        $("#createBtn").html("Update");
        $("#createBtn").attr("data-id", data.id);
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }
  $(document).ready(function () {
    displayStories();
    $(document).on("click", ".delete-button", deleteStory);
    $(document).on("click", ".edit-button", editBtnClicked);


    $("#createForm").submit(handleFormSubmission);
    $("#clearBtn").on("click", function (e) {
      e.preventDefault();
      $("#clearBtn").hide();
      $("#createBtn").removeAttr("data-id");
      $("#createBtn").html("Create");
      $("#crud-title").val("");
      $("#crud-description").val("");
    });
  });