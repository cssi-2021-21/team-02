//This section is the Bulma Template JS for the tabs and navigation

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() { toggleTab(this.id, this.dataset.target); }
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}



//This section has our code

const signOut = () => {
    firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location = 'index.html';
    console.log("sign out clicked");
    }).catch((error) => {
    //An error happened.
    //Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    const err = {
      errorCode,
      errorMessage,
      email,
      credential
    };
    console.log(err);
    });

}