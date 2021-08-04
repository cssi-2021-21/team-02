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
destinationPicture = document.querySelector("#destinationImage");

window.onload = (event) => {
  console.log("trip planner page loaded");
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Logged in as: " + user.displayName);
      googleUserId = user.uid;
      googleUser = user;
      console.log("Hello testing");
      console.log("User ID: " + googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};

const uploadTrip = (obj) => {
  firebase.database().ref(`users/${googleUser.uid}`).push(obj);
};

function createTrip() {
  //console.log("working until here");
  console.log(destinationChoice.value);
  console.log(googleUserId);

  console.log("removing hidden");
  tripDetailSection.classList.remove("hidden");

  let myKey = "AIzaSyDhcyOsHp-sFAtQhsTahxpCRGfCHfxphYY";
  let destPic = destinationChoice.value;
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  let myQuery =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
    destPic +
    "&key=" +
    myKey +
    "&inputtype=textquery&fields=name,photos";
  fetch(proxyurl + myQuery, {
    //mode: 'no-cors'
  })
    .then((response) => response.json())
    .then((myjson) => {
      let photoRef = myjson.candidates[0].photos[0];
      console.log(photoRef);
      let photoreference = myjson.candidates[0].photos[0].photo_reference;
      console.log(photoreference);
      let myQuery2 =
        "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
        photoreference +
        "&key=" +
        myKey +
        "&maxwidth=400&maxheight=400";

      fetch(proxyurl + myQuery2)
        .then((response) => response.blob())
        .then((images) => {
          console.log(images);
          var img = URL.createObjectURL(images);
          console.log("Image: " + img);
          destinationPicture.src = img;
          let tripObj = {
            destination: destinationChoice.value,
            firstDate: startDate.value,
            lastDate: endDate.value,
          };
          uploadTrip(tripObj);
        });
    });
  // .then(() => {
  //   firebase.database().ref(`users/${googleUser.uid}`).push({
  //     destination: destinationChoice.value,
  //     firstDate: startDate.value,
  //     lastDate: endDate.value,
  //     imgURL: img,
  //   });
  // });

  // firebase
  //   .database()
  //   .ref(`users/${googleUser.uid}`)
  //   .push({
  //     destination: destinationChoice.value,
  //     firstDate: startDate.value,
  //     lastDate: endDate.value,
  //   })
  //   .then(() => {
  //     console.log("removing hidden");
  //     tripDetailSection.classList.remove("hidden");

  //     let myKey = "AIzaSyDhcyOsHp-sFAtQhsTahxpCRGfCHfxphYY";
  //     let destPic = destinationChoice.value;
  //     const proxyurl = "https://cors-anywhere.herokuapp.com/";

  //     let myQuery =
  //       "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
  //       destPic +
  //       "&key=" +
  //       myKey +
  //       "&inputtype=textquery&fields=name,photos";
  //     fetch(proxyurl + myQuery, {
  //       //mode: 'no-cors'
  //     })
  //       .then((response) => response.json())
  //       .then((myjson) => {
  //         let photoRef = myjson.candidates[0].photos[0];
  //         console.log(photoRef);
  //         let photoreference = myjson.candidates[0].photos[0].photo_reference;
  //         console.log(photoreference);
  //         let myQuery2 =
  //           "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
  //           photoreference +
  //           "&key=" +
  //           myKey +
  //           "&maxwidth=400&maxheight=400";

  //         fetch(proxyurl + myQuery2)
  //           .then((response) => response.blob())
  //           .then((images) => {
  //             console.log(images);
  //             var img = URL.createObjectURL(images);
  //             console.log("Image: " + img);
  //             destinationPicture.src = img;
  //           });
  //       });
  //   });
}

/*submitButton.addEventListener("click", (e) => {
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
}); */
