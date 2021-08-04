// TOOD: Load card data from firebase

let cardsData = [
  {
    id: 1,
    image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      name: "Okinami",
      handle: "twitterid",
      title: "Lead Developer",
    },
    content:
      "The Beast stumbled in the dark for it could no longer see the path. It started to fracture and weaken, trying to reshape itself into the form of metal. Even the witches would no longer lay eyes upon it, for it had become hideous and twisted.",
  },
  {
    id: 1,
    image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      name: "Okinami",
      handle: "twitterid",
      title: "Lead Developer",
    },
    content:
      "The Beast stumbled in the dark for it could no longer see the path. It started to fracture and weaken, trying to reshape itself into the form of metal. Even the witches would no longer lay eyes upon it, for it had become hideous and twisted.",
  },
  {
    id: 1,
    image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      name: "Okinami",
      handle: "twitterid",
      title: "Lead Developer",
    },
    content:
      "The Beast stumbled in the dark for it could no longer see the path. It started to fracture and weaken, trying to reshape itself into the form of metal. Even the witches would no longer lay eyes upon it, for it had become hideous and twisted.",
  },
  {
    id: 1,
    image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      name: "Okinami",
      handle: "twitterid",
      title: "Lead Developer",
    },
    content:
      "The Beast stumbled in the dark for it could no longer see the path. It started to fracture and weaken, trying to reshape itself into the form of metal. Even the witches would no longer lay eyes upon it, for it had become hideous and twisted.",
  },
  {
    id: 1,
    image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      name: "Okinami",
      handle: "twitterid",
      title: "Lead Developer",
    },
    content:
      "The Beast stumbled in the dark for it could no longer see the path. It started to fracture and weaken, trying to reshape itself into the form of metal. Even the witches would no longer lay eyes upon it, for it had become hideous and twisted.",
  },
  {
    id: 1,
    image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      name: "Okinami",
      handle: "twitterid",
      title: "Lead Developer",
    },
    content:
      "The Beast stumbled in the dark for it could no longer see the path. It started to fracture and weaken, trying to reshape itself into the form of metal. Even the witches would no longer lay eyes upon it, for it had become hideous and twisted.",
  },
  {
    id: 1,
    image: "https://source.unsplash.com/h-ACUrBngrw/1280x720",
    avatar:
      "https://banner2.cleanpng.com/20190221/gw/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efd8fecb7.6156919015508108775895.jpg",
    user: {
      name: "Okinami",
      handle: "twitterid",
      title: "Lead Developer",
    },
    content:
      "The Beast stumbled in the dark for it could no longer see the path. It started to fracture and weaken, trying to reshape itself into the form of metal. Even the witches would no longer lay eyes upon it, for it had become hideous and twisted.",
  },
];

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
            avatar: map["imgURL"],
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

var app = new Vue({
  el: "#app",
  data: {
    cardData: cardsData2,
  },
});
