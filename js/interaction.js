$(function(){
    
    
    
    $(window).resize(function(){
        deviceWidth = $(window).innerWidth();
    })
    
    /*자동차영역 이미지갤러리*/
    var imgChange = function(target){
        var deviceWidth = $(window).innerWidth();
        var clicked = $(target).parent().index() + 1;
        var imgReady = `url(../img/rn-car-${clicked}.jpg) center/cover`
        if (deviceWidth<768){
            $('.car_right .carImg').css({
                background: 'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)), ' + imgReady
            });
        }
        else{
            $('.car_right .carImg').css({
                background: imgReady
            })
        }
    }
    
    $('.hamburger').click(function(){
        $('.gnb').toggleClass('on');
        $('.hamburger').toggleClass('open')
    });
    
    $('.main_wrap .next').click(function(){
        var sliderWidth = $('.slider_wrap .slides').width();
        $('.slider_wrap .slides').animate({
            left: -sliderWidth*0.5
        })
        $('.main_wrap .prev').css({
            display:'block'
        })
        $(this).css({
            display:'none'
        })
    })
    $('.main_wrap .prev').click(function(){
        $('.slider_wrap .slides').animate({
            left: 0
        })
        $('.main_wrap .next').css({
            display:'block'
        })
        $(this).css({
            display:'none'
        })
    })

    
    $('.car_left ul li a').click(function(){
        
        /*자동차영역 이미지갤러리*/
        imgChange(this);
        
        /*라인 비꾸기*/
        $('.car_left ul li').removeClass('on');
        $(this).parent().toggleClass('on');
        
        return false;
    })
    
    $(window).scroll(function(){
        var carImgY = $('.carImg').offset().top;
        var bannerY = $('.banner').offset().top;
        var newsBgY = $('.bg').offset().top;
        var newsesY = $('.news_img').offset().top;
        var win_top = $(window).scrollTop();
        var win_h = $(window).height();
        
        if (win_top>=carImgY-600){
            $('.carImg').addClass('reach').css({
                opacity:1
            })
        }
        else if(win_top<carImgY - win_h){
            $('.carImg').removeClass('reach')
        }
        
        if (win_top>=bannerY-600){
            $('.banner').addClass('reach').css({
                opacity:1
            })
        }
        else if(win_top<bannerY - win_h){
            $('.banner').removeClass('reach')
        }
        
        if (win_top>=newsBgY-600){
            $('.bg').addClass('reach').css({
                opacity:1
            })
        }
        else if(win_top<newsBgY - win_h){
            $('.bg').removeClass('reach')
        }
        
        if (win_top>=newsesY-600){
            $('.news_img').addClass('reach').css({
                opacity:1
            })
        }
        else if(win_top<newsesY - win_h){
            $('.news_img').removeClass('reach')
        }
    })
    
    var tl = anime.timeline({
        easing: 'easeInOutCubic',
        duration: 1500
    });
    
    tl.add({
        targets: '.visualLine',
        strokeDashoffset: [anime.setDashoffset, 0]
    })
    
    tl.add({
        targets: '.visualLine',
        fill:'rgba(255,255,255,1)'
    },'-=1000')
});