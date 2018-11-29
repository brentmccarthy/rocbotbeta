function altTagFindReplace ( v ) {
    v = v.toLowerCase();
    v = v.replace('https','');
    v = v.replace('http','');
    v = v.replace('dev-az-roc','');
    v = v.replace('test-az-roc','');
    v = v.replace('pantheonsite.io','');
    v = v.replace('roc.az.gov','');
    v = v.replace('sites/default/files/index.html','');
    v = v.replace('images/index.html','');
    v = v.replace('files/index.html','');
    v = v.replace('jpg','');
    v = v.replace('gif','');
    v = v.replace('png','');
    v = v.replace('jpeg','');
    v = v.replace('svg','');
    v = v.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,' ');
    v = v.trim();
    v = v.replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    return v;
}
function checkForAltTags () { 
    var elems = [ 'img','button','h1','h2','h3','h4','h5','h6' ]
    var newname = '';
    for ( e = 0; e < elems.length; e++ ) { 
        var lst = document.getElementsByTagName( elems[e] );
        for ( l = 0; l < lst.length; l++ ) { 
            if ( elems[e] == 'h1' || elems[e] == 'h2' || elems[e] == 'h3' || elems[e] == 'h4' || elems[e] == 'h5' || elems[e] == 'h6') {
                if ( document.getElementsByTagName( elems[e] )[l].innerHTML.trim() == '' ) {
                    document.getElementsByTagName( elems[e] )[l].className = document.getElementsByTagName( elems[e] )[l].className + ' hide';
                }
            } else {
                if ( document.getElementsByTagName( elems[e] )[ l ].alt == '' || document.getElementsByTagName( elems[e] )[ l ].alt == undefined ) {
                    if ( document.getElementsByTagName( elems[e] )[ l ].title != '' ) {
                        document.getElementsByTagName( elems[e] )[ l ].alt = document.getElementsByTagName( elems[e] )[ l ].title;
                    } else {
                        if ( document.getElementsByTagName( elems[e] )[ l ].src != '' && document.getElementsByTagName( elems[e] )[ l ].src != undefined ) { 
                            newname = document.getElementsByTagName( elems[e] )[ l ].src;
                            document.getElementsByTagName( elems[e] )[ l ].alt = altTagFindReplace(newname);
                        } else if ( document.getElementsByTagName( elems[e] )[ l ].value != '' && document.getElementsByTagName( elems[e] )[ l ].value != undefined ) {
                            document.getElementsByTagName( elems[e] )[ l ].alt = document.getElementsByTagName( elems[e] )[ l ].value;
                        } else if ( document.getElementsByTagName( elems[e] )[ l ].innerHTML != '' && document.getElementsByTagName( elems[e] )[ l ].innerHTML != undefined ) {
                            newname = document.getElementsByTagName( elems[e] )[ l ].innerHTML;
                            document.getElementsByTagName( elems[e] )[ l ].alt = altTagFindReplace(newname);
                        } else { 
                            if ( elems[e] == 'button' ) {
                                document.getElementsByTagName( elems[e] )[ l ].value = 'Button';
                            } else {
                                document.getElementsByTagName( elems[e] )[ l ].alt = 'Alt tag missing';
                            }
                        }
                    }
                }
            }
        }
    }
    var btns = document.getElementsByClassName('btn');
    for ( b = 0; b < btns.length; b++ ) { 
        if ( document.getElementsByClassName('btn')[b].value == '' || document.getElementsByClassName('btn')[b].value == undefined ) {
            document.getElementsByClassName('btn')[b].value = 'Button';
            //console.log('Replaced value for button # ' + b);
        }
    }
}
window.onload = checkForAltTags();