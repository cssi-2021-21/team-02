let cardsData = [
  {
    id: 1,
    image: "https://media.timeout.com/images/105122240/1372/1029/image.jpg",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      handle: "Divya",
      title: "Melbourne",
    },
    content: "From 8/5 to 8/11",
  },
  {
    id: 1,
    image: "https://media.timeout.com/images/105403923/1372/1029/image.jpg",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      handle: "David",
      title: "Berlin",
    },
    content: "From 9/11 to 9/27",
  },
  {
    id: 1,
    image:
      "https://media.timeout.com/images/105404089/1372/1029/image.jpghttps://source.unsplash.com/h-ACUrBngrw/1280x720",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      handle: "David",
      title: "Tokyo",
    },
    content: "From 10/27 to 11/02",
  },
  {
    id: 1,
    image: "https://media.timeout.com/images/105403930/1372/1029/image.jpg",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      handle: "Nithila",
      title: "Paris",
    },
    content: "From 12/12 to 12/14",
  },
  {
    id: 1,
    image:
      "https://static.onecms.io/wp-content/uploads/sites/28/2021/02/19/new-york-city-evening-NYCTG0221.jpg",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      handle: "David",
      title: "New York City",
    },
    content: "From 8/11 to 8/12",
  },
  {
    id: 1,
    image: "https://media.timeout.com/images/105403950/1372/1029/image.jpg",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      handle: "Nithila",
      title: "Mumbai",
    },
    content: "From 9/5 to 9/15",
  },
];

// let card = {
//   id: 1,
//   image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
//   avatar:
//     "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
//   user: {
//     handle: name,
//     title: "Tokyo",
//   },
//   content: "From: 8/5 to 8/11",
// };
// cardsData.push(card);

const loadFirebase = () => {
  firebase
    .database()
    .ref("users")
    .on("value", async (snapshot) => {
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
            let img = await loadImages(map["destination"]);
            let card = {
              id: 1,
              image: img,
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
};

const loadImages = async (destination) => {
  let myKey = "AIzaSyDhcyOsHp-sFAtQhsTahxpCRGfCHfxphYY";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  let myQuery =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
    destination +
    "&key=" +
    myKey +
    "&inputtype=textquery&fields=name,photos";

  let resp = await fetch(proxyurl + myQuery);
  console.log(resp);
  let myjson = await resp.json();
  console.log(myjson);

  // let photoRef = myjson.candidates[0].photos[0];
  let photoreference = myjson.candidates[0].photos[0].photo_reference;
  let myQuery2 =
    "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
    photoreference +
    "&key=" +
    myKey +
    "&maxwidth=400&maxheight=400";

  let images = await (await fetch(proxyurl + myQuery2)).blob();

  var img = URL.createObjectURL(images);
  console.log("Image: ", img);

  return img;
};

// loadFirebase();

var app = new Vue({
  el: "#app",
  data: {
    cardData: cardsData,
  },
});
