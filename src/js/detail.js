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

    itemNavClass()
    function itemNavClass() {
        const $lis = $('#content .NavWarp .navList li')
        .on('click',function () {
            for (var i = 0; i < $lis.length; i++) {
                $($lis[i]).removeClass('active')
            }
            $(this).addClass('active')
        })
    }



})
