document.getElementById("search-button").addEventListener("click", async () => {
    // Get input data from search bar
    const input = document.getElementById("search").value.trim();
    // Select the container to display the data
    const container = document.querySelector(".pokedex-container");
    // Clear the container to remove previous results or error messages
    container.innerHTML = "";

    if (!input) {
        // If the input is empty, display an error message
        container.innerHTML = "<p class='error'>Please enter a Pokémon name or ID.</p>";
        return;
    }

    try {
        // Fetch the Pokémon data from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
        if (!response.ok) {
            // If the response is not ok, display an error message
            container.innerHTML = "<p class='error'>Pokémon not found. Please try again.</p>";
            return;
        }
        const data = await response.json();
        displayPokemon(data); // Call the function to display Pokémon data
    } catch (error) {
        // If there is an error, display an error message
        container.innerHTML = "<p class='error'>An error occurred. Please try again later.</p>";
        console.error("Error fetching Pokémon data:", error);
    }
});

// Function to display Pokémon data
function displayPokemon(data) {
    // was struggling to find the error was missing "." for pokedex-container because i declared it as a class in html//
    const container = document.querySelector(".pokedex-container");

    // Capitalize the first letter of the Pokémon name
    const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    // Get the Pokémon image (fallback to placeholder if missing)
    const pokemonImage = data.sprites.front_default || "https://via.placeholder.com/150";
    // Get the Pokémon types
    const pokemonTypes = data.types.map(type => type.type.name).join(", ");
    // Get the Pokémon abilities
    const pokemonAbilities = data.abilities.map(ability => ability.ability.name).join(", ");
    // Get the Pokémon stats
    const pokemonStats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(", ");

    // Display the Pokémon data in the container
    container.innerHTML = `
        <div class="pokemon-card">
            <h2>${pokemonName}</h2>
            <img src="${pokemonImage}" alt="${pokemonName}" />
            <p><strong>Types:</strong> ${pokemonTypes}</p>
            <p><strong>Abilities:</strong> ${pokemonAbilities}</p>
            <p><strong>Stats:</strong> ${pokemonStats}</p>
        </div>
    `;
}