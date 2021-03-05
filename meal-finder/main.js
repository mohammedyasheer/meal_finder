const search = document.getElementById('search'),
    random = document.getElementById('random'),
    mealEl = document.getElementById('meals'),
    single_mealEl = document.getElementById('single-meal'),
    resulHeading = document.getElementById('result-heading'),
    submit = document.getElementById('submit');


//Functions
function searchMeal(e) {
 const term = search.value;
 //check for empty
 
 single_mealEl.innerHTML = '';
 if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`) 
    .then(res => res.json())
     .then((data)=>
        {console.log(data);
          resulHeading.innerHTML = `<h2>Search result for '${term}'</h2>`
          if(data.meals !== null){
            mealEl.innerHTML = data.meals.map( meal =>`
              <div class="meal">
                <img src="${meal.strMealThumb}" alt ="${meal.strMeal}">
                 <div class="meal-info" data-mealID = "${meal.idMeal}">
                 <h3>${meal.strMeal}</h3>
                  </div>
              </div>
            `)
            .join('');
        }else{
          resulHeading.innerHTML = `<p>The search Result is not found</p>`
          mealEl.innerHTML = '';
        }
      });
        
  }else{
    alert('Enter the any meal');
  }

 
  e.preventDefault();

}

//fetch meal by id 

function getMealById(mealID) {
  fetch( `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(res => res.json())
    .then(data =>{
      console.log(data);
      const meal = data.meals[0];
      addMealToDOM(meal);
    })

}


// Add meal to DOM
function addMealToDOM(meal) {
  const ingrediants = [];

  for(let i=1 ; i<=20 ; i++){
    if(meal[`strIngredient${i}`]){
      ingrediants.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);  
      } else{
        break;
      }
  } 

  single_mealEl.innerHTML =`
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>  
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-Meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory }</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
      ${ingrediants.map(ing =>`<li>${ing}</li>`).join('')}
    </ul>
    </div>
  `;
  }

// Get Random Meal

function getRandomMeal() {
  mealEl.innerHTML = '';
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res => res.json())
  .then(data => {
    const meal = data.meals[0];

    addMealToDOM(meal);
  })
}

//Event Listeners

submit.addEventListener('submit', searchMeal)
random.addEventListener('click' , getRandomMeal)

mealEl.addEventListener('click', (e)=> {
   const mealInfo =  e.path.find(item =>{
    if(item.classList){
      return item.classList.contains('meal-info');
    }else{
      return false;

    }
   });
   if(mealInfo){
      const mealID = mealInfo.getAttribute('data-mealid');
      getMealById(mealID);
   }else{
      return false
   }

  
})
