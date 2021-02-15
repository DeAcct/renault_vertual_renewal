$(function(){
    var Window = $(window);
    var carImg = $('.carImg');
    var banner = $('.banner');
    var newsBg = $('.bg');
    var newses = $('.news_img');
    var carL = $('.car_left ul li');
    var carR = $('.car_right');
    var mImgPreStyle = 'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)), ';
    var carNames = ['ZOE', 'TWIZY', 'CAPTUR', 'MASTER'];
    var carTitle = ['Electrify Your Life', 'Innovation Next to You', 'Capture the Moment', 'Completion of Elegant Business'];
    var carSummery = ['세상에 없던 나만의 모빌리티', '작지만 큰 혁신', '일상이 더 특별해지는 순간을 만나다', '화물 운송에서 승객 수송까지'];
    var parrTargets = [carImg, banner, newsBg, newses];
    
    /*자동차영역 이미지갤러리*/
    var imgChange = function(imgTarget){
        var deviceWidth = Window.innerWidth();
        var clicked = $(imgTarget).parent().index()+1;
        var imgReady = 'url(img/rn-car-'+clicked+'.jpg) center/cover';
        
        /*이미지 바꾸기*/
        /*모바일 디바이스일 때*/
        if (deviceWidth<768){
            carR.find('.carImg').css({
                background: mImgPreStyle + imgReady
            });
        }
        /*모바일 디바이스가 아닐 때*/
        else{
            carR.find('.carImg').css({
                background: imgReady
            });
        }
        /*텍스트 바꾸기*/
        carR.find('.c_name').text(carNames[clicked-1]);
        carR.find('.c_title').text(carTitle[clicked-1]);
        carR.find('.c_summery').text(carSummery[clicked-1]);
        
        /*화면 사이즈가 변경되면 자기자신 다시 호출*/
        Window.resize(function(){
            imgChange(carL.find('a'));
        })
    }

    
    /*패럴렉스 스크롤링*/
    var parallax = function(scrTop, targets){
        var deviceHeight = Window.innerHeight();
        
        /*대상 엘리먼트의 최상위값 구하기*/
        for(i=0;i<parrTargets.length;i++){
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
    
    $('.hamburger').click(function(){
        $('.gnb').toggleClass('on');
        $(this).toggleClass('open');
    });
    
    carL.find('a').on('click', function(e){
        /*이미지갤러리*/
        imgChange(this);
        
        /*이미지갤러리 인디케이터 바꾸기*/
        carL.removeClass('on');
        $(this).parent().toggleClass('on');
        
        e.preventDefault()
    });        
        
    Window.scroll(function(){
        var scrTop = Window.scrollTop(); /*지금 어디까지 스크롤했는지 맨 위.*/
        parallax(scrTop,parrTargets);
    });
    
    var tl = anime.timeline({
        easing: 'easeInOutCirc',
        duration: 1500
    });
    
    tl.add({
        targets: '.visualLine',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1200
    });
    
    tl.add({
        easing:'linear',
        targets: '.visualLine',
        fill:'rgba(255,255,255,1)',
        duration: 300
    });
});