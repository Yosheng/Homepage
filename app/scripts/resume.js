/**
 * Created by Chris on 2016/4/3.
 */
$(function() {

    // 淫賤的阻止頁面選中效果
    document.onmousedown = function() {
        document.onmousemove = function() {
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }
    document.onmouseup = function() {
        document.onmousemove = null;
    }


    var $container = $('.portfolio-items');
    setTimeout(function() {
        $container.isotope({
            itemSelector: '.portfolio-items > div',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: true
            }
        });
    }, 1000)

    project_info();

    // slideBox
    $('#demo1').slideBox();

    // bxslider
    $('.bxslider').bxSlider({
        auto: true,
        mode: 'fade',
        captions: true
    });

    $('#resume').fullpage({
        sectionsColor: ['transparent', 'transparent', '#e4e4e4', 'rgba(255, 255, 255, .0)', 'transparent', 'transparent'],

        scrollingSpeed: 700,
        // 是否首尾相接
        // continuousVertical: true,
        normalScrollElementTouchThreshold: 5,
        // 導航條顯示
        navigation: true,

        // 內容超出後是否出現滾動條
        scrollOverflow: false,
        // // 左右滑塊循環
        loopHorizontal: false,
        // 左右滑塊顏色
        controlArrowColor: '#16BA9D',
        // 導航欄設置
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
        menu: '#menu',
        easing: 'easeInOut',

        // 頁面渲染後回調
        afterRender: function() {
            // page4 透明背景

            $('item-4').css('background', 'rgba(255, 255, 255, .1)');
            //側邊導航事件
            var Tooltips = ['個人簡歷', '基本資料', '個人成就', '工作經歷', '實務經驗', '展望未來'];
            $('#fp-nav ul li').each(function(index) {
                this.dataset['toggle'] = 'tooltip';
                this.dataset['placement'] = 'left';
                $(this).attr('title', Tooltips[index])
            })
            $('[data-toggle="tooltip"]').tooltip();


            // 頂部導航欄自動會拉事件
            if ($('.navbar-toggle').css('display') == 'block') {
                $('.navbar-collapse li').on('click', function() {
                    $('.navbar-toggle').trigger('click');
                });
            }


            $('#fp-nav').addClass('hidden-xs');
            // 為了避免標籤太多同一時間加載的話在剛載入頁面時候產生怪異感，所有動畫元素初始都是hidden的

            $('.item-1 .next-page').on('click', function() {
                $.fn.fullpage.moveSectionDown();
            });
            setTimeout(function() {
                $('.item-1 .corner').show();
                $('.resume-hide').show();
            }, 500);
        },

        // 滾動觸發後結束前回調
        onLeave: function(index, nextIndex, direction) {

            if (nextIndex == 4) {
                $('.pure').hide();
                $('.sky').show();
            }

            if (nextIndex == 6) {
                $('.sky').hide();
            } else {
                $('.item-6 .top').animate({ 'height': '50%' }, 400);
                $('.item-6 .foot').animate({ 'height': '50%' }, 400);
            }

            // console.log('滾動觸發後結束前回調' + index);
            switch (index) {
                case 1:
                    $('.item-1 .corner').hide();
                    $('.resume-hide').hide();
                    $('.navbar').removeClass('black');
                    break;

                case 2:
                    if (direction == 'down') {
                        $('.item-2 .icon-infomation').addClass('zoomOut');
                        setTimeout(function() {
                            $('.item-2 .icon-infomation').removeClass('zoomOut');
                            $('.item-2 .container').hide();
                        }, 500);
                    } else {
                        $('.item-2 .container').hide();
                    }
                    break;

                case 3:
                    $('.item-3 .container').hide();
                    $('.navbar').removeClass('blue');
                    break;

                case 4:
                    $('.item-4 .container').hide();
                    break;

                case 5:
                    $('.navbar').removeClass('black');
                    break;

                case 6:
                    break;
            }
        },

        // 滾動結束後回調
        afterLoad: function(anchorLink, index) {
            if (index == 6)
                $('.pure').show();

            switch (anchorLink) {
                case 'page1':
                    $('.item-1 .corner').show();
                    $('.resume-hide').show();
                    $('.navbar').addClass('black');
                    break;

                case 'page2':
                    $('.item-2 .container').show();
                    var result = $('.item-2 .container:nth-child(3)');
                    $('.item-2 .container:nth-child(4)').css('opacity', '0');
                    break;

                case 'page3':
                    $('.navbar').addClass('blue');
                    $('.item-3 .container').show();
                    break;

                case 'page4':
                    $('.item-4 .container').show();
                    break;

                case 'page5':
                    $('.navbar').addClass('black');
                    break;

                case 'page6':
                    setTimeout(function() {
                        $('.item-6 .top').animate({ 'height': '30%' }, 400);
                        $('.item-6 .foot').animate({ 'height': '30%' }, 400);
                    }, 500)

                    break;
            }
        },

        // 水平滑塊回調
        onSlideLeave: function(anchorLink, index, slideIndex, direction) {
            // if(slideIndex==0){
            project_info();
            // }
        },

        // 水平滑塊回調
        afterSlideLoad: function(anchorLink, index, slideIndex) {}
    })
})
