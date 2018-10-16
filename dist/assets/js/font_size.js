(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define('fontSize', factory) :
    (factory());
}(this, (function () { 'use strict';

    /**
     * @description 计算移动端跟元素的字体大小
     * 默认移动端的设计是iPhone6尺寸
     * 经过计算后1rem等于100px
     */
    (function (document, window, size) {
        var html = document.documentElement,
            resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
            calcFontSize = function calcFontSize() {
            var deviceWidth = html.clientWidth > 1300 ? 1300 : html.clientWidth;
            html.style.fontSize = 100 * (deviceWidth / size) + 'px';
        };
        if (!document.addEventListener) {
            return;
        }
        window.addEventListener(resizeEvent, calcFontSize, false);
        document.addEventListener('DOMContentLoaded', calcFontSize, false);
    })(document, window, 750);

})));
