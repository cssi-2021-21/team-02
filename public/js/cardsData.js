let cardsData2 = [];

firebase
  .database()
  .ref("users")
  .on("value", (snapshot) => {
    cardsData.length = 0;
    const data = snapshot.val();
    for (let key in data) {
      const userData = data[key];
      let name = "Guest 1531";
      for (let key2 in userData) {
        // grab user name
        let map = userData[key2];
        if ("firstName" in map) {
          // user data
          name = map["firstName"] + " " + map["lastName"];
          break;
        }
      }

      for (let key2 in userData) {
        let map = userData[key2];
        if (!("firstName" in map)) {
          console.log(name, map);
          let card = {
            id: 1,
            image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
            avatar: loadImages()
            user: {
              handle: name,
              title: map["destination"],
            },
            content: "From: " + map["firstDate"] + " to " + map["lastDate"],
          };
          cardsData2.push(card);
        }
      }
    }
  });

const loadImages = () => {
  console.log("LOAD IMAGES");

  let myKey = "AIzaSyDhcyOsHp-sFAtQhsTahxpCRGfCHfxphYY";
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
          return img;
        });
    });

var app = new Vue({
  el: "#app",
  data: {
    cardData: cardsData2,
  },
});
