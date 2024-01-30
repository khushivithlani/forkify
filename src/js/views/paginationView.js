import views from "./views";
import icons from 'url:../../img/icons.svg'

class PaginationView extends views {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkup(){
        const curNum = this._data.page;
       const numPage = Math.ceil(this._data.results.length / this._data.resultsPerPage);
       // page 1, and there is other pages
        if(curNum === 1 && numPage >1){
            return ` <button data-goto= "${curNum +1}" class="btn--inline pagination__btn--next">
            <span>Page ${curNum +1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }

        //last page
        if(curNum === numPage && numPage>1 ){
                return `<button data-goto= "${curNum - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curNum-1}</span>
            </button>`
        }

        //other pages
        if(curNum < numPage ){
            return ` 
            <button data-goto= "${curNum -1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curNum-1}</span>
            </button>
            
            <button data-goto= "${curNum +1}" class="btn--inline pagination__btn--next">
            <span>Page ${curNum +1 }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

        //page 1 and there are no other page
        return '';



    }
}

export default new PaginationView();