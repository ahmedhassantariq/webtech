// Function to fetch and display stories
function displayStories() {
    $.ajax({
      url: "https://fakestoreapi.com/products",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var storiesList = $("#storiesList");
        storiesList.empty();
  
        $.each(data, function (index, story) {
          storiesList.append(
            `<div class="mb-3">
                  <h3>${story.title}</h3>
                  <div>${story.description}</div>
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
  // Function to delete a story
  function deleteStory() {
    let storyId = $(this).attr("data-id");
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
      method: "DELETE",
      success: function () {
        displayStories(); // Refresh the list after deleting a story
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
          displayStories(); // Refresh the list after creating a new story
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
          displayStories(); // Refresh the list after creating a new story
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
      url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
      method: "GET",
      success: function (data) {
        console.log(data);
        $("#clearBtn").show();
        $("#crud-title").val(data.title);
        $("#crud-description").val(data.content);
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
    $(document).on("click", ".btn-del", deleteStory);
    $(document).on("click", ".btn-edit", editBtnClicked);
    // Create Form Submission
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