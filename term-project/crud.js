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



function handleFormUpdate(event) {
  event.preventDefault();
  var accountNumber = $("#updateBtn").val();
  console.log(accountNumber);
  var firstName = $("#crud-firstName").val();
  var lastName = $("#crud-lastName").val();
  var user_email = $("#crud-email").val();
  if (accountNumber) {
    $.ajax({

      type: "POST",
      url: "http://localhost:8080/api/user/update",
      data: JSON.stringify(
        {
          "accountNumber":accountNumber,
          "firstName":firstName,
          "lastName":lastName,
          "email":user_email
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
      url: "http://localhost:8080/api/user/update",
      data: JSON.stringify(
        {
          "accountNumber":accountNumber,
          "firstName":firstName,
          "lastName":lastName,
          "email":user_email
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
    var accountNumber = $(this).attr("data-accountNumber");
    $("#updateBtn").val(accountNumber);
    console.log(accountNumber);
    $.ajax({
              
      type: "GET",
        url: "http://localhost:8080/api/user/nameEnquiry",
        data:{accountNumber},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      success: function (data) {

        console.log(data);
        $("#createBtn").hide();
        $("#updateBtn").show();
        
        $("#crud-firstName").val(data.firstName);
        $("#crud-lastName").val(data.lastName);
        $("#crud-email").val(data.email);
        $("#createBtn").html("Update");
        $("#createBtn").attr("data-id", data.accountNumber);
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
  $(document).ready(function () {
    displayStories();
    $(document).on("click", ".delete-button", deleteStory);
    $(document).on("click", ".edit-button", editBtnClicked);
    $(document).on("click", ".form-button-update", handleFormUpdate);
    $("#updateBtn").hide();
    $("#createForm").submit(handleFormSubmission);
    
  });