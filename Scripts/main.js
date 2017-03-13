$(document).ready(function () {
    
    ready_projects = [
        {
            sample: "http://www.kpkinvest.ru/",
            result: "http://ros-zalog.ru/",
            logo: "http://ros-zalog.ru/images/logo.png",
            type: "Сайт по образцу",
            name: "Росзалог"
        },
        {
            sample: "http://nashitulpany.ru ",
            result: "http://ya-florist.ru/",
            logo: "http://ya-florist.ru/img/logo.png",
            type: "Копия лэндинга",
            name: "Я флорист"
        },
        {
            sample: "http://sinara.pro/",
            result: "http://metallstoun.ru/",
            logo: "http://metallstoun.ru/images/ikonki/logo.png",
            type: "Копия сайта",
            name: "Металлстоун"
        },
        {
            sample: "http://idl-implants.com/",
            result: "http://idl-implants.ru/",
            logo: "http://idl-implants.ru/wp-content/uploads/2015/07/logoIDL.png",
            type: "Cайт представительства в РФ",
            name: "IDL implants"
        },
        {
            sample: "http://mysanteh.ru/",
            result: "http://теплок.рф/",
            logo: "http://теплок.рф/content/images/857456963.png",
            type: "Сайт по образцу",
            name: "Теплосила"
        },
        {
            sample: "http://msk-okna.com/",
            result: "http://oknarasko.ru/",
            logo: "http://oknarasko.ru/bitrix/templates/main/img/logo.png",
            type: "Сайт по образцу",
            name: "Окна Раско"
        },
        {
            sample: "http://ремпластокна.рф/",
            result: "http://oknaservice.pro/",
            logo: "http://www.oknaservice.pro/images/logo.png",
            type: "Копия лэндинга",
            name: "Комфорт-Cервис"
        },
        {
            sample: "http://avksb.su/",
            result: "http://ivideon.com",
            logo: "http://avksb.su/images/logo-footer.png",
            type: "Копия дизайна и верстки",
            name: "АВК системы безопасности"
        }
    ];
    
    for (var i = 0; i < ready_projects.length; i++) {

        var instance = $("#ready-projects .template").clone();
        instance.removeClass("template");
        instance.find(".ready-project-sample").attr("href", ready_projects[i].sample);
        instance.find(".ready-project-result").attr("href", ready_projects[i].result);
        instance.find(".ready-project-logo")
            .attr("src", ready_projects[i].logo)
            .load(function () {
                $(this).parents(".ready-project-item").show();
            });
        instance.find(".ready-project-type").html(ready_projects[i].type);
        instance.find(".ready-project-name").html(ready_projects[i].name);
        instance.appendTo("#ready-projects");
        //instance.show();

    }
    $("#ready-projects .template").remove();

    $('#ready-projects').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
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
        $('.ready-project-item .testblock').equivalent();
    });

})