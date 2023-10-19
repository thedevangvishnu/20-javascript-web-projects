const imagesContainer = document.getElementById("images-container");

let photosList = [];

// set up Unsplash API
const count = 10;
const orientation = "squarish";
const apiKey = "nArCar94yh9oho5cd9dSvFQte1TJUYWQ14AubyY2c3M";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=${orientation}`;

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = () => {
  photosList.forEach((photo) => {
    const { links, urls, alt_description } = photo;
    // for each photo create a new image element (inside <a> tag) and provide values for its attributes and apend each of them to the imageContainer
    const item = document.createElement("a");
    // item.setAttribute("href", links.html);
    setAttributes(item, {
      href: links.html,
      target: "_blank",
    });

    const image = document.createElement("img");
    // image.setAttribute("src", urls.regular);
    // image.setAttribute("alt", alt_description);
    // image.setAttribute("title", alt_description);
    setAttributes(image, {
      src: urls.regular,
      alt: alt_description,
      title: alt_description,
    });

    item.appendChild(image);

    imagesContainer.appendChild(item);
    // console.log("done");
  });
};

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosList = await response.json();
    displayPhotos();
    console.log(photosList);
  } catch (error) {
    console.log("Error fetching images from API");
  }
};

getPhotos();
