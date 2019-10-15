$(window).on("load", function () {

    $(".loader .inner").fadeOut(500, function () {
        $(".loader").fadeOut(750)
    });

    //calling isotope
    $(".items").isotope({
        filter: "*",
        animationOptions: {
            duration: 1300,
            easing: "linear",
            queue: false
        }
    });
});

$(document).ready(function () {
    $('#slides').superslides({
        animation: "fade",
        play: 4000,
        pagination: false
    });

    const typed = new Typed(".typed", {
        strings: ["Software Developer.", "Web Developer.", "Student...."],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 13000,
        callbacks: true,
        autoplayHoverPause: true,
        nav: true,
        margin: 10,
        items: 4,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },

            938: {
                items: 4
            }
        }
    });

    //as soon as scrolled to skills section start animation
    const skillsTopOffSet = $(".skillsSection").offset().top;
    const statsTopOffSet = $(".statsSection").offset().top;
    let countUpFinished = false;

    $(window).scroll(function () {
        if (window.pageYOffset > skillsTopOffSet - $(window).height() + 200) {
            $('.chart').easyPieChart({
                easing: "easeInOut",
                barColor: "#fff",
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function (from, to, percent) {
                    $(this.el).find(".percent").text(Math.round(percent));
                }
            });
        }


        if (!countUpFinished && window.pageYOffset > statsTopOffSet - $(window).height() + 200) {
            $(".counter").each(function () {
                const element = $(this);
                const endVal = parseInt(element.text());
                element.countup(endVal);
            });
            countUpFinished = true;
        }
    });

    //setup for viewing items in full screen
    $("[data-fancybox]").fancybox();


    $("#filters a").click(function () {

        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        //getting the attribute of data filter from index and use it as filter 
        const selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 1300,
                easing: "linear",
                queue: false
            }
        });
        return false;
    });


    //disabling anchor tags redirect
    $("#navigation li a, .arrowNav a").click(function (e) {
        e.preventDefault();

        //getting href that we clicked one
        const targetElement = $(this).attr("href");
        const targetPosition = $(targetElement).offset().top;
        $("html, body").animate({scrollTop: targetPosition - 50},
            "slow");
    });

    const nav = $("#navigation");
    const navTop = nav.offset().top;

    $(window).on("scroll", stickyNavigation);

    function stickyNavigation() {
        const body = $("body");

        if ($(window).scrollTop() >= navTop) {
            body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");
        } else {
            body.css("padding-top", 0);
            body.removeClass("fixedNav");
        }
    }



    //dynamic year for footer
    let today = new Date();
    let year = today.getFullYear();
    let footYear = document.getElementById("year");
    footYear.textContent = year;

});

