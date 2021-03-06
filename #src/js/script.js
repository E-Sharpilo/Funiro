
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


// Spollers

const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((item, index, self) => {
        return !item.dataset.spollers.split(',')[0];
    });
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular)
    }


    const spollers = Array.from(spollersArray).filter((item, index, self) => {
        return item.dataset.spollers.split(',')[0];
    })


    if (spollers.length > 0) {
        const breakpointArray = [];
        spollers.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(',');
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
            breakpoint.item = item;
            breakpointArray.push(breakpoint);
        });

        let mediaQuer = breakpointArray.map(item => {
            return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`
        });
        mediaQuer = mediaQuer.filter((item, index, self) => {
            return self.indexOf(item) === index;
        });

        mediaQuer.forEach(breakpoint => {
            const paramsArray = breakpoint.split(',');
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            const spollersArray = breakpointArray.filter(item => {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true
                }
            });
            matchMedia.addEventListener('change', () => {
                initSpollers(spollersArray, matchMedia);
            })
            initSpollers(spollersArray, matchMedia);
        });
    };
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener('click', setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener('click', setSpollerAction);
            };
        });
    };
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1')
                    spollerTitle.nextElementSibling.hidden = false
                }
            })
        }
    };
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller');
            const spollersBlock = spollerTitle.closest('[data-spoller]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller' ? true : false);
            if (!spollersBlock.querySelectorAll('._slide').lendth) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollerBody(spollerBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500)
            }
            e.preventDefault()
        }
    };
    function hideSpollerBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active')
            _slideUp(spollerActiveTitle.nextElementSibling, 500)
        }
    };
};
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.owerflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property')
            target.classList.remove('_slide')
        }, duration)
    }
}

let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.owerflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property')
            target.classList.remove('_slide')
        }, duration)
    }
}

let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration)
    } else {
        return _slideUp(target, duration)
    }
}