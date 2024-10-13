const accesskey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

//my elements
const formElment = document.querySelector("form");

const searchInputElement = document.getElementById("searchInput");
const searcgResultsElment = document.querySelector(".searchResults");
const ShowMoreButtonElment = document.getElementById("show-more-button");

//value
let inputData = "";
let page = 1;
async function searchImage() {
  inputData = searchInputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page == 1) {
    searcgResultsElment.innerHTML = "";
  }
  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searcgResultsElment.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    ShowMoreButtonElment.style.display = "block";
  }
}

formElment.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

ShowMoreButtonElment.addEventListener("click", () => {
  searchImage();
});
