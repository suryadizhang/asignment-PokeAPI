// 1st create a event listener when the click event happens//
document.getElementById("search-button").addEventListener("click",async()=>
{ //get input data from search bar//
    const input = document.getElementById("search").value;
    //select the container to display the data//
    const container = document.getElementById("pokedex-container");
    //clear the container ensures that any previous Pokémon data or 
    // error messages are removed before displaying new results//
    container.innerHTML = "";
    if(!input)
    {
        //if the input is empty, display an error message//
        container.innerHTML = "<p class='error'>Please enter a Pokémon name or ID</p>";
        return;
    }
    try {
        //fetch the Pokémon data from the API and make the input data to lower case//
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
        //awaait for the response to be returned//
        if(!response.ok)
        {
            //if the response is not ok, display an error message//
            container.innerHTML = "<p class='error'>Pokémon not found</p>";
            return;
        }
        const data = await response.json();
        displayPokemon(data); //call the function to display the Pokémon data//
    } catch (error) {
        //if there is an error, display an error message//
        container.innerHTML = "<p class='error'>pokemon not found!</p>";
    }
    //displayPokemon(data); //call the function to display the Pokémon data//
    function displayPokemon(data) {
        const container = document.getElementById("pokedex-container");
        const pokenonName = data.name.charAt (0).toUpperCase() + data.name.slice(1); //capitalize the first letter of the Pokémon name//
        const pokemonImage = data.sprites.front_default; //get the Pokémon image from the API//
        const pokemonTypes = data.types.map(type => type.type.name).join(", "); //get the Pokémon types from the API//
        const pokemonAbilities = data.abilities.map(ability => ability.ability.name).join(", "); //get the Pokémon abilities from the API//
        const pokemonStats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(", "); //get the Pokémon stats from the API//

        container.innerHTML = ` 
        <h2>${pokenonName}</h2>
        <img src="${pokemonImage}" alt="${pokenonName}">
        <p><strong>Types:</strong> ${pokemonTypes}</p>
        <p><strong>Abilities:</strong> ${pokemonAbilities}</p>
        <p><strong>Stats:</strong> ${pokemonStats}</p>
        `; //display the Pokémon data in the container//

}