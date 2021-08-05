let googleUserId = "";
let nId = "";
let googleUser;
let cards = ``

let destinationChoice = "";
let startDate = "";
let endDate = "";

destinationChoice = document.querySelector("#destinationChoice");
startDate = document.querySelector("#startDate");
endDate = document.querySelector("#endDate");
tripDetailSection = document.querySelector("#tripDetails");
destinationPicture = document.querySelector("#destinationImage");
destinationTitle = document.querySelector("#tripTitle");
destinationDates = document.querySelector("#tripDates");

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
  console.log("Destination: " + destinationChoice.value);
  console.log(googleUserId);

  console.log("removing hidden");
  console.log("Start Date: " + endDate.value);
  document.getElementById("beginTrip").disabled = true;
  tripDetailSection.classList.remove("hidden");
  destinationTitle.innerHTML = "Trip to " + destinationChoice.value;
  destinationDates.innerHTML = "Dates: " + startDate.value + " to " + endDate.value;

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
        "&maxwidth=700&maxheight=700";

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

        let placeDetailsQuery = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=points+of+interest+in+' + destPic + '&rankby=prominence&type=tourist_attraction&key=' + myKey;
        fetch(proxyurl + placeDetailsQuery)
        .then((response) => response.json())
        .then((placeSearchJson) => {
            console.log("IM HERE:" + placeSearchJson);
            for(let i = 0; i < 2; i++){
                let placeName = placeSearchJson.results[i].name;
                let placeAddress = placeSearchJson.results[i].formatted_address;
                let placeRating = placeSearchJson.results[i].rating;
                let photoReference2 = placeSearchJson.results[i].photos[0].photo_reference;
                console.log("Place Name: " + placeName);
                console.log("Place Address: " + placeAddress);
                console.log("Place Rating: " + placeRating);
                console.log("Place Photo Ref: " + photoReference2);
                let photoQuery2 =
                    "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
                    photoReference2 +
                    "&key=" +
                    myKey +
                    "&maxwidth=400&maxheight=400";

                fetch(proxyurl + photoQuery2)
                .then((response) => response.blob())
                .then((images) => {
                    console.log(images);
                    var img2 = URL.createObjectURL(images);
                    console.log("Image Again: " + img2);
                    //cards += createCard(placeName, placeAddress, placeRating, img2);
                    //console.log(cards);                    
                });
                
            }
            //console.log(cards);
            //document.querySelector('#app').innerHTML = cards;
            
        });
    });


function createCard (name, address, rating, placePhoto) {
    console.log("hello this function is called");
    return `
    <div class="column is-one-quarter">
      <div class="card" >
        <header class="card-header">
          <p class="card-header-title">${name}</p>
        </header>
        <div class="card-content">
          <div class="content">${address}</div>
        </div>
      </div>
    </div>
  `;

}






}


