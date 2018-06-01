$(document).ready(function () {
    
    ready_projects = [
        {
            sample: "",
            result: "http://aw-s.ru/",
            logo: "http://aw-s.ru/Content/img/logo.png",
            type: "Экспресс-сайт за 2 часа к выставке",
            name: "Автоматизированные водные системы"
        },
        {
            sample: "http://archive.li/0wQGu",
            result: "http://stofitness.ru/",
            logo: "http://stofitness.ru/wp-content/themes/autopress/assets/images/tmp/logo2.png",
            type: "Сайт c нуля",
            name: "СТО самообслуживания АвтоФитнес ПЛЮС"
        },
        {
            sample: "http://archive.li/51sS4",
            result: "http://rstop.ru/",
            logo: "http://rstop.ru/wp-content/uploads/2017/01/logo-dark.png",
            type: "Сайт c нуля",
            name: "РемСпецТех"
        },
        {
            sample: "http://archive.li/1Gd1I",
            result: "//uk-mo.ru/",
            logo: "//uk-mo.ru/css/images/logo.png",
            type: "Копия сайта",
            name: "ЮГ Судебная защита"
        },
        {
            sample: "http://archive.li/zEQwC",
            result: "//advokat-lazareva.ru",
            logo: "http://advokat-lazareva.ru/templates/_shablon/images/logo.png",
            type: "Копия сайта",
            name: "Адвокат Лазарева В.А."
        },
        {
            sample: "http://archive.li/HoGts",
            result: "//molbulal.ru/",
            logo: "http://molbulal.ru/CONTENT/first.png",
            type: "Копия сайта",
            name: "Микрофинансы Мол Булал"
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


    $(".re-assure2").click(function () {
        if (!$(this).hasClass("expand")) {
            $(this).addClass("expand");
            $(this).find("span").html("&#8863;");
            $(".form-group.add").show();
        }
        else {
            $(this).removeClass("expand");
            $(this).find("span").html("&#8862;");
            $(".form-group.add").hide();
        }
    })

})