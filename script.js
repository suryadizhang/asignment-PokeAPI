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

}