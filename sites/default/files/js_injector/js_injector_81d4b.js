(function ($) {
     $(document).ready(function() {

         $('.tooltip').hover(function (e) {
                   if (this.title != '') {
                         this.t = this.title ;
                         this.title = '';
                   };                   
                   
                   $('#tip').remove();

                   $('#imgmap').append('<div id="tip" class="tip-style">'+ this.t + '</div>');
                   $('#tip')
                              .css('position', 'absolute')
                              .css('top', (e.pageY - 300) + 'px')
                              .css('left', e.pageX + 'px');
         });

         $('.tooltip').mouseout(function () {
                   $('#tip').remove();
          });
     
   });
})(jQuery);