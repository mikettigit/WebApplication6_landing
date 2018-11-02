$(document).ready(function () {
    
    ready_projects = [
        {
            sample: "",
            result: "http://aw-s.ru/items/rozliv_%D0%9C-125",
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
        },
        {
            sample: "http://archive.is/ViIAX",
            result: "//armystop.ru/",
            logo: "http://armystop.ru/Content/logo.png",
            type: "Копия сайта",
            name: "Юр. компания ArmyStop"
        },
        {
            sample: "http://archive.li/NPQfn",
            result: "//энросса.рф/",
            logo: "http://xn--80azdhga3f.xn--p1ai/logo_white.png",
            type: "Копия сайта",
            name: "Топливная компания Энросса"
        }
    ];
    ready_projects = ready_projects.sort(function () { return 0.5 - Math.random() })
    
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

    var shown = 0;
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
            shown++;
            if (shown <= 3) {
                $('#ready-projects').slick("slickAdd", $(this).parents(".ready-project-item"));
                $('.ready-project-item .testblock').equivalent();
            }
        });
    }

    $.fn.equivalent = function () {
        var $blocks = $(this);
        $blocks.css("height", "auto");
        maxH = $blocks.eq(0).outerHeight();
        $blocks.each(function () {
            maxH = ($(this).outerHeight() > maxH) ? $(this).outerHeight() : maxH;
        });
        $blocks.outerHeight(maxH);
    }
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