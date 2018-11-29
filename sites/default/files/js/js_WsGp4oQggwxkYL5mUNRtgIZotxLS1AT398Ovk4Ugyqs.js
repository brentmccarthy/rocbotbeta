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
(function ($) {
Drupal.settings.views = Drupal.settings.views || {'ajax_path': '/views/ajax'};

Drupal.quicktabs = Drupal.quicktabs || {};

Drupal.quicktabs.getQTName = function (el) {
  return el.id.substring(el.id.indexOf('-') +1);
}

Drupal.behaviors.quicktabs = {
  attach: function (context, settings) {
    $.extend(true, Drupal.settings, settings);
    $('.quicktabs-wrapper', context).once(function(){
      Drupal.quicktabs.prepare(this);
    });
  }
}

// Setting up the inital behaviours
Drupal.quicktabs.prepare = function(el) {
  // el.id format: "quicktabs-$name"
  var qt_name = Drupal.quicktabs.getQTName(el);
  var $ul = $(el).find('ul.quicktabs-tabs:first');
  $ul.find('li a').each(function(i, element){
    element.myTabIndex = i;
    element.qt_name = qt_name;
    var tab = new Drupal.quicktabs.tab(element);
    var parent_li = $(element).parents('li').get(0);
    if ($(parent_li).hasClass('active')) {
      $(element).addClass('quicktabs-loaded');
    }
    $(element).once(function() {$(this).bind('click', {tab: tab}, Drupal.quicktabs.clickHandler);});
  });
}

Drupal.quicktabs.clickHandler = function(event) {
  var tab = event.data.tab;
  var element = this;
  // Set clicked tab to active.
  $(this).parents('li').siblings().removeClass('active');
  $(this).parents('li').addClass('active');

  // Hide all tabpages.
  tab.container.children().addClass('quicktabs-hide');
  
  if (!tab.tabpage.hasClass("quicktabs-tabpage")) {
    tab = new Drupal.quicktabs.tab(element);
  }

  tab.tabpage.removeClass('quicktabs-hide');
  return false;
}

// Constructor for an individual tab
Drupal.quicktabs.tab = function (el) {
  this.element = el;
  this.tabIndex = el.myTabIndex;
  var qtKey = 'qt_' + el.qt_name;
  var i = 0;
  for (var i = 0; i < Drupal.settings.quicktabs[qtKey].tabs.length; i++) {
    if (i == this.tabIndex) {
      this.tabObj = Drupal.settings.quicktabs[qtKey].tabs[i];
      this.tabKey = i;
    }
  }
  this.tabpage_id = 'quicktabs-tabpage-' + el.qt_name + '-' + this.tabKey;
  this.container = $('#quicktabs-container-' + el.qt_name);
  this.tabpage = this.container.find('#' + this.tabpage_id);
}

if (Drupal.ajax) {
  /**
   * Handle an event that triggers an AJAX response.
   *
   * We unfortunately need to override this function, which originally comes from
   * misc/ajax.js, in order to be able to cache loaded tabs, i.e. once a tab
   * content has loaded it should not need to be loaded again.
   *
   * I have removed all comments that were in the original core function, so that
   * the only comments inside this function relate to the Quicktabs modification
   * of it.
   */
  Drupal.ajax.prototype.eventResponse = function (element, event) {
    var ajax = this;

    if (ajax.ajaxing) {
      return false;
    }
  
    try {
      if (ajax.form) {
        if (ajax.setClick) {
          element.form.clk = element;
        }
  
        ajax.form.ajaxSubmit(ajax.options);
      }
      else {
        // Do not perform an ajax request for already loaded Quicktabs content.
        if (!$(element).hasClass('quicktabs-loaded')) {
          ajax.beforeSerialize(ajax.element, ajax.options);
          $.ajax(ajax.options);
          if ($(element).parents('ul').hasClass('quicktabs-tabs')) {
            $(element).addClass('quicktabs-loaded');
          }
        }
      }
    }
    catch (e) {
      ajax.ajaxing = false;
      alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
    }
    return false;
  };
}


})(jQuery);
;
