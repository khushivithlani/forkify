import views from "./views";
import icons from 'url:../../img/icons.svg'

class ResultView extends views {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipe found for your query! please try again :)';
    _message = ' '

    _generateMarkup(){

        return this._data.map(this._generateMarkupReview).join('');
        
    }
    _generateMarkupReview(result){
      const id = window.location.hash.slice(1);
        return `
         <li class="preview">
         <a class="preview__link ${result.id === 'preview__link--active'}" href="#${result.id}">
           <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
           </figure>
           <div class="preview__data">
             <h4 class="preview__title">${result.title}</h4>
             <p class="preview__publisher">${result.publisher}</p>
           </div>
        </a>
       </li>`;
    }
    

}
export default new ResultView(); 