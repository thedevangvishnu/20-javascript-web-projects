const imagesContainer = document.getElementById("images-container"),
  loader = document.getElementById("loader");

let readyToLoad = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosList = [];

// set up Unsplash API
const count = 30;
const apiKey = "nArCar94yh9oho5cd9dSvFQte1TJUYWQ14AubyY2c3M";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if each image was loaded
const loadImage = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    readyToLoad = true;
    loader.hidden = true;
  }
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosList.length;
  photosList.forEach((photo) => {
    const { links, urls, alt_description } = photo;
    // for each photo create a new image item element (<a> tag) and provide values for its attributes and apend each of them to the imagesContainer
    const item = document.createElement("a");
    setAttributes(item, {
      href: links.html,
      target: "_blank",
    });

    const image = document.createElement("img");
    setAttributes(image, {
      src: urls.regular,
      alt: alt_description,
      title: alt_description,
    });

    image.addEventListener("load", loadImage);

    item.appendChild(image);
    imagesContainer.appendChild(item);
  });
};

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosList = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("Error fetching images from API");
  }
};

// infinite scroll when reaching the bottom of the window
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToLoad
  ) {
    readyToLoad = false;
    getPhotos();
  }
});

getPhotos();
