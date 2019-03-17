$(function () {

    // headerFix()
    // function headerFix () {
    //     let flag = false
    //     const height = $('header').height()
    //     $(window).scroll(function () {
    //         if ($(this).scrollTop() >= height) {
    //             if (!flag) {
    //                 flag = true
    //                 $('header').hide().slideDown('slow').addClass('down')
    //             }
    //         } else {
    //             flag = false
    //             $('header').removeClass('down')
    //         }
    //     })
    // }

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

    creatTwoArr()
    function creatTwoArr() {
        let twoArr = []
        //拿到数据生成二维数组
        $.ajax({
            url:'/getComment',
            type:'get',
            async:false,
            success:function (data) {
                const jsObj = JSON.parse(data)
                if (jsObj.code === 0) {
                    const {commentList} = jsObj
                    let smallArr = []
                    $(commentList).each(function (index,comment) {
                        if (smallArr.length === 0) twoArr.push(smallArr)
                        smallArr.push(comment)
                        if (smallArr.length === 10) smallArr = []
                    })
                }
            }
        })
        return twoArr
    }

    initShow()
    function initShow() {
        const TwoArr = creatTwoArr()
        $.get('../template/template-detail.html',function (tem) {
          const render = template.compile(tem)
          const firstPage = creatTwoArr()[0]
          const html = render({firstPage})
          $('#commentListWrap').append(html)
      })

        $('.pagingList').append($('<div class="left"><上一页</div>'))
        for (var i = 0; i <= TwoArr.length; i++) {
            let div
            if (i === 0) {
                div = $(`<div class="active"><a href='#comment'>${i+1}</a></div>`)
            } else {
                div = $(`<div><a href='#comment'>${i+1}</a></div>`)
            }

            $('.pagingList').append(div)
        }
        $('.pagingList').append($('<div class="right">下一页></div>'))
    }






})
