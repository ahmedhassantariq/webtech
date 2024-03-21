// Function to fetch and display stories
function displayStories() {
    $.ajax({
      url: "http://localhost:8080/api/user/getUsers",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var accountList = $("#accountList");
        accountList.empty();
  
        $.each(data, function (index, account) {
          accountList.append(
            `<div class="mb-3">
                  <h3>${account.firstName} ${account.lastName}</h3>
                  <div><h5>Account Number</h5>${account.accountNumber}</div>
                  <div><h5>Account Balance</h5>${account.accountBalance}</div>
                  <div class='man-button-container'>
                  <button class="edit-button" data-accountNumber="${account.accountNumber}">Edit</button>
                  <button class="delete-button" data-accountNumber="${account.accountNumber}">Delete</button>

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
    $.ajax
    ({
     

      type: "POST",
      url: "http://localhost:8080/api/user/delete",
      data: JSON.stringify({
          "accountNumber": accountNumber,  
      }),

      contentType: "application/json; charset=utf-8",
      dataType: "json",
  

      success: function () {
        displayStories();
        console.log("Successfully Deleted " + accountNumber)
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }
  function handleFormSubmission(event) {
    event.preventDefault();
    let storyId = $("#createBtn").attr("data-id");
    var firstName = $("#crud-firstName").val();
    var lastName = $("#crud-lastName").val();
    var user_email = $("#crud-email").val();
    if (storyId) {
      $.ajax({

        type: "POST",
        url: "http://localhost:8080/api/user",
        data: JSON.stringify(
          {
            "firstName":firstName,
            "lastName":lastName,
            "otherName":"-",
            "gender":"male",
            "address":"1234Street, Marvel colony, andromeda, universe",
            "stateOfOrigin":"Abia",
            "accountBalance":"2000",
            "email":user_email,
            "phoneNumber":"03364042531",
            "alternativePhoneNumber":"03271255557",
            "dateOfBirth":"2002:07-20"
        }
        ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function () {
          displayStories();
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    } else {

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/user",
        data: JSON.stringify(
          {
            "firstName":firstName,
            "lastName":lastName,
            "otherName":"-",
            "gender":"male",
            "address":"1234Street, Marvel colony, andromeda, universe",
            "stateOfOrigin":"Abia",
            "accountBalance":"2000",
            "email":user_email,
            "phoneNumber":"03364042531",
            "alternativePhoneNumber":"03271255557",
            "dateOfBirth":"2002:07-20"
        }
        ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",


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
    let accountNo = $(this).attr("data-accountNumber");
    console.log(accountNo)
    $.ajax({
              
      type: "GET",
        url: "http://localhost:8080/api/user/nameEnquiry",
        data: JSON.stringify(
          {
            "accountNumber":accountNo,
        }
        ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",


      success: function (data) {
        console.log(data);
        $("#clearBtn").show();
        $("#crud-firstName").val(data.firstName);
        $("#crud-lastName").val(data.lastName);
        $("#createBtn").html("Update");
        $("#createBtn").attr("data-id", data.accountNumber);
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