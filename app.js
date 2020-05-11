
// All the HTML elements I need
const getRecipeBtn = document.getElementById("getRecipe");
const getRandomBtn = document.getElementById("randomRecipe");
const getSimilarRecipeBtn = document.getElementById("similarRecipe");
const recipeName = document.getElementById('recipeName');
const recipeImage = document.getElementById('recipeImage');
const recipeDescription = document.getElementById('recipeDescription');
const searchBox = document.getElementById("food2eat");
const ingredientsList = document.getElementById('ingredientsList');
const instructionsList = document.getElementById('instructionsList');

// Storing the urls and the api key to save myself the hassle of typing them again
const apiKey = '296effd17f31451180db49db3ee62c97';
const searchUrl = 'https://api.spoonacular.com/recipes/search?query=';
const randomUrl = 'https://api.spoonacular.com/recipes/random?';
const informationUrl = 'https://api.spoonacular.com/recipes/';
const imageUrl = 'https://spoonacular.com/recipeImages/';

let currentRecipeId;

const processRecipeInformation = data => {

    // Get the first recipe
    const recipe = data[0];

    // Storing the current recipe's id to use on Similar recipes button
    currentRecipeId = recipe.id;

    // Change the title elements innerText
    recipeName.innerText = recipe.title;

    // Logging the json file just in case
    console.log(recipe);

    const ingredients = [];

    // Fetch the information for the recipe
    fetch(informationUrl + recipe.id + '/information' + '?includeNutrition=false' + '&apiKey=' + apiKey)
        .then(response => response.json())
        .then(data => {
            recipeDescription.innerHTML = data.summary;
            ingredientsList.innerHTML = '';
            data.extendedIngredients.forEach(ingredient => {
                ingredientsList.innerHTML += '<li><img src="images/food.svg">' + ingredient.name + "</li>"
                ingredients.push(ingredient.name);
            });
        });


    // Fetch the instructions for the recipe
    fetch(informationUrl + recipe.id + '/analyzedInstructions' + '?apiKey=' + apiKey)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            instructionsList.innerHTML = '';
            data[0].steps.forEach(step => {
                instructionsList.innerHTML += '<li>' + step.step + "</li>"

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
}

// Get random recipe
const getRandomRecipe = () => {
    fetch(randomUrl + '&number=1' + '&apiKey=' + apiKey).then(response => response.json()).then(data => {
        console.log(data);
        processRecipeInformation(data.recipes);
    });
}

const getRecipeByName = value => {
    if (value != null) {
        fetch(searchUrl + value + '&number=1' + '&apiKey=' + apiKey).then(response => response.json()).then(data => {
            if (data != null) {
                console.log(data);
                processRecipeInformation(data.results);
            }
            else {
                console.log("recipe name null");
                getRandomRecipe();
            }
        });
    }
    else {
        getRandomRecipe();
    }
}

// Calling the random recipe method as the page loads
getRandomRecipe();


// Get a recipe using the value from the seach box
searchBox.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        getRecipeByName(searchBox.value);
    }
});

// Calling the similar recipe method when the button is clicked
getSimilarRecipeBtn.addEventListener('click', () => {
    fetch(informationUrl + currentRecipeId + "/similar" + '?number=1' + '&apiKey=' + apiKey).then(response => response.json())
        .then(data => {
            console.log(data[0]);
            getRecipeByName(data[0].title);
        });
});

// Calling the random recipe method when the button is clicked
getRandomBtn.addEventListener('click', () => {
    getRandomRecipe();
});