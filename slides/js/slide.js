(function () {
'use strict';

var $slides = document.querySelectorAll('.step'),
    currentSlide = 0,
    totalSides = $slides.length -1,
    changeSlide = function (changeAmount) {
        var newSlide = currentSlide + parseInt(changeAmount, 10);

        if (newSlide < 0) {
            newSlide = 0;
        } else if (newSlide > totalSides) {
            newSlide = totalSides;
        }

        currentSlide = newSlide;

        [].forEach.call($slides, function (element, index) {
            if (index < currentSlide) {
                element.classList.remove('is-upcoming');
                element.classList.remove('is-current');
                element.classList.add('is-past');
            } else if (index === currentSlide) {
                element.classList.remove('is-upcoming');
                element.classList.add('is-current');
                element.classList.remove('is-past');
            } else if (index > currentSlide) {
                element.classList.add('is-upcoming');
                element.classList.remove('is-current');
                element.classList.remove('is-past');
            }
        });

        window.location.hash = '!/' + currentSlide;

        //$('.progress-container').width(((currentSlide / totalSides) * 0.82) + "em");
    };

document.addEventListener('DOMContentLoaded', function() {

    if (window.location.hash.replace('#!/','') !== '') {
        var hash = parseInt(window.location.hash.replace('#!/',''),10);
        currentSlide = (isNaN(hash) ? 0 : hash);
    }

    changeSlide(0);

    document.addEventListener('keyup', function (ev) {
        if (ev.keyCode === 39 || ev.keyCode === 38) {
            changeSlide(1);
        }
        if (ev.keyCode === 37 || ev.keyCode === 40) {
            changeSlide(-1);
        }
    });

    setTimeout(function () {
        document.body.classList.add('slide-ready');
    }, 0);

    var $externalLinks = document.querySelectorAll('a[href^="http"]');

    [].forEach.call($externalLinks, function (element) {
        element.setAttribute('target', '_blank');
    });
    

    // var request = new XMLHttpRequest();

    // request.open('GET', 'assets/svg/icons.svg', true);

    // request.onload = function() {
    //   if (this.status >= 200 && this.status < 400) {
    //     document.body.insertBefore(this.response, document.body.firstChild);
    //   }
    // };

    // request.send();
});
}());