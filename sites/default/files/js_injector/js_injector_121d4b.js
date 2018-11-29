(function ($) {  

$(document).ready(function() {

$('[id^="dob-"]').each(function() {
    
    var selDob = $(this).attr('id');
    var dob =$('#' + selDob).html();

    if(dob != '') {
   
        var ageDifMs = Date.now() -new Date(dob).getTime();   
        var ageDate = new Date(ageDifMs); // miliseconds from epoch   
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
         $('#' + selDob).html(age);          
     }
   
});


});
})(jQuery);