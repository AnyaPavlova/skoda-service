$(document).ready(function () {    

    //Бургер
    var isMobile = window.matchMedia("(max-width: 1200px)").matches;
    var burger = document.querySelector('#burger');
    if(burger && isMobile) {       
        burger.addEventListener('click', toggleBurger);

        var menuBlock = document.querySelector('.menu-block');
        
        function toggleBurger(event) {
            event.preventDefault();
            $(menuBlock).slideToggle(300);
            burger.classList.toggle('burger--open');
        }
    }

})

/*Полифилы для ie*/
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}