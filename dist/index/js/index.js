(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define('index', factory) :
    (factory());
}(this, (function () { 'use strict';

    var change = {
        data: {},
        init: function init() {
            this.attachEvent();
        },
        attachEvent: function attachEvent() {
            $('.change').on('click', function () {
                $(this).append('<p>我是新增的</p>');
            });
        },

        methods: {}
    };

    window.addEventListener('DOMContentLoaded', function () {
        var app = {
            data: {},
            init: function init() {
                change.init();
                this.attachEvent();
            },
            attachEvent: function attachEvent() {
                console.log('成功了吗');
            },

            methods: {}
        };
        app.init();
    });

})));
