jQuery(function () {
    let zoom = 1.0, scale = 1.0;
    let textbox = false, text = '';

    function toggleMagnifier () {
        const options = {
            id: "magnifierDiv",
            css: {
                "position": "fixed",
                "left": "500px",
                "top": "200px",
                "font-size": "30px",
                "z-index": "10",
                "background": "white",
            },
            text
        }

        textbox && $("#magnifierDiv").remove() 
        || $('body').append($("<div />", options));

        textbox = !textbox;
    }

    $("*:not(body)").on("mouseenter", function (_) {
        text = $(this).text();
    })

    $(document).on("keydown", function (e) {
        e.preventDefault();

        if (e.key == " ") {
            toggleMagnifier();
            return;
        }

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
        
        if (docWidth > winWidth) {
            const LR = mouseX < 100 ? '-' : mouseX > winWidth - 100 ? '+' : null;
            
            !LR && $('html, body').stop() 
            || $('html, body').animate({ scrollLeft: `${LR}=50` }, 50);
        }
    });
})