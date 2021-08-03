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
