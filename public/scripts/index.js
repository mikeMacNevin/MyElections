$(window).resize(function() {
    var viewportWidth = $(window).width();
    if (viewportWidth < 756) {
        $('address-container').removeClass('w-50');
    }
})