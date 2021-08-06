let googleUserId = "";
let nId = "";
let googleUser;


//global variables for creating profile
let userName = "";
let userEmail = "";
let userFirstName = "";
let userLastName = "";
let userAddress = "";
let userCountry = "";
let userCity = "";
let userZipCode = "";
let userAboutMe = "";

let profileName = document.querySelector("#name-greeting");
let profileName2 = document.querySelector("#profile-name2");
let submitProfileButton = document.querySelector("#submitProfile");


//querySelectors for form values 
userName = document.querySelector("#input-username");
userEmail = document.querySelector("#input-email");
userFirstName = document.querySelector("#input-first-name");
userLastName = document.querySelector("#input-last-name");
userAddress = document.querySelector("#input-address");
userCity = document.querySelector("#input-city");
userCountry = document.querySelector("#input-country");
userZipCode = document.querySelector("#input-postal-code");
userAboutMe = document.querySelector("#about-me");


window.onload = (event) => {
  console.log("hello there");
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Logged in as: " + user.displayName);
      googleUserId = user.uid;
      googleUser = user;
      profileName.innerHTML = "   Hello, " + user.displayName;
      profileName2.innerHTML = "  " + user.displayName;
      console.log("Hello testing");
      console.log("User ID: "  + googleUserId);

      //This function controls the form information being filled in if the user profile already exists
      var ref = firebase.database().ref(`users/${googleUser.uid}`);
      ref.once("value")
        .then(function(snapshot) {
            if (snapshot.numChildren() == 1){

                document.getElementById("createProfileButton").disabled = true;
                snapshot.forEach((child) => {
                    
                    const profileData = child.val();
                    console.log(profileData);
                    
                    userAboutMe.value = profileData.aboutMe;
                    userFirstName.value = profileData.firstName;
                    userLastName.value = profileData.lastName;
                    userName.value = profileData.username;
                    userAddress.value = profileData.address;
                    userZipCode.value = profileData.zipCode;
                    userEmail.value = profileData.email;
                    userCountry.value = profileData.country;
                    userCity.value = profileData.city;

                });     
            }
            else if (snapshot.numChildren() == 0){
                console.log("doesnt exist");
            }
            
      });

    } 
    else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    } 
  });
}

function createProfile (){

      //console.log("working until here");
      console.log(userName.value);
      console.log(googleUserId);

      firebase.database().ref(`users/${googleUser.uid}`).push({
        username: userName.value,
        email: userEmail.value,
        firstName: userFirstName.value,
        lastName: userLastName.value,
        address: userAddress.value,
        city: userCity.value,
        country: userCountry.value,
        zipCode: userZipCode.value,
        aboutMe: userAboutMe.value,
      }) 
      .then(() => {
        document.getElementById("createProfileButton").disabled = true;
      }); 

}

function backToHome () {
    window.location = "userPortal.html"
}

const editProfile = () => {
  console.log("edit profile clicked");
  const editNoteModal = document.querySelector("#editNoteModal");
  const profileRef = firebase.database().ref(`users/${googleUserId}`);
  profileRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    document.querySelector("#editUserName").value = "";
    document.querySelector("#editEmail").value = userEmail;
  });
  editNoteModal.classList.toggle("is-active");
};

const submitProfile = () => {
   userName = document.querySelector("#editUserName").value;
   userEmail = document.querySelector("#editEmail").value;
  const profileEdits = {
    username: userName.value,
    email: userEmail.value,
  };
  firebase.database().ref(`users/${googleUserId}/`).update(profileEdits);
  closeEditModal();
};

const closeEditModal = () => {
  const editNoteModal = document.querySelector("#editNoteModal");
  editNoteModal.classList.toggle("is-active");
};

/* 
const editNote = (noteId) => {
    const editNoteModal = document.querySelector('#editNoteModal');
    const notesRef = firebase.database().ref(`users/${googleUserId}`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(noteId);
        const note = data[noteId];
        console.log(note);
        document.querySelector('#editTitleInput').value = note.title;
        document.querySelector('#editTextInput').value = note.text;
        document.querySelector("#editNoteId").value = noteId;

    });
    editNoteModal.classList.toggle('is-active');
}


const closeEditModal = () => {
    const editNoteModal = document.querySelector('#editNoteModal');
    editNoteModal.classList.toggle('is-active');
}

const saveEditedNote = () => {
    const noteTitle = document.querySelector("#editTitleInput").value;
    const noteText = document.querySelector("#editTextInput").value;
    const noteId = document.querySelector("#editNoteId").value;
    const noteEdits = {
        title: noteTitle,
        text: noteText
    }
    firebase.database().ref(`users/${googleUserId}/${noteId}`).update(noteEdits);
    closeEditModal();
} */
