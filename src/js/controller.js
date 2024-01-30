
import recipeView from './views/recipeView.js';
import * as model from './model.js'
import resultsView from './views/resultView.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import searchView from './views/searchView.js';
import paginatioView from './views/paginationView.js'
import bookmarkView from './views/bookmarksView.js';
import addRecipeVIew from './views/addRecipeVIew.js';
import { MODAL_CLOSE_SEC } from './config.js';


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if(module.hot){
  //   module.hot.accept();
  // }
  
const controlRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
  //  console.log(id)
    
    if(!id) return;
    recipeView.renderSpinner()

    //update result view to mark selected search result
    resultsView.update(model.getSearchResultPage());   
    bookmarkView.update(model.state.bookmarks)     
    
    //loading recipe
    await model.loadRecipe(id);
    
    //rendering recipe
    recipeView.render(model.state.recipe)
    
  }catch(err){
    recipeView.renderError(`${err} 🚨`)
  }
}
//['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
const controlSearchRecipe =async function(){
  try{ 
    resultsView.renderSpinner()
    const query = searchView.getQuery();
    if(!query) return;
    await model.loadSearchResults(query);
    //console.log(model.state.search.result);

    //resultsView.render(model.state.search.result);
    resultsView.render(model.getSearchResultPage());
    paginatioView.render(model.state.search);

  }catch(err){
    console.log(err);
  }
}

const controlPagination = function(goToPage){
  resultsView.render(model.getSearchResultPage(goToPage));
  paginatioView.render(model.state.search);
}

controlSearchRecipe()

const controlServing = function(newServing){
  model.updateServings(newServing);

  //update the recipe view
  recipeView.update(model.state.recipe)

}
const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked) {model.addBookmark(model.state.recipe); }
  else if(model.state.recipe.bookmarked)
   {model.deleteBookmark(model.state.recipe.id)}

  recipeView.update(model.state.recipe)
  bookmarkView.render(model.state.bookmarks);
}

const controlBookmark = function(){
  bookmarkView.render(model.state.bookmarks);
}

const controlAddRecipe =async function(newRecipe){
  try{
  
    addRecipeVIew.renderSpinner();
    await model.uploadRecipe(newRecipe)

    recipeView.render(model.state.recipe);

    addRecipeVIew.renderMessage();

    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function(){
      addRecipeVIew.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }catch(err) {
    console.error(err, '🚨');
    addRecipeVIew.renderError(err.message);
  }
}
const init = function(){
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchRecipe);
  paginatioView.addHandlerClick(controlPagination);
  addRecipeVIew.addHandleUpload(controlAddRecipe)
  
};
init();