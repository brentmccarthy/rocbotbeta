
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/* JS INJECTOR 4 - named 'JQ-Expandable' - Added date unknown */

(function ($) {   
    $(document).ready(function() {   

          $('.question').click(function() {
                    var selectedId = $(this).attr('id');
                    var targetClass = 'answer-' + selectedId;
                    showhide(selectedId, targetClass, 'n');  
          });

          $('#sidebar-second a').click(function() {
                  if (this.href.indexOf('#') > -1) {
                           var selectedId = this.href.split('#')[1];
                           var targetClass = 'answer-' + selectedId;
                           showhide(selectedId, targetClass, 'y');
                  }
          }); 

          function showhide(selectedId, targetClass, anchor) {
                if ($('.' + targetClass).css('display') == 'none') {
                       $('span[class^=answer]').css('display', 'none');
                       $('span[id^=question-]').css({'font-weight' : 'normal', 'font-size' : '12px'});
                       $('.' + targetClass).css('display', 'block');
                       $('span#' + selectedId).css({'font-weight' : 'bold', 'font-size' : '14px'});
               }
              else {
                     if (anchor == 'n') {
                              $('.' + targetClass).css('display', 'none');
                              $('span#' + selectedId).css({'font-weight' : 'normal', 'font-size' : '12px'});
                     }
               } 
          }
  
 });
})(jQuery);




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/* JS INJECTOR 5 - named 'JS-NoHover' - Added date unknown */

if (("ontouchstart" in document.documentElement)) {
    document.documentElement.className += " no-touch";
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/* JS INJECTOR 7 - named 'JQ-Expandable 2' - Added date unknown */

(function ($) {   
    $(document).ready(function() {   

            // click on the item itself
            $('.area-title').click(function() {
                    var selectedId = $(this).attr('id');
                    showHide(selectedId, 'n');
            });

            // click the item from side bar
            $('#sidebar-second a').click(function() {
                    if (this.href.indexOf('#') > -1) {
                            var selectedId = this.href.split('#')[1];
                            if ((selectedId.match(/-/g) || []).length > 1) {
                                       // lc-gencomcon-b1 becomes lc-gencomcon
                                       selectedId = selectedId.substring(0, selectedId.lastIndexOf('-'));
                            }
                            showHide(selectedId, 'y');
                    }                      
            }); 

            function showHide(selectedId, anchor) {
                    var selectedIdDiv = 'div-' + selectedId;
                    var targetClass = selectedId;

                    var name = 'lc';
                    if (selectedId != '') {
                            name = selectedId.split('-')[0];
                    }                                  

                    if ($('[class^='+targetClass+'-]').css('display') == 'none') {

                               // hide all sections first
                               // $('[class^='+name+'-]').css('display', 'none');
                               // $('div[id^=div-'+name+'-]').css({'padding': '0', 'background-color': 'transparent'});
                               
                               // only open clicked section
                               $('[class^='+targetClass+'-]').css('display', 'block');
                               $('#'+selectedIdDiv).css({'padding': '3px 0 3px 0', 'background-color': '#F2F0ED'});
                     }
                     else {
                                if (anchor == 'n') {
                                          // when click the section itself (not from the side bar) while it's open
                                          $('[class^='+targetClass+'-]').css('display', 'none');
                                          $('#'+selectedIdDiv).css({'padding': '0', 'background-color': 'transparent'});
                                 }
                      }                 
            }

 });
})(jQuery);




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/* JS INJECTOR 9 - named 'JQ-ExpandAll' - Added date unknown */

(function ($) {   
    $(document).ready(function() {

          $('.expandall').click(function() {

                   if ($('#collapse-img').css('display') == 'none') {                
                              $('span[class^=answer]').css('display', 'block');             
                              $('p[class^=answer]').css('display', 'block');
                              $('span[class^=question]').css({'font-weight' : 'bold', 'font-size' : '12px'});
                              $('#expand-img').css('display', 'none');   
                              $('#collapse-img').css('display', 'inline-block');
                              $('#expcol-text').html('Collapse all items');
                   }
                   else {
                              $('span[class^=answer]').css('display', 'none');
                              $('p[class^=answer]').css('display', 'none');
                              $('span[class^=question]').css('font-weight', 'normal');
                              $('#expand-img').css('display', 'inline-block');   
                              $('#collapse-img').css('display', 'none');
                              $('#expcol-text').html('Expand all items');
                   }
          });

 });
})(jQuery);




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/* JS INJECTOR 10 - named 'JQ-BackToTop' - Added date unknown */

(function ($) {   
    $(document).ready(function() {

              var amountScrolled = 300;

              $(window).scroll(function() {
                         if ( $(window).scrollTop() > amountScrolled ) {
                                     $('a.back-to-top').fadeIn('fast');
                         } else {
                                      $('a.back-to-top').fadeOut('fast');
                         }
              });


              $('a.back-to-top').click(function() {
                         $('html, body').animate({
                                 scrollTop: 0
                         }, 700);
                         return false;
               });


 });
})(jQuery);