var submitBtn = document.getElementById("submitBtn");

var Email = document.getElementById("emailAddress");
var Password = document.getElementById("regPassword");
var FirstName = document.getElementById("firstName");
var LastName = document.getElementById("lastName");
var OleMissID = document.getElementById("olemissID");
var userDisplayName;
var fb = firebase.database();


function submitClick() { //writes to the databases

  //create user
  userEmail = Email.value
  userPassword = Password.value
  userFirstName = FirstName.value
  userLastName = LastName.value
  userOleMissID = OleMissID.value
  userDisplayName = (userFirstName + " " + userLastName);
  console.log(userDisplayName);
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(function(user) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var userAdmin;
        var userStaff;
        if (document.getElementById("student").checked) {
          userAdmin = false
          userStaff = false
        } else if (document.getElementById("staff").checked) {
          userAdmin = false
          userStaff = true
        } else if (document.getElementById("admin").checked) {
          userAdmin = true
          userStaff = true
        } else {
          window.alert("check a button");
        } //end if
        fb.ref().child("/user").child(user.uid).set({
          Email: userEmail,
          Password: userPassword,
          DisplayName: userDisplayName,
          OleMissID: userOleMissID,
          IsAdmin: userAdmin,
          IsStaff: userStaff
        });
        window.location = "Homepage.html";
      } else {
        // No user is signed in.
      } //end if
    }); //end onauth
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert("Error: " + errorMessage);
  });

} //submiteClick()
