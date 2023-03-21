jQuery(function () {
    let zoom = 1.0, scale = 1.0;

    $(document).on("keydown", function (e) {
        e.preventDefault();
        const ZOOM = e.key == "-" ? -1 : e.key == "=" ? 1 : 0;
        const TSFM = e.key == "_" ? -1 : e.key == "+" ? 1 : 0;

        $("body").css("zoom", `${zoom += ZOOM * 0.1}`)
        $("body").css("transform",  `scale(${(scale += TSFM * 0.1)})`);

        if (TSFM) {
            $("body").css("position", "relative");
            $("body").css("transform-origin", "left top");
        }
    })

    $(document).on('mousemove', function(e) {
        const docWidth = $(document).width();
        const winWidth = $(window).width();
        const mouseX = e.pageX - $(this).scrollLeft();
        
        if (docWidth > winWidth) {
            const LR = mouseX < 100 ? '-' : mouseX > winWidth - 100 ? '+' : null;
            
            !LR && $('html, body').stop() 
            || $('html, body').animate({ scrollLeft: `${LR}=50` }, 50);
        }
    });
})