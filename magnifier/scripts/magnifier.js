jQuery(function () {
    let zoom = 1.0, scale = 1.0;
    let mouseCoordX = null;

    $(document).on("mousemove", function (event) {
        mouseCoordX = event.pageX;
    })

    $(document).on("keydown", function (event) {
        event.preventDefault();

        if (event.shiftKey && event.key == "_") {
            if ($(document).width() > $(window).width()) {
                if (mouseCoordX <= 100) {
                    
                } else if ($(window).width() - mouseCoordX <= 100) {

                }
            }

            $("body").css("transform",  `scale(${(scale -= 0.1)})`);
        }

        if (event.shiftKey && event.key == "+") {
            if ($(document).width() > $(window).width()) {

            }

            $("body").css("transform",  `scale(${(scale += 0.1)})`);
        }

        if (event.key == "-") {
            document.body.style.zoom = (zoom -= 0.1);
        }

        if (event.key == "=") {
            document.body.style.zoom = (zoom += 0.1);
        }
    })
})