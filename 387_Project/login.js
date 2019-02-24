function validateEmailStudent(email) {
    var re = /^^[a-zA-Z0-9_.+-]+@go\.olemiss\.edu$/;
    return re.test(String(email).toLowerCase());
}
function validateEmailStaff(email) {
    var re = /^^[a-zA-Z0-9_.+-]+@olemiss\.edu$/;
    return re.test(String(email).toLowerCase());
}
function validate() {
  $("#result").text("");
  console.log('My HTML element was clicked, woot woot!');
  var email = $("#email").val();
	var password = $("#password").val();
  if (validateEmailStudent(email)) {
		//window.alert(email + " " + password);
		firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
      firebase.auth().onAuthStateChanged(function(user) {
  		  if (user) {
        	window.location = "Homepage.html";
  	 			//try to get the current user
  		  } else {
  		    // No user is signed in.
  		  }//end if
  		});
    }).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
			window.alert("Error : " + errorMessage);
		  // ...
		});

		//allow user to sign in for students



		//result popup if student is valid.
  	//window.alert(email + " is a valid student email");
  } else if (validateEmailStaff(email)) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location = "Homepage.html";
          //try to get the current user
        } else {
          // No user is signed in.
        }//end if
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
      // ...
    });
  } else {
  	window.alert(email + " is not a valid email");
  }//end if
  return false;
}


$('#login').on("click", validate);
