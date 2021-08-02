let googleUserId = "";
let nId = "";
let googleUser;
let userName = "";
let userEmail = "";

let profileName = document.querySelector("#name-greeting");
let profileName2 = document.querySelector("#profile-name2");
let submitProfileButton = document.querySelector("#submitProfile");

window.onload = (event) => {
  console.log("hello there");
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Logged in as: " + user.displayName);
      googleUserId = user.uid;
      googleUser = user;
      profileName.innerHTML = "Hello, " + user.displayName;
      profileName2.innerHTML = user.displayName;

      userName = document.querySelector("#input-username");
      userEmail = document.querySelector("#input-email");
      const userFirstName = document.querySelector("#input-first-name");
      const userLastName = document.querySelector("#input-last-name");
      const userAddress = document.querySelector("#input-address");
      const userCity = document.querySelector("#input-city");
      const userCountry = document.querySelector("#input-country");
      const userZipCode = document.querySelector("#input-postal-code");
      const userAboutMe = document.querySelector("#about-me");
      console.log("Hello testing");

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
      });
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};

/* function editProfile () {

    console.log("edit profile clicked");
    //1. Capture the form data
    const userName = document.querySelector('#input-username');
    const userEmail = document.querySelector('#input-email');
    const userFirstName = document.querySelector('#input-first-name');
    const userLastName = document.querySelector('#input-last-name');
    const userAddress = document.querySelector('#input-address');
    const userCity = document.querySelector('#input-city');
    const userCountry = document.querySelector('#input-country');
    const userZipCode = document.querySelector('#input-postal-code');
    const userAboutMe = document.querySelector('#about-me');
    console.log("Hello testing");
    //2. format the data and write it to the database
    firebase.database().ref(`users/${googleUser.uid}`).push({
        username: userName.value,
        email: userEmail.value,
        firstName: userFirstName.value,
        lastName: userLastName.value,
        address: userAddress.value,
        city: userCity.value,
        country: userCountry.value,
        zipCode: userZipCode.value,
        aboutMe: userAboutMe.value
    })
    .then(() => {
    userName.value = "";
    userCity.value = "";
    });
    
} */

const editProfile = () => {
  console.log("edit profile clicked");
  const editNoteModal = document.querySelector("#editNoteModal");
  const profileRef = firebase.database().ref(`users/${googleUserId}`);
  profileRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    document.querySelector("#editUserName").value = userName;
    document.querySelector("#editEmail").value = userEmail;
  });
  editNoteModal.classList.toggle("is-active");
};

const submitProfile = () => {
  const userName = document.querySelector("#editUserName").value;
  const userEmail = document.querySelector("#editEmail").value;
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
