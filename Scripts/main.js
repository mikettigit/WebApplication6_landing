$(document).ready(function () {
    
    ready_projects = [
        {
            sample: "http://www.kpkinvest.ru/",
            result: "http://ros-zalog.ru/",
            logo: "http://ros-zalog.ru/images/logo.png",
            type: "Сайт",
            name: "Росзалог"
        }
    ];

    for (var i = 0; i < ready_projects.length; i++) {
        var instance = $("#ready-projects .template").clone();
        instance.removeClass("template");
        instance.find(".ready-project-sample").attr("href", ready_projects[i].sample);
        instance.find(".ready-project-result").attr("href", ready_projects[i].result);
        instance.find(".ready-project-logo").attr("src", ready_projects[i].logo);
        instance.find(".ready-project-type").html(ready_projects[i].type);
        instance.find(".ready-project-name").html(ready_projects[i].name);
        instance.prependTo("#ready-projects");
        instance.show();
    }

    $('#ready-projects').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });
    $(".slick-slide img").css("display", "inline");

    $.fn.equivalent = function (){ 
        var $blocks = $(this);
        $blocks.css("height", "auto");
        maxH = $blocks.eq(0).outerHeight();
        $blocks.each(function(){ 
            maxH = ($(this).outerHeight() > maxH) ? $(this).outerHeight() : maxH;
        }); 
        $blocks.outerHeight(maxH);
    } 
    $('.ready-project-item .testblock').equivalent();
    $(window).on("resize", function () {
        $('.ready-project-item').equivalent();
    });

})