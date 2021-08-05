console.log("code running.")
const heartClicked = (id) => {
  // toggle heart
  let heartButton = document.querySelector(`#${id}`);
  // check if it's filled
  if (!heartButton.innerHTML.includes("border")) {
    heartButton.innerHTML = `<i class="material-icons" style="color: red">favorite_border</i>`;
  } else {
    heartButton.innerHTML = `<i class="material-icons" style="color: red">favorite</i>`;
  }
  // TODO: database stuff
  console.log("heart toggled");
};

//Get elements

var fileButton = document.getElementById('file-upload');

//Listen for File Selection

fileButton.addEventListener('change', function(e) {
    //Get file
    var file = e.target.files[0];
    console.log(file);
    var read = new FileReader();

    read.readAsBinaryString(file);
    console.log("Contents of file found");
    read.onloadend = function(){
      console.log(read.result);
      //Create a storage reference
    var storageRef = firebase.storage().ref('user_uploads/' + file.name);

    //Upload file
    storageRef.put(file);

    console.log("File Uploaded!");
    }
});