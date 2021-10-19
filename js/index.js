let appliances = [];
let ingredients = [];
let ustensils = [];
let selectedTags = [];


initKeyWord();

creatCartesOfRecipes(recipes);
drawAllTags();
bindEvents();

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

function drawAllTags() {
    drawTagsList(ingredients, "liste-of-ingredients");
    drawTagsList(appliances, "liste-appareil");
    drawTagsList(ustensils, 'liste-ustensiles');
}


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
        '<div class= "recipe_informations">' +
        '<div class="carte_title">' +
        '<h2>' + recipe.name + '</h2>' +
        '</div>' +
        '<div class="carte__duree">' +
        '<p>' + '<img ' +
        'src="./images/cadran.svg"' +
        'alt="logo indiquant la durée"' +
        '/>' +
        ' ' + recipe.time + 'min' +
        '</p>' +
        '</div>' +
        getHtmlIngredients(recipe.ingredients) +
        '<div class="carte__recette">' +
        '<p class="carte_recette_description">' +
        recipe.description +
        '</p>' +
        '</div>' +
        '</div>' +
        '</article>'
}

function getHtmlIngredients(ingredients) {
    let result = '<div class="carte__ingredients">' +
        '<ul class="contenu__ingredient__liste">';
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].quantity) {
            if (ingredients[i].unit) {
                result = result + '<li><b>' + ingredients[i].ingredient + ':</b> ' + ingredients[i].quantity + ' ' + ingredients[i].unit + '</li>';
            } else {
                result = result + '<li><b>' + ingredients[i].ingredient + ':</b> ' + ingredients[i].quantity + '</li>';
            }
        } else {
            result = result + '<li><b>' + ingredients[i].ingredient + '</b></li>';
        }

    }
    result = result + '</ul></div>';
    return result;
}


function drawTagsList(ingredients, listCotainerId) {
    let listContainer = document.getElementById(listCotainerId)
    let result = '<ul>';
    for (let i = 0; i < ingredients.length; i++) {
        result = result + '<li>' + ingredients[i] + '</li>';
    }
    result = result + '</ul>';
    listContainer.innerHTML = result;
}

function bindEvents() {
    document.querySelectorAll('.recherche-secondaires').forEach(element => {
        element.addEventListener('click', (e) => {
            if (e.currentTarget.classList.contains('active')) {
                e.currentTarget.classList.remove('active');
            } else {
                document.querySelectorAll('.recherche-secondaires').forEach((element) => {
                    element.classList.remove('active');
                });
                e.currentTarget.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.list-container li').forEach(element => {
        element.addEventListener('click', (e) => {
            e.currentTarget.closest('.list-container').getAttribute('data-tag-type')
            
            let currentTagValue = e.currentTarget.innerHTML;
            let indexOfcurrentTagValue = selectedTags.map((tag) => tag.value).indexOf(currentTagValue)

            if(indexOfcurrentTagValue == -1) {
                selectedTags.push({
                    type: e.currentTarget.closest('.list-container').getAttribute('data-tag-type'),
                    value: currentTagValue
                });
            } else {
                selectedTags.splice(indexOfcurrentTagValue, 1);
            }
            drawSelectedTag();
        });
    });
}


function drawSelectedTag () {
    let tagContainer = document.querySelector('.element-select');
    let result = "";
    selectedTags.forEach((tag) => {
        result = result + '<div class=" tags ' + tag.type + '">' + tag.value + "  " +
        '<img ' +
        'src="./images/close.svg"' +
        'class="close-tag"' +
        'alt="close"' +
        '/>' +
        '</div>';
    });

    tagContainer.innerHTML = result;
    document.querySelectorAll('.tags').forEach(element => {
        element.addEventListener('click', (e) => {
                e.currentTarget.style.display = 'none';
                selectedTags.splice(element, 1);

    });
});
}