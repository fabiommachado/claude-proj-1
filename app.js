// Sample recipes with favorite property
const sampleRecipes = [
    { name: "Spaghetti Carbonara", desc: "Classic Italian pasta with eggs, cheese, pancetta, and pepper.", favorite: true },
    { name: "Chicken Tikka Masala", desc: "Grilled chicken in a creamy spiced tomato sauce.", favorite: false },
    { name: "Avocado Toast", desc: "Toasted bread topped with smashed avocado, salt, and pepper.", favorite: false }
];

const recipeList = document.getElementById('recipe-list');
const recipeForm = document.getElementById('recipe-form');
const recipeName = document.getElementById('recipe-name');
const recipeDesc = document.getElementById('recipe-desc');

function renderRecipes(recipes) {
    recipeList.innerHTML = '';
    // Sort: favorites first
    const sorted = [...recipes].sort((a, b) => (b.favorite === true) - (a.favorite === true));
    sorted.forEach((recipe, idx) => {
        const li = document.createElement('li');
        li.className = 'recipe-item';
        li.innerHTML = `
      <button class="star-btn" data-idx="${recipes.indexOf(recipe)}" aria-label="Favorite">
        <span class="star-icon${recipe.favorite ? ' favorite' : ''}">&#9733;</span>
      </button>
      <div class="recipe-details">
        <div class="recipe-name">${recipe.name}</div>
        <div class="recipe-desc">${recipe.desc}</div>
      </div>
      <button class="delete-btn" data-idx="${recipes.indexOf(recipe)}">Delete</button>
    `;
        recipeList.appendChild(li);
    });
}

let recipes = [...sampleRecipes];
renderRecipes(recipes);

recipeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = recipeName.value.trim();
    const desc = recipeDesc.value.trim();
    if (name && desc) {
        recipes.push({ name, desc, favorite: false });
        renderRecipes(recipes);
        recipeName.value = '';
        recipeDesc.value = '';
    }
});

recipeList.addEventListener('click', function (e) {
    // Favorite toggle
    if (e.target.closest('.star-btn')) {
        const idx = parseInt(e.target.closest('.star-btn').getAttribute('data-idx'));
        recipes[idx].favorite = !recipes[idx].favorite;
        renderRecipes(recipes);
        return;
    }
    // Delete
    if (e.target.classList.contains('delete-btn')) {
        const idx = parseInt(e.target.getAttribute('data-idx'));
        recipes.splice(idx, 1);
        renderRecipes(recipes);
    }
});
