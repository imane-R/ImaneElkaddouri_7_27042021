let appliances = [];
let ingredients = [];
let ustensils = [];
let ingredientsArrow = document.getElementById('fleche-ingredients')
let listOfIngredients = document.getElementsByClassName('liste-ingredients')


initKeyWord();

creatCartesOfRecipes(recipes);

//bring data from recipes.js file 
function initAppliences() {
    let appliance;
    for (let i = 0; i < recipes.length; i++) {
        appliance = recipes[i].appliance.toLowerCase();
        if (appliances.indexOf(appliance) == -1) {
            appliances.push(appliance)
        }
    }
}

function initIngredients() {
    let ingredient;
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            ingredient = recipes[i].ingredients[j].ingredient.toLowerCase();
            if (ingredients.indexOf(ingredient) == -1) {
                ingredients.push(ingredient)
            }
        }
    }
}


function initUstensils() {
    let ustensil;
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            ustensil = recipes[i].ustensils[j].toLowerCase();
            if (ustensils.indexOf(ustensil) == -1) {
                ustensils.push(ustensil)
            }
        }
    }
}

function initKeyWord() {
    initAppliences();
    initIngredients();
    initUstensils();
}

// creat list of ingredients

/*ingredients.forEach(creatIngredientsList);
function creatIngredientsList(ingredient) {
listOfIngredients.innerHTML = '<li>' + ingredient + '</li>' ;
};
ingredientsArrow.addEventListener('click' ,creatIngredientsList )*/

function creatCartesOfRecipes(arrayOfRecipes) {
    let creatOfRecipes = document.getElementById('recipesCartes');
    let htmlResult = "";
    for (let i = 0; i < arrayOfRecipes.length; i++) {
        htmlResult = htmlResult + getHtmlRecipeCard(arrayOfRecipes[i]);
    }


    creatOfRecipes.innerHTML = htmlResult;
}


function getHtmlRecipeCard(recipe) {
    return '<article class="carte">' +
        '<div class="carte__image">' +
        '<img ' +
        'src="./images/illustration-plat.svg"' +
        'class="card-img-top"' +
        'alt="Illustration plat"' +
        '/>' +
        '</div>' +
        '<div class= "recipe_informations">'+
        '<div class="carte_title">' +
        '<h2>' + recipe.name + '</h2>' +
        '</div>' +
        '<div class="carte__duree">' +
        '<p>' + '<img ' +
        'src="./images/cadran.svg"' +
        'alt="logo indiquant la durée"' +
        '/>' +
        ' '+ recipe.time + 'min' +
        '</p>' +
        '</div>' +
        getHtmlIngredients(recipe.ingredients) +
        '<div class="carte__recette">' +
        '<p class="carte_recette_description">' +
        recipe.description +
        '</p>' +
        '</div>' +
        '</div>'+
        '</article>'
}

function getHtmlIngredients(ingredients) {
    let result = '<div class="carte__ingredients">' +
    '<ul class="contenu__ingredient__liste">';
    for (let i = 0 ; i < ingredients.length; i++) {
        if (ingredients[i].quantity ) {
            result = result + '<li><b>' + ingredients[i].ingredient + ':</b>' + ingredients[i].quantity + ingredients[i].unit + '</li>';
        } else {
            result = result + '<li><b>' + ingredients[i].ingredient + '</b></li>';
        }
        
    }
    result =  result + '</ul></div>';
    return result;
}