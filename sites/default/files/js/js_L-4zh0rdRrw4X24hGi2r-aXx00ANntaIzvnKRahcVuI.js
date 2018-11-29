/* Google Analytics Code */
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-39773230-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

 /* CSS style sheet */
document.write('<link href="https://static.az.gov/sliver/styles/sliver.css" type="text/css" media="all" rel="stylesheet" />');



/* DEV CSS style sheet
document.write('<link href="http://dev-az-alt.pantheonsite.io/sliver/styles/sliver.css" type="text/css" media="all" rel="stylesheet" />');
*/

/* Container */
document.write('<div class="sliver-container">');
document.write('<ul class="sliver-ul">');

/* Agency Directory */
document.write('<li class="sliver-li-left"><a href="https://az.gov/agency-directory" title="Search a Directory of All State Agencies" target="_blank">');
document.write('<img class="sliver-img" src="https://static.az.gov/sliver/images/icon-agencies.png" title="Search a Directory of All State Agencies" alt="State Agency Directory"/>');
document.write('<span class="hideTitle">State</span> <span>Agencies</span></a> </li>');

/* Services Directory */
document.write('<li class="sliver-li-left"><a href="https://az.gov/directory/service/all" title="Search a Directory of All State Services" target="_blank">');
document.write('<img class="sliver-img" src="https://static.az.gov/sliver/images/icon-services.png" title="Search a Directory of All State Services" alt="State Services Directory"/>');
document.write('<span class="hideTitle">State</span> <span>Services</span></a> </li>');

/* Open Books */
document.write('<li class="sliver-li-left"><a href="https://openbooks.az.gov/" title="Visit OpenBooks - Arizona\'s Official Transparency Website" target="_blank">');
document.write('<img class="sliver-img" src="https://static.az.gov/sliver/images/book-icon.png" title="Visit OpenBooks" alt="Book icon for the OpenBooks website"/>');
document.write('<span class="hideTitle">Visit</span> <span>OpenBooks</span></a> </li>');


/* Ombudsman-Citizens Aide */
document.write('<li class="sliver-li-left"><a href="http://www.azoca.gov/" title="The Ombudsman-Citizens Aide helps citizens to resolve ongoing issues with State Agencies" target="_blank">');
document.write('<img class="sliver-img" src="https://static.az.gov/sliver/images/ombudsman-icon.png" title="The Ombudsman-Citizens Aide helps citizens to resolve ongoing issues with State Agencies" alt="Silhouette of head and shoulders as an icon for the Ombudsman-Citizens Aide website"/>');
document.write('<span class="hideTitle">Ombudsman-</span><span>Citizens Aide</span></a> </li>');



/* Search AZ*/
document.write('<li class="sliver-li-right"><a href="https://az.gov/search/" target="_blank">');
document.write('<img class="sliver-img2" src="https://static.az.gov/sliver/images/icon-searchlink.png" title="Search AZ.Gov" alt="Magnifying glass symbolizing search az.gov" />');
document.write('<span class="hide">Search</span> <span>AZ.Gov</span></a><a href="https://az.gov" target="_blank">');
document.write('<img id="sliver-logo" src="https://static.az.gov/sliver/images/logo-small.png" title="AZ.Gov" alt="Magnifying glass symbolizing search az.gov" /></a></li> ');
document.write('</ul>');
document.write('</div>');;
