$(function () {

    $(document).on('ready', function () {
        $(".regular").slick({
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
        });
    });

    $(function () {
        $(".slider").bxSlider({
            mode: 'fade',
            speed: 1000,
            startSlide: 1,
            slideWidth: 1400,
            captions: true,

        });
    });


    var myFullpage = new fullpage('#fullpage', {
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', 'lastPage'],
        menu: '#menu',
        continuousVertical: true,
        navigation: true,
        afterLoad: function (origin, destination, direction, trigger) {
            console.log("afterLoad: destination:" + destination.index);
        },
        onLeave: function (origin, destination, direction, trigger) {
            console.log("onLeave: destination:" + destination.index);
        },

    });

    var carWidth = $(".lap").width(); // 보여질 박스의 너비
    var carLength = $(".column").length; // 아이템의 개수

    $(".inner").css({
        // .column들을 감싸는 박스를 늘려주어 요소를 가로로 배치

        width: carWidth * carLength,
        // 보여질 박스의 너비 * 아이템 개수
        marginLeft: -carWidth
        // 마지막번째 요소가 끼어들어 순서가 밀리기 때문에 한 칸 앞으로 당겨줌

    });

    function prevReady() {
        $(".column").last().prependTo(".inner");
        // 첫번째 칼럼에서 이전 버튼을 누를 경우에도 이어질 수 있도록 마지막 칼럼을 첫번째에 끼워넣어 준비해준다.
    }

    prevReady();
    // 처음에 페이지에 접근했을 때 1번칼럼이 보여지는 상태에서도 이전버튼을 클릭했을 때 이어지게끔 준비해뚬

    function prevAni() {
        // 이전 버튼 눌렀을 때 애니메이션

        $(".btn").hide();
        // 버튼을 누르면 애니메이션 되는 동안(이미지가 움직이는 동안) 버튼을 가려줌

        $(".inner").animate({

            marginLeft: parseInt($(".inner").css("margin-left")) + carWidth

        }, function () {
            updateSetting();
            // 원위치로 되돌려줌
            prevReady();
            // 마지막요소를 앞으로 대기
        });
    }

    function nextAni() {
        // 이전 버튼 눌렀을 때 애니메이션

        $(".btn").hide();
        // 버튼을 누르면 애니메이션 되는 동안(이미지가 움직이는 동안) 버튼을 가려줌

        $(".inner").animate({

            marginLeft: parseInt($(".inner").css("margin-left")) - carWidth
            // margin-left 값을 한칸 너비만큼 -로 입력해 왼쪽으로 당겨준다

        }, function () {
            updateSetting();
            // 애니메이션 끝난 뒤 업데이트
            $(".column").first().appendTo(".inner");
            // 첫번째 칼럼을 뒤로 끼워넣는다.
        });
    }

    function updateSetting() {
        // 콜백함수. 애니메이션이 끝난 뒤 바로 실행해줄 함수
        $(".btn").show();

        $(".inner").css("margin-left", "-1460px");
        // 처음 원위치로 되돌리기 위해 한칸 너비만큼 당겨줌

    }

    $(".prev").click(prevAni);
    $(".next").click(nextAni);



    AOS.init();
    // $(".thum").on("click", function () {
    //     var clickSrc = $(this).attr("src");
    //     // console.log(clickSrc);
        
    //     $(this).attr("src", clickSrc.replace("_off", "_on"));
    //     $(this).not(".thum img").attr("src", clickSrc.replace("_on", "_off"));
        
    // });


    // $('.thum').on('click', function() {
    //     var src = $(this).attr('src');
    //     var hoverSrc = src.replace('_off', '_on');
        
    //     // 선택한 썸네일만 on 이미지로 변경하고 나머지 썸네일은 off 이미지로 변경합니다.
    //     $(this).attr('src', hoverSrc).siblings('.thum').attr('src', function() {
    //       return $(this).attr('src').replace('_off', '_on');
    //     });
    //   });

    var img = $(".thum");
    $(img).find("img").css("filter","grayscale(1)");
        
    $(img).click(function(){
        $(img).find("img").css("filter","grayscale(1)");
        $(this).find("img").css("filter","grayscale(0)");
    });

    $("#character_nav a").on("focus click", function (e) {

        e.preventDefault();
        var imgUrl = $(this).attr("href");

        $("#view_area img").attr("src", imgUrl);

        

    });


    $(".column li a").click(function (e) {
        // 작은 이미지(앵커태그)를 클릭하면

        e.preventDefault();
        //  기본 클릭 이벤트 해제

        $(".modal_bg").fadeIn("#section3");
        // 배경레이어를 나타낸다.
        $(".modal_box").fadeIn("#section3")
            // 모달 박스를 나타내고
            .html("<img src='" + $(this).attr("href") + "'>")
            // "<img src='" +"클릭한 앵커태그의 주소(큰 이미지)" + "'>")
            // 모달 박스 안에 큰이미지를 삽입하고
            .append("<button class='close_btn'><i class='fa-solid fa-xmark'></i></button>");
            // 버튼을 뒤에 삽입한다.

        $(".close_btn, .modal_bg").click(function () {
            //  닫기버튼, 배경을 클릭하면

            $(".modal_bg, .modal_box").fadeOut();
            // 배경, 박스를 가린다.

        });

    });


    // $(document).ready(function() {
    //     // 초기 설정: 첫 번째 이미지는 on으로 변경
    //     $("#character_nav li:first-child a img").attr("src", "img/character01_thum_on.jpg");
      
    //     // 클릭 이벤트 핸들러 등록
    //     $("#character_nav li a").click(function() {
    //       // 클릭된 a 태그의 href 속성값에서 이미지 파일명 추출
    //       var imgSrc = $(this).attr("href");
      
    //       // 모든 썸네일 이미지의 src 속성값을 off 이미지로 변경
    //       $("#character_nav li a img").attr("src", function(index, attr) {
    //         return attr.replace("_on.jpg", "_off.jpg");
    //       });
      
    //       // 클릭된 썸네일 이미지의 src 속성값을 on 이미지로 변경
    //       $(this).children("img").attr("src", imgSrc.replace("_info.jpg", "_thum_on.jpg"));
      
    //       // 큰 이미지 영역의 이미지 변경
    //       $("#view_area img").attr("src", imgSrc);
      
    //       // a 태그 기본 동작 중단
    //       return false;
    //     });
    //   });
      

});
