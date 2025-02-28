const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    KEY: "8360514294bfdc12aee448580b5b1e7b",
    URL: "https://api.themoviedb.org/3/",
  },
};

// Fetch Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  //   console.log(results);

  results.forEach((movie) => {
    const div = document.createElement("div");

    div.classList.add("card");

    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `<img
              src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
          }
            
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

//Fetch Popular shows
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  //   console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
                  src="http://image.tmdb.org/t/p/w500${show.poster_path}"
                  class="card-img-top"
                  alt="${show.title}"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.title}"
                />`
            }
            
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
          `;

    document.querySelector("#popular-shows").appendChild(div);
  });
}

//Display Movie Details
async function DisplayMovieDetails() {
  // get the id using location.search
  const movieID = window.location.search.split("=")[1];

  // console.log(movieID);
  const movie = await fetchAPIData(`movie/${movieID}`);

  // Overlay for BG image
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
              src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
                ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(" , ")}</div>
        </div>
         `;
  document.querySelector("#movie-details").appendChild(div);
}

//Display Show Details
async function DisplayShowDetails() {
  // get the id using location.search
  const showID = window.location.search.split("=")[1];

  // console.log(showID);
  const show = await fetchAPIData(`tv/${showID}`);

  // Overlay for BG image
  displayBackgroundImage("tv", show.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            show.poster_path
              ? `<img
              src="http://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
                ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">No. of Episodes:</span>${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Last Episdoe to Air:</span> ${
              show.last_episode_to_air.name
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(" , ")}</div>
        </div>
         `;
  document.querySelector("#show-details").appendChild(div);
}

// Display Backdrop on Details page
function displayBackgroundImage(type, bgPath) {
  const Overlaydiv = document.createElement("div");

  Overlaydiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${bgPath})`;
  Overlaydiv.style.backgroundSize = "cover";
  Overlaydiv.style.backgroundPosition = "center";
  Overlaydiv.style.backgroundRepeat = "no-repeat";
  Overlaydiv.style.height = "100vh";
  Overlaydiv.style.width = "100vw";
  Overlaydiv.style.position = "absolute";
  Overlaydiv.style.top = "0";
  Overlaydiv.style.left = "0";
  Overlaydiv.style.zIndex = "-1";
  Overlaydiv.style.opacity = "0.1";

  if (type == "movie") {
    document.querySelector("#movie-details").appendChild(Overlaydiv);
  } else {
    document.querySelector("#show-details").appendChild(Overlaydiv);
  }
}

async function search() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    // todo - make request and display results
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results Found");
      return;
    }

    // console.log(results);

    displaySearchResults(results);
    document.querySelector("#search-term").value = "";
  } else {
    // console.log("Hello there");
    showAlert("Please Enter a Search Term");
  }
}

function displaySearchResults(results) {
  //clear previous results
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  results.forEach((result) => {
    const div = document.createElement("div");

    div.classList.add("card");

    div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
          ${
            result.poster_path
              ? `<img
              src="http://image.tmdb.org/t/p/w500/${result.poster_path}"
              class="card-img-top"
              alt="${
                global.search.type === "movie" ? result.title : result.name
              }"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${
                global.search.type === "movie" ? result.title : result.name
              }"
            />`
          }
            
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === "movie"
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
        `;

    document.querySelector(
      "#search-results-heading"
    ).innerHTML = `<h2> showing ${results.length} results of ${global.search.totalResults} , for "${global.search.term}"</h2>`;
    document.querySelector("#search-results").appendChild(div);
  });

  displayPagination();
}

// Create and display pagination for Search
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector("#pagination").appendChild(div);

  // Disable previous and next buttons as required
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }
  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  //Next page
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}

//Display SLider movies , using swiper
async function DisplaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
    
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
                1
              )} / 10
            </h4>
    `;
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disbaleOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch data from API
async function fetchAPIData(endpoint) {
  // This is only for learning purpose in a small project .Do not make your publicly visible ever , Keep it your own server and load it here
  const API_KEY = global.api.KEY;
  const API_URL = global.api.URL;

  ShowSpinner();
  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await res.json();
  HideSpinner();
  return data;
}

// make Reuest to Search
async function searchAPIData() {
  // This is only for learning purpose in a small project .Do not make your publicly visible ever , Keep it your own server and load it here
  const API_KEY = global.api.KEY;
  const API_URL = global.api.URL;

  ShowSpinner();

  const res = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await res.json();
  HideSpinner();
  return data;
}

function ShowSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function HideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
// Highlight active
function HighlightActive() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") == global.currentPage) {
      link.classList.add("active");
    }
  });
}

function showAlert(message, className = "error") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  // console.log("Hello dude");

  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3500);
}
function addCommasToNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      DisplaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
    case "/shows":
      displayPopularShows();
      //   console.log("Shows");
      break;
    case "/movie-details.html":
      DisplayMovieDetails();
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      DisplayShowDetails();
      // console.log("TV Details");
      break;
    case "/search.html":
      // console.log("Search Page");
      search();
      break;
  }

  HighlightActive();
}
init();
