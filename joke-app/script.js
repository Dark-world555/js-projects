// Load and parse the jokes JSON data
async function loadJokes() {
    try {
        const response = await fetch('jokes.json');
        const jokes = await response.json();
        return jokes;
    } catch (error) {
        console.error('Error loading jokes:', error);
    }
}

// Display a random joke on the page
async function displayJoke() {
    const jokes = await loadJokes();
    if (jokes) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        document.getElementById('joke').textContent = randomJoke.joke;
    }
}
