let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Logged in as: " + user.displayName);
      document.querySelector("#signInButton").classList.add("is-hidden");
      document.querySelector("#gotoPortalButton").classList.remove("is-hidden");
      googleUserId = user.uid;
    } else {
      console.log("not logged in");
      // show button to user portal
    }
  });
};

const heartClicked = () => {
  // toggle heart
  let heartButton = document.querySelector("#heartButton");
  // check if it's filled
  if (!heartButton.innerHTML.includes("border")) {
    heartButton.innerHTML = `<i class="material-icons" style="color: red">favorite_border</i>`;
  } else {
    heartButton.innerHTML = `<i class="material-icons" style="color: red">favorite</i>`;
  }
  // TODO: database stuff
  console.log("heart toggled");
};
