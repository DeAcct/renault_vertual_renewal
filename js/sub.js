$(function(){
    var Window = $(window);
    var intdBg = $('.intd_bg');
    var yearLine = $('.yearline');
    var yearImgSel = $('.year_right li a');
    var yearImgTar = $('.years_pic');
    var parrTargets = [intdBg, yearLine];
    var nowYear = new Date().getFullYear();
    var years = nowYear-1891;
    var yearElement = $('.years_inner .year_right strong')

    yearElement.find('span').text(years);
    
    new Vivus('race_identity', {
        pathTimingFunction:Vivus.EASE_OUT,animTimingFunction:Vivus.EASE, duration: 150 
    });

    new Vivus('env', {
        type:'sync',pathTimingFunction:Vivus.EASE_OUT,animTimingFunction:Vivus.EASE, duration: 100
    })

    new Vivus('sustain', {
        type:'sync',pathTimingFunction:Vivus.EASE_OUT,animTimingFunction:Vivus.EASE, duration: 100
    })

    var parallax = function(scrTop, targets){
        var deviceHeight = Window.innerHeight();
        
        for(i=0;i<parrTargets.length;i++){
            /*대상 엘리먼트의 최상위값 구하기*/
            parTargetY = parrTargets[i].offset().top;
            if (scrTop>=parTargetY-deviceHeight/1.4){
                parrTargets[i].addClass('reach').css({
                    opacity:1
                });
            }
            else{
                parrTargets[i].removeClass('reach').css({
                    opacity:0
                });
            }
        }
    }

    var imgChange = function(input, target){
        var imgReady = 'url(../img/rn-sub1-history-'+input+'.jpg)'
        target.css({
            backgroundImage:imgReady
        })
    }
    

    Window.scroll(function(){
        var scrTop = Window.scrollTop(); /*지금 어디까지 스크롤했는지 맨 위.*/
        parallax(scrTop,parrTargets);
    });

    $('.hamburger').click(function(){
        $('.gnb').toggleClass('on');
        $(this).toggleClass('open');
    });

    yearImgSel.on('click', function(e){
        var deviceWidth = Window.innerWidth();
        if (deviceWidth>=1300){
            yearImgSel.removeClass('on')
            $(this).addClass('on');
            clicked = $(this).parent().index()+1;
            imgChange(clicked, yearImgTar)
            e.preventDefault();
        }
        else{
            return false;
        }
    })
    
    
})