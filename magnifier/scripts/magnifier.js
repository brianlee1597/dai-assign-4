jQuery(function () {
    let zoom = 1.0, scale = 1.0;

    $(document).on("keydown", function (e) {
        e.preventDefault();
        const ZOOM = e.key == "-" ? -1 : e.key == "=" ? 1 : 0;
        const TSFM = e.key == "_" ? -1 : e.key == "+" ? 1 : 0;

        document.body.style.zoom = (zoom += ZOOM * 0.1);
        $("body").css("transform",  `scale(${(scale += TSFM * 0.1)})`);

        const DIFF = $(document).width() - $(window).width();

        if (TSFM && DIFF > 0) {
            $("body").css("position", "relative");
            $("body").css("left", `${DIFF}px`);
        }
    })

    $(document).on("mousemove", function (e) {
        e.preventDefault();
        if ($(document).width() > $(window).width()) {
            if (e.pageX - $('html, body').scrollLeft() <= 100) {
                $('html, body').animate({scrollLeft: `-=50`}, 100);
            } else if ($(window).width() - e.pageX <= 100) {
                $('html, body').animate({scrollLeft: `+=50`}, 100);
            }
        }
    })
})