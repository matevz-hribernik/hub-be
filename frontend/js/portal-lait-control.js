(function($) {
    "use strict"; // Start of use strict
    $.get("nav.html", function(data){
        $("#side_nav").replaceWith(data);
    });

    $.get("topbar.html", function(data){
        $("#topbar_nav").replaceWith(data);
    });
    

})(jQuery); // End of use strict