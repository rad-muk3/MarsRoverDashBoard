// Global variables

const divPictElem = document.getElementById('imageDiv-elem');
const homeImage = document.getElementById('main-jumboImage')

window.onload = function() {
  renderRoverMenu();
  renderRoverImage(divPictElem, state);
}
//store Immutable Object
let state = {
  roverSelected: '',
  rovers: Immutable.List(['Curiosity', 'Spirit', 'Opportunity']),
}


/**
 * @description Dynamic Responsive MenuBar to select Rovers to display which Rover Info to see.
 *
 */

const renderRoverMenu = () => {
  const menuContainer = document.getElementById('rMenuItems');
  let menuUI = '';
  menuUI += `<ul class="navbar-nav">
    <li class="nav-item">
    <button id="home" class="nav-link">Home</button></li>`;
  state.rovers.map((name) => {
    return menuUI += `<li class="nav-item">
      <button class="nav-link rovers" data-name="${name}">${name}</button>
      </li>`;
  });
  menuUI += `</ul>`
  menuContainer.innerHTML = menuUI;
  const menuTabsArray = document.getElementsByClassName('nav-link rovers');
  for (let i = 0; i < menuTabsArray.length; i++) {
    menuTabsArray[i].addEventListener('click', loadRover);
  }

  const homeTab = document.getElementById('home');
  homeTab.addEventListener('click', reloadHome);
}

const renderRoverImage = async (divPictElem, state) => {
  divPictElem.innerHTML = startApp(state);
}

const startApp = (state) =>
  showRovers(state);

const updateState = (state, newState) => {
  state = Object.assign(state, newState);
  showRovers(state);
};

/**
 *@description reloadHome reloads the Home Page
 *
 *
 */
function reloadHome() {
  const backHome = (divPictElem, renderJumboImg) => {
    return divPictElem.innerHTML =
      `
        <div>
        ${renderJumboImg()}
        </div>
        `
  };

  const renderJumboImg = () => `
    <div id="main-jumboImage" class="bg-cover text-white">
    <div class="container">
      <h1 class="display-4">MarsRover DashBoard</h1>
      <p class="lead">Ready to Journey?Select a Mars Rover to go Above and Beyond!</p>
      <hr class="my-4">
    </div>

  </div>`
  backHome(divPictElem, renderJumboImg);
}

/**
 *@description loadRover gets the name of the selected Rover
 *
 */

function loadRover() {
  //Get the name of the selected rover
  state.roverSelected = this.dataset.name;

  //Call to backend through API
  getRoversDataInfo(state);
}

/**
 *@description shows selected Rovers images and their data got from backend in rows
 *@params{object} store state of Rover Object
 *@returns if rover selected, create a grid of Rover images or asks user to select Rover
 */
function showRovers(state) {

  if (!state.roverSelected) {
    return (`<div class="text-center font-weight-small">
                    Please select a Rover from the menu
                </div>`);
  } else {

    homeImage.style.display = 'none';
    //Get the rover photos from API
    const photos = state.state.latest_photos;
    /// Map photo URLS to be dispayed on the page
    const apiPhotos = photos.map(photo => photo.img_src);
    // Store rover data inside an object to be dispayed on the page
    const data = {
      name: photos[0].rover.name,
      launchDate: photos[0].rover.launch_date,
      landingDate: photos[0].rover.landing_date,
      missionStatus: photos[0].rover.status,
      photoDate: photos[0].earth_date
    }


    //Display the selected Rover data on the HTML Page
    const displayRoverData = () =>
      `<img src="./assets/${state.roverSelected}.jpeg" class="mx-auto d-block" style="width:50%"alt="image rover">
            <div id="rData-info">
                <h2 class="text-center font-weight-bold">Name: ${data.name}</h2>
                <h4 class="text-center font-weight-normal">Launch date: ${data.launchDate}</h2>
                <h4 class="text-center font-weight-normal">Landing date: ${data.landingDate}</h2>
                <h4 class="text-center font-weight-normal">Mission status: ${data.missionStatus}</h2>
            </div>
        `;

    return divPictElem.innerHTML = (`
            <div id="rover-container">
                <div id="rover">
                    ${displayRoverData()}
                </div>
                <div class="container">
                    ${createRoverImgGrid(state.roverSelected,  apiPhotos, showRoverImg)}
                </div>
            </div>
            `);
  }

}

/**
 *@description a HOF that creates a row to display the set of rover images
 *@params{store} rover state object
 *@params{rArray} array of rover images got from the apiPhotos
 *
 */

const createRoverImgGrid = (state, rArray, showRoverImg) => {
  return (`
      <div class='row'>

            ${showRoverImg(state, rArray)}

      </div>
`)
}

/**
 *@description displays the array of rover images mapped to APIs
 *@params{object} rover state Object
 *@params{string} array of rover images
 */
const showRoverImg = (state, rArray) => {
  if (rArray.length < 3) {
    const images = rArray.map((roverApi) => {
      return (`
                    <div id="img-box" class="col-sm">
                        <img src="${roverApi}" alt="Photo from ${name}" width="auto" height="400" style="border: 2px solid white;">
                    </div>
                    `);
    });
    return images.reduce((a, b) => a + b);
  }
  const images = rArray.map((roverApi) => {
    return (`
                <div id="img-box" class="col-sm-4">
                    <img src="${roverApi}" alt="Image from Mars taken by the ${state} Rover"/>
                </div>
                `);
  });
  return images.reduce((a, b) => a + b);
}

/**
 *@description getRoversDataInfo fetches rover data from Api and updates state
 *@params{object} rover state object
 *
 */

const getRoversDataInfo = (state) => {
  fetch(`rover-photos/${state.roverSelected}`)
    .then(res => res.json())
    .then(roverData => updateState(state, roverData));
}
