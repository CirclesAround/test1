let change = {
    data: {},
    init () {
        this.attachEvent()
    },
    attachEvent () {
        $('.change').on('click', function () {
            $(this).append('<p>我是新增的</p>')
        })
    },
    methods: {

    }
}
export default change