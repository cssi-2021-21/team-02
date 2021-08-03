let googleUserId = "";
let nId = "";
let googleUser;

let destinationChoice = "";
let startDate = "";
let endDate = "";

destinationChoice = document.querySelector("#destinationChoice");
startDate = document.querySelector("#startDate");
endDate = document.querySelector("#endDate");
tripDetailSection = document.querySelector("#tripDetails");

window.onload = (event) => {
  console.log("trip planner page loaded");
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Logged in as: " + user.displayName);
      googleUserId = user.uid;
      googleUser = user;
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
        console.log("removing hidden");
        tripDetailSection.classList.remove("hidden");

        let myKey = 'AIzaSyDhcyOsHp-sFAtQhsTahxpCRGfCHfxphYY';
        let destPic = destinationChoice.value;

        let myQuery = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + destPic + ', IL&key=' + myKey + '&inputtype=textquery&fields=name,photos';

      }); 

}

submitButton.addEventListener("click", (e) => {
  let myKey = 'amaZYdG5z8O5726r5QxdDAv2MYEw3vpY';
  let topicChoice = queryField.value;
  console.log(topicChoice);
  topicText.innerHTML = "Topic: " + topicChoice;
  document.getElementById("answerSubmit").disabled = false;
  for (let i = 0; i < topicArray.length; i++){
    for (let j = 0; j < topicArray[i].length; j++){
      console.log(topicArray[i][j]);
      var questionText = "";
      if (topicArray[i][j] == topicChoice){
        let topicID = topicArray[i][j+1];
        console.log(topicID);
        let myQuery = `https://jservice.io/api/clues?category=` + topicID; 
        fetch(myQuery)
          .then(response => response.json())
          .then(myjson => {
          console.log(myjson[0].question); 
          const questionText = myjson[0].question;
          actualQuestion.innerHTML = questionText;
        });
        
    } 
  }
}
});


