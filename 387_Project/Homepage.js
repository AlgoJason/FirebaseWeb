 var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    console.log(user);
    // User is signed in.
    // User is signed in.
         var displayName = user.displayName;
         var email = user.email;
         var isAnonymous = user.isAnonymous;
         var uid = user.uid;
         var refreshToken = user.refreshToken;
         var providerData = user.providerData;
         // [START_EXCLUDE silent]
         firebase.database().ref('user').child(uid).on('value', function(snapshot) {
    var IsAdmin = snapshot.val().IsAdmin;
    var IsStaff = snapshot.val().IsStaff;
    var username = snapshot.val().DisplayName;
    console.log(IsAdmin);
    console.log(IsStaff);
    console.log(username);
     $('#welcome').append("Welcome user: " + username);
    if(IsAdmin == false){
       $("#createForm").hide();
    }else if(IsStaff == false){
       $("#createForm").hide();
    }
});
         console.log(uid);
         console.log(email);





  } else {
    // No user is signed in.
  }
});


function logout(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  window.location.href = "login.html";
}).catch(function(error) {
  // An error happened.
});
}//end function
