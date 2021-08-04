let cardsData = [];

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
          let card = {
            id: 1,
            image: loadImages(map["destination"]),
            avatar:
              "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
            user: {
              handle: name,
              title: map["destination"],
            },
            content: "From: " + map["firstDate"] + " to " + map["lastDate"],
          };
          cardsData.push(card);
        }
      }
    }
  });

const loadImages = (destination) => {
  let myKey = "AIzaSyDhcyOsHp-sFAtQhsTahxpCRGfCHfxphYY";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  let myQuery =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
    destination +
    "&key=" +
    myKey +
    "&inputtype=textquery&fields=name,photos";
  fetch(proxyurl + myQuery, {
    //mode: 'no-cors'
  })
    .then((response) => response.json())
    .then((myjson) => {
      let photoRef = myjson.candidates[0].photos[0];
      let photoreference = myjson.candidates[0].photos[0].photo_reference;
      let myQuery2 =
        "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
        photoreference +
        "&key=" +
        myKey +
        "&maxwidth=400&maxheight=400";

      fetch(proxyurl + myQuery2)
        .then((response) => response.blob())
        .then((images) => {
          var img = URL.createObjectURL(images);
          console.log("Image: ", img);
          return img;
        });
    });
};

var app = new Vue({
  el: "#app",
  data: {
    cardData: cardsData,
  },
});
