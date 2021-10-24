let appliances = [];
let ingredients = [];
let ustensils = [];
let selectedTags = {
    appliances: [],
    ingredients: [],
    ustensils: []
};
let filtredRecipes = [];

init();

function init() {
    // init Data
    initFiltredRecipes();
    updateKeyWord();

    // draw data
    creatCartesOfRecipes(filtredRecipes);
    drawKeyWordList();

    // bind events
    bindMainEvents();
    bindTagSelectionEvent();
}

function initFiltredRecipes() {
    filtredRecipes = [...recipes];
}

//bring data from recipes.js file 
function updateAppliences() {
    let appliance;
    appliances = [];
    for (let i = 0; i < filtredRecipes.length; i++) {
        appliance = filtredRecipes[i].appliance.toLowerCase();
        if (appliances.indexOf(appliance) == -1) {
            appliances.push(appliance)
        }
    }
}

function updateIngredients() {
    let ingredient;
    ingredients = [];
    for (let i = 0; i < filtredRecipes.length; i++) {
        for (let j = 0; j < filtredRecipes[i].ingredients.length; j++) {
            ingredient = filtredRecipes[i].ingredients[j].ingredient.toLowerCase();
            if (ingredients.indexOf(ingredient) == -1) {
                ingredients.push(ingredient)
            }
        }
    }
}


function updateUstensils() {
    let ustensil;
    ustensils = [];
    for (let i = 0; i < filtredRecipes.length; i++) {
        for (let j = 0; j < filtredRecipes[i].ustensils.length; j++) {
            ustensil = filtredRecipes[i].ustensils[j].toLowerCase();
            if (ustensils.indexOf(ustensil) == -1) {
                ustensils.push(ustensil)
            }
        }
    }
}

function updateKeyWord() {
    updateAppliences();
    updateIngredients();
    updateUstensils();
}

function drawKeyWordList() {
    drawKeyWord(ingredients, "liste-of-ingredients");
    drawKeyWord(appliances, "liste-appareil");
    drawKeyWord(ustensils, 'liste-ustensiles');
}

function filterIngredientsByInput(e) {
    let searchText = e.currentTarget.value.toLowerCase();

    // update data
    let filtredIngredients = ingredients.filter((ingredient) => {
        return ingredient.indexOf(searchText) !== -1;
    });

    // draw data
    drawKeyWord(filtredIngredients, "liste-of-ingredients");

    // bind events
    bindTagSelectionEvent('#liste-of-ingredients li');
}
function filterAppliancesByInput(e) {
    let searchText = e.currentTarget.value.toLowerCase();

    // update data
    let filtredAppliances = appliances.filter((appliance) => {
        return appliance.indexOf(searchText) !== -1;
    });

    // draw data
    drawKeyWord(filtredAppliances, "liste-appareil");

    // bind events
    bindTagSelectionEvent('#liste-appareil li');
}

function filterUstensilsByInput(e) {
    let searchText = e.currentTarget.value.toLowerCase();

    // update data
    let filtredUstensils = ustensils.filter((ustensil) => {
        return ustensil.indexOf(searchText) !== -1;
    });

    // draw data
    drawKeyWord(filtredUstensils, "liste-ustensiles");

    // bind events
    bindTagSelectionEvent('#liste-ustensiles li');
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


function drawKeyWord(ingredients, listCotainerId) {
    let listContainer = document.getElementById(listCotainerId)
    let result = '<ul>';
    for (let i = 0; i < ingredients.length; i++) {
        result = result + '<li>' + ingredients[i] + '</li>';
    }
    result = result + '</ul>';
    listContainer.innerHTML = result;
}

function bindTagSelectionEvent(selector) {
    if (selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('click', updateSelectedTags);
        });
    } else {
        document.querySelectorAll('.list-container li').forEach(element => {
            element.addEventListener('click', updateSelectedTags);
        });
    }
}

function bindMainEvents() {
    document.querySelectorAll('.recherche-secondaires').forEach(element => {
        element.addEventListener('click', toggleKeyWordDropDown);
    });
    document.querySelector('#mainSearchInput').addEventListener('input', updateSearchResultByFreeSearch);
    document.querySelector('#ingredientsInput').addEventListener('input', filterIngredientsByInput);
    document.querySelector('#appareilInput').addEventListener('input', filterAppliancesByInput);
    document.querySelector('#ustensilesInput').addEventListener('input', filterUstensilsByInput);
}


function updateSelectedTags(e) {
    // reset text input
    e.currentTarget.closest('.recherche-secondaires').querySelector('input').value = ''

    let currentTagType = e.currentTarget.closest('.list-container').getAttribute('data-tag-type');
    let currentTagValue = e.currentTarget.innerHTML;
    let indexOfCurrentTag = selectedTags[currentTagType].indexOf(currentTagValue);

    if (indexOfCurrentTag == -1) {
        selectedTags[currentTagType].push(currentTagValue);
    } else {
        selectedTags[currentTagType].splice(indexOfCurrentTag, 1);
    }
    drawSelectedTags();
}

function toggleKeyWordDropDown(e) {
    if (e.currentTarget.classList.contains('active')) {
        e.currentTarget.classList.remove('active');
    } else {
        document.querySelectorAll('.recherche-secondaires').forEach((element) => {
            element.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
    }
}

function drawSelectedTags() {
    let tagContainer = document.querySelector('.element-select');
    let result = "";

    selectedTags.ingredients.forEach((tag) => {
        result = result + '<div class="tags ingredients" data-tag-type="ingredients" data-tag-value="' + tag + '">' + tag + "  " +
            '<img ' +
            'src="./images/close.svg"' +
            'class="close-tag"' +
            'alt="close"' +
            '/>' +
            '</div>';
    });

    selectedTags.appliances.forEach((tag) => {
        result = result + '<div class="tags appliances" data-tag-type="appliances" data-tag-value="' + tag + '">' + tag + "  " +
            '<img ' +
            'src="./images/close.svg"' +
            'class="close-tag"' +
            'alt="close"' +
            '/>' +
            '</div>';
    });

    selectedTags.ustensils.forEach((tag) => {
        result = result + '<div class="tags ustensils" data-tag-type="ustensils" data-tag-value="' + tag + '">' + tag + "  " +
            '<img ' +
            'src="./images/close.svg"' +
            'class="close-tag"' +
            'alt="close"' +
            '/>' +
            '</div>';
    });

    tagContainer.innerHTML = result;
    bindTagsEvents();
    updateSearchResultBySelectedTags();
}

function bindTagsEvents() {
    document.querySelectorAll('.tags').forEach(element => {
        element.addEventListener('click', (e) => {
            let currentTagType = e.currentTarget.getAttribute('data-tag-type');
            let currentTagValue = e.currentTarget.getAttribute('data-tag-value');
            let indexOfCurrentTag = selectedTags[currentTagType].indexOf(currentTagValue)
            selectedTags[currentTagType].splice(indexOfCurrentTag, 1);
            drawSelectedTags();
        });
    });
}

function updateSearchResultByFreeSearch(e) {
    let searchText = e.currentTarget.value || '';
    if (searchText.length < 3) {
        if (filtredRecipes.length === recipes.length) {
            return;
        }
    }
    // update Data
    updateFiltredRecipesByFreeSearch(searchText.toLowerCase());
    updateKeyWord();

    // draw data
    creatCartesOfRecipes(filtredRecipes);
    drawKeyWordList();

    //bind event
    bindTagSelectionEvent();

}

function updateFiltredRecipesBySelectedTags() {
    let result = [];
    for (let i = 0; i < filtredRecipes.length; i++) {
        if (isCurrentRecipeUseAtLeastOneOfSelectedAppliances(filtredRecipes[i])) {
            if (isAllSelectedIngredientsInTheCurrentRecipe(filtredRecipes[i])) {
                if (isAllSelectedUstensilsUsedInTheCurrentRecipe(filtredRecipes[i])) {
                    result.push(filtredRecipes[i]);
                }
            }
        }
    }

    filtredRecipes = result;


    function isCurrentRecipeUseAtLeastOneOfSelectedAppliances(recipe) {

        if (selectedTags.appliances.length == 0) {
            return true;
        }
        return selectedTags.appliances.indexOf(recipe.appliance.toLowerCase()) !== -1;
    }

    function isAllSelectedIngredientsInTheCurrentRecipe(recipe) {
        if (selectedTags.ingredients.length == 0) {
            return true;
        }
        let ingredientsOfCurrentRecipe = [];
        for (let i = 0; i < recipe.ingredients.length; i++) {
            ingredientsOfCurrentRecipe.push(recipe.ingredients[i].ingredient.toLowerCase())
        }

        let result = true;
        let i = 0;
        while (result && i < selectedTags.ingredients.length) {
            if (ingredientsOfCurrentRecipe.indexOf(selectedTags.ingredients[i]) == -1) {
                result = false;
            }
            i++;
        }

        return result;
    }

    function isAllSelectedUstensilsUsedInTheCurrentRecipe(recipe) {
        if (selectedTags.ustensils.length == 0) {
            return true;
        }
        let ustensilsOfCurrentRecipe = [];
        for (let i = 0; i < recipe.ustensils.length; i++) {
            ustensilsOfCurrentRecipe.push(recipe.ustensils[i].toLowerCase())
        }

        let result = true;
        let i = 0;
        while (result && i < selectedTags.ustensils.length) {
            if (ustensilsOfCurrentRecipe.indexOf(selectedTags.ustensils[i]) == -1) {
                result = false;
            }
            i++;
        }

        return result;
    }
}



function updateSearchResultBySelectedTags() {
    // update data
    updateFiltredRecipesByFreeSearch(document.querySelector('#mainSearchInput').value);
    updateFiltredRecipesBySelectedTags();
    updateKeyWord();

    // draw data
    creatCartesOfRecipes(filtredRecipes);
    drawKeyWordList();

    //bind event
    bindTagSelectionEvent();
}

//***************************************//
// To Be Implemented in 2 diffrent ways
//***************************************//

function updateFiltredRecipesByFreeSearch(searchText) {
    filtredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].description.toLowerCase().indexOf(searchText) !== -1) {
            filtredRecipes.push(recipes[i]);
            continue;
        }
        if (recipes[i].name.toLowerCase().indexOf(searchText) !== -1) {
            filtredRecipes.push(recipes[i]);
            continue;
        }
        
    }
}
