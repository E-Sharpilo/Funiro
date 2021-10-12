
window.onload = function () {
    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;
        if (window.innerWidth > 768 && isMobile.any()) {
            if (targetElement.classList.contains('menu__arrow')) {
                targetElement.closest('.menu__item').classList.toggle('_hover')
            }
            if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                _removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover')
            }
        }
        if (targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active')
        } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active')
        }
    }
}


function _removeClasses(els, active) {
    for (let i = 0; i < els.length; i++) {
        els[i].classList.remove(active)
    }
}


isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
if (isMobile.any()) {
    document.querySelector('html').classList.add('_touch');
}
