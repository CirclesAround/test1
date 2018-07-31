(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define('test', factory) :
    (factory());
}(this, (function () { 'use strict';

    window.addEventListener('DOMContentLoaded', function () {
        console.log(2);
    });

})));
