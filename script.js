// Example function to fetch movies (mock data for now)
function fetchMovies() {
    const searchQuery = document.getElementById('search').value;
    
    // Mock API response (replace this with a real API later)
    const mockMovies = [
        { title: "Movie 1", revenue: "$100M" },
        { title: "Movie 2", revenue: "$200M" },
    ];

    // Filter and display movies
    const results = document.getElementById("movie-results");
    results.innerHTML = ""; // Clear previous results

    const filteredMovies = mockMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredMovies.length === 0) {
        results.innerHTML = `<p>No movies found</p>`;
    } else {
        filteredMovies.forEach(movie => {
            results.innerHTML += `
                <div>
                    <h2>${movie.title}</h2>
                    <p>Revenue: ${movie.revenue}</p>
                </div>
            `;
        });
    }
}

