$(document).ready(function () {
    
    ready_projects = [
        {
            sample: "",
            result: "http://скрегион.рф/",
            logo: "http://скрегион.рф/Content/img/logo.png",
            type: "Сайт c нуля",
            name: "Строительная компания Регион"
        },
        {
            sample: "",
            result: "http://aw-s.ru/",
            logo: "http://aw-s.ru/Content/img/logo.png",
            type: "Экспресс-сайт за 2 часа к выставке",
            name: "Автоматизированные водные системы"
        },
        {
            sample: "http://idl-implants.com/",
            result: "http://idl-implants.ru/",
            logo: "http://idl-implants.ru/wp-content/uploads/2015/07/logoIDL.png",
            type: "Cайт представительства в РФ",
            name: "IDL implants"
        },
        {
            sample: "//legal-mos.ru/",
            result: "//uk-mo.ru/",
            logo: "//uk-mo.ru/css/images/logo.png",
            type: "Копия сайта",
            name: "ЮГ Судебная защита"
        },
        {
            sample: "//kuhni.akmmos.ru/",
            result: "//кухня-вашей-мечты.рф",
            logo: "http://u0338974.plsk.regruhosting.ru/tild3130-3237-4664-b735-616438396438/dsc_9332jpg_56475d.jpg",
            type: "Копия сайта",
            name: "КУХНЯ Мечты"
        },
	{
            sample: "//zaimchastniiinvestor.ru/",
            result: "//sarzalog.ru",
            logo: "//sarzalog.ru/img/logo.png",
            type: "Копия сайта",
            name: "Частный инвестор"
        }
    ];
    
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

    BaseItemsCount = $('#ready-projects .ready-project-item').length;
    for (var i = 0 ; i < ready_projects.length; i++) {

        var instance = $("#ready-projects-factory .template").clone();
        instance.removeClass("template");
        if (ready_projects[i].sample) {
            instance.find(".ready-project-sample").attr("href", ready_projects[i].sample);
        }
        else {
            instance.find(".ready-project-sample").remove();
        }
        instance.find(".ready-project-result").attr("href", ready_projects[i].result);
        instance.find(".ready-project-type").html(ready_projects[i].type);
        instance.find(".ready-project-name").html(ready_projects[i].name);
        instance.appendTo("#ready-projects-factory");

        var logo = instance.find(".ready-project-logo");
        logo.attr("src", ready_projects[i].logo)
        logo.load(function () {
                $(this).off("load");
                $('#ready-projects').slick("slickAdd", $(this).parents(".ready-project-item"));
            });
    }

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