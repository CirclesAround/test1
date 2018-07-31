import test from '../../assets/components/ceshi/ceshi'
window.addEventListener('DOMContentLoaded', function () {
    let app ={
        data :{},
        init () {
            test.init()
            this.attachEvent()
        },
        attachEvent () {
            console.log('成功了吗');
        },
        methods: {

        }
    }
    app.init()
})