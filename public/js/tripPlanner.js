let googleUserId = "";
let nId = "";
let googleUser;

let destinationChoice = "";
let startDate = "";
let endDate = "";

destinationChoice = document.querySelector("#destinationChoice");
startDate = document.querySelector("#startDate");
endDate = document.querySelector("#endDate");

window.onload = (event) => {
  console.log("trip planner page loaded");
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Logged in as: " + user.displayName);
      googleUserId = user.uid;
      googleUser = user;
      profileName.innerHTML = "Hello, " + user.displayName;
      profileName2.innerHTML = user.displayName;
      console.log("Hello testing");
      console.log("User ID: "  + googleUserId);

    } 
    else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    } 
  });
};

function createTrip () {

      //console.log("working until here");
      console.log(destinationChoice.value);
      console.log(googleUserId);

      firebase.database().ref(`users/${googleUser.uid}`).push({
        destination: destinationChoice.value,
        firstDate: startDate.value,
        lastDate: endDate.value
      }) 
      .then(() => {
        
      }); 

}