(function ($) {   
      $(document).ready(function() {   

            /* click link from another page to expand section (e.g. from Contracts and Miscellaneous Info page to Applying for a License page */
            if (window.location.href.indexOf('=') > -1) {
                             var selectedId = (window.location.href).split('=')[1].split('#')[1];
                             var targetClass = (window.location.href).split('=')[1].split('#')[0];

                             $('.' + targetClass).show();
                             $('span#' + selectedId).css({'font-weight' : 'bold', 'font-size' : '14px'});
            }
   
   });
})(jQuery);