jQuery(function () {
    /**
     * event listeners / extension logic
    */
    $("*:not(body)").on("mouseenter", function (e) {
        e.stopPropagation();

        isImage = $(this).is('img');
        content = isImage ? $(this).attr("src") : $(this).text();
    })

    $("*:not(body)").on("mouseleave", function (_) {
        isImage = false;
        content = null;
    })

    $(document).on("keydown", function (e) {
        e.preventDefault();

        // if key is space
        if (e.key == " ") {
            toggleMagnifier();
            return;
        }

        // else do graphic / non-graphic zoom
        const ZOOM = e.key == "-" ? -1 : e.key == "=" ? 1 : 0;
        const TSFM = e.key == "_" ? -1 : e.key == "+" ? 1 : 0;

        $("body")
            .css("position", "relative")
            .css("transform-origin", "left top")
            .css("zoom", `${zoom += ZOOM * 0.1}`)
            .css("transform",  `scale(${(scale += TSFM * 0.1)})`);
    })

    $(document).on('mousemove', function(e) {
        const docWidth = $(document).width();
        const winWidth = $(window).width();
        const mouseX = e.pageX - $(this).scrollLeft();

        // guard clause: horizontal scroll not necessary
        if (docWidth <= winWidth) return;

        // assigns -, +, or null depending on mouse position
        const LR = mouseX < 100 ? '-' : mouseX > winWidth - 100 ? '+' : null;

        // depending on above variable, stop scrolling or scroll left / right
        !LR ? $('html, body').stop() 
        : $('html, body').animate({ scrollLeft: `${LR}=50` }, 50);
    });

    /**
     * extension states and extracted functions.
    */
    let zoom = 1.0, scale = 1.0;
    let textbox = false, isImage = false, content = null;

    function toggleMagnifier () {
        if (!content && !textbox) return;

        const options = {
            id: "magnifier",
            css: {
                "width": isImage && "fit-content",
                "height": isImage && "500px",
            }, 
            text: !isImage && content,
            src: isImage && content,
        }

        // if textbox is true, remove textbox, else append
        !(textbox = !textbox) ? $("#magnifier").remove()
        : $('body').append($(`<${isImage ? 'img' : 'div'} />`, options));
    }
})