/ Fetch local movie data
async function fetchMovies() {
    const searchQuery = document.getElementById("search").value.toLowerCase();

    try {
        const response = await fetch("movies.json");
        const movies = await response.json();
        
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery)
        );
        
        displayMovies(filteredMovies);
    } catch (error) {
        console.error("Error loading movie data:", error);
    }
}

// Display movie search results
function displayMovies(movies) {
    const results = document.getElementById("movie-results");
    results.innerHTML = "";

    if (movies.length === 0) {
        results.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        const { id, title, poster } = movie;
        results.innerHTML += `
            <div class="movie-card">
                <img src="${poster}" alt="${title}">
                <h2><a href="#movie/${id}">${title}</a></h2>
            </div>
        `;
    });

    handlePageLoad(); 
}

// Handle dynamic pages
function handlePageLoad() {
    const hash = window.location.hash;

    if (hash.startsWith("#movie/")) {
        const movieId = hash.split("/")[1];
        displayMovieDetails(movieId);
    }
}

// Display movie details
async function displayMovieDetails(movieId) {
    try {
        const response = await fetch("movies.json");
        const movies = await response.json();
        const movie = movies.find(m => m.id === movieId);

        if (!movie) {
            alert("Movie not found!");
            return;
        }

        const { title, overview, poster, release_date } = movie;
        
        document.getElementById("movie-results").style.display = "none";
        const details = document.getElementById("movie-details");
        details.style.display = "block";
        details.innerHTML = `
            <h1>${title}</h1>
            <img src="${poster}" alt="${title}">
            <p><b>Release Date:</b> ${release_date}</p>
            <p>${overview}</p>
            <a href="index.html">Back to Search</a>
        `;
    } catch (error) {
        console.error("Error displaying movie details:", error);
    }
}

// Listen for page load and hash changes
window.addEventListener("load", handlePageLoad);
window.addEventListener("hashchange", handlePageLoad);
