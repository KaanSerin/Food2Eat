
// All the HTML elements I need
const getRecipeBtn = document.getElementById("getRecipe");
const getRandomBtn = document.getElementById("randomRecipe");
const recipeName = document.getElementById('recipeName');
const recipeImage = document.getElementById('recipeImage');
const recipeDescription = document.getElementById('recipeDescription');
const searchBox = document.getElementById("food2eat");
const ingredientsList = document.getElementById('ingredientsList');

// Storing the urls and the api key to save myself the hassle of typing them again
const apiKey = '296effd17f31451180db49db3ee62c97';
const searchUrl = 'https://api.spoonacular.com/recipes/search?query=';
const randomUrl = 'https://api.spoonacular.com/recipes/random?';
// const summaryUrl = 'https://api.spoonacular.com/recipes/';
const informationUrl = 'https://api.spoonacular.com/recipes/';
const imageUrl = 'https://spoonacular.com/recipeImages/';

// Get random recipe
const getRandomRecipe = () => {
    fetch(randomUrl + '&number=1' + '&apiKey=' + apiKey).then(response => response.json()).then((data) => {
        // Get the first recipe
        const recipe = data.recipes[0];

        // Change the title elements innerText
        recipeName.innerText = recipe.title;

        // No need to fetch summary as it is included in the data response
        recipeDescription.innerHTML = recipe.summary;

        // Logging the json file just in case
        console.log(recipe);

        const ingredients = [];

        // Fetch the information for the recipe
        fetch(informationUrl + recipe.id + '/information' + '?includeNutrition=false' + '&apiKey=' + apiKey)
            .then(response => response.json())
            .then(data => {
                recipeDescription.innerHTML = data.summary
                data.extendedIngredients.forEach(ingredient => {
                    ingredientsList.innerHTML += '<li>' + ingredient.name + "</li>"
                    ingredients.push(ingredient.name);
                });
            });

        // Printing the ingredients
        console.log(ingredients);

        // getRecipeImage(recipe.id);
        fetch(imageUrl + recipe.id + '-556x370.jpg').then(response => response.blob())
            .then(blob => {
                const base64img = URL.createObjectURL(blob);
                recipeImage.setAttribute('src', base64img);
            })
    });
}

// Calling the random recipe method as the page loads
getRandomRecipe();

// Get a recipe using the value from the seach box
getRecipeBtn.addEventListener('click', () => {
    fetch(searchUrl + searchBox.value + '&number=1' + '&apiKey=' + apiKey).then(response => response.json()).then((data) => {
        // Get the first recipe
        const recipe = data.results[0];

        // Change the title elements innerText
        recipeName.innerText = recipe.title;

        // Logging the json file just in case
        console.log(recipe);

        const ingredients = [];

        // Fetch the information for the recipe
        fetch(informationUrl + recipe.id + '/information' + '?includeNutrition=false' + '&apiKey=' + apiKey)
            .then(response => response.json())
            .then(data => {
                recipeDescription.innerHTML = data.summary
                data.extendedIngredients.forEach(ingredient => {
                    ingredientsList.innerHTML += '<li>' + ingredient.name + "</li>"
                    ingredients.push(ingredient.name);
                });
            });

        // Printing the ingredients
        console.log(ingredients);

        // Fetch the image of the recipe
        fetch(imageUrl + recipe.id + '-556x370.jpg').then(response => response.blob())
            .then(blob => {
                const base64img = URL.createObjectURL(blob);
                recipeImage.setAttribute('src', base64img);
            })
    });
});

// Calling the random recipe method when the button is clicked
getRandomBtn.addEventListener('click', () => {
    getRandomRecipe();
});