(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define('index', factory) :
    (factory());
}(this, (function () { 'use strict';

    window.addEventListener('DOMContentLoaded', function () {
        $('.img').on('click', function (e) {
            console.log(2);
        });
    });

})));
