$(function () {

    getTemApply()
    function getTemApply() {
        $.get('../template/template-index.html',function (dataTem) {
            const render = template.compile(dataTem)

            $.get('/getIndexInfo',function (data) {
                const newData = JSON.parse(data)
                const {itemList} = newData
                if (newData.code === 0) {
                    for (var i = 1; i <= itemList.length; i++) {
                        $('#item'+ i).append(render(itemList[i-1]))
                    }
                }
            })
        })
    }

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

    category()
    function category() {
        const $detailCategory = $('.detailCategory')
        let render = null
        $.get('../template/template-detailCategory.html',function (dataTem) {
             render = template.compile(dataTem)
        })

        let itemlist = null
        $.get('/getIndexInfo',function (data) {
            const newData = JSON.parse(data)
            const {itemList} = newData
            if (newData.code === 0) {
                itemlist = itemList
            }
        })

        const $wrap = $('#wrap')

        $('#bigWrap .navList>ul>li').mouseenter(function () {
            $(this).children()[1].src = '../img/icon1.png'
            $(this).children()[1].style.right = -1 + 'px'

            $detailCategory.css({display:"block"})

            const index = $(this).index()
            $('#wrap').append(render(itemList[index]))
        })

            .mouseleave(function () {
                $(this).children()[1].src = '../img/right.png'
                $(this).children()[1].style.right= 30 + 'px'
                $detailCategory.css({display:"none"})
                $wrap.empty()
            })
    }

    toggleBigImg()         //形参默认值
    function toggleBigImg (newNum=0) {
        let num  =  newNum
        const intervalID = setInterval( () => {
            if (num === 3 ) num = 0
            num++
            DotClass(num)
            $('#bigWrap').css("background-image",`url(../img/banner${num}.jpg)`)
        },3000)

        $('#bigWrap').mouseenter(function () {
            clearInterval(intervalID)
        })
            .mouseleave(function () {
                newNum = num  //继续之前的轮播
                toggleBigImg(newNum)
            })
    }

    //小圆点点击
    smallDot()
    function smallDot() {
        $('#bigWrap .smallDot>span').click(function () {
            const index = $(this).index()+1
            DotClass(index)
            $('#bigWrap').css("background-image",`url(../img/banner${index}.jpg)`)
        })
    }

    //小圆点类名切换
    function DotClass(index) {
        const spans = $('#bigWrap .smallDot>span')
        for (var i = 0; i < spans.length; i++) {
            $(spans[i]).removeClass()
        }
        $(spans[index-1]).addClass('active')
    }


})
