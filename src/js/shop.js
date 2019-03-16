$(function () {
    headerFix()
    function headerFix () {
        let flag = false
        const height = $('header').height()
        $(window).scroll(function () {
            if ($(this).scrollTop() >= height) {
                if (!flag) {
                    flag = true
                    $('header').hide().slideDown('slow').addClass('down')
                }
            } else {
                flag = false
                $('header').removeClass('down')
            }
        })
    }

    getTemApply()
    function getTemApply() {
        $.get('../template/template-shopList.html',function (dataTem) {
            const render = template.compile(dataTem)

            $.get('/getShopInfo',function (data) {
                const newData = JSON.parse(data)
                const {shopList} = newData
                $('#shopListWrap').append(render({shopList}))
            })
        })
    }
})
