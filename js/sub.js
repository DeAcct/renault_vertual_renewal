$(function(){
    var Window = $(window);
    var intdBg = $('.intd_bg');
    var yearLine = $('.yearline');
    var yearImgSel = $('.year_right li a');
    var yearImgTar = $('.years_pic');
    var intdText = $('.intd_inner h2');
    var zoePic = $('#zoe .picture');
    var capturPic = $('#captur .picture');
    var twizyPic = $('#twizy .picture');
    var masterPic = $('#master .picture');
    var autosolution = $('.autosol_cont div');
    var autosolText = autosolution.find('h3');
    var tableOpenBtn = $('.open_table');
    var table = $('.maint_table');
    var centerName = $('.centerName');
    var address = $('.address');
    var nowYear = new Date().getFullYear();
    var years = nowYear-1891;
    var yearElement = $('.years_inner .year_right strong')
    var deviceWidth = Window.innerWidth();
    var nowPage = $('body').attr('class');
    Window.resize(function(){
        deviceWidth = Window.innerWidth();
    })

    /*기본위치로 지도 표시*/
    var container = document.getElementById('map_wrap');
    var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 3 //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options);
    
    /*서비스센터 위치표시*/ 
    var servicePos = new kakao.maps.services.Places(); 
    servicePos.keywordSearch('르노 서비스센터', serviceSearch); 

    function serviceSearch(data, status){
        if (status === kakao.maps.services.Status.OK){
            var bounds = new kakao.maps.LatLngBounds();
            for (var i=0; i<data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds); 
        }
    }
    function displayMarker(place){
        var position = new kakao.maps.LatLng(place.y, place.x)
        var marker = new kakao.maps.Marker({
            map: map,
            position: position
        });
        kakao.maps.event.addListener(marker, 'click', function() {
            map.setLevel(3);
            map.setCenter(position);
            centerName.text(place.place_name);
            address.text(place.address_name)
        });
    }

    /*현재 사용자의 위치 주소 표시*/
    function success(pos) {
        crd = pos.coords;
        lati = crd.latitude;/*위도*/ 
        longi = crd.longitude;/*경도*/
        var newLocation = new kakao.maps.LatLng(lati, longi);
        map.setLevel(7);
        map.setCenter(newLocation);
    };
    function error(err) {
        alert('위치를 불러오는 중 문제가 생겼습니다.');
    };
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    $('.CTA_location').click(function(){
        navigator.geolocation.getCurrentPosition(success, error, options)
    })
    
    yearElement.find('span').text(years);
    
    if (nowPage=='sub1'){
        new Vivus('race_identity', {
            pathTimingFunction:Vivus.EASE_OUT,animTimingFunction:Vivus.EASE, duration: 150 
        });

        new Vivus('env', {
            type:'sync',pathTimingFunction:Vivus.EASE_OUT,animTimingFunction:Vivus.EASE, duration: 100
        })

        new Vivus('sustain', {
            type:'sync',pathTimingFunction:Vivus.EASE_OUT,animTimingFunction:Vivus.EASE, duration: 100
        })
        parrTargets = [intdBg, yearLine, intdText];
    }
    else if(nowPage=='sub2'){
        parrTargets = [zoePic, capturPic, twizyPic, masterPic];
    }
    else if(nowPage=='sub3'){
        parrTargets = [autosolution, autosolText]
    }
    
    
    var parallax = function(scrTop, targets){
        var deviceHeight = Window.innerHeight();
        
        for(i=0;i<targets.length;i++){
            /*대상 엘리먼트의 최상위값 구하기*/
            parTargetY = targets[i].offset().top;
            if (scrTop>=parTargetY-deviceHeight/1.4){
                targets[i].addClass('reach').css({
                    opacity:1
                });
            }
            else{
                targets[i].removeClass('reach').css({
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

    tableOpenBtn.click(function(){
        table.toggleClass('open');
        if (table.hasClass('open')){
            $(this).find('span').text('표 접기');
        }
        else{
            $(this).find('span').text('표 펼치기');
        }
    })
})