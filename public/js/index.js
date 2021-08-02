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
