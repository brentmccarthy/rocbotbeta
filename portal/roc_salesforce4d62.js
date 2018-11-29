
/**************************************  LOGIN PAGE FUNCTIONS  ***************************************/

function forgotPassword () {
    if ( document.getElementById('email') != null ) {
        var em = document.getElementById('email').value;
        if ( validateEmail(em) ) {
            if ( document.getElementById('password') != null ) {
                document.getElementById('password').value = "I don't know my password Please reset it";
            }
            window.location = 'https://' + window.location.host + '/sfapi?ff=passwordReset&email=' + em;
        } else {
            $('#email').addClass('redOutline');
            msgAlert('Please enter your email address before clicking the Forgot Your Password link.');
        }
    } 
}
function submitPasswordResetForm () {
    if ( document.getElementById('password') != null && document.getElementById('password2') != null ) {
        if ( document.getElementById('password').value == document.getElementById('password2').value ) {
            document.ploginForm.action = "/sfapi?ff=passwordResetFC";
            document.ploginForm.submit();
            document.ploginForm.submit();
        } else {
            msgAlert("The passwords you entered don't seem to match. Please make sure that both passwords are the same before submitting the form.");
        }
    }
}
function registerUser () {
    // do we still need this function?
}
function setLoginOrRegister ( kns ) {
    if ( document.getElementById('loginOrRegister') != null ) {
        var lg = document.getElementsByClassName('formElementLogin');
        var rg = document.getElementsByClassName('formElementRegister');
        var ng = document.getElementsByClassName('formElementNotSure');
        if ( document.getElementById('loginOrRegister').value == "login" ) {
            for ( f=0; f<lg.length; f++ ) {
                document.getElementsByClassName('formElementLogin')[f].style.maxHeight = "none";
                document.getElementsByClassName('formElementLogin')[f].style.overflow = "inherit";
            }
            for ( fr=0; fr<rg.length; fr++ ) {
                document.getElementsByClassName('formElementRegister')[fr].style.maxHeight = "0px";
                document.getElementsByClassName('formElementRegister')[fr].style.overflow = "hidden";
            }
            if ( kns != 'showNotSure' ) {
                for ( fn=0; fn<ng.length; fn++ ) {
                    document.getElementsByClassName('formElementNotSure')[fn].style.maxHeight = "0px";
                    document.getElementsByClassName('formElementNotSure')[fn].style.overflow = "hidden";
                }
            }
            if ( document.getElementById('loginButton') != null ) { document.getElementById('loginButton').innerHTML = 'Login to the Customer Portal'; }
        } else if ( document.getElementById('loginOrRegister').value == "register" ) {
            for ( f=0; f<lg.length; f++ ) {
                document.getElementsByClassName('formElementLogin')[f].style.maxHeight = "0px";
                document.getElementsByClassName('formElementLogin')[f].style.overflow = "hidden";
            }
            for ( fr=0; fr<rg.length; fr++ ) {
                document.getElementsByClassName('formElementRegister')[fr].style.maxHeight = "none";
                document.getElementsByClassName('formElementRegister')[fr].style.overflow = "inherit";
            }
            if ( kns != 'showNotSure' ) {
                for ( fn=0; fn<ng.length; fn++ ) {
                    document.getElementsByClassName('formElementNotSure')[fn].style.maxHeight = "0px";
                    document.getElementsByClassName('formElementNotSure')[fn].style.overflow = "hidden";
                }
            }
            if ( document.getElementById('loginButton') != null ) { document.getElementById('loginButton').innerHTML = 'Register for the Customer Portal'; }
        } else if ( document.getElementById('loginOrRegister').value == "notsure" ) {
            for ( f=0; f<lg.length; f++ ) {
                document.getElementsByClassName('formElementLogin')[f].style.maxHeight = "none";
                document.getElementsByClassName('formElementLogin')[f].style.overflow = "inherit";
            }
            for ( fr=0; fr<rg.length; fr++ ) {
                document.getElementsByClassName('formElementRegister')[fr].style.maxHeight = "0px";
                document.getElementsByClassName('formElementRegister')[fr].style.overflow = "hidden";
            }
            //if ( kns == 'showNotSure' ) {
                for ( fn=0; fn<ng.length; fn++ ) {
                    document.getElementsByClassName('formElementNotSure')[fn].style.maxHeight = "none";
                    document.getElementsByClassName('formElementNotSure')[fn].style.overflow = "inherit";
                }
            //}
            if ( document.getElementById('loginButton') != null ) { document.getElementById('loginButton').innerHTML = 'Login or Register for the Customer Portal'; }
        }
    }
}
function checkUsername () {
    if ( document.getElementById('email') != null && document.getElementById('loginOrRegister') != null ) {
        if ( document.getElementById('loginOrRegister').value == 'register' || document.getElementById('loginOrRegister').value == 'notsure' ) {
            $('#email').removeClass('greenOutline');
            $('#email').removeClass('redOutline');
            if ( $('#checkUserResults') ) { $('#checkUserResults').addClass('hide'); $('#checkUserResults').empty(); }
            var em = document.getElementById('email').value;
            if ( em.length > 4 && em.indexOf('@') > 0 && em.indexOf('.') > 0 ) {
                if ( $('#checkingUsername') ) { $('#checkingUsername').html('Checking for the username...'); }
                $.get("/sfapi?ff=checkUser&u=" + em, function ( data ) {
                    if ( data.indexOf('Username Available') >= 0 ) {
                        $('#email').addClass('greenOutline');
                        if ( $('#checkingUsername') ) { $('#checkingUsername').html('Username is available!'); }
                        if ( $('#checkUserResults') ) { 
                            $('#checkUserResults').removeClass('hide');
                            $('#checkUserResults').addClass('checkUserResultsSuccess');
                            $('#checkUserResults').html('It does not look like your email is attached to a user account in our system. You should register for a new user account.'); 
                            $('#loginOrRegister option[value=register]').attr('selected','selected');
                            setLoginOrRegister('showNotSure');
                        }
                    } else if ( data.indexOf('Username Taken') >= 0 ) {
                        $('#email').addClass('redOutline');
                        if ( $('#checkingUsername') ) { $('#checkingUsername').html('Sorry, this Username is already in use.'); }
                        if ( $('#checkUserResults') ) { 
                            $('#checkUserResults').removeClass('hide');
                            $('#checkUserResults').addClass('checkUserResultsFail');
                            $('#checkUserResults').html('This email is already tied to a user account in our system. Please login or use the Forgot Your Password function to reset your password.'); 
                            $('#loginOrRegister option[value=login]').attr('selected','selected');
                            setLoginOrRegister('showNotSure');
                        }
                    } 
                });
            } else {
                $('#email').addClass('redOutline');
                if ( $('#checkingUsername') ) { $('#checkingUsername').html('Please enter a valid email address to continue.'); }
            }
        }
    }
}
function checkPassword() {
    if ( document.getElementById('password') != null && document.getElementById('password2') != null ) {
        $('#password').removeClass('redOutline');
        $('#password2').removeClass('redOutline');
        $('#password').removeClass('greenOutline');
        $('#password2').removeClass('greenOutline');
        if ( document.getElementById('password').value != document.getElementById('password2').value ) {
            $('#password').addClass('redOutline');
            $('#password2').addClass('redOutline');
            msgAlert('Your passwords do not match. Please adjust your password and the confirm password to be the same thing.');
        } else {
            if ( checkPasswordStrength(document.getElementById('password').value) == true ) {
                $('#password').addClass('greenOutline');
                $('#password2').addClass('greenOutline');
            } else { 
                $('#password').addClass('redOutline');
                $('#password2').addClass('redOutline');
            }
        }
    }
}
function validateEmail ( em ) {
    if ( $('#email') ) { $('#email').removeClass('redOutline'); }
    if ( em.length > 4 && em.indexOf('@') > 0 && em.indexOf('.') > 0 ) {
        return true;
    } else { 
        if ( $('#email') ) { $('#email').addClass('redOutline'); }
        return false;
    }
}
function checkPasswordStrength ( em ) {
    if ( $('#loginOrRegister') ) {
        if ( $('#loginOrRegister').val() == "register" ) {
            if ( validatePswd(em) == false || !validatePswd(em) ) {
                openInfoBox('infoPswd');
            }
        }
    }
}
function shareLicense ( ty ) {
    if ( ty == 'email' ) {
        $('.shareText').addClass('hide');
        $('.shareEmail').removeClass('hide');
        toggleSub('shareModal');
    } else if ( ty == 'text' ) {
        $('.shareText').removeClass('hide');
        $('.shareEmail').addClass('hide');
        toggleSub('shareModal');
    } else if ( ty == 'save' ) {
        var licno = '';
        if ( document.getElementById('licno') != null ) { licno = document.getElementById('licno').value; } else { licno = getParameterByName('licno'); }
        if ( licno != '' ) {
            saveLicenseForLater ( licno );
        }
    }
}
function sendShareLicense () {
    if ( document.getElementById('sendTo') != null ) {
        $('#shareModalMessages').addClass('hide');
        var licno = document.getElementById('licno').value;
        var sendTo = document.getElementById('sendTo').value;
        var sendFrom = document.getElementById('sendFrom').value;
        var sharedBy = document.getElementById('sharedBy').value;
        var sharedTo = document.getElementById('sharedTo').value;
        var textTo = document.getElementById('textTo').value;
        var telcom = document.getElementById('telcom').value;
        if ( sendTo.trim() == '' || sendFrom.trim() == '' || sharedBy.trim() == '' || sharedTo.trim() == '' ) {
            $('#shareModalMessages').removeClass('hide');
            $('#shareModalMessages').html('All fields on this form are required. Please add Your Name, Your Email, Recipient\'s Name and Recipient\'s Email.');
        } else if ( validateEmail(sendTo) == false ) {
            $('#shareModalMessages').removeClass('hide');
            $('#shareModalMessages').html('Please enter a valid email address in the Recipient\'s Email field.');
        } else if ( validateEmail(sendFrom) == false ) {
            $('#shareModalMessages').removeClass('hide');
            $('#shareModalMessages').html('Please enter a valid email address in the Your Email field.');
        } else {
            if ( sendTo == '' ) { 
                sendTo = sendFrom;  
            } 
            if ( textTo != '' && telcom == '' ) { 
                $('#telcom').attr('required',''); 
                return false;
            } else { 
                $('#telcom').removeAttr('required');
            }
            var vurl1 = "https://roc.az.gov/sfapi?ff=shareLicense&licno=" + licno + "&sendTo=" + sendTo + "&sendFrom=" + sendFrom + "&sharedBy=" + sharedBy + "&sharedTo=" + sharedTo + "&textTo=" + textTo + "&telcom=" + telcom;
            $('#shareModalMessages').html('Sending your email. This may take a moment. Please wait.');
            $.ajax({ 
                type: "GET", 
                url: vurl1, 
                success: function ( data ) { 
                    if ( data[0] != null || data == "[]" ) {
                        var jret1 = data;
                    } else { 
                        var jret1 = $.parseJSON(data);
                    }  
                    if ( document.getElementById('shareModalMessages') != null ) {
                        $('#shareModalMessages').removeClass('hide');
                        $('#shareModalMessages').html(jret1['message']);
                    }
                    $('#shareModalMessages').removeClass('hide');
                    $('#shareModalMessages').html(data['responseText']);
                },
                error: function ( data ) {
                    $('#shareModalMessages').removeClass('hide');
                    $('#shareModalMessages').html(data['responseText']);
                }
            });
        }
    }
}
function saveLicenseForLater ( licno ) {
    if ( localStorage ) {
        var prevSaved = '';
        if ( licno.indexOf('ROC ') > -1 ) { licno = licno.replace('ROC ', ''); }
        if ( localStorage.getItem('savedLicenses') != '' && localStorage.getItem('savedLicenses') != null && localStorage.getItem('savedLicenses') != undefined ) {
            prevSaved = localStorage.getItem('savedLicenses');
            if ( prevSaved.indexOf(licno) == -1 ) {
                prevSaved = prevSaved + "||" + licno;
            } 
        } else { 
            prevSaved = licno;
        }
        localStorage.setItem('savedLicenses', prevSaved);
        showLicensesSavedForLater();
    }
}
function removeSavedLicenseForLater ( licno ) {
    if ( localStorage ) {
        var prevSaved = '';
        if ( localStorage.getItem('savedLicenses') != '' && localStorage.getItem('savedLicenses') != null && localStorage.getItem('savedLicenses') != undefined ) {
            prevSaved = localStorage.getItem('savedLicenses');
            if ( prevSaved.indexOf(licno) > -1 ) {
                prevSaved = prevSaved.split(licno).join('');
                prevSaved = prevSaved.split('||||').join('||');
                prevSaved = prevSaved.split(',').join('');
                localStorage.setItem('savedLicenses', prevSaved);
                showLicensesSavedForLater();
            } 
        } 
    }
}
function removeAllSavedLicenseForLater () {
    if ( localStorage ) {
        localStorage.setItem('savedLicenses','');
        showLicensesSavedForLater();
    }
}
function showLicensesSavedForLater () {
    if ( $('#savedLicenses').length ) {
        $('#savedLicenses').html('');
        $('#savedLicensesHolder').addClass('hide');
        if ( localStorage ) {
            if ( localStorage.getItem('savedLicenses') != '' && localStorage.getItem('savedLicenses') != null ) {
                var lics = localStorage.getItem('savedLicenses');
                //console.log('"'+lics+'"');
                if ( lics != null && lics != '' && lics != undefined ) { 
                    var splitlics = lics.split("||");
                    var liclist = '';
                    for ( i=0; i<splitlics.length; i++ ) {
                        if ( splitlics[i] != null && splitlics[i] != 'null' && splitlics[i].trim() != '' ) {
                            if ( splitlics[i].indexOf('ROC ') > -1 ) { splitlics[i] = splitlics[i].replace('ROC ', ''); }
                            if ( liclist != '' ) { liclist = liclist + " | "; }
                            liclist = liclist + '<a href="/contractor-search?Id=' + splitlics[i] + '" target="_blank">License #: ' + splitlics[i] + "</a><a href=\"javascript:removeSavedLicenseForLater('" + splitlics[i] + "');\"><sup>X</sup></a>";
                        }
                    }
                    if ( liclist != '' ) {
                        $('#savedLicenses').html(liclist);
                        $('#savedLicensesHolder').removeClass('hide');
                    } else {
                        $('#savedLicenses').html('');
                        $('#savedLicensesHolder').addClass('hide');
                    }
                }
            } 
        }
    }
}
window.onload = showLicensesSavedForLater();
function validatePswd ( em ) {
    var strc = { 'A': 1, 'B': 1, 'C': 1, 'D': 1, 'E': 1, 'F': 1, 'G': 1, 'H': 1, 'I': 1, 'J': 1, 'K': 1, 'L': 1, 'M': 1, 'N': 1, 'O': 1, 'P': 1, 'Q': 1, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 1, 'X': 1, 'Y': 1, 'Z' :1 };
    var strl = { 'a': 1, 'b': 1, 'c': 1, 'd': 1, 'e': 1, 'f': 1, 'g': 1, 'h': 1, 'i': 1, 'j': 1, 'k': 1, 'l': 1, 'm': 1, 'n': 1, 'o': 1, 'p': 1, 'q': 1, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 1, 'x': 1, 'y': 1, 'z': 1 };
    var strn = { '0': 1, '1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 1, '8': 1, '9': 1 };
    var strs = { '!': 1, '#': 1, '$': 1, '%': 1, '_': 1, '=': 1, '+': 1, '<': 1, '>': 1, '-': 1 };
    var ckc = 0;
    var ckl = 0;
    var ckn = 0;
    var cks = 0;
    for ( i=0; i<em.length; i++ ) {
        if ( strc[em.substr(i,1)] == 1 ) { ckc = 1; }
        if ( strl[em.substr(i,1)] == 1 ) { ckl = 1; }
        if ( strn[em.substr(i,1)] == 1 ) { ckn = 1; }
        if ( strs[em.substr(i,1)] == 1 ) { cks = 1; }
    }
    if ( em.length > 9 && ckc == 1 && ckl == 1 && ckn == 1 && cks == 1 ) {
        return true;
    } else { 
        openInfoBox('infoPswd');
        return false;
    }
}
function submitLoginForm () {
    // this is where we'll run the post to the API page stored in the drupal plugin
    $('.errorMsg').addClass('hide');
    if ( document.getElementById('ploginForm') != null ) {
        if ( document.getElementById('email') != null && document.getElementById('password') != null ) {
            var email = document.getElementById('email').value;
            var pswd = document.getElementById('password').value;
            var func = '';
            if ( document.getElementById('loginOrRegister') != null ) { func = document.getElementById('loginOrRegister').value; } else { func = 'login'; }
            var rfp = 0;
            var rfq = 0;
            var rfa = 0;
            if ( func != 'login' && document.getElementById('password2') != null ) {
                if ( document.getElementById('password2').value != '' && document.getElementById('password2').value == document.getElementById('password').value ) {
                    rfp = 1;
                }
            }
            if ( func != 'login' && document.getElementById('securityQuestion1') != null && document.getElementById('securityQuestion2') != null && document.getElementById('securityQuestion3') != null ) {
                $('#securityQuestion1').removeClass('redOutline');
                $('#securityQuestion2').removeClass('redOutline');
                $('#securityQuestion3').removeClass('redOutline');
                if ( document.getElementById('securityQuestion1').value != '' ) {
                    if ( document.getElementById('securityQuestion1').value != document.getElementById('securityQuestion2').value ) {
                        if ( document.getElementById('securityQuestion1').value != document.getElementById('securityQuestion3').value ) {
                            rfq = 1;
                        } else { 
                            $('#securityQuestion1').addClass('redOutline');
                            $('#securityQuestion3').addClass('redOutline');
                            msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                            return false;
                        }
                    } else {
                        $('#securityQuestion1').addClass('redOutline');
                        $('#securityQuestion2').addClass('redOutline');
                        msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                        return false;
                    }
                } else {
                    $('#securityQuestion1').addClass('redOutline');
                    msgAlert('You must select three different security questions and provide answers.');
                    return false;
                }
                if ( document.getElementById('securityQuestion2').value != '' ) {
                    if ( document.getElementById('securityQuestion2').value != document.getElementById('securityQuestion1').value ) {
                        if ( document.getElementById('securityQuestion2').value != document.getElementById('securityQuestion3').value ) {
                            rfq = 1;
                        } else { 
                            $('#securityQuestion2').addClass('redOutline');
                            $('#securityQuestion3').addClass('redOutline');
                            msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                            return false;
                        }
                    } else {
                        $('#securityQuestion1').addClass('redOutline');
                        $('#securityQuestion2').addClass('redOutline');
                        msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                        return false;
                    }
                } else {
                    $('#securityQuestion2').addClass('redOutline');
                    msgAlert('You must select three different security questions and provide answers.');
                    return false;
                }
                if ( document.getElementById('securityQuestion3').value != '' ) {
                    if ( document.getElementById('securityQuestion3').value != document.getElementById('securityQuestion1').value ) {
                        if ( document.getElementById('securityQuestion3').value != document.getElementById('securityQuestion2').value ) {
                            rfq = 1;
                        } else { 
                            $('#securityQuestion2').addClass('redOutline');
                            $('#securityQuestion3').addClass('redOutline');
                            msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                            return false;
                        }
                    } else {
                        $('#securityQuestion1').addClass('redOutline');
                        $('#securityQuestion3').addClass('redOutline');
                        msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                        return false;
                    }
                } else {
                    $('#securityQuestion3').addClass('redOutline');
                    msgAlert('You must select three different security questions and provide answers.');
                    return false;
                }
            }
            if ( func != 'login' && document.getElementById('securityAnswer1') != null && document.getElementById('securityAnswer2') != null && document.getElementById('securityAnswer3') != null ) {
                $('#securityQuestion1').removeClass('redOutline');
                $('#securityQuestion2').removeClass('redOutline');
                $('#securityQuestion3').removeClass('redOutline');
                if ( document.getElementById('securityAnswer1').value != '' && document.getElementById('securityAnswer2').value != '' && document.getElementById('securityAnswer3').value != '' ) {
                    rfa = 1;
                } else {
                    if ( document.getElementById('securityAnswer1').value != '' ) {
                        $('#securityAnswer1').addClass('redOutline');
                    }
                    if ( document.getElementById('securityAnswer2').value != '' ) {
                        $('#securityAnswer2').addClass('redOutline');
                    }
                    if ( document.getElementById('securityAnswer3').value != '' ) {
                        $('#securityAnswer3').addClass('redOutline');
                    }
                    msgAlert('You need to add answers to each of the security questions.');
                    return false;
                }
            }
            if ( func == 'login' ) { rfp = 1; rfa = 1; rfq = 1; }

            if ( validateEmail(email) && validatePswd(pswd) && rfp == 1 && rfa == 1 && rfq == 1 ) {

        document.getElementById('ploginForm').style.maxHeight = "0px";
        document.getElementById('ploginForm').style.overflow = "hidden";
        document.ploginForm.action = '/sfapi?ff=plogin';
        //document.ploginForm.target = 'formSubWin'; //'_blank';
        //document.ploginForm.submit();
        setTimeout('document.ploginForm.submit()',500);
        if ( document.getElementById('showLoading') != null ){
            //document.getElementById('showLoading').style.display = 'block';
            $('#showLoading').removeClass('hide');
            smoothScrollTo('page-title');
        }
        /*
        if ( document.getElementById('formSubWin') != null ) {
            var iframe = document.getElementById('formSubWin');
            var vv = 0;
            while ( iframe.innerHTML == '' && vv < 10000 ) {
                // do nothing, just wait
                vv++;
                if ( vv == 2000 ) {
                    document.ploginForm.submit();
                }
            }
            iframe.addEventListener("load", function () {
                if ( document.getElementById('showLoading') != null ){
                    var ret = iframe.contentWindow.document.body.innerHTML;
                    //ret = ret.substr(ret.indexOf("<body") + 5);
                    //ret = ret.substr(0,(ret.indexOf("/body>")-1));
                    //iframe.innerHTML = ret;
                    //alert(ret);
                    ret = ret.substring(ret.indexOf('[{"attributes"'));
                    ret = ret.substring(0, (ret.indexOf('}]') + 2));
                    //alert(ret);
                    //ret = ret.replace("[","");
                    //ret = ret.replace("]","");
                    //console.log(ret);
                    var ret1 = "";
                    var jret1 = $.parseJSON(ret);
                    var jret = jret1[0];
                    //console.log(jret);
                    $('#showLoading').empty();
                    if ( !jret.error && !jret.errorCode && jret.showMe && jret.showMe != '' ) {
                        $('#showLoading').html(jret.showMe);
                    } else {
                        var err = '';
                        if ( jret.error ) {
                            err = jret.error;
                        } else { 
                            err = jret.message;
                        }
                        msgAlert("An error was encountered while processing your request. Please review the information you submitted and enter any missing information to resubmit your form. If the issue persists, please contact the ROC webmaster at webmaster@roc.az.gov. We're sorry for any inconvenience.<br><br><small>Error Message: " + err + "</small>");
                    }
                    //document.getElementById('showLoading').innerHTML = ret1;
                }
            });
        }
        */

            } else {
                msgAlert("Please enter your email address and password before logging in.");
            }
        }
    }
}

function submitEditLoginForm () {
    // this is where we'll run the post to the API page stored in the drupal plugin
    if ( document.getElementById('ploginForm') != null ) {
        if ( document.getElementById('email') != null ) {
            var email = document.getElementById('email').value;
            var func = 'edit';
            var rfp = 1; // 0;
            var rfq = 0;
            var rfa = 0;
            if ( func != 'login' && document.getElementById('securityQuestion1') != null && document.getElementById('securityQuestion2') != null && document.getElementById('securityQuestion3') != null ) {
                $('#email').removeClass('redOutline');
                $('#securityQuestion1').removeClass('redOutline');
                $('#securityQuestion2').removeClass('redOutline');
                $('#securityQuestion3').removeClass('redOutline');
                if ( document.getElementById('securityQuestion1').value != '' ) {
                    if ( document.getElementById('securityQuestion1').value != document.getElementById('securityQuestion2').value ) {
                        if ( document.getElementById('securityQuestion1').value != document.getElementById('securityQuestion3').value ) {
                            rfq = 1;
                        } else { 
                            $('#securityQuestion1').addClass('redOutline');
                            $('#securityQuestion3').addClass('redOutline');
                            msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                            return false;
                        }
                    } else {
                        $('#securityQuestion1').addClass('redOutline');
                        $('#securityQuestion2').addClass('redOutline');
                        msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                        return false;
                    }
                } else {
                    $('#securityQuestion1').addClass('redOutline');
                    msgAlert('You must select three different security questions and provide answers.');
                    return false;
                }
                if ( document.getElementById('securityQuestion2').value != '' ) {
                    if ( document.getElementById('securityQuestion2').value != document.getElementById('securityQuestion1').value ) {
                        if ( document.getElementById('securityQuestion2').value != document.getElementById('securityQuestion3').value ) {
                            rfq = 1;
                        } else { 
                            $('#securityQuestion2').addClass('redOutline');
                            $('#securityQuestion3').addClass('redOutline');
                            msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                            return false;
                        }
                    } else {
                        $('#securityQuestion1').addClass('redOutline');
                        $('#securityQuestion2').addClass('redOutline');
                        msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                        return false;
                    }
                } else {
                    $('#securityQuestion2').addClass('redOutline');
                    msgAlert('You must select three different security questions and provide answers.');
                    return false;
                }
                if ( document.getElementById('securityQuestion3').value != '' ) {
                    if ( document.getElementById('securityQuestion3').value != document.getElementById('securityQuestion1').value ) {
                        if ( document.getElementById('securityQuestion3').value != document.getElementById('securityQuestion2').value ) {
                            rfq = 1;
                        } else { 
                            $('#securityQuestion2').addClass('redOutline');
                            $('#securityQuestion3').addClass('redOutline');
                            msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                            return false;
                        }
                    } else {
                        $('#securityQuestion1').addClass('redOutline');
                        $('#securityQuestion3').addClass('redOutline');
                        msgAlert('You can only choose a security question once. Make sure you have three different questions selected.');
                        return false;
                    }
                } else {
                    $('#securityQuestion3').addClass('redOutline');
                    msgAlert('You must select three different security questions and provide answers.');
                    return false;
                }
            }
            if ( func != 'login' && document.getElementById('securityAnswer1') != null && document.getElementById('securityAnswer2') != null && document.getElementById('securityAnswer3') != null ) {
                $('#securityQuestion1').removeClass('redOutline');
                $('#securityQuestion2').removeClass('redOutline');
                $('#securityQuestion3').removeClass('redOutline');
                if ( document.getElementById('securityAnswer1').value != '' && document.getElementById('securityAnswer2').value != '' && document.getElementById('securityAnswer3').value != '' ) {
                    rfa = 1;
                } else {
                    if ( document.getElementById('securityAnswer1').value != '' ) {
                        $('#securityAnswer1').addClass('redOutline');
                    }
                    if ( document.getElementById('securityAnswer2').value != '' ) {
                        $('#securityAnswer2').addClass('redOutline');
                    }
                    if ( document.getElementById('securityAnswer3').value != '' ) {
                        $('#securityAnswer3').addClass('redOutline');
                    }
                    msgAlert('You need to add answers to each of the security questions.');
                    return false;
                }
            }

            if ( validateEmail(email) && rfp == 1 && rfa == 1 && rfq == 1 ) {

                document.getElementById('ploginForm').style.maxHeight = "0px";
                document.getElementById('ploginForm').style.overflow = "hidden";
                document.ploginForm.action = '/sfapi?ff=pEditLogin';
                //document.ploginForm.target = 'formSubWin'; //'_blank';
                //document.ploginForm.submit();
                setTimeout('document.ploginForm.submit()',500);
                if ( document.getElementById('showLoading') != null ){
                    //document.getElementById('showLoading').style.display = 'block';
                    $('#showLoading').removeClass('hide');
                    smoothScrollTo('page-title');
                }

            } else {
                $('#email').addClass('redOutline');
                msgAlert("Please enter a valid email address.");
            }
        }
    }
}


/**************************************  COMPLAINT FORM FUNCTIONS  ***************************************/

function selectCompType ( ct ) { 
    var ttl = '';
    var ttlc = '';
    var lic = document.getElementsByClassName('formLicensed');
    var unlic = document.getElementsByClassName('formUnlicensed');
    var nonp = document.getElementsByClassName('formNonpayment');
    // run script on change of complaint type field
    if ( ct == 'licensed' ) { 
        if ( document.getElementById('instructionsLicensed') != null ) { document.getElementById('instructionsLicensed').className = 'show'; }
        if ( document.getElementById('instructionsUnlicensed') != null ) { document.getElementById('instructionsUnlicensed').className = 'hide'; }
        if ( document.getElementById('instructionsNonpayment') != null ) { document.getElementById('instructionsNonpayment').className = 'hide'; }
        if ( document.getElementById('personfilingInfo') != null ) { ttl = document.getElementById('personfilingInfo').innerHTML; document.getElementById('personfilingInfo').innerHTML = ttl.replace('<h2>Person Filing Complaint (Payee)</h2>','<h2>Person Filing Complaint</h2>'); }
        if ( document.getElementById('contractorInfo') != null ) { ttlc = document.getElementById('contractorInfo').innerHTML; document.getElementById('contractorInfo').innerHTML = ttlc.replace('<h2>Licensee Information (Payer)</h2>','<h2>Contractor Information</h2>'); }
        for ( u=0; u<unlic.length; u++ ) {
            document.getElementsByClassName('formUnlicensed')[u].style.display = 'none';
        }
        for ( n=0; n<nonp.length; n++ ) {
            document.getElementsByClassName('formNonpayment')[n].style.display = 'none';
        }
        for ( l=0; l<lic.length; l++ ) {
            document.getElementsByClassName('formLicensed')[l].style.display = '';
        }
        if ( document.getElementById('contractInfo') != null ) { document.getElementById('contractInfo').className = 'show'; }
        if ( document.getElementById('nonPayComplaintInfo') != null ) { document.getElementById('nonPayComplaintInfo').className = 'hide'; }
        if ( document.getElementById('complaintItemExp') != null ) { document.getElementById('complaintItemExp').className = 'show'; }
        if ( document.getElementById('addCompItemBtn') != null ) { document.getElementById('addCompItemBtn').innerHTML = 'Add Additional Complaint Items'; }
        $('#npnav1').addClass('hide');
        $('#npnav2').addClass('hide');
        $('#lunav1').removeClass('hide');
        $('#lunav2').removeClass('hide');
    } else if ( ct == 'unlicensed' ) { 
        if ( document.getElementById('instructionsLicensed') != null ) { document.getElementById('instructionsLicensed').className = 'hide'; }
        if ( document.getElementById('instructionsUnlicensed') != null ) { document.getElementById('instructionsUnlicensed').className = 'show'; }
        if ( document.getElementById('instructionsNonpayment') != null ) { document.getElementById('instructionsNonpayment').className = 'hide'; }
        if ( document.getElementById('personfilingInfo') != null ) { ttl = document.getElementById('personfilingInfo').innerHTML; document.getElementById('personfilingInfo').innerHTML = ttl.replace('<h2>Person Filing Complaint (Payee)</h2>','<h2>Person Filing Complaint</h2>'); }
        if ( document.getElementById('contractorInfo') != null ) { ttlc = document.getElementById('contractorInfo').innerHTML; document.getElementById('contractorInfo').innerHTML = ttlc.replace('<h2>Licensee Information (Payer)</h2>','<h2>Contractor Information</h2>'); }
        for ( l=0; l<lic.length; l++ ) {
            document.getElementsByClassName('formLicensed')[l].style.display = 'none';
        }
        for ( n=0; n<nonp.length; n++ ) {
            document.getElementsByClassName('formNonpayment')[n].style.display = 'none';
        }
        for ( u=0; u<unlic.length; u++ ) {
            document.getElementsByClassName('formUnlicensed')[u].style.display = '';
        }
        if ( document.getElementById('contractInfo') != null ) { document.getElementById('contractInfo').className = 'show'; }
        if ( document.getElementById('nonPayComplaintInfo') != null ) { document.getElementById('nonPayComplaintInfo').className = 'hide'; }
        if ( document.getElementById('complaintItemExp') != null ) { document.getElementById('complaintItemExp').className = 'show'; }
        if ( document.getElementById('addCompItemBtn') != null ) { document.getElementById('addCompItemBtn').innerHTML = 'Add Additional Complaint Items'; }
        $('#npnav1').addClass('hide');
        $('#npnav2').addClass('hide');
        $('#lunav1').removeClass('hide');
        $('#lunav2').removeClass('hide');
    } else if ( ct == 'non-payment' ) {
        if ( document.getElementById('instructionsLicensed') != null ) { document.getElementById('instructionsLicensed').className = 'hide'; }
        if ( document.getElementById('instructionsUnlicensed') != null ) { document.getElementById('instructionsUnlicensed').className = 'hide'; }
        if ( document.getElementById('instructionsNonpayment') != null ) { document.getElementById('instructionsNonpayment').className = 'show'; }
        if ( document.getElementById('personfilingInfo') != null ) { ttl = document.getElementById('personfilingInfo').innerHTML; document.getElementById('personfilingInfo').innerHTML = ttl.replace('<h2>Person Filing Complaint</h2>','<h2>Person Filing Complaint (Payee)</h2>'); }
        if ( document.getElementById('contractorInfo') != null ) { ttlc = document.getElementById('contractorInfo').innerHTML; document.getElementById('contractorInfo').innerHTML = ttlc.replace('<h2>Contractor Information</h2>','<h2>Licensee Information (Payer)</h2>'); }
        for ( l=0; l<lic.length; l++ ) {
            document.getElementsByClassName('formLicensed')[l].style.display = 'none';
        }
        for ( u=0; u<unlic.length; u++ ) {
            document.getElementsByClassName('formUnlicensed')[u].style.display = 'none';
        }
        for ( n=0; n<nonp.length; n++ ) {
            document.getElementsByClassName('formNonpayment')[n].style.display = '';
        }
        if ( document.getElementById('contractInfo') != null ) { document.getElementById('contractInfo').className = 'hide'; }
        if ( document.getElementById('nonPayComplaintInfo') != null ) { document.getElementById('nonPayComplaintInfo').className = 'show'; }
        if ( document.getElementById('complaintItemExp') != null ) { document.getElementById('complaintItemExp').className = 'hide'; }
        if ( document.getElementById('addCompItemBtn') != null ) { document.getElementById('addCompItemBtn').innerHTML = 'Add Additional Unpaid Items'; }
        $('#npnav1').removeClass('hide');
        $('#npnav2').removeClass('hide');
        $('#lunav1').addClass('hide');
        $('#lunav2').addClass('hide');
    } else {
        if ( document.getElementById('instructionsLicensed') != null ) { document.getElementById('instructionsLicensed').className = 'hide'; }
        if ( document.getElementById('instructionsUnlicensed') != null ) { document.getElementById('instructionsUnlicensed').className = 'hide'; }
        if ( document.getElementById('instructionsNonpayment') != null ) { document.getElementById('instructionsNonpayment').className = 'hide'; }
        if ( document.getElementById('personfilingInfo') != null ) { ttl = document.getElementById('personfilingInfo').innerHTML; document.getElementById('personfilingInfo').innerHTML = ttl.replace('<h2>Person Filing Complaint (Payee)</h2>','<h2>Person Filing Complaint</h2>'); }
        if ( document.getElementById('contractorInfo') != null ) { ttlc = document.getElementById('contractorInfo').innerHTML; document.getElementById('contractorInfo').innerHTML = ttlc.replace('<h2>Licensee Information (Payer)</h2>','<h2>Contractor Information</h2>'); }
        for ( l=0; l<lic.length; l++ ) {
            document.getElementsByClassName('formLicensed')[l].style.display = 'none';
        }
        for ( u=0; u<unlic.length; u++ ) {
            document.getElementsByClassName('formUnlicensed')[u].style.display = 'none';
        }
        for ( n=0; n<nonp.length; n++ ) {
            document.getElementsByClassName('formNonpayment')[n].style.display = 'none';
        }
        if ( document.getElementById('contractInfo') != null ) { document.getElementById('contractInfo').className = 'show'; }
        if ( document.getElementById('nonPayComplaintInfo') != null ) { document.getElementById('nonPayComplaintInfo').className = 'hide'; }
        if ( document.getElementById('complaintItemExp') != null ) { document.getElementById('complaintItemExp').className = 'show'; }
        if ( document.getElementById('addCompItemBtn') != null ) { document.getElementById('addCompItemBtn').innerHTML = 'Add Additional Complaint Items'; }
        $('#npnav1').addClass('hide');
        $('#npnav2').addClass('hide');
        $('#lunav1').removeClass('hide');
        $('#lunav2').removeClass('hide');
    }
}
if ( document.getElementById('nonPayComplaintInfo') != null ) { document.getElementById('nonPayComplaintInfo').className = 'hide'; }
var nextComp = 5;
var maxlength = '';
if ( complaintForm == 'recoveryFund' ) { nextComp = 3; }
//$('.compItem').autoResize();
function addCompItems () { 
    if ( complaintForm != 'recoveryFund' ) {
        if ( document.getElementById('complaintItems') != null ) { 
            var newCItem = '';
            if ( complaintForm == 'buildingConfidence' ) { 
                newCItem = '<div class="formElement formElementFull formElementNoWidths"><label for="compItem' + nextComp + '">' + (nextComp + 1) + ':</label> <input type="text" id="compItem' + nextComp + '" name="compItem' + nextComp + '" value="" maxlength="80" /></div><br />';
            } else {
                newCItem = '<div class="formElement formElementFull formElementNoWidths"><label for="compItem' + nextComp + '">' + (nextComp + 1) + ':</label> <textarea id="compItem' + nextComp + '" name="compItem' + nextComp + '" class="compItem"></textarea></div><br />';
            }
            document.getElementById('complaintItems').innerHTML += newCItem;
        }
    } else {
        document.getElementById('complaintItems').innerHTML += '<div id="cih' + nextComp + '" class="compItemHolder"></div>';
        var newCItem = '<div class="formElement"><label for="compItem' + nextComp + 'a">Date of Payment:</' + 'label> <input type="date" id="compItem' + nextComp + 'a" name="compItem' + nextComp + 'a" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement"><label for="compItem' + nextComp + 'b">Person or Entity Paid:</' + 'label> <input type="text" id="compItem' + nextComp + 'b" name="compItem' + nextComp + 'b" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement"><label for="compItem' + nextComp + 'c">ROC License Number:</' + 'label> <input type="text" id="compItem' + nextComp + 'c" name="compItem' + nextComp + 'c" value="" /' + '></' + 'div><br>';
        newCItem += '<div class="formElement"><label for="compItem' + nextComp + 'd">Method of Payment:</' + 'label> <input type="text" id="compItem' + nextComp + 'd" name="compItem' + nextComp + 'd" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement"><label for="compItem' + nextComp + 'e">Amount Paid: $</' + 'label> <input type="number" step="0.01" id="compItem' + nextComp + 'e" name="compItem' + nextComp + 'e" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement"><label for="compItem' + nextComp + 'f">Comments:</' + 'label> <input type="text" id="compItem' + nextComp + 'f" name="compItem' + nextComp + 'f" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement formElementFull formElementNoWidths"><label for="compItem' + nextComp + 'g">Supporting File to Upload:</' + 'label> <input type="file" name="compItem' + nextComp + 'g" id="compItem' + nextComp + 'g" value="" accept=".pdf,.jpg,.gif,.png,.tif" /' + '></' + 'div>';
        //newCItem += '</div><br />';
        document.getElementById('cih' + nextComp).innerHTML = newCItem;
    }        
    nextComp = nextComp + 1;
    if ( document.getElementById('compItemCount') != null ) { document.getElementById('compItemCount').value = nextComp; }
}
var next2Comp = 3;
function addComp2Items () { 
    if ( document.getElementById('complaintItems2') != null ) { 
        document.getElementById('complaintItems2').innerHTML += '<div id="cih' + nextComp + '" class="compItemHolder"></div>';
        var newCItem = '<div class="formElement"><label for="comp2Item' + nextComp + 'a">Date of Payment:</' + 'label> <input type="date" id="comp2Item' + nextComp + 'a" name="comp2Item' + nextComp + 'a" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement"><label for="comp2Item' + nextComp + 'b">Person or Entity Paid:</' + 'label> <input type="text" id="comp2Item' + nextComp + 'b" name="comp2Item' + nextComp + 'b" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement"><label for="comp2Item' + nextComp + 'c">ROC License Number:</' + 'label> <input type="text" id="comp2Item' + nextComp + 'c" name="comp2Item' + nextComp + 'c" value="" /' + '></' + 'div><br>';
        newCItem += '<div class="formElement"><label for="comp2Item' + nextComp + 'd">Method of Payment:</' + 'label> <input type="text" id="comp2Item' + nextComp + 'd" name="comp2Item' + nextComp + 'd" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement"><label for="comp2Item' + nextComp + 'e">Amount Paid: $</' + 'label> <input type="number" step="0.01" id="comp2Item' + nextComp + 'e" name="comp2Item' + nextComp + 'e" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement"><label for="comp2Item' + nextComp + 'f">Comments:</' + 'label> <input type="text" id="comp2Item' + nextComp + 'f" name="comp2Item' + nextComp + 'f" value="" /' + '></' + 'div>';
        newCItem += '<div class="formElement formElementFull formElementNoWidths"><label for="comp2Item' + nextComp + 'g">Supporting File to Upload:</' + 'label> <input type="file" name="comp2Item' + nextComp + 'g" id="comp2Item' + nextComp + 'g" accept=".pdf,.jpg,.gif,.png,.tif" value="" /' + '></' + 'div>';
        //newCItem += '</div><br />';
        document.getElementById('cih' + nextComp).innerHTML = newCItem;
        nextComp = nextComp + 1;
        if ( document.getElementById('comp2ItemCount') != null ) { document.getElementById('comp2ItemCount').value = next2Comp; }
    }
}
function fixZoneContent () { 
    if ( document.getElementById('zone-content') != null ) { 
        document.getElementById('zone-content').style.paddingBottom = '0px !important'; 
        console.log("Zone-content fixed"); 
    } else {
        console.log("Zone-content NOT fixed"); 
    } 
}
function mailingSameAsBusiness () {
    if ( document.getElementById('Physical_Address__c').value != '' ) {
        if ( document.getElementById('Mailing_Address__c') != null ) {
            document.getElementById('Mailing_Address__c').value = document.getElementById('Physical_Address__c').value;
        }
    }
    if ( document.getElementById('Physical_City').value != '' ) {
        if ( document.getElementById('Mailing_City') != null ) {
            document.getElementById('Mailing_City').value = document.getElementById('Physical_City').value;
            //console.log('city value changed');
        }
    }
    if ( document.getElementById('Physical_State').value != '' ) {
        if ( document.getElementById('Mailing_State') != null ) {
            document.getElementById('Mailing_State').value = document.getElementById('Physical_State').value;
            $("select[name='Mailing_State']").each(function(){
                $('#Mailing_State option[value=' + document.getElementById('Physical_State').value + ']').attr('selected','selected');
                //console.log('state value changed');
            });
        }
    }
    if ( document.getElementById('Physical_Zip_Post_Code').value != '' ) {
        if ( document.getElementById('Mailing_Zip_Post_Code') != null ) {
            document.getElementById('Mailing_Zip_Post_Code').value = document.getElementById('Physical_Zip_Post_Code').value;
            //console.log('zip value changed');
        }
    }
}
function QPmailingSameAsBusiness () {
    if ( document.getElementById('QP_Physical_Address__c').value != '' ) {
        if ( document.getElementById('QP_Mailing_Address__c') != null ) {
            document.getElementById('QP_Mailing_Address__c').value = document.getElementById('QP_Physical_Address__c').value;
        }
    }
    if ( document.getElementById('QP_Physical_City').value != '' ) {
        if ( document.getElementById('QP_Mailing_City') != null ) {
            document.getElementById('QP_Mailing_City').value = document.getElementById('QP_Physical_City').value;
            //console.log('city value changed');
        }
    }
    if ( document.getElementById('QP_Physical_State').value != '' ) {
        if ( document.getElementById('QP_Mailing_State') != null ) {
            document.getElementById('QP_Mailing_State').value = document.getElementById('QP_Physical_State').value;
            $("select[name='QP_Mailing_State']").each(function(){
                $('#QP_Mailing_State option[value=' + document.getElementById('QP_Physical_State').value + ']').attr('selected','selected');
                //console.log('state value changed');
            });
        }
    }
    if ( document.getElementById('QP_Physical_Zip_Post_Code').value != '' ) {
        if ( document.getElementById('QP_Mailing_Zip_Post_Code') != null ) {
            document.getElementById('QP_Mailing_Zip_Post_Code').value = document.getElementById('QP_Physical_Zip_Post_Code').value;
            //console.log('zip value changed');
        }
    }
}
function qpSameAsApplicant () {
    if ( document.getElementById('Applicant_First_Name__c').value != '' ) {
        if ( document.getElementById('QP_First_Name__c') != null ) {
            document.getElementById('QP_First_Name__c').value = document.getElementById('Applicant_First_Name__c').value;
        }
    }
    if ( document.getElementById('Applicant_Middle_Name__c').value != '' ) {
        if ( document.getElementById('QP_Middle_Name__c') != null ) {
            document.getElementById('QP_Middle_Name__c').value = document.getElementById('Applicant_Middle_Name__c').value;
        }
    }
    if ( document.getElementById('Applicant_Last_Name__c').value != '' ) {
        if ( document.getElementById('QP_Last_Name__c') != null ) {
            document.getElementById('QP_Last_Name__c').value = document.getElementById('Applicant_Last_Name__c').value;
        }
    }
    if ( document.getElementById('Government_Id_Number__c').value != '' ) {
        if ( document.getElementById('QP_Government_Id_Number__c') != null ) {
            document.getElementById('QP_Government_Id_Number__c').value = document.getElementById('Government_Id_Number__c').value;
        }
    }
    if ( document.getElementById('Social_Security_Number__c').value != '' ) {
        if ( document.getElementById('QP_Social_Security_Number__c') != null ) {
            document.getElementById('QP_Social_Security_Number__c').value = document.getElementById('Social_Security_Number__c').value;
        }
    }
    if ( document.getElementById('Date_of_Birth__c').value != '' ) {
        if ( document.getElementById('QP_Date_of_Birth__c') != null ) {
            document.getElementById('QP_Date_of_Birth__c').value = document.getElementById('Date_of_Birth__c').value;
        }
    }
    if ( document.getElementById('Applicant_Phone_Main__c').value != '' ) {
        if ( document.getElementById('QP_Phone_Main__c') != null ) {
            document.getElementById('QP_Phone_Main__c').value = document.getElementById('Applicant_Phone_Main__c').value;
        }
    }
    if ( document.getElementById('Applicant_Email__c').value != '' ) {
        if ( document.getElementById('QP_Email__c') != null ) {
            document.getElementById('QP_Email__c').value = document.getElementById('Applicant_Email__c').value;
        }
    }
    var radios1 = $('input:checkbox[name="QP_Consent_to_Receive_Electronic_Communicat"]');
    var radios1v = $('input:checkbox[name="Consent_to_Receive_Electronic_Communicat"]:checked').val();
    if ( radios1.is(':checked') === false ) {
        radios1.filter('[value="' + radios1v + '"]').prop('checked',true);
    }
    var radios1 = $('input:checkbox[name="QP_Consent_to_Receive_Text_Messages"]');
    var radios1v = $('input:checkbox[name="Consent_to_Receive_Text_Messages"]:checked').val();
    if ( radios1.is(':checked') === false ) {
        radios1.filter('[value="' + radios1v + '"]').prop('checked',true);
    }
    if ( document.getElementById('Applicant_Phone_Mobile__c').value != '' ) {
        if ( document.getElementById('QP_Phone_Mobile__c') != null ) {
            document.getElementById('QP_Phone_Mobile__c').value = document.getElementById('Applicant_Phone_Mobile__c').value;
        }
    }
    if ( document.getElementById('Physical_Address__c').value != '' ) {
        if ( document.getElementById('QP_Physical_Address__c') != null ) {
            document.getElementById('QP_Physical_Address__c').value = document.getElementById('Physical_Address__c').value;
        }
    }
    if ( document.getElementById('Physical_City').value != '' ) {
        if ( document.getElementById('QP_Physical_City') != null ) {
            document.getElementById('QP_Physical_City').value = document.getElementById('Physical_City').value;
        }
    }
    if ( document.getElementById('Physical_State').value != '' ) {
        if ( document.getElementById('QP_Physical_State') != null ) {
            document.getElementById('QP_Physical_State').value = document.getElementById('Physical_State').value;
            $("select[name='QP_Physical_State']").each(function(){
                $('#QP_Physical_State option[value=' + document.getElementById('Physical_State').value + ']').attr('selected','selected');
            });
        }
    }
    if ( document.getElementById('Physical_Zip_Post_Code').value != '' ) {
        if ( document.getElementById('QP_Physical_Zip_Post_Code') != null ) {
            document.getElementById('QP_Physical_Zip_Post_Code').value = document.getElementById('Physical_Zip_Post_Code').value;
        }
    }
    if ( document.getElementById('Mailing_Address__c').value != '' ) {
        if ( document.getElementById('QP_Mailing_Address__c') != null ) {
            document.getElementById('QP_Mailing_Address__c').value = document.getElementById('Mailing_Address__c').value;
        }
    }
    if ( document.getElementById('Mailing_City').value != '' ) {
        if ( document.getElementById('QP_Mailing_City') != null ) {
            document.getElementById('QP_Mailing_City').value = document.getElementById('Mailing_City').value;
        }
    }
    if ( document.getElementById('Mailing_State').value != '' ) {
        if ( document.getElementById('QP_Mailing_State') != null ) {
            document.getElementById('QP_Mailing_State').value = document.getElementById('Mailing_State').value;
            $("select[name='QP_Mailing_State']").each(function(){
                $('#QP_Mailing_State option[value=' + document.getElementById('Mailing_State').value + ']').attr('selected','selected');
            });
        }
    }
    if ( document.getElementById('Mailing_Zip_Post_Code').value != '' ) {
        if ( document.getElementById('QP_Mailing_Zip_Post_Code') != null ) {
            document.getElementById('QP_Mailing_Zip_Post_Code').value = document.getElementById('Mailing_Zip_Post_Code').value;
        }
    }
}

var classifications = [];

classifications["A General Engineering"] = "A General Engineering";
classifications["A-4 Drilling"] = "A-4 Drilling";
classifications["A-5 Excavating Grading and Oil Surfacing"] = "A-5 Excavating Grading and Oil Surfacing";
classifications["A-7 Piers and Foundations"] = "A-7 Piers and Foundations";
classifications["A-9 Swimming Pools"] = "A-9 Swimming Pools";
classifications["A-11 Steel and Aluminum Erection"] = "A-11 Steel and Aluminum Erection";
classifications["A-12 Sewers Drains and Pipe Laying"] = "A-12 Sewers Drains and Pipe Laying";
classifications["A-14 Asphalt Paving"] = "A-14 Asphalt Paving";
classifications["A-15 Seal Coating"] = "A-15 Seal Coating";
classifications["A-16 Waterworks"] = "A-16 Waterworks";
classifications["A-17 Electrical and Transmission Lines"] = "A-17 Electrical and Transmission Lines";
classifications["A-19 Swimming Pools, Including Solar"] = "A-19 Swimming Pools, Including Solar";
classifications["B General Residential Contractor"] = "B General Residential Contractor";
classifications["B-1 General Commercial Contractor"] = "B-1 General Commercial Contractor";
classifications["B-1 General Commercial Contracting"] = "B-1 General Commercial Contracting";
classifications["B-2 General Small Commercial Contracting"] = "B-2 General Small Commercial Contracting";
classifications["B-3 General Remodeling and Repair Contractor"] = "B-3 General Remodeling and Repair Contractor";
classifications["B-4 General Residential Engineering Contractor"] = "B-4 General Residential Engineering Contractor";
classifications["B-4R Sport Court Accessories"] = "B-4R Sport Court Accessories";
classifications["B-5 General Swimming Pool Contractor"] = "B-5 General Swimming Pool Contractor";
classifications["B-5R Factory Fabricated Pools and Accessories"] = "B-5R Factory Fabricated Pools and Accessories";
classifications["B-5R Swimming Pool Covers"] = "B-5R Swimming Pool Covers";
classifications["B-6 General Swimming Pool Contractor, Including Solar"] = "B-6 General Swimming Pool Contractor, Including Solar";
classifications["B-10 Pre-Manufactured Spas and Hot Tubs"] = "B-10 Pre-Manufactured Spas and Hot Tubs";
classifications["C-1 Acoustical Systems"] = "C-1 Acoustical Systems";
classifications["C-3 Awnings, Canopies, Carports and Patio Covers"] = "C-3 Awnings, Canopies, Carports and Patio Covers";
classifications["C-4 Boilers, Steamfitting and Process Piping"] = "C-4 Boilers, Steamfitting and Process Piping";
classifications["C-6 Swimming Pool Service and Repair"] = "C-6 Swimming Pool Service and Repair";
classifications["C-7 Carpentry"] = "C-7 Carpentry";
classifications["C-8 Floor Covering"] = "C-8 Floor Covering";
classifications["C-9 Concrete"] = "C-9 Concrete";
classifications["C-10 Drywall"] = "C-10 Drywall";
classifications["C-11 Electrical"] = "C-11 Electrical";
classifications["C-12 Elevators"] = "C-12 Elevators";
classifications["C-14 Fencing"] = "C-14 Fencing";
classifications["C-15 Blasting"] = "C-15 Blasting";
classifications["C-16 Fire Protection Systems"] = "C-16 Fire Protection Systems";
classifications["C-21 Hardscaping and Irrigation Systems"] = "C-21 Hardscaping and Irrigation Systems";
classifications["C-24 Ornamental Metals"] = "C-24 Ornamental Metals";
classifications["C-27 Lightweight Partitions"] = "C-27 Lightweight Partitions";
classifications["C-31 Masonry"] = "C-31 Masonry";
classifications["C-34 Painting and Wall Covering"] = "C-34 Painting and Wall Covering";
classifications["C-36 Plastering"] = "C-36 Plastering";
classifications["C-37 Plumbing"] = "C-37 Plumbing";
classifications["C-38 Signs"] = "C-38 Signs";
classifications["C-39 Air Conditioning, Refrigeration and Heating"] = "C-39 Air Conditioning, Refrigeration and Heating";
classifications["C-40 Insulation"] = "C-40 Insulation";
classifications["C-41 Septic Tanks and Systems"] = "C-41 Septic Tanks and Systems";
classifications["C-42 Roofing"] = "C-42 Roofing";
classifications["C-45 Sheet Metal"] = "C-45 Sheet Metal";
classifications["C-48 Ceramic, Plastic and Metal Tile"] = "C-48 Ceramic, Plastic and Metal Tile";
classifications["C-49 Refrigeration"] = "C-49 Refrigeration";
classifications["C-53 Water Well Drilling"] = "C-53 Water Well Drilling";
classifications["C-54 Water Conditioning Equipment"] = "C-54 Water Conditioning Equipment";
classifications["C-56 Welding"] = "C-56 Welding";
classifications["C-57 Wrecking"] = "C-57 Wrecking";
classifications["C-58 Comfort Heating, Ventilating and Evaporative Cooling"] = "C-58 Comfort Heating, Ventilating and Evaporative Cooling";
classifications["C-60 Finish Carpentry"] = "C-60 Finish Carpentry";
classifications["C-61 Carpentry, Remodeling and Repairs"] = "C-61 Carpentry, Remodeling and Repairs";
classifications["C-63 Appliances"] = "C-63 Appliances";
classifications["C-65 Glazing"] = "C-65 Glazing";
classifications["C-67 Low Voltage Communication Systems"] = "C-67 Low Voltage Communication Systems";
classifications["C-70 Reinforcing Bar and Wire Mesh"] = "C-70 Reinforcing Bar and Wire Mesh";
classifications["C-74 Boilers, Steamfitting & Process Piping, Including Solar"] = "C-74 Boilers, Steamfitting & Process Piping, Including Solar";
classifications["C-77 Plumbing Including Solar"] = "C-77 Plumbing Including Solar";
classifications["C-78 Solar Plumbing, Liquid Systems Only"] = "C-78 Solar Plumbing, Liquid Systems Only";
classifications["C-79 Air Conditioning and Refrigeration, Including Solar"] = "C-79 Air Conditioning and Refrigeration, Including Solar";
classifications["CR-1 Acoustical Systems"] = "CR-1 Acoustical Systems";
classifications["CR-2 Excavating Grading and Oil Surfacing"] = "CR-2 Excavating Grading and Oil Surfacing";
classifications["CR-3 Awnings, Canopies, Carports and Patio Covers"] = "CR-3 Awnings, Canopies, Carports and Patio Covers";
classifications["CR-4 Boilers, Steamfitting and Process Piping"] = "CR-4 Boilers, Steamfitting and Process Piping";
classifications["CR-5 As Restricted by the Registrar"] = "CR-5 As Restricted by the Registrar";
classifications["CR-6 Swimming Pool Service and Repair"] = "CR-6 Swimming Pool Service and Repair";
classifications["CR-7 Carpentry"] = "CR-7 Carpentry";
classifications["CR-8 Floor Covering"] = "CR-8 Floor Covering";
classifications["CR-9 Concrete"] = "CR-9 Concrete";
classifications["CR-10 Drywall"] = "CR-10 Drywall";
classifications["CR-11 Electrical"] = "CR-11 Electrical";
classifications["CR-12 Elevators"] = "CR-12 Elevators";
classifications["CR-14 Fencing"] = "CR-14 Fencing";
classifications["CR-15 Blasting"] = "CR-15 Blasting";
classifications["CR-16 Fire Protection Systems"] = "CR-16 Fire Protection Systems";
classifications["CR-17 Steel and Aluminum Erection"] = "CR-17 Steel and Aluminum Erection";
classifications["CR-21 Hardscaping and Irrigation Systems"] = "CR-21 Hardscaping and Irrigation Systems";
classifications["CR-24 Ornamental Metals"] = "CR-24 Ornamental Metals";
classifications["CR-29 Machinery"] = "CR-29 Machinery";
classifications["CR-31 Masonry"] = "CR-31 Masonry";
classifications["CR-34 Painting and Wall Covering"] = "CR-34 Painting and Wall Covering";
classifications["CR-36 Plastering"] = "CR-36 Plastering";
classifications["CR-37 Plumbing"] = "CR-37 Plumbing";
classifications["CR-38 Signs"] = "CR-38 Signs";
//classifications["CR-39 Air Conditioning and  Refrigeration"] = "CR-39 Air Conditioning and Refrigeration";
classifications["CR-39 Air Conditioning, Refrigeration and Heating"] = "CR-39 Air Conditioning, Refrigeration and Heating";
classifications["CR-40 Insulation"] = "CR-40 Insulation";
classifications["CR-41 Septic Tanks and Systems"] = "CR-41 Septic Tanks and Systems";
classifications["CR-42 Roofing"] = "CR-42 Roofing";
classifications["CR-45 Sheet Metal"] = "CR-45 Sheet Metal";
classifications["CR-48 Ceramic, Plastic and Metal Tile"] = "CR-48 Ceramic, Plastic and Metal Tile";
classifications["CR-53 Water Well Drilling"] = "CR-53 Water Well Drilling";
classifications["CR-54 Water Conditioning Equipment"] = "CR-54 Water Conditioning Equipment";
classifications["CR-56 Welding"] = "CR-56 Welding";
classifications["CR-57 Wrecking"] = "CR-57 Wrecking";
classifications["CR-58 Comfort Heating, Ventilating and Evaporative Cooling"] = "CR-58 Comfort Heating, Ventilating and Evaporative Cooling";
classifications["CR-60 Finish Carpentry"] = "CR-60 Finish Carpentry";
classifications["CR-61 Carpentry, Remodeling and Repairs"] = "CR-61 Carpentry, Remodeling and Repairs";
classifications["CR-63 Appliances"] = "CR-63 Appliances";
classifications["CR-65 Glazing"] = "CR-65 Glazing";
classifications["CR-66 Seal Coating"] = "CR-66 Seal Coating";
classifications["CR-67 Low Voltage Communication Systems"] = "CR-67 Low Voltage Communication Systems";
classifications["CR-69 Asphalt Paving"] = "CR-69 Asphalt Paving";
classifications["CR-70 Reinforcing Bar and Wire Mesh"] = "CR-70 Reinforcing Bar and Wire Mesh";
classifications["CR-74 Boilers, Steamfitting & Process Piping, Including Solar"] = "CR-74 Boilers, Steamfitting & Process Piping, Including Solar";
classifications["CR-77 Plumbing Including Solar"] = "CR-77 Plumbing Including Solar";
classifications["CR-78 Solar Plumbing, Liquid Systems Only"] = "CR-78 Solar Plumbing, Liquid Systems Only";
classifications["CR-79 Air Conditioning and Refrigeration, Including Solar"] = "CR-79 Air Conditioning and Refrigeration, Including Solar";
classifications["CR-80 Sewers, Drains and Pipe Laying"] = "CR-80 Sewers, Drains and Pipe Laying";
classifications["KA-5 Dual Swimming Pool Contractor"] = "KA-5 Dual Swimming Pool Contractor";
classifications["KA-6 Dual Swimming Pool Contractor, Including Solar"] = "KA-6 Dual Swimming Pool Contractor, Including Solar";
classifications["KA Dual Engineering"] = "KA Dual Engineering";
classifications["KB-1 Dual Building Contractor"] = "KB-1 Dual Building Contractor";
classifications["KB-2 Dual Residential and Small Commercial"] = "KB-2 Dual Residential and Small Commercial";
classifications["KE As Restricted by the Registrar"] = "KE As Restricted by the Registrar";
classifications["KO As Restricted by the Registrar"] = "KO As Restricted by the Registrar";
classifications["R-1 Acoustical Systems"] = "R-1 Acoustical Systems";
classifications["R-2 Excavating, Grading and Oil Surfacing"] = "R-2 Excavating, Grading and Oil Surfacing";
classifications["R-3 Awnings, Canopies, Carports and Patio Covers"] = "R-3 Awnings, Canopies, Carports and Patio Covers";
classifications["R-4 Boilers, Steamfitting and Process Piping"] = "R-4 Boilers, Steamfitting and Process Piping";
classifications["R-6 Swimming Pool Service and Repair"] = "R-6 Swimming Pool Service and Repair";
classifications["R-7 Carpentry"] = "R-7 Carpentry";
classifications["R-8 Floor Covering"] = "R-8 Floor Covering";
classifications["R-9 Concrete"] = "R-9 Concrete";
classifications["R-10 Drywall"] = "R-10 Drywall";
classifications["R-11 Electrical"] = "R-11 Electrical";
classifications["R-12 Elevators"] = "R-12 Elevators";
classifications["R-13 Asphalt Paving"] = "R-13 Asphalt Paving";
classifications["R-14 Fencing"] = "R-14 Fencing";
classifications["R-15 Blasting"] = "R-15 Blasting";
classifications["R-16 Fire Protection Systems"] = "R-16 Fire Protection Systems";
classifications["R-21 Hardscaping and Irrigation Systems"] = "R-21 Hardscaping and Irrigation Systems";
classifications["R-22 House Moving"] = "R-22 House Moving";
classifications["R-24 Ornamental Metals"] = "R-24 Ornamental Metals";
classifications["R-31 Masonry"] = "R-31 Masonry";
classifications["R-34 Painting and Wall Covering"] = "R-34 Painting and Wall Covering";
classifications["R-36 Plastering"] = "R-36 Plastering";
classifications["R-37 Plumbing, Including Solar"] = "R-37 Plumbing, Including Solar";
classifications["R-37R Plumbing"] = "R-37R Plumbing";
classifications["R-38 Signs"] = "R-38 Signs";
classifications["R-39 Air Conditioning and Refrigeration, Including Solar"] = "R-39 Air Conditioning and Refrigeration, Including Solar";
classifications["R-39R Air Conditioning and Refrigeration"] = "R-39R Air Conditioning and Refrigeration";
classifications["R-40 Insulation"] = "R-40 Insulation";
classifications["R-41 Septic Tanks and Systems"] = "R-41 Septic Tanks and Systems";
classifications["R-42 Roofing"] = "R-42 Roofing";
classifications["R-45 Sheet Metal"] = "R-45 Sheet Metal";
classifications["R-48 Ceramic, Plastic and Metal Tile"] = "R-48 Ceramic, Plastic and Metal Tile";
classifications["R-53 Drilling"] = "R-53 Drilling";
classifications["R-54 Water Conditioning Equipment"] = "R-54 Water Conditioning Equipment";
classifications["R-56 Welding"] = "R-56 Welding";
classifications["R-57 Wrecking"] = "R-57 Wrecking";
classifications["R-60 Finish Carpentry"] = "R-60 Finish Carpentry";
classifications["R-61 Carpentry, Remodeling and Repairs"] = "R-61 Carpentry, Remodeling and Repairs";
classifications["R-62 Minor Home Improvements"] = "R-62 Minor Home Improvements";
classifications["R-63 Appliances"] = "R-63 Appliances";
classifications["R-65 Glazing"] = "R-65 Glazing";
classifications["R-67 Low Voltage Communication Systems"] = "R-67 Low Voltage Communication Systems";
classifications["R-70 Reinforcing Bar and Wire Mesh"] = "R-70 Reinforcing Bar and Wire Mesh";
/*
classifications["CR1"] = "Acoustical Systems (R) (C)";
classifications["C-1"] = "Acoustical Systems (C)";
classifications["R-1"] = "Acoustical Systems (R)";

classifications["C-39"] = "Air Conditioning &amp; Refrigeration (C)";
classifications["R-39"] = "Air Conditioning &amp; Refrigeration (R)";
classifications["CR39"] = "Air Conditioning &amp; Refrigeration (R) (C)";
classifications["R-39R"] = "Air Conditioning &amp; Refrigeration  Restricted (R)";
classifications["R-39"] = "Air Conditioning &amp; Regrigeration Incl. Solar (R)";
classifications["C-79"] = "Air Conditioning &amp; Refrigeration Incl. Solar (C)";
classifications["CR79"] = "Air Conditioning &amp; Regrigeration Incl. Solar (R) (C)";

classifications["CR63"] = "Appliances (R) (C)";
classifications["C-63"] = "Appliances (C)";
classifications["R-63"] = "Appliances (R)";

classifications["KE"] = "As Restricted by Registrar (R) (C)";
classifications["KO"] = "As Restricted by Registrar (R) (C)";
classifications["CR5"] = "As Restricted by Registrar (R) (C)";


classifications["R-13"] = "Asphalt Paving (R)";
classifications["A-14"] = "Asphalt Paving (C)";
classifications["CR69"] = "Asphalt Paving (R) (C)";

classifications["CR3"] = "Awnings,  Canopies, Carrports &amp; Patio Covers (R) (C)";
classifications["C-3"] = "Awnings,  Canopies, Carrports &amp; Patio Covers (C)";
classifications["R-3"] = "Awnings,  Canopies, Carrports &amp; Patio Covers (R)";

classifications["CR15"] = "Blasting (R) (C)";
classifications["C-15"] = "Blasting (C)";
classifications["R-15"] = "Blasting (R)";

classifications["R-4R"] = "Boilers (R)";
classifications["R-4"] = "Boilers, Including Solar (R)";
classifications["C-74"] = "Boilers, Steamfitting &amp; Process Piping, incl. Solar (C)";
classifications["CR74"] = "Boilers, Steamfitting &amp; Process Piping, incl. Solar (R) (C)";
classifications["C-4"] = "Boilers, Steamfitting &amp; Process Piping (C)";
classifications["CR4"] = "Boilers, Steamfitting &amp; Process Piping (R) (C)";
classifications["R-4"] = "Boilers, Steamfitting &amp; Process Piping (R)";

classifications["CR7"] = "Carpentry (R) (C)";
classifications["C-7"] = "Carpentry (C)";
classifications["R-7"] = "Carpentry (R)";
classifications["CR61"] = "Carpentry, Remodeling &amp; Repairs (R) (C)";
classifications["C-61"] = "Carpentry, Remodeling &amp; Repairs (C)";
classifications["R-61"] = "Carpentry, Remodeling &amp; Repairs (R)";

classifications["CR48"] = "Ceramic, Plastic &amp; Metal Tile (R) (C)";
classifications["C-48"] = "Ceramic, Plastic &amp; Metal Tile (C)";
classifications["R-48"] = "Ceramic, Plastic &amp; Metal Tile (R)";

classifications["C-58"] = "Comfort Heating, Ventilating, Evaporative Cooling (C)";
classifications["CR58"] = "Comfort Heating, Ventilating, Evaporative Cooling (R) (C)";

classifications["C-49"] = "Commercial, Industrial Refrigeration (C)";

classifications["C-9"] = "Concrete (C)";
classifications["R-9"] = "Concrete (R)";
classifications["CR9"] = "Concrete (R) (C)";

classifications["A-4"] = "Drilling (C)";

classifications["CR10"] = "Drywall (R) (C)";
classifications["C-10"] = "Drywall (C)";
classifications["R-10"] = "Drywall (R)";

classifications["KB1"] = "Dual Building Contractor (R)(C)";
classifications["KB2"] = "Dual Residence &amp; Small Commercial (R)(C)";

classifications["C-11"] = "Electrical (C)";
classifications["R-11"] = "Electrical (R)";
classifications["CR11"] = "Electrical (R) (C)";
classifications["A-17"] = "Electrical &amp; Transmission Lines (C)";


classifications["CR12"] = "Elevators (R) (C)";
classifications["C-12"] = "Elevators (C)";
classifications["R-12"] = "Elevators (R)";

classifications["A"] = "Engineering - General (C)";
classifications["AKA"] = "Engineering - General (C)";
classifications["B-4"] = "Engineering - General (R)";
classifications["BKA"] = "Engineering - General (R)";

classifications["R-2"] = "Excavating, Grading &amp; Oil Surfacing (R)";
classifications["A-5"] = "Excavating, Grading &amp; Oil Surfacing (C)";
classifications["CR2"] = "Excavating, Grading &amp; Oil Surfacing (R) (C)";

classifications["CR14"] = "Fencing (R) (C)";
classifications["C-14"] = "Fencing (C)";
classifications["R-14"] = "Fencing (R)";

classifications["CR60"] = "Finish Carpentry (R) (C)";
classifications["C-60"] = "Finish Carpentry (C)";
classifications["R-60"] = "Finish Carpentry (R)";

classifications["R-16"] = "Fire Protection (R)";
classifications["C-16"] = "Fire Protection (C)";
classifications["CR16"] = "Fire Protection (R) (C)";

classifications["CR8"] = "Floor Covering (R) (C)";
classifications["C-8"] = "Floor Covering (C)";
classifications["R-8"] = "Floor Covering (R)";

classifications["B-1"] = "General Commercial Contractor (C)";
classifications["B-3"] = "General Remodeling &amp; Repair Contractor (R)";
classifications["B"] = "General Residential Contractor (R)";

classifications["B-2"] = "General Small Commercial Contractor (C)";

classifications["CR65"] = "Glazing (R) (C)";
classifications["C-65"] = "Glazing (C)";
classifications["R-65"] = "Glazing (R)";

classifications["CR21"] = "Hardscaping &amp; Irrigation Systems (R) (C)";
classifications["C-21"] = "Hardscaping &amp; Irrigation Systems (C)";
classifications["R-21"] = "Hardscaping &amp; Irrigation Systems (R)";

classifications["C-22"] = "House Moving (R)";

classifications["CR40"] = "Insulation (R) (C)";
classifications["C-40"] = "Insulation (C)";
classifications["R-40"] = "Insulation (R)";

classifications["C-27"] = "Lightweight Partitions (C)";

classifications["CR67"] = "Low Voltage Communications Systems (R) (C)";
classifications["C-67"] = "Low Voltage Communications Systems (C)";
classifications["R-67"] = "Low Voltage Communications Systems (R)";

classifications["CR29"] = "Machinery (As restricted by Registrar) (R) (C)";

classifications["CR31"] = "Masonry (R) (C)";
classifications["C-31"] = "Masonry (C)";
classifications["R-31"] = "Masonry (R)";

classifications["R-62"] = "Minor Home Improvements (R)";

classifications["CR24"] = "Ornamental Metal (R) (C)";
classifications["C-24"] = "Ornamental Metal (C)";
classifications["R-24"] = "Ornamental Metal (R)";

classifications["CR34"] = "Painting &amp; Wall Covering (R) (C)";
classifications["C-34"] = "Painting &amp; Wall Covering (C)";
classifications["R-34"] = "Painting &amp; Wall Covering (R)";

classifications["A-7"] = "Piers and Foundations (C)";

classifications["CR36"] = "Plastering (R) (C)";
classifications["C-36"] = "Plastering (C)";
classifications["R-36"] = "Plastering (R)";

classifications["C-37"] = "Plumbing (C)";
classifications["CR37"] = "Plumbing (R) (C)";
classifications["C-77"] = "Plumbing, Including Solar (C)";
classifications["CR77"] = "Plumbing, Including Solar (R) (C)";
classifications["R-37"] = "Plumbing, Including Solar (R)";
classifications["R-37R"] = "Plumbing  Restricted (R)";

classifications["B-10"] = "Pre-Manufactured Spas and Hot Tubs (R)";

classifications["CR70"] = "Reinforcing Bar &amp; Wire Mesh (R) (C)";
classifications["C-70"] = "Reinforcing Bar &amp; Wire Mesh (C)";
classifications["R-70"] = "Reinforcing Bar &amp; Wire Mesh (R)";

classifications["B-4R"] = "Residential Restricted (R)";

classifications["CR42"] = "Roofing (R) (C)";
classifications["C-42"] = "Roofing (C)";
classifications["R-42"] = "Roofing (C)";

classifications["A-15"] = "Seal Coating (C)";
classifications["CR66"] = "Seal Coating (R) (C)";

classifications["CR41"] = "Septic Tanks and Systems (R) (C)";
classifications["C-41"] = "Septic Tanks and Systems (C)";
classifications["R-41"] = "Septic Tanks and Systems (R)";

classifications["A-12"] = "Sewers, Drains &amp; Pipe Laying (C)";
classifications["CR80"] = "Sewers, Drains &amp; Pipe Laying (R) (C)";

classifications["CR45"] = "Sheet Metal (R) (C)";
classifications["C-45"] = "Sheet Metal (C)";
classifications["R-45"] = "Sheet Metal (C)";

classifications["CR38"] = "Signs (R) (C)";
classifications["C-38"] = "Signs (C)";
classifications["R-38"] = "Signs (C)";

classifications["C-78"] = "Solar Plumbing, Liquid Systems Only (C)";
classifications["CR78"] = "Solar Plumbing, Liquid Systems Only (R) (C)";

classifications["A-11"] = "Steel &amp; Aluminum Erection (C)";
classifications["CR17"] = "Steel &amp; Aluminum Erection (R) (C)";

classifications["R-17"] = "Structural Steel &amp; Aluminum (R)";
classifications["C17R"] = "Structural Steel and Aluminum Residential Restricted (R)";

classifications["C-6"] = "Swimming Pool Service &amp; Repair (C)";
classifications["R-6"] = "Swimming Pool Service &amp; Repair (R)";
classifications["CR6"] = "Swimming Pool Service &amp; Repair (R) (C)";
classifications["A-9"] = "Swimming Pools (C)";
classifications["B-5"] = "Swimming Pools (R)";
classifications["A-19"] = "Swimming Pools, Including Solar (C)";
classifications["B-6"] = "Swimming Pools, Including Solar (R)";
classifications["KA5"] = "Swimming Pools (C)";
classifications["KA5R"] = "Swimming Pools (R)";
classifications["KA6"] = "Swimming Pools, Including Solar (C)";
classifications["KA6R"] = "Swimming Pools, Including Solar (R)";
classifications["B-5R"] = "Swimming Pools Restricted (R)";

classifications["CR54"] = "Water Conditioning Equipment (R) (C)";
classifications["C-54"] = "Water Conditioning Equipment (C)";
classifications["R-54"] = "Water Conditioning Equipment (R)";

classifications["C-53"] = "Water Well Drilling (C)";
classifications["CR53"] = "Water Well Drilling (R) (C)";

classifications["A-16"] = "Waterworks (C)";

classifications["CR56"] = "Welding (R) (C)";
classifications["C-56"] = "Welding (C)";
classifications["R-56"] = "Welding (R)";

classifications["CR57"] = "Wrecking (R) (C)";
classifications["C-57"] = "Wrecking (C)";
classifications["R-57"] = "Wrecking (R)";
*/

var classificationExams = [];

classificationExams["A General Engineering"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["A-4 Drilling"] = { 'B' : 1, 'T' : 0, 'W' : 1, 'S' : 0 };
classificationExams["A-5 Excavating Grading and Oil Surfacing"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["A-7 Piers and Foundations"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["A-9 Swimming Pools"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["A-11 Steel and Aluminum Erection"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["A-12 Sewers Drains and Pipe Laying"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["A-14 Asphalt Paving"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["A-15 Seal Coating"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["A-16 Waterworks"] = { 'B' : 1, 'T' : 1, 'W' : 1, 'S' : 0 };
classificationExams["A-17 Electrical and Transmission Lines"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["A-19 Swimming Pools, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["B General Residential Contractor"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-1 General Commercial Contractor"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-1 General Commercial Contracting"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-2 General Small Commercial Contracting"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-3 General Remodeling and Repair Contractor"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-4 General Residential Engineering Contractor"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-4R Sport Court Accessories"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-5 General Swimming Pool Contractor"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-5R Factory Fabricated Pools and Accessories"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-5R Swimming Pool Covers"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["B-6 General Swimming Pool Contractor, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["B-10 Pre-Manufactured Spas and Hot Tubs"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-1 Acoustical Systems"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-3 Awnings, Canopies, Carports and Patio Covers"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-4 Boilers, Steamfitting and Process Piping"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-6 Swimming Pool Service and Repair"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-7 Carpentry"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-8 Floor Covering"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-9 Concrete"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-10 Drywall"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-11 Electrical"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-12 Elevators"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-14 Fencing"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-15 Blasting"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-16 Fire Protection Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-21 Hardscaping and Irrigation Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-24 Ornamental Metals"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-27 Lightweight Partitions"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-31 Masonry"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-34 Painting and Wall Covering"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-36 Plastering"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-37 Plumbing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-38 Signs"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-39 Air Conditioning, Refrigeration and Heating"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-40 Insulation"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-41 Septic Tanks and Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-42 Roofing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-45 Sheet Metal"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-48 Ceramic, Plastic and Metal Tile"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-49 Refrigeration"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-53 Water Well Drilling"] = { 'B' : 1, 'T' : 0, 'W' : 1, 'S' : 0 };
classificationExams["C-54 Water Conditioning Equipment"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-56 Welding"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-57 Wrecking"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-58 Comfort Heating, Ventilating and Evaporative Cooling"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-60 Finish Carpentry"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-61 Carpentry, Remodeling and Repairs"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-63 Appliances"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["C-65 Glazing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-67 Low Voltage Communication Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-70 Reinforcing Bar and Wire Mesh"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["C-74 Boilers, Steamfitting & Process Piping, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["C-77 Plumbing Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["C-78 Solar Plumbing, Liquid Systems Only"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["C-79 Air Conditioning and Refrigeration, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["CR-1 Acoustical Systems"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-2 Excavating Grading and Oil Surfacing"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-3 Awnings, Canopies, Carports and Patio Covers"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-4 Boilers, Steamfitting and Process Piping"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-5 As Restricted by the Registrar"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-6 Swimming Pool Service and Repair"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-7 Carpentry"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-8 Floor Covering"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-9 Concrete"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-10 Drywall"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-11 Electrical"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-12 Elevators"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-14 Fencing"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-15 Blasting"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-16 Fire Protection Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-17 Steel and Aluminum Erection"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-21 Hardscaping and Irrigation Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-24 Ornamental Metals"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-29 Machinery"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-31 Masonry"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-34 Painting and Wall Covering"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-36 Plastering"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-37 Plumbing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-38 Signs"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
//classificationExams["CR-39 Air Conditioning and Refrigeration"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-39 Air Conditioning, Refrigeration and Heating"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-40 Insulation"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-41 Septic Tanks and Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-42 Roofing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-45 Sheet Metal"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-48 Ceramic, Plastic and Metal Tile"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-53 Water Well Drilling"] = { 'B' : 1, 'T' : 0, 'W' : 1, 'S' : 0 };
classificationExams["CR-54 Water Conditioning Equipment"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-56 Welding"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-57 Wrecking"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-58 Comfort Heating, Ventilating and Evaporative Cooling"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-60 Finish Carpentry"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-61 Carpentry, Remodeling and Repairs"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-63 Appliances"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-65 Glazing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-66 Seal Coating"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-67 Low Voltage Communication Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-69 Asphalt Paving"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["CR-70 Reinforcing Bar and Wire Mesh"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["CR-74 Boilers, Steamfitting & Process Piping, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["CR-77 Plumbing Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["CR-78 Solar Plumbing, Liquid Systems Only"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["CR-79 Air Conditioning and Refrigeration, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["CR-80 Sewers, Drains and Pipe Laying"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["KA-5 Dual Swimming Pool Contractor"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["KA-6 Dual Swimming Pool Contractor, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["KA Dual Engineering"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["KB-1 Dual Building Contractor"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["KB-2 Dual Residential and Small Commercial"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["KE As Restricted by the Registrar"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["KO As Restricted by the Registrar"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-1 Acoustical Systems"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-2 Excavating, Grading and Oil Surfacing"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-3 Awnings, Canopies, Carports and Patio Covers"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-4 Boilers, Steamfitting and Process Piping"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-6 Swimming Pool Service and Repair"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-7 Carpentry"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-8 Floor Covering"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-9 Concrete"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-10 Drywall"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-11 Electrical"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-12 Elevators"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-13 Asphalt Paving"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-14 Fencing"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-15 Blasting"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-16 Fire Protection Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-21 Hardscaping and Irrigation Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-22 House Moving"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-24 Ornamental Metals"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-31 Masonry"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-34 Painting and Wall Covering"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-36 Plastering"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-37 Plumbing, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["R-37R Plumbing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-38 Signs"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-39 Air Conditioning and Refrigeration, Including Solar"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 1 };
classificationExams["R-39R Air Conditioning and Refrigeration"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-40 Insulation"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-41 Septic Tanks and Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-42 Roofing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-45 Sheet Metal"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-48 Ceramic, Plastic and Metal Tile"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-53 Drilling"] = { 'B' : 1, 'T' : 0, 'W' : 1, 'S' : 0 };
classificationExams["R-54 Water Conditioning Equipment"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-56 Welding"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-57 Wrecking"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-60 Finish Carpentry"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-61 Carpentry, Remodeling and Repairs"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-62 Minor Home Improvements"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-63 Appliances"] = { 'B' : 1, 'T' : 0, 'W' : 0, 'S' : 0 };
classificationExams["R-65 Glazing"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-67 Low Voltage Communication Systems"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };
classificationExams["R-70 Reinforcing Bar and Wire Mesh"] = { 'B' : 1, 'T' : 1, 'W' : 0, 'S' : 0 };

var classificationInfo = [];
classificationInfo["A"] = "GENERAL ENGINEERING<br><br>This classification allows the licensee to construct or repair: <br>1. Fixed works <br>2. Streets <br>3. Roads <br>4. Power and utility plants <br>5. Dams <br>6. Hydroelectric plants <br>7. Sewage and waste disposal plants <br>8. Bridges <br>9. Tunnels <br>10.Overpasses <br>11. Public parks <br>12. Public right-of-ways <br>Also included are the scopes of work allowed by the A-4 through A-19. This classification does not include work authorized by the B-1, B-2, B- or B-3 scopes.";
classificationInfo["A-4"] = "DRILLING<br><br>This classification allows the licensee to drill, including horizontal and vertical drilling or boring, constructing, deepening, repairing, or abandoning wells; exploring for water, gas, and oil; and constructing dry wells, and monitor wells. Also included is the erection of rigs, derricks and related substructures, and installation, service and repair of pumps and pumping equipment.";
classificationInfo["A-5"] = "EXCAVATING, GRADING AND OIL SURFACING<br><br>This classification allows the licensee to apply oil surfacing or other similar products; place shoring, casing, geotextiles or liners; and perform incidental blasting or drilling as required for the licensee to move, alter, or repair earthen materials by: 1. Digging <br>2. Trenching <br>3. Grading <br>4. Horizontal boring<br>5. Compacting <br>6. Filling <br>This license does not allow the licensee to excavate for water, gas or oil wells.";
classificationInfo["A-7"] = "PIERS AND FOUNDATIONS<br><br>This classification allows the licensee to install piers and foundations using concrete, rebar, post-tension and other materials common to the industry. Includes pile driving, excavation, forming and other techniques and equipment common to the industry.";
classificationInfo["A-9"] = "SWIMMING POOLS<br><br>This classification allows the licensee to construct, service, and repair swimming pools and spas, including water and gas service lines from point of service to pool equipment, wiring from pool equipment to 1st readily accessible disconnect, pool piping, fittings, backflow prevention devices, waste lines, and other integral parts of a swimming pool or spa.<br><br>Also included is the installation of swimming pool accessories, covers, safety devices, and fencing for protective purposes, if in the original contract.";
classificationInfo["A-11"] = "STEEL AND ALUMINUM ERECTION<br><br>This classification allows the licensee to install and repair architectural and structural steel and aluminum materials common to the industry. This classification also includes reinforcing steel and field layout, cutting, assembly, and erection by welding, bolting, wire tying or riveting.";
classificationInfo["A-12"] = "SEWERS, DRAINS AND PIPE LAYING<br><br>This classification allows the licensee to install and repair any project involving sewer access holes, the laying of pipe for storm drains, water and gas lines, irrigation, and sewers. Includes connecting sewer collector lines to building drains and the installation of septic tanks, leach lines, dry wells, all necessary connections, liners and related excavating and backfilling.";
classificationInfo["A-14"] = "ASPHALT PAVING<br><br>This classification allows the licensee to install asphalt paving, and all related fine grading on streets, highways, driveways, parking lots, tennis courts, running tracks, play areas, and gas station driveways and areas, using materials and accessories common to the industry. Only permitted as it pertains to the larger scope of work, the classification also permits excavation and grading for height adjustment of existing sewer access holes, storm drains, water valves, sewer cleanouts, and drain gates. Also included is the scope of work allowed by the A-15 Seal Coating Classification.";
classificationInfo["A-15"] = "SEAL COATING<br><br>This classification allows the licensee to apply seal coating to asphalt paving surfaces. This classification also allows repair of surface cracks and application of painted marking symbols.";
classificationInfo["A-16"] = "WATERWORKS<br><br>This classification allows the licensee to perform all work necessary for the production and distribution of water including drilling well, setting casing and pump, related electrical work, related concrete work, excavation, piping for storage and distribution, storage tanks, related fencing, purification and chlorination equipment.";
classificationInfo["A-17"] = "ELECTRICAL AND TRANSMISSION LINES<br><br>This classification allows the licensee to install, alter, and repair transmission lines on public right-of-ways, including erection of poles, guying systems, tower line erection, cellular and communication towers, street lighting of all voltages, and all underground systems including ducts for signal, communication, and similar installations. This classification also allows the licensee to install transformers, circuit breakers, capacitors, primary metering devices and other related equipment of all commercial electrical construction.";
classificationInfo["A-19"] = "SWIMMING POOLS, INCLUDING SOLAR<br><br>This classification allows the licensee to perform the same scope of work permitted by the A-9 but also includes installation and repair of solar heating devices.";
classificationInfo["B-1"] = "GENERAL COMMERCIAL CONTRACTOR<br><br>This classification allows the licensee to construct, alter, and repair in connection with any structure built, being built, or to be built for the support, shelter, and enclosure of persons, animals, or movable property of any kind. This scope includes the supervision of all or any part of the above and includes the management, or direct or indirect supervision of any work performed.<br><br>Work related to electrical, plumbing, air conditioning systems, boilers, swimming pools, spas and water wells must be subcontracted to an appropriately licensed contractor. This classification does not include work authorized by the A-, B-, or B-3 scopes.";
classificationInfo["B-2"] = "GENERAL SMALL COMMERCIAL CONTRACTOR<br><br>For projects of $2,000,000 or less including labor and materials, this classification allows the licensee to perform commercial construction in connection with any new structure or addition built, being built, or to be built for the support, shelter and enclosure of persons, animals, or movable property of any kind. This scope includes the supervision of all or any part of the above and includes the management or direct or indirect supervision of any work performed.<br><br>Work related to electrical, plumbing, fire protection systems, air conditioning systems, boilers, swimming pools, spas and water wells must be subcontracted to an appropriately licensed contractor. This classification does not include work authorized by the A-, B-, B-3, or residential scopes.";
classificationInfo["B"] = "GENERAL RESIDENTIAL CONTRACTOR<br><br>This classification allows the licensee to construct and repair all or any part of a residential structure or appurtenance. Work related to electrical, plumbing, air conditioning systems, boilers, swimming pools, spas and water wells must be subcontracted to an appropriately licensed contractor. This classification does not include work authorized by the A-, B-1, or B-2 scopes.";
classificationInfo["B-3"] = "GENERAL REMODELING AND REPAIR CONTRACTOR<br><br>This classification allows the licensee to remodel and repair an existing residential structure or appurtenance except for electrical, plumbing, mechanical, boilers, swimming pools, spas and water wells, which must be subcontracted to an appropriately licensed contractor. The scope of work allowed under the R-7 carpentry classification is included within this scope. This classification does not include work authorized by the A-, B-1, or B-2 scopes.";
classificationInfo["B-4"] = "GENERAL RESIDENTIAL ENGINEERING CONTRACTOR<br><br>This classification allows the licensee to construct and repair of appurtenances to residential structures. Work related to electrical, plumbing, air conditioning systems, boilers, and water wells must be subcontracted to an appropriately licensed contractor. This scope includes the CR-21, B-5, and all B-4R subclassifications. ";
classificationInfo["B-4R"] = "SPORT COURT ACCESSORIES <br><br>Upon the effective date of these rules, no new applications for the B-4R license classifications will be accepted and no new B-4R licenses will be issued.";
classificationInfo["B-5"] = "GENERAL SWIMMING POOL CONTRACTOR<br><br>This classification allows the licensee to construct and repair of swimming pools and spas. Installation of code-required pool barriers around the swimming pool or spa and installation of utilities from the point of service to the pool equipment. Construction of other structures or appurtenances is excluded. This scope includes all B-5R subclassifications. ";
classificationInfo["B-5R"] = "Swimming Pool Covers, Factory Fabricated Pools & Accessories <br><br>Upon the effective date of these rules, no new applications for the B-5R classifications will be accepted and no new B-5R licenses will be issued.";
classificationInfo["B-6"] = "GENERAL SWIMMING POOL CONTRACTOR, INCLUDING SOLAR<br><br>This classification allows the licensee to perform the same scope of work permitted by the B-5 (including all B-5R subclassifications) but also includes installation and repair of solar heating devices.";
classificationInfo["B-10"] = "PRE-MANUFACTURED SPAS AND HOT TUBS<br><br>This classification allows the licensee to construct and repair of spas and hot tubs. Installation of code-required pool barriers around the spa or hot tub and installation of utilities from the point of service to the spa equipment are included.";
classificationInfo["R-1"] = "ACOUSTICAL SYSTEMS<br><br>This classification allows the licensee to install and repair pre-manufactured acoustical ceiling and wall systems.<br><br>This classification does not allow the licensee to install or repair electrical or mechanical systems.";
classificationInfo["R-2"] = "EXCAVATING, GRADING AND OIL SURFACING<br><br>This classification allows the licensee to apply oil surfacing or other similar products and place shoring, casing, geotextiles or liners as required for the licensee to move, alter, or repair earthen materials by: 1. Digging <br>2. Trenching <br>3. Grading <br>4. Horizontal boring <br>5. Compacting <br>6. Filling";
classificationInfo["R-3"] = "AWNINGS, CANOPIES, CARPORTS AND PATIO COVERS<br><br>This classification allows the licensee to place concrete footings and concrete slabs as required for the licensee to install and repair: <br><br>1. Window awnings <br>2. Door hoods <br>3. Freestanding or attached canopies <br>4. Carport and patio covers constructed of metal, fabric, fiberglass, or plastic <br>5. Screened and paneled enclosures, which are not intended for use as habitable spaces, using metal panels, plastic inserts, and screen doors. A minimum of 60% of the wall area of an enclosure shall be constructed of screening material. <br>6. Fascia panels <br>7. Flashing and skirting <br>8. Exterior, detached metal storage units, not to exceed 200 square feet<br>This classification does not allow the licensee to install or repair electrical, plumbing, or air conditioning systems.";
classificationInfo["R-4"] = "BOILERS, INCLUDING SOLAR<br><br>This classification allows the licensee to install, alter, and repair steam and hot water systems and boilers, including chimney connections, flues, refractories, burners, piping, fittings, valves, thermal insulation, and accessories; fuel and water lines from source of supply to boilers; process and specialty piping and related equipment; pneumatic and electrical controls.<br><br>If necessary, a new circuit may be added to the existing service panel or sub-panel. Excluded is the installation of a new service panel or sub-panel.";
classificationInfo["R-6"] = "SWIMMING POOL SERVICE AND REPAIR<br><br>This classification allows the licensee to service and perform minor repair of residential pools and accessories, excluding plumbing connections to a potable water system, gas lines, gas chlorine systems, and electrical work beyond the first disconnect.<br><br>This classification does not allow the licensee to perform a complete replacement of plaster or pebble pool interiors and decks.";
classificationInfo["R-7"] = "CARPENTRY<br><br>This classification allows the licensee to install and repair: <br><br>1. Rough carpentry <br>2. Finish carpentry <br>3. Hardware <br>4. Millwork <br>5. Metal studs <br>6. Metal doors or door frames<br> 7. Windows";
classificationInfo["R-8"] = "FLOOR COVERING<br><br>This classification allows the licensee to prepare a surface as required for the licensee to install and repair the following floor covering materials: <br><br>1. Carpet <br>2. Floor tile <br>3. Wood <br>4. Linoleum <br>5. Vinyl <br>6. Asphalt <br>7. Rubber <br>8. Concrete coatings";
classificationInfo["R-9"] = "CONCRETE<br><br>This classification allows the licensee to install and repair of concrete, concrete products, and accessories common to the industry.";
classificationInfo["R-10"] = "DRYWALL<br><br>This classification allows the licensee to install and repair: <br><br>1. Gypsum wall board <br>2. Ceiling grid systems as supporting members for gypsum drywall <br>3. Movable partitions <br>4. Wall board tape and texture<br> 5. Non-load bearing, lightweight, steel wall partitions";
classificationInfo["R-11"] = "ELECTRICAL<br><br>This classification allows the licensee to install and repair residential electrical systems.";
classificationInfo["R-12"] = "ELEVATORS<br><br>This classification allows the licensee to install and repair: <br><br>1. Elevators<br> 2. Dumbwaiters <br>3. Escalators <br>4. Moving walks and ramps<br>5. Stage and orchestra lifts";
classificationInfo["R-13"] = "ASPHALT PAVING<br><br>This classification allows the licensee to install and repair of paved areas using materials and methods common to the industry, including asphalt curbs, concrete bumper curbs, headers, and striping.";
classificationInfo["R-14"] = "FENCING<br><br>This classification allows the licensee to install and repair: <br><br>1. Metal, wood, and cement block fencing <br>2. Automatic gates <br>3. Fire access strobes <br>4. Cattle guards <br>5. Low voltage U.L. approved electrical fence protective devices of less than 25 volts and 100 watts<br><br>This classification does not allow the licensee to install or repair retaining walls.";
classificationInfo["R-15"] = "BLASTING<br><br>This classification allows the licensee to drill, bore, move earth, and build temporary shelters or barricades, as required for the licenseeâ€™s use of explosives and explosive devices for: <br><br>1. Excavation <br>2. Demolition <br>3. Construction related blasting";
classificationInfo["R-16"] = "FIRE PROTECTION SYSTEMS<br><br>This classification allows the licensee to install and repair fire prevention and fire protection systems including all mechanical apparatus, devices, piping, and equipment common to the fire protection industry. Installation and repair of low voltage signaling systems are also permitted by the R-16 but installation and repair of all other electrical devices, apparatus, and wiring must be subcontracted to a properly licensed contractor.";
classificationInfo["R-17"] = "STRUCTURAL STEEL AND ALUMINUM<br><br>This classification allows the licensee to install and repair architectural and structural steel and aluminum materials common to the industry.";
classificationInfo["R-21"] = "HARDSCAPING AND IRRIGATION SYSTEMS<br><br>This classification allows the licensee to install, alter, and repair: <br><br>1. Non-loadbearing concrete <br>2. Uncovered patios, walkways, driveways made of brick, stone, pavers or gravel <br>3. Wooden decks no higher than 29 inches above finish grade <br>4. Decorative garden walls up to six feet from finish grade <br>5. Fences and screens up to six feet from finish grade <br>6. Retaining walls up to three feet from the finish grade of the lower elevation <br>7. Free standing fire pits, fireplaces, or barbeques â€“ electric, plumbing, and gas must be subcontracted to a properly licensed contractor <br>8. Low voltage landscape lighting <br>9. Water features that are not attached to swimming pools; including any necessary: electrical wiring of 120 volts or less, connection to potable water lines, backflow prevention devices, hose bibs, excavating, trenching, boring, backfilling, or grading <br>10. Irrigation systems, including any necessary: electrical wiring of 120 volts or less, connection to potable water lines, backflow prevention devices, hose bibs, excavating, trenching, boring, backfilling, or grading <br>11. Residential outdoor misting systems. Freestanding or attached to existing appurtenance, not more than 1000 PSI. <br>12. Free standing and uncovered outdoor kitchens â€“ electric, plumbing, and gas must be subcontracted to a properly licensed contractor <br><br>With the exception of free standing fire pits, fireplaces, or barbeques, this classification does not allow the licensee to install, contract for, or subcontract new electrical service panels, gas or plumbing lines, blasting, covered outdoor kitchens, gazebos, room additions, swimming pools, pool deck coatings, concrete driveways, load bearing walls, or perimeter fencing.";
classificationInfo["R-22"] = "HOUSE MOVING<br><br>This classification allows the licensee to disconnect utilities, but connection of utilities and construction of foundations are not permitted.";
classificationInfo["R-24"] = "ORNAMENTAL METALS<br><br>This classification allows the licensee to install, alter, or repair non-structural ornamental metal, such as: <br><br>1. Metal folding gates <br>2. Guard and hand rails <br>3. Wrought iron fencing and gates<br>4. Window shutters and grilles <br>5. Room dividers and shields <br>6. Metal accessories common to the industry <br><br>This classification does not allow the licensee to install fire escapes or stairs.";
classificationInfo["R-31"] = "MASONRY<br><br>This classification allows the licensee to grout, caulk, sand blast, tuckpoint, mortar wash, parge, clean and weld reinforcing steel as required for the licensee to install and repair:<br><br>1. Masonry <br>2. Brick <br>3. Concrete block<br> 4. Insulating concrete forms<br>5. Adobe units <br>6. Stone <br>7. Marble <br>8. Slate <br>9. Mortar-free masonry products";
classificationInfo["R-34"] = "PAINTING AND WALL COVERING<br><br>This classification allows the licensee to perform surface preparation to install, apply, and repair: <br><br>1. Wallpaper<br> 2. Wall covering cloth <br>3. Wall covering vinyl <br>4. Decorative texture <br>5. Paint <br>6. Liquid floor and wall coatings";
classificationInfo["R-36"] = "PLASTERING<br><br>This classification allows the licensee to install laths, metal studs, metal grid systems, or other bases as required for the licensee to coat surfaces by trowel or spray with combinations of: <br><br>1. Sand mixtures (e.g. stucco) <br>2. Gypsum plaster <br>3. Cement <br>4. Acoustical plaster<br> 5. Swimming pool interiors (excluding tile)";
classificationInfo["R-37"] = "PLUMBING, INCLUDING SOLAR<br><br>This classification allows the licensee to install and repair of water and gas piping systems, fire protection as it relates to water sprinkler systems, and sewage treatment systems. Included are all fixtures, vents, and devices common to the industry, as well as solar applications. This scope includes all R-37R subclassifications. <br><br>R-37R Plumbing <br>R-37R Built-in Central Vacuum Systems <br>R-37R Kitchen and Bathroom Fixture Refinishing <br>R-37R Swimming Pool Plumbing and Equipment <br>R-37R Gas Piping <br>R-37R Sewers, Drains and Pipe Laying <br>R-37R Solar Plumbing Liquid Systems Only <br><br>Upon the effective date of these rules, no new applications for the R-37R Built-in Central Vacuum Systems, Kitchen and Bathroom Fixture Refinishing, Swimming Pool Plumbing and Equipment, Gas Piping, Sewers, Drains and Pipe Laying, and Solar Plumbing Liquid Systems Only license classifications will be accepted and no new R-37R licenses in these classifications will be issued.";
classificationInfo["R-37R"] = "PLUMBING<br><br>R-37R Built-in Central Vacuum Systems <br>R-37R Kitchen and Bathroom Fixture Refinishing <br>R-37R Swimming Pool Plumbing and Equipment <br>R-37R Gas Piping <br>R-37R Sewers, Drains and Pipe Laying <br>R-37R Solar Plumbing Liquid Systems Only <br><br>Upon the effective date of these rules, no new applications for the R-37R Built-in Central Vacuum Systems, Kitchen and Bathroom Fixture Refinishing, Swimming Pool Plumbing and Equipment, Gas Piping, Sewers, Drains and Pipe Laying, and Solar Plumbing Liquid Systems Only license classifications will be accepted and no new R-37R licenses in these classifications will be issued.";
classificationInfo["R-38"] = "SIGNS<br><br>This classification allows the licensee to install and repair posts, poles, supports, paint, and electrical wiring as required for the licensee to install and repair: <br><br>1. Signs <br>2. Displays <br>3. Flagpoles";
classificationInfo["R-39"] = "AIR CONDITIONING AND REFRIGERATION, INCLUDING SOLAR<br><br>This classification allows the licensee to install and repair comfort air conditioning systems, including refrigeration, evaporative cooling, ventilating, and heating with or without solar equipment. Installation and repair of machinery, units, accessories, refrigerator rooms, and insulated refrigerator spaces, and controls in refrigerators. <br><br>If necessary, a new circuit may be added to the existing service panel or sub-panel. Excluded is the installation of a new service panel or sub-panel. This scope includes all R-39R subclassifications. <br><br>R-39R Air Conditioning and Refrigeration <br>R-39R Temperature Control Systems <br>R-39R Warm Air Heating, Evaporative Cooling and Ventilating<br>R-39R Evaporative Cooling and Ventilators <br><br>Upon the effective date of these rules, no new applications for the R-39R Gas Refrigeration, Temperature Control Systems, Warm Air Heating, Evaporative Cooling and Ventilating, Evaporative Cooling and Ventilators, and Pre-Coolers license classifications will be accepted and no new R-39R licenses in these classifications will be issued.";
classificationInfo["R-39R"] = "AIR CONDITIONING AND REFRIGERATION<br><br>R-39R Temperature Control Systems <br>R-39R Warm Air Heating, Evaporative Cooling and Ventilating<br>R-39R Evaporative Cooling and Ventilators <br><br>Upon the effective date of these rules, no new applications for the R-39R Gas Refrigeration, Temperature Control Systems, Warm Air Heating, Evaporative Cooling and Ventilating, Evaporative Cooling and Ventilators, and Pre-Coolers license classifications will be accepted and no new R-39R licenses in these classifications will be issued.";
classificationInfo["R-40"] = "INSULATION<br><br>This classification allows the licensee to install and repair: <br><br>1. Insulation materials, including radiant barriers <br>2. Preformed architectural acoustical materials <br>3. Insulation protecting materials";
classificationInfo["R-41"] = "SEPTIC TANKS AND SYSTEMS<br><br>This classification allows the licensee to excavate, install and repair pipe, backfill, and compact soil as required for the licensee to install and repair: <br><br>1. Septic tanks <br>2. Aerobic digesters<br> 3. Leaching fields";
classificationInfo["R-42"] = "ROOFING<br><br>This classification allows the licensee to apply, repair, or install weatherproofing (i.e. asphaltum, pitch, tar, felt, glass fabric, flax, or other commonly used materials or systems) or roof accessories (i.e. flashing, valleys, gravel stops, or sheet metal) as required for the licensee to install and repair: <br><br>1. Roof tile <br>2. Shingles <br>3. Shakes <br>4. Slate <br>5. Metal roofing systems<br>6. Urethane foam <br>7. Roof insulation or coatings on or above the roof deck <br><br>This classification allows the licensee to replace up to 10 percent of the total roof substrate square footage as it relates to issues with substrate discovered after execution of the initial contract. Replacing more than 10 percent of the roof substrate square footage as it relates to issues with substrate discovered after execution of the initial contract requires licensee to subcontract work to a properly licensed contractor. <br><br>This classification also allows the licensee to install new or replace existing skylights where it does not require changes to the roof framing or roof structure and replace fascia not to exceed 24 linear feet. <br><br>Licensee may lift HVAC equipment to allow for proper installation of roofing material. However, the licensee must subcontract work to a properly licensed contractor if HVAC equipment ducting requires any modification to allow for proper installation of roofing material.";
classificationInfo["R-45"] = "SHEET METAL<br><br>This classification allows the licensee to install and repair:<br><br> 1. Sheet metal <br>2. Cornices <br>3. Flashings <br>4. Gutters <br>5. Leaders <br>6. Pans <br>7. Kitchen equipment <br>8. Duct work <br>9. Skylights <br>10. Patented chimneys <br>11. Metal flues <br>12. Metal roofing systems";
classificationInfo["R-48"] = "CERAMIC, PLASTIC AND METAL TILE<br><br>This classification allows the licensee to prepare a surface as required for the licensee to install and repair the following tile products on horizontal and vertical surfaces: <br><br>1. Ceramic <br>2. Clay <br>3. Faience <br>4. Metal <br>5. Mosaic <br>6. Glass mosaic<br>7. Paver <br>8. Plastic <br>9. Quarry and stone tiles such as marble or slate <br>10. Terrazzo Installation of shower doors and tub enclosures are included when a part of the original contract.";
classificationInfo["R-53"] = "DRILLING<br><br>This classification allows the licensee to install and repair of wells, including test boring, exploratory drilling and all materials and devices common to the industry.";
classificationInfo["R-54"] = "WATER CONDITIONING EQUIPMENT<br><br>This classification allows the licensee to perform trenching, backfilling, and grading; and install and repair piping, fittings, valves, concrete supports, and electrical control panels of less than 25 volts and required grounding devices; as required for the licensee to install and repair: 1. Water conditioning equipment<br>2. Misting systems <br>3. Exchange tanks <br>4. Indirect waste pipe carrying brine, backwash and rinse water to the point of disposal";
classificationInfo["R-56"] = "WELDING<br><br>This classification allows the licensee to weld metals.";
classificationInfo["R-57"] = "WRECKING<br><br>This classification allows the licensee to install and repair temporary ramps, barricades, and pedestrian walkways as required for the licensee to demolish, dismantle, or remove structures not in-tended for reuse. <br><br>This classification does not allow the licensee to use explosives.";
classificationInfo["R-60"] = "FINISH CARPENTRY<br><br>This classification allows the licensee to install and repair millwork such as: <br><br>1. Cabinets <br>2. Counter tops <br>3. Case sash <br>4. Door trim <br>5. Metal doors <br>6. Automatic door closers<br> 7. Wood flooring";
classificationInfo["R-61"] = "CARPENTRY, REMODELING AND REPAIRS<br><br>For projects of $50,000 or less including labor and materials, this classification allows the licensee to perform all general remodeling, additions, replacements, and repairs to existing structures. <br><br>Work related to electrical, plumbing, air conditioning systems, and boilers must be subcontracted to an appropriately licensed contractor.";
classificationInfo["R-62"] = "MINOR HOME IMPROVEMENTS<br><br>For projects of $5,000 or less including labor and materials, this classification allows the licensee to perform remodeling, repairs, and improvements to existing structures or appurtenances. The minor home improvement contractor shall not perform structural work to any existing structures or appurtenances, including load bearing masonry or concrete work (with the exception of on-grade flat work), and load bearing carpentry work (with the exception of patio or porch covers). Any work related to electrical, plumbing, air conditioning systems, and boilers must be subcontracted to an appropriately licensed contractor.";
classificationInfo["R-63"] = "APPLIANCES<br><br>This classification allows the licensee to install and repair appliances.<br><br>This classification does not allow the licensee to install or repair gas, electrical, or plumbing lines.";
classificationInfo["R-65"] = "GLAZING<br><br>This classification allows the licensee to install and repair weatherproofing, caulking, sealants, and adhesives as required for the licensee to assemble, install and repair: 1. Glass products <br>2. Window film <br>3. Window treatments, such as blinds or shutters <br>4. Steel and aluminum glass holding members";
classificationInfo["R-67"] = "LOW VOLTAGE COMMUNICATION SYSTEMS<br><br>This classification allows the licensee to build antenna towers on existing structures as required for the licensee to install, service and repair: <br><br>1. Alarm systems <br>2. Telephone systems <br>3. Sound systems <br>4. Intercommunication systems <br>5. Public addressing systems <br>6. Television or video systems <br>7. Low voltage signaling devices <br>8. Low voltage landscape lighting that does not exceed 91 volts <br>9. Master and program clocks (only low voltage wiring and needed equipment)";
classificationInfo["R-70"] = "REINFORCING BAR AND WIRE MESH<br><br>This classification allows the licensee to install and repair: <br><br>1. Reinforcing bar<br> 2. Post-tension <br>3. Wire mesh";
classificationInfo["KA"] = "DUAL ENGINEERING<br><br>This classification allows the scope of work permitted by the commercial A- General Engineering and the B-4 General Residential Engineering licenses.";
classificationInfo["KA-5"] = "DUAL SWIMMING POOL CONTRACTOR<br><br>This classification allows the scope of work permitted by the commercial A-9 Swimming Pools and the residential B-5 General Swimming Pool licenses.";
classificationInfo["KA-6"] = "DUAL SWIMMING POOL CONTRACTOR INCLUDING SOLAR<br><br>This classification allows the scope of work permitted by the commercial A-19 Swimming Pools, Including Solar and the residential B-6 General Swimming Pools, Including Solar licenses.";
classificationInfo["KE"] = "(As restricted by Registrar)";
classificationInfo["KB-1"] = "DUAL BUILDING CONTRACTOR<br><br>This classification allows the scope of work permitted by the B-1 General Commercial Contractor and the B- General Residential Contractor licenses.";
classificationInfo["KB-2"] = "DUAL RESIDENTIAL AND SMALL COMMERCIAL<br><br>This classification allows the scope of work permitted by the B-2 General Small Commercial and the B- General Residential Contractor licenses.";
classificationInfo["KO"] = "(As restricted by Registrar)";
classificationInfo["CR1"] = "ACOUSTICAL SYSTEMS<br><br>This classification allows the scopes of work permitted by the commercial C-1 Acoustical Systems and the residential R-1 Acoustical Systems licenses.";
classificationInfo["CR2"] = "EXCAVATING, GRADING AND OIL SURFACING<br><br>This classification allows the scopes of work permitted by the commercial A-5 Excavating, Grading, and Oil Surfacing and the residential R-2 Excavating, Grading, and Oil Surfacing licenses.";
classificationInfo["CR3"] = "AWNINGS, CANOPIES, CARPORT AND PATIO COVERS<br><br>This classification allows the scopes of work permitted by the commercial C-3 Awnings, Canopies, Carports and Patio Covers and the residential R-3 Awnings, Canopies, Carports and Patio Covers licenses.";
classificationInfo["CR4"] = "BOILERS, STEAMFITTING AND PROCESS PIPING<br><br>This classification allows the scopes of work permitted by the commercial C-4 Boilers, Steamfitting and Process Piping and the residential R-4 Boilers, Steamfitting and Process Piping licenses.";
classificationInfo["CR5"] = "(As restricted by Registrar)";
classificationInfo["CR6"] = "SWIMMING POOL SERVICE AND REPAIR<br><br>This classification allows the scopes of work permitted by the commercial C-6 Swimming Pool Service and Repair and the residential R-6 Swimming Pool Service and Repair licenses.";
classificationInfo["CR7"] = "CARPENTRY<br><br>This classification allows the scopes of work permitted by the commercial C-7 Carpentry and the residential R-7 Carpentry licenses.";
classificationInfo["CR8"] = "FLOOR COVERING<br><br>This classification allows the scopes of work permitted by the commercial C-8 Floor Covering and the residential R-8 Floor Covering licenses.";
classificationInfo["CR9"] = "CONCRETE<br><br>This classification allows the scopes of work permitted by the commercial C-9 Concrete and the residential R-9 Concrete licenses.";
classificationInfo["CR10"] = "DRYWALL<br><br>This classification allows the scopes of work permitted by the commercial C-10 Drywall and the residential R-10 Drywall licenses.";
classificationInfo["CR11"] = "ELECTRICAL<br><br>This classification allows the scopes of work permitted by the commercial C-11 Electrical and residential R-11 Electrical licenses.";
classificationInfo["CR12"] = "ELEVATORS<br><br>This classification allows the scopes of work permitted by the commercial C-12 Elevators and the residential R-12 Elevators licenses.";
classificationInfo["CR14"] = "FENCING<br><br>This classification allows the scopes of work permitted by the commercial C-14 Fencing and the residential R-14 Fencing licenses.";
classificationInfo["CR15"] = "BLASTING<br><br>This classification allows the scopes of work permitted by the commercial C-15 Blasting and the residential R-15 Blasting licenses.";
classificationInfo["CR16"] = "FIRE PROTECTION SYSTEMS<br><br>This classification allows the scopes of work permitted by the commercial C-16 Fire Protection Systems and the residential R-16 Fire Protection licenses.";
classificationInfo["CR17"] = "STEEL AND ALUMINUM ERECTION<br><br>This classification allows the scopes of work permitted by the commercial A-11 Steel and Aluminum Erection and the residential R-17 Structural Steel and Aluminum licenses.";
classificationInfo["CR21"] = "HARDSCAPING AND IRRIGATION SYSTEMS<br><br>This classification allows the scopes of work permitted by the commercial C-21 Hardscaping and Irrigation Systems and the residential R-21 Hardscaping and Irrigation Systems licenses. <br><br>Upon the effective date of these rules, existing CR-21 Landscaping and Irrigation Systems licenses will be reclassified as CR-21 Hardscaping and Irrigation Systems.";
classificationInfo["CR24"] = "ORNAMENTAL METALS<br><br>This classification allows the scopes of work permitted by the commercial C-24 Ornamental Metals and the residential R-24 Ornamental Metals licenses.";
classificationInfo["CR29"] = "MACHINERY (As restricted by Registrar)";
classificationInfo["CR31"] = "MASONRY<br><br>This classification allows the scopes of work permitted by the commercial C-31 Masonry and the residential R-31 Masonry licenses.";
classificationInfo["CR34"] = "PAINTING AND WALL COVERING<br><br>This classification allows the scopes of work permitted by the commercial C-34 Painting and Wall Covering and the residential R-34 Painting and Wall Covering licenses.";
classificationInfo["CR36"] = "PLASTERING<br><br>This classification allows the scopes of work permitted by the commercial C-36 Plastering and the residential R-36 Plastering licenses.";
classificationInfo["CR37"] = "PLUMBING<br><br>This classification allows the scopes of work permitted by the commercial C-37 Plumbing and the residential R-37R Plumbing licenses.";
classificationInfo["CR38"] = "SIGNS<br><br>This classification allows the scopes of work permitted by the commercial C-38 Signs and the residential R-38 Signs licenses.";
classificationInfo["CR39"] = "AIR CONDITIONING AND REFRIGERATION<br><br>This classification allows the scopes of work permitted by the commercial C-39 Air Conditioning and Refrigeration and the residential R-39R Air Conditioning and Refrigeration licenses.";
classificationInfo["CR40"] = "INSULATION<br><br>This classification allows the scopes of work permitted by the commercial C-40 Insulation and the residential R-40 Insulation licenses.";
classificationInfo["CR41"] = "SEPTIC TANKS AND SYSTEMS<br><br>This classification allows the scopes of work permitted by the commercial C-41 Septic Tanks and Systems and the residential R-41 Septic Tanks and Systems licenses.";
classificationInfo["CR42"] = "ROOFING<br><br>This classification allows the scopes of work permitted by the commercial C-42 Roofing and the residential R-42 Roofing licenses.";
classificationInfo["CR45"] = "SHEET METAL<br><br>This classification allows the scopes of work permitted by the commercial C-45 Sheet Metal and the residential R-45 Sheet Metal licenses.";
classificationInfo["CR48"] = "CERAMIC, PLASTIC AND METAL TILE<br><br>This classification allows the scopes of work permitted by the commercial C-48 Ceramic, Plastic and Metal Tile and the residential R-48 Ceramic, Plastic and Metal Tile licenses.";
classificationInfo["CR53"] = "WATER WELL DRILLING<br><br>This classification allows the scope of work permitted by the commercial C-53 Water Well Drilling and the residential R-53 Drilling licenses.";
classificationInfo["CR54"] = "WATER CONDITIONING EQUIPMENT<br><br>This classification allows the scopes of work permitted by the commercial C-54 Water Conditioning Equipment and the residential R-54 Water Conditioning Equipment licenses.";
classificationInfo["CR56"] = "WELDING<br><br>This classification allows the scopes of work permitted by the commercial C-56 Welding and the residential R-56 Welding licenses.";
classificationInfo["CR57"] = "WRECKING<br><br>This classification allows the scopes of work permitted by the commercial C-57 Wrecking and the residential R-57 Wrecking licenses.";
classificationInfo["CR58"] = "COMFORT HEATING, VENTILATING, EVAPORATIVE COOLING<br><br>This classification allows the scopes of work permitted by the commercial C-58 Comfort Heating, Ventilating, Evaporative Cooling and the residential R-39R Warm Air Heating, Evaporative Cooling, and Ventilating licenses.";
classificationInfo["CR60"] = "FINISH CARPENTRY<br><br>This classification allows the scopes of work permitted by the commercial C-60 Finish Carpentry and the residential R-60 Finish Carpentry licenses.";
classificationInfo["CR61"] = "CARPENTRY, REMODELING AND REPAIRS<br><br>This classification allows the scopes of work permitted by the commercial C-61 Carpentry, remodeling and Repairs and the residential R-61 Carpentry, remodeling and Repairs licenses.";
classificationInfo["CR62"] = "REINFORCING BAR AND WIRE MESH<br><br>Upon the effective date of these rules, no new applications for the CR-62 Reinforcing Bar and Wire Mesh license classifications will be accepted, no new CR-62 licenses will be issued, and existing CR-62 licenses will be reclassified as CR-70 Reinforcing Bar and Wire Mesh.";
classificationInfo["CR63"] = "APPLIANCES<br><br>This classification allows the scopes of work permitted by the commercial C-63 Appliances and the residential R-63 Appliances licenses.";
classificationInfo["CR65"] = "GLAZING<br><br>This classification allows the scopes of work permitted by the commercial C-65 Glazing and the residential R-65 Glazing licenses.";
classificationInfo["CR66"] = "SEAL COATING<br><br>This classification allows the scopes of work permitted by the commercial A-15 Seal Coating and the residential R-13 Asphalt Paving licenses.";
classificationInfo["CR67"] = "LOW VOLTAGE COMMUNICATION SYSTEMS<br><br>This classification allows the scopes of work permitted by the commercial C-67 Low Voltage Communication Systems and the residential R-67 Low Voltage Communication Systems licenses.";
classificationInfo["CR69"] = "ASPHALT PAVING<br><br>This classification allows the scopes of work permitted by the commercial A-14 Asphalt Paving and the residential R-13 Asphalt Paving licenses.";
classificationInfo["CR70"] = "REINFORCING BAR AND WIRE MESH<br><br>This classification allows the scope of work permitted by the commercial C-70 Reinforcing Bar and Wire Mesh and the residential R-70 Reinforcing Bar and Wire Mesh licenses.";
classificationInfo["CR74"] = "BOILERS, STEAMFITTING AND PROCESSPIPING, INCLUDING SOLAR<br><br>This classification allows the scopes of work permitted by the commercial C-74 Boilers, Steamfitting and Process Piping, Including Solar and the residential R-4 Boilers Including Solar licenses.";
classificationInfo["CR77"] = "PLUMBING INCLUDING SOLAR<br><br>This classification allows the scopes of work permitted by the commercial C-77 Plumbing Including Solar and the residential R-37 Plumbing Including Solar licenses.";
classificationInfo["CR78"] = "SOLAR PLUMBING LIQUID SYSTEMS ONLY<br><br>This classification allows the scopes of work permitted by the commercial C-78 Solar Plumbing Liquid Systems Only and the residential R-37R Solar Plumbing Liquid Systems Only licenses.";
classificationInfo["CR79"] = "AIR CONDITIONING AND REFRIGERATION INCLUDING SOLAR<br><br>This classification allows the scopes of work permitted by the commercial C-79 Air Conditioning and Refrigeration Including Solar and the residential R-39 Air Conditioning and Refrigeration Including Solar licenses.";
classificationInfo["CR80"] = "SEWERS, DRAINS AND PIPE LAYING<br><br>This classification allows the scopes of work permitted by the commercial A-12 Sewers, Drains, and Pipe Laying and the residential R-37R Sewers, Drains and Pipe Laying licenses.";
classificationInfo["C-1"] = "ACOUSTICAL SYSTEMS<br><br>This classification allows the licensee to install and repair pre-manufactured acoustical ceiling and wall systems.";
classificationInfo["C-3"] = "AWNINGS, CANOPIES, CARPORTS AND PATIO COVERS<br><br>This classification allows the licensee to place concrete footings and concrete slabs as required for the licensee to install and repair: <br><br>1. Window awnings <br>2. Door hoods <br>3. Freestanding or attached canopies <br>4. Carport and patio covers constructed of metal, fabric, fiberglass, or plastic <br>5. Screened and paneled enclosures, which are not intended for use as habitable spaces, using metal panels, plastic inserts, and screen doors. A minimum of 60% of the wall area of an enclosure shall be constructed of screening material. <br>6. Fascia panels <br>7. Flashing and skirting <br>8. Exterior, detached metal storage units not to exceed 120 square feet <br><br>This classification does not allow the licensee to install or repair electrical, plumbing, or air conditioning systems.";
classificationInfo["C-4"] = "BOILERS, STEAMFITTING AND PROCESS PIPING<br><br>This classification allows the licensee to install, alter, and repair steam and hot water systems and boilers, including chimney connections, flues, refractories, burners, piping, fittings, valves, thermal insulation, and accessories; fuel and water lines from source of supply to boilers; process and specialty piping and related equipment; pneumatic and electrical controls.<br><br>If necessary, a new circuit may be added to the existing service panel or sub-panel. Excluded is the installation of a new service panel or sub-panel.";
classificationInfo["C-6"] = "SWIMMING POOL SERVICE AND REPAIR<br><br>This classification allows the licensee to replace and repair commercial pools and accessories including all existing connections and equipment. Plumbing connections to a potable water system, gas lines, gas chlorine systems, and electrical work beyond the first disconnect must be subcontracted to a properly licensed contractor.<br><br>This classification does not allow the licensee to perform a complete replacement of plaster or pebble pool interiors and decks.";
classificationInfo["C-7"] = "CARPENTRY<br><br>This classification allows the licensee to install and repair: <br><br>1. Rough carpentry <br>2. Finish carpentry <br>3. Hardware <br>4. Millwork <br>5. Metal studs <br>6. Metal doors or door frames <br>7. Windows";
classificationInfo["C-8"] = "FLOOR COVERING<br><br>This classification allows the licensee to prepare a surface as required for the licensee to install and repair the following floor covering materials: <br><br>1. Carpet <br>2. Floor tile <br>3. Wood <br>4. Linoleum <br>5. Vinyl <br>6. Asphalt <br>7. Rubber <br>8. Concrete coatings";
classificationInfo["C-9"] = "CONCRETE<br><br>This classification allows the licensee to install and repair concrete, concrete products, and accessories common to the industry.<br><br>This classification also allows the licensee to perform trenching, excavating, backfilling, and grading in connection with concrete construction.";
classificationInfo["C-10"] = "DRYWALL<br><br>This classification allows the licensee to install and repair: <br><br>1. Gypsum wall board <br>2. Ceiling grid systems <br>3. Movable partitions <br>4. Wall board tape and texture<br>5. Non-load bearing, lightweight, steel wall partitions";
classificationInfo["C-11"] = "ELECTRICAL<br><br>This classification allows the licensee to install, alter, and repair any wiring, related electrical material and equipment used in the generating, transmitting, or utilization of electrical energy less than 600 volts, including all overhead electrical wiring on public right-of-ways for signs and street decorations, and all underground electrical distribution systems of less than 600 volts serving private properties.<br><br>This classification also allows the licensee to install, alter, and repair all outside, overhead, and underground electrical construction and all wiring in or on any building of less than 600 volts, but does not permit work in public right-of-ways.";
classificationInfo["C-12"] = "ELEVATORS<br><br>This classification allows the licensee to install and repair: <br><br>1. Elevators <br>2. Dumbwaiters <br>3. Escalators <br>4. Moving walks and ramps<br>5. Stage and orchestra lifts";
classificationInfo["C-14"] = "FENCING<br><br>This classification allows the licensee to install and repair: <br><br>1. Metal, wood, and cement block fencing <br>2. Automatic gates <br>3. Fire access strobes <br>4. Cattle guards <br>5. Low voltage U.L. approved electrical fence protective devices of less than 25 volts and 100 watts<br><br>This classification does not allow the licensee to install or repair retaining walls.";
classificationInfo["C-15"] = "BLASTING<br><br>This classification allows the licensee to drill, bore, move earth, and build temporary shelters or barricades, as required for the licenseeâ€™s use of explosives and explosive devices for: <br><br>1. Excavation <br>2. Demolition <br>3. Geological exploration<br>4. Mining <br>5. Construction related blasting";
classificationInfo["C-16"] = "FIRE PROTECTION SYSTEMS<br><br>This classification allows the licensee to install, alter, and repair of fire protection systems using water, steam, gas, or chemicals. Included is any required excavation, trenching, backfilling and grading, piping from structure, and connections to off-premise water supply adjacent to property involving a fire protection system.<br><br>Systems may include the following areas of work and related equipment: restaurant hood protection systems; fire pumps and drivers; pressure and storage tanks; all piping and valves; sprinkler heads and nozzles; and application of materials for the prevention of corrosion or freezing.<br><br>Also included are air compressors, air receivers, bottled inert gases, pressurized chemicals, manifolds, pneumatic, hydraulic, or electrical controls, low voltage signaling systems, control piping, and the flushing and testing of systems.";
classificationInfo["C-21"] = "HARDSCAPING AND IRRIGATION SYSTEMS<br><br>This classification allows the licensee to install, alter, and repair: <br><br>1. Non-loadbearing concrete <br>2. Uncovered patios, walkways, driveways made of brick, stone, pavers or gravel <br>3. Wooden decks no higher than 29 inches above finish grade <br>4. Decorative garden walls up to six feet from finish grade <br>5. Fences and screens up to six feet from finish grade <br>6. Retaining walls up to three feet from the finish grade of the lower elevation <br>7. Free standing fire pits, fireplaces, or barbeques â€“ electric, plumbing, and gas must be subcontracted to a properly licensed contractor <br>8. Low voltage landscape lighting <br>9. Water features that are not attached to swimming pools; including any necessary: electrical wiring of 120 volts or less, connection to potable water lines, backflow prevention devices, hose bibs, excavating, trenching, boring, backfilling, or grading <br>10. Irrigation systems, including any necessary: electrical wiring of 120 volts or less, connection to potable water lines, backflow prevention devices, hose bibs,excavating, trenching, boring, backfilling, or grading <br><br>With the exception of free standing fire pits, fireplaces, or barbeques, this classification does not allow the licensee to install, contract for, or subcontract new electrical service panels, gas or plumbing lines, blasting, outdoor kitchens, gazebos, room additions, swimming pools, pool deck coatings, concrete driveways, load bearing walls, or perimeter fencing.";
classificationInfo["C-24"] = "ORNAMENTAL METALS<br><br>This classification allows the licensee to install, alter, or repair non-structural ornamental metal, such as: <br><br>1. Metal folding gates <br>2. Guard and hand rails <br>3. Wrought iron fencing and gates<br>4. Window shutters and grilles <br>5. Room dividers and shields <br>6. Metal accessories common to the industry <br><br>This classification does not allow the licensee to install fire escapes or stairs.";
classificationInfo["C-27"] = "LIGHTWEIGHT PARTITIONS<br><br>This classification allows the licensee to install lightweight (not to exceed 14 gauge) metal wall partitions, including suspended metal ceiling grid systems, as supporting members for the application of building materials such as: application and repair of gypsum plaster, cement, acoustical plaster, or a combination of materials and aggregates, that create a permanent coating; the application of such materials over any surface which offers either a mechanical or suction type bond, sprayed, dashed, or troweled to the surface; surface sandblasting preparatory to plastering or stucco; installation of plastering accessories and lath products manufactured to provide a key or suction type bond for the support of various type plaster coatings; and installation and repair of gypsum wall board, pointing, accessories, taping, and texturing on structures both interior and exterior.<br><br>Upon the effective date of these rules, no new applications for the C-27 classification will be accepted and no new C-27 licenses will be issued.";
classificationInfo["C-31"] = "MASONRY<br><br>This classification allows the licensee to grout, caulk, sand blast, tuckpoint, mortar wash, parge, clean and weld reinforcing steel as required for the licensee to install and repair: <br><br>1. Masonry <br>2. Brick <br>3. Concrete block<br> 4. Insulating concrete forms <br>5. Adobe units <br>6. Stone <br>7. Marble <br>8. Slate <br>9. Mortar-free masonry products";
classificationInfo["C-34"] = "PAINTING AND WALL COVERING<br><br>This classification allows the licensee to perform surface preparation to install, apply or repair: <br><br>1. Wallpaper <br>2. Wall covering cloth <br>3. Wall covering vinyl <br>4. Decorative texture <br>5. Paint <br>6. Liquid floor and wall coatings";
classificationInfo["C-36"] = "PLASTERING<br><br>This classification allows the licensee to install laths, metal studs, metal grid systems, or other bases as required for the licensee to coat surfaces by trowel or spray with combinations of: <br><br>1. Sand mixtures (e.g. stucco) <br>2. Gypsum plaster <br>3. Cement <br>4. Acoustical plaster<br> 5. Swimming pool interiors (excluding tile)";
classificationInfo["C-37"] = "PLUMBING<br><br>Installation, alteration, and repair of all plumbing when performed solely within property lines and not on public easements or right-of-ways, except as hereinafter provided.<br><br>Installation, alteration, and repair of all piping, fixtures, and appliances related to water supply, including pressure vessels and tanks (excluding municipal or related water supply systems); venting and sanitary drainage systems for all fluid, semi-fluid, and organic wastes; septic tanks and leaching lines; roof leaders; lawn sprinklers; water conditioning equipment; piping; and equipment for swimming pools.<br><br><br><br>Also included are piping, fixtures, appliances, and pressure vessels for manufactured and natural gases, compressed air and vacuum systems, petroleum, fuel oil, non-potable liquids, hot water heating, and hot water supply systems operating at pressures not exceeding 30 PSIG, or temperatures not exceeding 220Â° F; steam heating and steam supply systems not exceeding 15 PSIG operating pressure; gas or oil fired space heaters and furnaces, excluding duct work. Piping for water cooling systems, excluding the refrigerant piping and equipment. Testing and balancing of hydronics systems.<br><br>Sewer, gas, water lines, and connections from structure to the nearest point of public supply or disposal may cross public or private easements or be installed within private easements or right-of-ways. Pipe installed across public property may not be increased in size, or make any other connection between the point of exit from private property to the point of connection at public supply or disposal. These lines shall not be installed parallel to main lines in public easements or right-of-ways.";
classificationInfo["C-38"] = "SIGNS<br><br>This classification allows the licensee to install and repair posts, poles, supports, paint, and electrical wiring as required for the licensee to install and repair: <br><br>1. Signs <br>2. Displays <br>3. Flagpoles";
classificationInfo["C-39"] = "AIR CONDITIONING AND REFRIGERATION<br><br>This classification allows the licensee to install, alter, and repair refrigeration and evaporative cooling systems.<br><br>This classification also allows the licensee to perform installation, alteration, and repair of heating systems of &quot;wet&quot;, &quot;dry&quot; or radiant type. &quot;Wet&quot; systems include steam or hot water boilers and coils, or baseboard convectors, and are limited to 30 PSIG operating pressure of 220Â° F for hot water and 15 PSIG operating pressure for steam. Dry systems include gas fired furnaces and space heaters.<br><br>This classification also allows the licensee to perform installation, alteration, and repair of ventilation systems includes duct work, air filtering devices, water treatment devices, pneumatic or electrical controls, and control piping. Thermal and acoustical insulation of refrigerant pipes and ductwork, vibration isolation materials and devices, liquid fuel piping and tanks, water and gas piping from service connection to the equipment it serves. Testing and balancing of refrigerant, cooling, heating circuits, and air handling systems.<br><br>If necessary, a new circuit may be added to the existing service panel or sub-panel. Excluded is the installation of a new service panel or sub-panel.";
classificationInfo["C-40"] = "INSULATION<br><br>This classification allows the licensee to install and repair: <br><br>1. Insulation materials, including radiant barriers <br>2. Preformed architectural acoustical materials <br>3. Insulation protecting materials";
classificationInfo["C-41"] = "SEPTIC TANKS AND SYSTEMS<br><br>This classification allows the licensee to excavate, install and repair pipe, back fill, and compact soil as required for the licensee to install and repair. <br><br>1. Septic tanks <br>2. Aerobic digesters<br>3. Leaching fields";
classificationInfo["C-42"] = "ROOFING<br><br>This classification allows the licensee to apply, repair, or install weatherproofing (i.e. asphaltum, pitch, tar, felt, glass fabric, flax, or other commonly used materials or systems) or roof accessories (i.e. flashing, valleys, gravel stops, or sheet metal) as required for the licensee to install and repair: <br><br>1. Roof tile <br>2. Shingles <br>3. Shakes <br>4. Slate <br>5. Metal roofing systems <br>6. Urethane foam <br>7. Roof insulation or coatings on or above the roof deck This classification allows the licensee to replace up to 10 percent of the total roof substrate square footage as it relates to issues with substrate discovered after execution of the initial contract. Replacing more than 10 percent of the roof substrate square footage as it relates to issues with substrate discovered after execution of the initial contract requires licensee to subcontract work to a properly licensed contractor.<br><br>This classification also allows the licensee to install new or replace existing skylights where it does not require changes to the roof framing or roof structure and replace fascia not to exceed 24 linear feet.<br><br>Licensee may lift HVAC equipment to allow for proper installation of roofing material. However, the licensee must subcontract work to a properly licensed contractor if HVAC equipment ducting requires any modification to allow for proper installation of roofing material.";
classificationInfo["C-45"] = "SHEET METAL<br><br>This classification allows the licensee to install and repair: <br><br>1. Sheet metal <br>2. Cornices <br>3. Flashings <br>4. Gutters <br>5. Leaders <br>6. Pans <br>7. Kitchen equipment <br>8. Duct work <br>9. Skylights <br>10. Patented chimneys <br>11. Metal flues <br>12. Metal roofing systems";
classificationInfo["C-48"] = "CERAMIC, PLASTIC AND METAL TILE<br><br>This classification allows the licensee to prepare a surface as required for the licensee to install and repair the following tile products on horizontal and vertical surfaces: 1. Ceramic <br>2. Clay <br>3. Faience <br>4. Metal <br>5. Mosaic <br>6. Glass mosaic<br>7. Paver <br>8. Plastic <br>9. Quarry and stone tiles such as marble or slate <br>10. Terrazzo <br><br>Installation of shower doors and tub enclosures are included when a part of the original contract.";
classificationInfo["C-49"] = "COMMERCIAL, INDUSTRIAL REFRIGERATION<br><br>This classification allows the licensee to install, alter, and repair refrigeration equipment and systems used for processing, storage, and display of food products and other perishable commodities. This classification includes commercial, industrial, and manufacturing processes requiring refrigeration excluding comfort air conditioning.<br><br>Systems may also include the following areas of work and related equipment: temperature, safety and capacity controls, thermal insulation, vibration isolation materials and devices; water treatment devices; construction and installation of walk-in refrigeration boxes, liquid fuel piping and tanks, water and gas piping from equipment to service connection; and testing and balancing of refrigeration equipment and systems.<br><br>If necessary, a new circuit may be added to the existing service panel or sub-panel. Excluded is the installation of a new service panel or sub-panel.";
classificationInfo["C-53"] = "WATER WELL DRILLING<br><br>This classification allows the licensee to drill new water wells or deepen existing water wells by use of standard practices including the use of cable tools, compressed air percussion, rotary, air rotary, or reverse circulation rotary methods. Includes installing casing, gravel pack, perforating and sanitary seals. Repair existing wells by sand pumping, jetting, acidizing, swabbing, clean out, re-perforating, swaging, installation of annealed lines, and the removal of debris.<br><br>Includes photographing interior of wells with appropriate equipment. Installation of jet and submersible pumps; electrical pump controls and wiring from pump equipment to first readily accessible disconnect; and water line to storage or pressure tank, not to exceed 50 linear feet. Use of a test pump to develop a new well, or repair an existing well, when provided in contract, is limited to 5 horsepower.<br><br>Installation of concrete pump bases not to exceed 50 square feet.<br><br>Installation of protective fencing when included in original contract.";
classificationInfo["C-54"] = "WATER CONDITIONING EQUIPMENT<br><br>This classification allows the licensee to perform trenching, backfilling, and grading; and install and repair piping, fittings, valves, concrete supports, and electrical control panels of less than 25 volts and required grounding devices; as required for the licensee to install and repair: <br><br>1. Water conditioning equipment <br>2. Misting systems <br>3. Exchange tanks <br>4. Indirect waste pipe carrying brine, backwash and rinse water to the point of disposal";
classificationInfo["C-56"] = "WELDING<br><br>This classification allows the licensee to weld metals.";
classificationInfo["C-57"] = "WRECKING<br><br>This classification allows the licensee to install and repair temporary ramps, barricades, and pedestrian walkways as required for the licensee to demolish, dismantle, or remove structures not intended for reuse. This classification does not allow the licensee to use explosives.";
classificationInfo["C-58"] = "COMFORT HEATING, VENTILATING, EVAPORATIVE COOLING<br><br>This classification allows the licensee to install, alter, and repair warm air heating systems, gas fired furnaces and space heaters, ventilation and evaporative cooling units, or any combination of these.<br><br>Systems may include the following areas of work and related equipment; duct work, air filtering devices, pneumatic or electrical controls, control piping, thermal and acoustical insulation, vibration isolation materials and devices, liquid fuel piping and tanks, water and gas piping from service connection to equipment it serves. Testing and balancing of air handling systems.<br><br>If necessary, a new circuit may be added to the existing service panel or sub-panel. Excluded is the installation of a new service panel or sub-panel.";
classificationInfo["C-60"] = "FINISH CARPENTRY<br><br>This classification allows the licensee to install and repair millwork such as: <br><br>1. Cabinets <br>2. Counter tops <br>3. Case sash <br>4. Door trim <br>5. Metal doors <br>6. Automatic door closers <br>7. Wood flooring";
classificationInfo["C-61"] = "CARPENTRY, REMODELING AND REPAIRS<br><br>For projects of $50,000 or less including labor and materials, this classification allows the licensee to perform all general remodeling, additions, replacements, and repairs to existing structures.<br><br>Work related to electrical, plumbing, air conditioning systems, and boilers must be subcontracted to an appropriately licensed contractor.";
classificationInfo["C-63"] = "APPLIANCES<br><br>This classification allows the licensee to install and repair appliances.<br><br>This classification does not allow the licensee to install or repair gas, electrical, or plumbing lines.";
classificationInfo["C-65"] = "GLAZING<br><br>This classification allows the licensee to install and repair weatherproofing, caulking, sealants, and adhesives as required for the licensee to install and repair: <br><br>1. Glass products <br>2. Window film <br>3. Window treatments, such as blinds or shutters <br>4. Steel and aluminum glass holding members";
classificationInfo["C-67"] = "LOW VOLTAGE COMMUNICATION SYSTEMS<br><br>This classification allows the licensee to build antenna towers on existing structures as required for the licensee to install, service, and repair: <br><br>1. Alarm systems <br>2. Telephone systems <br>3. Sound systems <br>4. Intercommunication systems <br>5. Public addressing systems <br>6. Television or video systems <br>7. Low voltage signaling devices <br>8. Low voltage landscape lighting that does not exceed 91 volts <br>9. Master and program clocks (only low voltage wiring and needed equipment)";
classificationInfo["C-70"] = "REINFORCING BAR AND WIRE MESH<br><br>This classification allows the licensee to install and repair: <br><br>1. Reinforcing bar <br>2. Post-tension <br>3. Wire mesh";
classificationInfo["C-74"] = "BOILERS, STEAMFITTING AND PROCESS PIPING, INCLUDING SOLAR<br><br>This classification allows the licensee to install, alter, and repair steam and hot water systems and boilers including solar. Also included are chimney connections, flues, refractories, burners, piping, fittings, valves, thermal insulation and accessories; fuel and water lines from source of supply to boilers; process and specialty piping and related equipment; pneumatic and electrical controls.<br><br>If necessary, a new circuit may be added to the existing service panel or sub-panel. Excluded is the installation of a new service panel or sub-panel.";
classificationInfo["C-77"] = "PLUMBING INCLUDING SOLAR<br><br>This classification allows the licensee to install, alter, and repair all plumbing including solar, when performed solely within property lines and not on public easements or right-of-ways except as hereinafter provided.<br><br>This classification also allows for installation, alteration, and repair of all piping, fixtures and appliances related to water supply, including pressure vessels and tanks (excluding municipal or related water supply systems); venting and sanitary drainage systems for all fluid, semifluid, and organic wastes; septic tanks and leaching lines; roof leaders; lawn sprinkler systems; water conditioning equipment; piping and equipment for swimming pools.<br><br>Also included are piping, fixtures, appliances, and pressure vessels for manufactured and natural gases, compressed air and vacuum systems, petroleum, fuel oil, non-potable liquids, hot water heating and hot water supply systems operating at pressures not exceeding 30 PSIG or temperatures not exceeding 220Â° F; steam heating and steam supply systems not exceeding 15 PSIG operating pressure; gas or oil fired space heaters and furnaces excluding duct work. Piping for water cooling systems, excluding the refrigerant piping and equipment. Testing and balancing of hydronics systems.<br><br>Sewer, gas, water lines, and connections from structure to the nearest point of public supply or disposal may cross public or private easements or be installed within private easements. Pipe installed across public property may not be increased in size or make any other connection between the point of exit from private property to point of connection at public supply or disposal.<br><br>These lines shall not be installed parallel to main lines in public easements or right-of-ways.";
classificationInfo["C-78"] = "SOLAR PLUMBING LIQUID SYSTEMS ONLY<br><br>This classification allows the licensee to install, alter, and repair solar water heating systems operating at temperatures not exceeding 220Â° F, including thermosyphon, direct (open loop), and indirect (closed loop), but excludes air as a transfer medium.<br><br>Includes installation of collectors, storage and expansion tanks, heat exchangers, piping valves, pumps, sensors and low voltage controls which connect to existing plumbing and electrical stubouts at the water tank location.<br><br>Installation of solar water heating systems for swimming pools which tie into and operate from the conventional pool systems, but excludes all non-solar plumbing, electrical and mechanical systems and components.<br><br>Installation of backup and auxiliary heating systems only when such systems are included in the original contract and when such systems are an integral part of the solar collector or storage equipment.";
classificationInfo["C-79"] = "AIR CONDITIONING AND REFRIGERATION INCLUDING SOLAR<br><br>This classification allows the licensee to install, alter, and repair of refrigeration and evaporative cooling systems, including solar.<br><br>This classification also allows for installation, alteration, and repair of heating systems of &quot;wet&quot;, &quot;dry&quot; or radiant type. &quot;Wet&quot; systems include steam, or hot water boilers and coils, or baseboard convectors and are limited to 30 PSIG operating pressure of 220Â° F for hot water and 15 PSIG operating pressure for steam. Dry systems include gas fired furnaces and space heaters.<br>This classification also allows for installation, alteration, and repair of ventilation systems.<br>Installation of these systems include duct work, air filtering devices, water treatment devices, pneumatic or electrical controls, and control piping. Thermal and acoustical insulation, vibration isolation materials and devices, liquid fuel piping and tanks, and water and gas piping from service connection to equipment it serves. Testing and balancing of refrigerant, cooling and heating circuits, and air handling systems.<br><br>If necessary, a new circuit may be added to the existing service panel or sub-panel. Excluded is the installation of a new service panel or sub-panel.";

var searchClassOpened = 0;
function searchClasses ( vv ) {
    var vvl = vv.toLowerCase();
    if ( vv.trim() != '' ) {
        //console.log('trimmed is not null');
        if ( $("#classificationResults") != null ) {
            var res = "<div class=\"classificationResultsInstructions\">Mouseover a license classification to get the full description of that classification.</div>";
            //console.log('Found #results');
            for ( var index in classifications ) {
                var element = classifications[index];
                var elementl = element.toLowerCase();
                var indexr = index.substr(0,index.indexOf(' '));
                if ( indexr.indexOf('CR') == 0 ) { indexr = indexr.replace('-',''); }
                var elemInfo = classificationInfo[indexr];
                var indexl = index.toLowerCase();
                if ( elementl.indexOf(vvl) > -1 || indexl.indexOf(vvl) > -1 ) {
                    res += "<div class=\"classResult\" onclick=\"javascript:chooseClassification('" + index + "');\">" + index + "<div class=\"classResultInfo\">" + elemInfo + "</div></div>";
                }
                //console.log(index + element);
            };
            if ( res != '' ) {
                $("#classificationResults").removeClass('hide');
                $("#classificationResults").html(res);
                searchClassOpened = 1;
                $(document).mouseup(function(e){
                    if ( $("#classificationResults") && searchClassOpened == 1 ) { $("#classificationResults").addClass('hide'); }
                });
            }
        } else {
            //console.log('Could not find results div.');
        }
    } else {
        //console.log('Something went awry while trimming.');
    }
}

function searchClassKeyPress (e) {
    var key = e.which || e.keyCode;
    var v = '';
    var suggs = document.getElementsByClassName('classResult');
    var prvSuggs = document.getElementsByClassName('classResultSelected');
    for ( ps = 0; ps < prvSuggs.length; ps++ ) { 
      var rpp = document.getElementsByClassName('classResultSelected')[ps].className;
      document.getElementsByClassName('classResultSelected')[ps].className = rpp.replace(' classResultSelected','');
    }
   if (key === 9 || key === 13) { // 9 is tab, 13 is enter
      if ( document.getElementById('searchClassifications') != null ) {
        if ( suggs[vc] != undefined ) { // 0, 1, 2 are in search button
          v = suggs[vc].innerHTML;
          v = v.substr(0,v.indexOf(' '));
          if ( v.trim() != '' ) {
            chooseClassification(v);
            vc = 0;
          }
        } else { 
          //displayError("Sorry but there were no suggested search criteria for that keyword string. Please alter your keywords and try again.");
        }
      } else { 
        //displayError("Sorry but there were no suggested search criteria for that keyword string. Please alter your keywords and try again.");
      }
    } else if ( key === 40 || key === 39 || key === 38 || key === 37 ) {
      if ( key === 40 || key === 39 ) {
        vc++;
        if ( vc >= suggs.length ) { vc = 0; }
      } else {
        vc--;
        if ( vc < 0 ) { vc = suggs.length - 1; }
      }
      if ( suggs[vc] != null ) { suggs[vc].className = suggs[vc].className + " classResultSelected"; }
    } 
}

if ( document.getElementById('searchClassifications') != null ) {
    document.getElementById('searchClassifications').addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            searchClasses(document.getElementById('searchClassifications').value);
        }
    });
    var vc = 0;
    document.getElementById('searchClassifications').addEventListener('keyup', function (e) { searchClassKeyPress(e); });
    /*
    document.getElementById('classificationResults').addEventListener('keydown', function (e) { searchClassKeyPress(e); });
    window.onload = function () {
        checkSavedLicenseLocally();
        if ( getParameterByName('license') != "" ) {
            if ( parseInt(getParameterByName('license')) > 100 ) {
            if ( document.getElementById('cSearchKeywords') != null ) { 
                document.getElementById('cSearchKeywords').value = getParameterByName('license');
            }
            contractorSearch();
            }
        }
    };
    */
}

var reqExp0 = 'R-62';
var reqExp1 = 'C-6,R-6,CR6';
var reqExp2 = 'A-15,C-1,C-3,C-8,C-10,C-24,C-27,C-34,C-40,C-45,C-53,C-54,C-56,C-58,C-60,C-63,C-67,C-78,B-10,R-1,R-2,R-3,R-8,R-10,R-24,R-34,R-40,R-45,R-53,R-54,R-56,R-60,R-63,R-67,CR1,CR3,CR8,CR10,CR24,CR34,CR40,CR45,CR53,CR54,CR56,CR60,CR63,CR67,CR78';
var reqExp3 = 'C-14,C-36,C-38,C-41,C-48,C-57,C-65,R-14,R-36,R-38,R-41,R-57,R-65,CR2,CR14,CR36,CR38,CR41,CR48,CR57,CR65';
var solar = 'A-19,C-74,C-77,C-78,C-79,B-6,R-37,R-39,KA-6,CR74,CR77,CR78,CR79';

function setRequiredExperience () { 
    if ( $("#Classifications_Chosen__c") ) {
        setBondTable();
        var cc = $("#Classifications_Chosen__c").val();
        if ( cc.trim() != '' ) {
            var def = 0;
            var ccr = cc.split(",");
            var solr = 0;
            for ( i=0; i<ccr.length; i++ ) {
                if ( ccr[i].trim() != '' ) {
                    if ( reqExp0.indexOf(ccr[i]+",") > -1 && def < 0 ) { def = 0; }
                    if ( reqExp1.indexOf(ccr[i]+",") > -1 && def < 1 ) { def = 1; }
                    if ( reqExp2.indexOf(ccr[i]+",") > -1 && def < 2 ) { def = 2; }
                    if ( reqExp3.indexOf(ccr[i]+",") > -1 && def < 3 ) { def = 3; }
                    if ( reqExp0.indexOf(ccr[i]+",") == -1 && reqExp1.indexOf(ccr[i]) == -1 && reqExp2.indexOf(ccr[i]) == -1 && reqExp3.indexOf(ccr[i]) == -1 ) { def = 4; }
                    if ( solar.indexOf(ccr[i]+",") > -1 ) { solr = 1; }
                }
            }
            if ( $("#requiredExperience") ) {
                $("#requiredExperience").html(def);
            }
            if ( solr > 0 ) { openSub('solarLicense'); } else { hideSub('solarLicense'); }
        }
    }
}

function chooseClassification ( cc ) {
    if ( cc.trim() != '' ) {
        if ( $("#classificationsChosen").length ) {
            // only allow one license at a time right now, so remove all previously selected licenses
            $("#classificationsChosen").empty(); 
            $("#Classifications_Chosen_RAW__c").val('');
            $("#Classifications_Chosen__c").val('');
            // this one generates the Classification Ids divs for the section with Id and Name - ie CR57 Wrecking (R) (C)
            var cur = $("#classificationsChosen").html();
            if ( cur.indexOf(cc) == -1 ) {
                cur += "<div class=\"classChosen\">" + classifications[cc] + " <a href=\"javascript:removeClassification('" + cc + "');\">X</a></div>";
                $("#classificationsChosen").html(cur);
                if ( $("#Classifications_Chosen_RAW__c") ) {
                    // copy the contents of #classificationsChosen to this field so it's easier to refill when the form is saved
                    $("#Classifications_Chosen_RAW__c").val($("#classificationsChosen").html());
                }
                if ( cur.indexOf('Restricted') > -1 ) {
                    if ( $("#restrictedLicense") ) { $("#restrictedLicense").removeClass('hide'); }
                }
                if ( classificationExams[ cc ]['T'] == 1 ) {
                    $('#tradeExamRequired').removeClass('hide');
                    $('#Completed_Trade_Exams__c0').addClass('appFormRequiredRadio');
                    $('#Completed_Trade_Exams__c1').addClass('appFormRequiredRadio');
                } else {
                    $('#tradeExamRequired').addClass('hide');
                    $('#Completed_Trade_Exams__c0').removeClass('appFormRequiredRadio');
                    $('#Completed_Trade_Exams__c1').removeClass('appFormRequiredRadio');
                }
                if ( classificationExams[ cc ]['W'] == 1 ) {
                    $('#waterExamRequired').removeClass('hide');
                    $('#Completed_Water_Exams__c0').addClass('appFormRequiredRadio');
                    $('#Completed_Water_Exams__c1').addClass('appFormRequiredRadio');
                } else {
                    $('#waterExamRequired').addClass('hide');
                    $('#Completed_Water_Exams__c0').removeClass('appFormRequiredRadio');
                    $('#Completed_Water_Exams__c1').removeClass('appFormRequiredRadio');
                }
                if ( classificationExams[ cc ]['S'] == 1 ) {
                    $('#solarExamRequired').removeClass('hide');
                    $('#Completed_Solar_Exams__c0').addClass('appFormRequiredRadio');
                    $('#Completed_Solar_Exams__c1').addClass('appFormRequiredRadio');
                } else {
                    $('#solarExamRequired').addClass('hide');
                    $('#Completed_Solar_Exams__c0').removeClass('appFormRequiredRadio');
                    $('#Completed_Solar_Exams__c1').removeClass('appFormRequiredRadio');
                }
            } // don't add it if it's already there
        }
        if ( $("#Classifications_Chosen__c") ) {
            var currr = $("#Classifications_Chosen__c").val();
            if ( currr.indexOf(cc) == -1 ) {
                // this one just gets the Classification Ids - ie CR57, C-57, R-57 etc
                $("#Classifications_Chosen__c").val($("#Classifications_Chosen__c").val() + cc + ","); //  + ","
            } // don't add more than once
        }
        if ( $("#searchClassifications") ) { $("#searchClassifications").val(''); }
        $("#classificationsChosen").removeClass('hide');
        $("#classificationResults").addClass('hide');
        $("#classificationResults").empty();
        setRequiredExperience();
    }
}

function removeClassification ( cc ) {
    if ( cc.trim() != '' ) {
        if ( $("#classificationsChosen").length ) {
            // this one generates the Classification Ids divs for the section with Id and Name - ie CR57 Wrecking (R) (C)
            var cur = $("#classificationsChosen").html();
            var toRemove = "<div class=\"classChosen\">" + classifications[cc] + " <a href=\"javascript:removeClassification('" + cc + "');\">X</a></div>";
            cur = cur.split(toRemove).join('');
            $("#classificationsChosen").html(cur);
            if ( cur.trim() == '' || cur == '' ) {
                $("#classicationsChosen").addClass('hide');
            }
            if ( $("#Classifications_Chosen_RAW__c").length ) {
                // copy the contents of #classificationsChosen to this field so it's easier to refill when the form is saved
                $("#Classifications_Chosen_RAW__c").val($("#classificationsChosen").html());
            }
            if ( cur.indexOf('Restricted') == -1 ) {
                if ( $("#restrictedLicense") ) { $("#restrictedLicense").addClass('hide'); }
            }
        }
        if ( $("#Classifications_Chosen__c").length ) {
            // this one just gets the Classification Ids - ie CR57, C-57, R-57 etc
            var curr = $("#Classifications_Chosen__c").val();
            curr = curr.split(cc + ",").join('');
            $("#Classifications_Chosen__c").val(curr);
        }
        setRequiredExperience();
    }
}

var ownershipType = "";
function checkOwnership ( tt ) {
    if ( tt == "Sole Proprietorship" ) {
        if ( $("#OwnershipSoleProp") ) { $("#OwnershipSoleProp").removeClass('hide'); }
        if ( $("#OwnershipCorp") ) { $("#OwnershipCorp").addClass('hide'); }
        if ( $("#OwnershipLLC") ) { $("#OwnershipLLC").addClass('hide'); }
        if ( $("#OwnershipPartnership") ) { $("#OwnershipPartnership").addClass('hide'); }
        if ( $("#officerPartnerAddLink") ) { $("#officerPartnerAddLink").addClass('hide'); }
        $(".officerpartnerTitle").html('Sole Prioprietor');
        if ( $("#officerPartnerDiv") ) { $("#officerPartnerDiv").removeClass('hide'); }
        ownershipType = "SoleProp";
        $(".officerpartnerTitle").html("Sole Proprietor");
        if ( $("#Have_DBA__c") ) { $('#Have_DBA__c').addClass('appFormRequiredRadio'); }
        if ( $("#CHave_DBA__c") ) { $('#CHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#LHave_DBA__c") ) { $('#LHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#PHave_DBA__c") ) { $('#PHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#Doing_Business_As__c") ) { $('#Have_DBA__c').addClass('appFormRequired'); }
        if ( $("#CDoing_Business_As__c") ) { $('#CDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#LDoing_Business_As__c") ) { $('#LDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#PDoing_Business_As__c") ) { $('#PDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#AZ_Corp_File_Number__c") ) { $('#AZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#LAZ_Corp_File_Number__c") ) { $('#LAZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#PAZ_Corp_File_Number__c") ) { $('#PAZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#Employer_Id_Number__c") ) { $('#Employer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#LEmployer_Id_Number__c") ) { $('#LEmployer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#PEmployer_Id_Number__c") ) { $('#PEmployer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#Corporation_Name__c") ) { $('#Corporation_Name__c').removeClass('appFormRequired'); }
        if ( $("#LLC_Name__c") ) { $('#LLC_Name__c').removeClass('appFormRequired'); }
        if ( $("#Partnership_Name__c") ) { $('#Partnership_Name__c').removeClass('appFormRequired'); }
        if ( $("#LLC_Type__c") ) { $('#LLC_Type__c').removeClass('appFormRequired'); }
        if ( $("#Partnership_Type__c") ) { $('#Partnership_Type__c').removeClass('appFormRequired'); }
        if ( $("#PPartnership_Agreement__c") ) { $('#PPartnership_Agreement__c').removeClass('appFormRequired'); }
    } else if ( tt == "Corporation" ) {
        if ( $("#OwnershipSoleProp") ) { $("#OwnershipSoleProp").addClass('hide'); }
        if ( $("#OwnershipCorp") ) { $("#OwnershipCorp").removeClass('hide'); }
        if ( $("#OwnershipLLC") ) { $("#OwnershipLLC").addClass('hide'); }
        if ( $("#OwnershipPartnership") ) { $("#OwnershipPartnership").addClass('hide'); }
        if ( $("#officerPartnerAddLink") ) { $("#officerPartnerAddLink").removeClass('hide'); }
        $(".officerpartnerTitle").html('Officer/Director');
        if ( $("#officerPartnerDiv") ) { $("#officerPartnerDiv").removeClass('hide'); }
        ownershipType = "Corp";
        if ( $("#Have_DBA__c") ) { $('#Have_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#CHave_DBA__c") ) { $('#CHave_DBA__c').addClass('appFormRequiredRadio'); }
        if ( $("#LHave_DBA__c") ) { $('#LHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#PHave_DBA__c") ) { $('#PHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#Doing_Business_As__c") ) { $('#Have_DBA__c').removeClass('appFormRequired'); }
        if ( $("#CDoing_Business_As__c") ) { $('#CDoing_Business_As__c').addClass('appFormRequired'); }
        if ( $("#LDoing_Business_As__c") ) { $('#LDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#PDoing_Business_As__c") ) { $('#PDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#AZ_Corp_File_Number__c") ) { $('#AZ_Corp_File_Number__c').addClass('appFormRequired'); }
        if ( $("#LAZ_Corp_File_Number__c") ) { $('#LAZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#PAZ_Corp_File_Number__c") ) { $('#PAZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#Employer_Id_Number__c") ) { $('#Employer_Id_Number__c').addClass('appFormRequired'); }
        if ( $("#LEmployer_Id_Number__c") ) { $('#LEmployer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#PEmployer_Id_Number__c") ) { $('#PEmployer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#Corporation_Name__c") ) { $('#Corporation_Name__c').addClass('appFormRequired'); }
        if ( $("#LLC_Name__c") ) { $('#LLC_Name__c').removeClass('appFormRequired'); }
        if ( $("#Partnership_Name__c") ) { $('#Partnership_Name__c').removeClass('appFormRequired'); }
        if ( $("#LLC_Type__c") ) { $('#LLC_Type__c').removeClass('appFormRequired'); }
        if ( $("#Partnership_Type__c") ) { $('#Partnership_Type__c').removeClass('appFormRequired'); }
        if ( $("#PPartnership_Agreement__c") ) { $('#PPartnership_Agreement__c').removeClass('appFormRequired'); }
    } else if ( tt == "LLC" ) {
        if ( $("#OwnershipSoleProp") ) { $("#OwnershipSoleProp").addClass('hide'); }
        if ( $("#OwnershipCorp") ) { $("#OwnershipCorp").addClass('hide'); }
        if ( $("#OwnershipLLC") ) { $("#OwnershipLLC").removeClass('hide'); }
        if ( $("#OwnershipPartnership") ) { $("#OwnershipPartnership").addClass('hide'); }
        if ( $("#officerPartnerAddLink") ) { $("#officerPartnerAddLink").removeClass('hide'); }
        $(".officerpartnerTitle").html('Manager/Member');
        if ( $("#officerPartnerDiv") ) { $("#officerPartnerDiv").removeClass('hide'); }
        ownershipType = "LLC";
        if ( $("#Have_DBA__c") ) { $('#Have_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#CHave_DBA__c") ) { $('#CHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#LHave_DBA__c") ) { $('#LHave_DBA__c').addClass('appFormRequiredRadio'); }
        if ( $("#PHave_DBA__c") ) { $('#PHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#Doing_Business_As__c") ) { $('#Have_DBA__c').removeClass('appFormRequired'); }
        if ( $("#CDoing_Business_As__c") ) { $('#CDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#LDoing_Business_As__c") ) { $('#LDoing_Business_As__c').addClass('appFormRequired'); }
        if ( $("#PDoing_Business_As__c") ) { $('#PDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#AZ_Corp_File_Number__c") ) { $('#AZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#LAZ_Corp_File_Number__c") ) { $('#LAZ_Corp_File_Number__c').addClass('appFormRequired'); }
        if ( $("#PAZ_Corp_File_Number__c") ) { $('#PAZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#Employer_Id_Number__c") ) { $('#Employer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#LEmployer_Id_Number__c") ) { $('#LEmployer_Id_Number__c').addClass('appFormRequired'); }
        if ( $("#PEmployer_Id_Number__c") ) { $('#PEmployer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#Corporation_Name__c") ) { $('#Corporation_Name__c').removeClass('appFormRequired'); }
        if ( $("#LLC_Name__c") ) { $('#LLC_Name__c').addClass('appFormRequired'); }
        if ( $("#Partnership_Name__c") ) { $('#Partnership_Name__c').removeClass('appFormRequired'); }
        if ( $("#LLC_Type__c") ) { $('#LLC_Type__c').addClass('appFormRequired'); }
        if ( $("#Partnership_Type__c") ) { $('#Partnership_Type__c').removeClass('appFormRequired'); }
        if ( $("#PPartnership_Agreement__c") ) { $('#PPartnership_Agreement__c').removeClass('appFormRequired'); }
    } else if ( tt == "Partnership" ) {
        if ( $("#OwnershipSoleProp") ) { $("#OwnershipSoleProp").addClass('hide'); }
        if ( $("#OwnershipCorp") ) { $("#OwnershipCorp").addClass('hide'); }
        if ( $("#OwnershipLLC") ) { $("#OwnershipLLC").addClass('hide'); }
        if ( $("#OwnershipPartnership") ) { $("#OwnershipPartnership").removeClass('hide'); }
        if ( $("#officerPartnerAddLink") ) { $("#officerPartnerAddLink").removeClass('hide'); }
        $(".officerpartnerTitle").html('Partner');
        if ( $("#officerPartnerDiv") ) { $("#officerPartnerDiv").removeClass('hide'); }
        ownershipType = "Partnership";
        if ( $("#Have_DBA__c") ) { $('#Have_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#CHave_DBA__c") ) { $('#CHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#LHave_DBA__c") ) { $('#LHave_DBA__c').removeClass('appFormRequiredRadio'); }
        if ( $("#PHave_DBA__c") ) { $('#PHave_DBA__c').addClass('appFormRequiredRadio'); }
        if ( $("#Doing_Business_As__c") ) { $('#Have_DBA__c').removeClass('appFormRequired'); }
        if ( $("#CDoing_Business_As__c") ) { $('#CDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#LDoing_Business_As__c") ) { $('#LDoing_Business_As__c').removeClass('appFormRequired'); }
        if ( $("#PDoing_Business_As__c") ) { $('#PDoing_Business_As__c').addClass('appFormRequired'); }
        if ( $("#AZ_Corp_File_Number__c") ) { $('#AZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#LAZ_Corp_File_Number__c") ) { $('#LAZ_Corp_File_Number__c').removeClass('appFormRequired'); }
        if ( $("#PAZ_Corp_File_Number__c") ) { $('#PAZ_Corp_File_Number__c').addClass('appFormRequired'); }
        if ( $("#Employer_Id_Number__c") ) { $('#Employer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#LEmployer_Id_Number__c") ) { $('#LEmployer_Id_Number__c').removeClass('appFormRequired'); }
        if ( $("#PEmployer_Id_Number__c") ) { $('#PEmployer_Id_Number__c').addClass('appFormRequired'); }
        if ( $("#Corporation_Name__c") ) { $('#Corporation_Name__c').removeClass('appFormRequired'); }
        if ( $("#LLC_Name__c") ) { $('#LLC_Name__c').removeClass('appFormRequired'); }
        if ( $("#Partnership_Name__c") ) { $('#Partnership_Name__c').addClass('appFormRequired'); }
        if ( $("#LLC_Type__c") ) { $('#LLC_Type__c').removeClass('appFormRequired'); }
        if ( $("#Partnership_Type__c") ) { $('#Partnership_Type__c').addClass('appFormRequired'); }
        if ( $("#PPartnership_Agreement__c") ) { $('#PPartnership_Agreement__c').addClass('appFormRequired'); }
    } else {
        // else do nothing, yes
    }
}

function openBondSub ( tt ) {
    if ( tt == "Surety" ) {
        if ( $("#BondSubSurety") ) { $("#BondSubSurety").removeClass('hide'); }
        if ( $("#BondSubCD") ) { $("#BondSubCD").addClass('hide'); }
        if ( $("#BondSubCash") ) { $("#BondSubCash").addClass('hide'); }
        if ( $("#Bond_Amount__c") ) { $('#Bond_Amount__c').addClass('appFormRequired'); }
        if ( $("#Bond_Company__c") ) { $('#Bond_Company__c').addClass('appFormRequired'); }
        if ( $("#Bond_Document__c") ) { $('#Bond_Document__c').addClass('appFormRequired'); }
        if ( $("#CD_Bank_Statement__c") ) { $('#CD_Bank_Statement__c').removeClass('appFormRequired'); }
        if ( $("#CD_Assignment_Agreement__c") ) { $('#CD_Assignment_Agreement__c').removeClass('appFormRequired'); }
        if ( $("#CD_Amount__c") ) { $('#CD_Amount__c').removeClass('appFormRequired'); }
        if ( $("#CD_Financial_Institution__c") ) { $('#CD_Financial_Institution__c').removeClass('appFormRequired'); }
        if ( $("#CD_Account_Number__c") ) { $('#CD_Account_Number__c').removeClass('appFormRequired'); }
        if ( $("#Cash_Amount__c") ) { $('#Cash_Amount__c').removeClass('appFormRequired'); }
    } else if ( tt == "CD" ) {
        if ( $("#BondSubSurety") ) { $("#BondSubSurety").addClass('hide'); }
        if ( $("#BondSubCD") ) { $("#BondSubCD").removeClass('hide'); }
        if ( $("#BondSubCash") ) { $("#BondSubCash").addClass('hide'); }
        if ( $("#Bond_Amount__c") ) { $('#Bond_Amount__c').removeClass('appFormRequired'); }
        if ( $("#Bond_Company__c") ) { $('#Bond_Company__c').removeClass('appFormRequired'); }
        if ( $("#Bond_Document__c") ) { $('#Bond_Document__c').removeClass('appFormRequired'); }
        if ( $("#CD_Bank_Statement__c") ) { $('#CD_Bank_Statement__c').addClass('appFormRequired'); }
        if ( $("#CD_Assignment_Agreement__c") ) { $('#CD_Assignment_Agreement__c').addClass('appFormRequired'); }
        if ( $("#CD_Amount__c") ) { $('#CD_Amount__c').addClass('appFormRequired'); }
        if ( $("#CD_Financial_Institution__c") ) { $('#CD_Financial_Institution__c').addClass('appFormRequired'); }
        if ( $("#CD_Account_Number__c") ) { $('#CD_Account_Number__c').addClass('appFormRequired'); }
        if ( $("#Cash_Amount__c") ) { $('#Cash_Amount__c').removeClass('appFormRequired'); }
    } else if ( tt == "Cash" ) {
        if ( $("#BondSubSurety") ) { $("#BondSubSurety").addClass('hide'); }
        if ( $("#BondSubCD") ) { $("#BondSubCD").addClass('hide'); }
        if ( $("#BondSubCash") ) { $("#BondSubCash").removeClass('hide'); }
        if ( $("#Bond_Amount__c") ) { $('#Bond_Amount__c').removeClass('appFormRequired'); }
        if ( $("#Bond_Company__c") ) { $('#Bond_Company__c').removeClass('appFormRequired'); }
        if ( $("#Bond_Document__c") ) { $('#Bond_Document__c').removeClass('appFormRequired'); }
        if ( $("#CD_Bank_Statement__c") ) { $('#CD_Bank_Statement__c').removeClass('appFormRequired'); }
        if ( $("#CD_Assignment_Agreement__c") ) { $('#CD_Assignment_Agreement__c').removeClass('appFormRequired'); }
        if ( $("#CD_Amount__c") ) { $('#CD_Amount__c').removeClass('appFormRequired'); }
        if ( $("#CD_Financial_Institution__c") ) { $('#CD_Financial_Institution__c').removeClass('appFormRequired'); }
        if ( $("#CD_Account_Number__c") ) { $('#CD_Account_Number__c').removeClass('appFormRequired'); }
        if ( $("#Cash_Amount__c") ) { $('#Cash_Amount__c').removeClass('appFormRequired'); }
    } else {
        if ( $("#BondSubSurety") ) { $("#BondSubSurety").addClass('hide'); }
        if ( $("#BondSubCD") ) { $("#BondSubCD").addClass('hide'); }
        if ( $("#BondSubCash") ) { $("#BondSubCash").addClass('hide'); }
        if ( $("#Bond_Amount__c") ) { $('#Bond_Amount__c').removeClass('appFormRequired'); }
        if ( $("#Bond_Company__c") ) { $('#Bond_Company__c').removeClass('appFormRequired'); }
        if ( $("#Bond_Document__c") ) { $('#Bond_Document__c').removeClass('appFormRequired'); }
        if ( $("#CD_Bank_Statement__c") ) { $('#CD_Bank_Statement__c').removeClass('appFormRequired'); }
        if ( $("#CD_Assignment_Agreement__c") ) { $('#CD_Assignment_Agreement__c').removeClass('appFormRequired'); }
        if ( $("#CD_Amount__c") ) { $('#CD_Amount__c').removeClass('appFormRequired'); }
        if ( $("#CD_Financial_Institution__c") ) { $('#CD_Financial_Institution__c').removeClass('appFormRequired'); }
        if ( $("#CD_Account_Number__c") ) { $('#CD_Account_Number__c').removeClass('appFormRequired'); }
        if ( $("#Cash_Amount__c") ) { $('#Cash_Amount__c').removeClass('appFormRequired'); }
    } 
    openSub('subHaveBond');
}

function openBondSubNum ( tt, num ) {
    if ( tt == "Surety" ) {
        if ( $("#BondSubSurety"+num) ) { $("#BondSubSurety"+num).removeClass('hide'); }
        if ( $("#BondSubCD"+num) ) { $("#BondSubCD"+num).addClass('hide'); }
        if ( $("#BondSubCash"+num) ) { $("#BondSubCash"+num).addClass('hide'); }
    } else if ( tt == "CD" ) {
        if ( $("#BondSubSurety"+num) ) { $("#BondSubSurety"+num).addClass('hide'); }
        if ( $("#BondSubCD"+num) ) { $("#BondSubCD"+num).removeClass('hide'); }
        if ( $("#BondSubCash"+num) ) { $("#BondSubCash"+num).addClass('hide'); }
    } else if ( tt == "Cash" ) {
        if ( $("#BondSubSurety"+num) ) { $("#BondSubSurety"+num).addClass('hide'); }
        if ( $("#BondSubCD"+num) ) { $("#BondSubCD"+num).addClass('hide'); }
        if ( $("#BondSubCash"+num) ) { $("#BondSubCash"+num).removeClass('hide'); }
    } else {
        if ( $("#BondSubSurety"+num) ) { $("#BondSubSurety"+num).addClass('hide'); }
        if ( $("#BondSubCD"+num) ) { $("#BondSubCD"+num).addClass('hide'); }
        if ( $("#BondSubCash"+num) ) { $("#BondSubCash"+num).addClass('hide'); }
    } 
    //openSub('subHaveBond'+num);
}

function makeRequired ( idd ) {
    if ( idd != null && idd.trim() != '' ) {
        if ( document.getElementById(idd) != null || document.getElementsByName(idd) != null ) {
            if ( document.getElementById(idd) != null ) {
                var toReq = document.getElementById(idd);
                toReq.className = toReq.className + ' appFormRequired';
            } else {
                var toReq = document.getElementsByName(idd);
                for ( t=0; t<toReq.length; t++ ) {
                    toReq[t].className = toReq[t].className + " appFormRequired";
                }
            }
        }
    }
}

function removeRequired ( idd ) {
    if ( idd != null && idd.trim() != '' ) {
        if ( document.getElementById(idd) != null || document.getElementsByName(idd) != null ) {
            if ( document.getElementById(idd) != null ) {
                var toReq = document.getElementById(idd);
                toReq.className = toReq.className.split('appFormRequired').join('');
            } else {
                var toReq = document.getElementsByName(idd);
                for ( t=0; t<toReq.length; t++ ) {
                    var rem = toReq[t].className;
                    rem = rem.split("appFormRequired").join('');
                    toReq[t].className =  rem;
                }
            }
        }
    }
}

function generateProgressBar () {
    if ( $('#appProgressBarHolder').length && $('#appProgressBar').length ) {
        var reqcount = 0;
        // add new highlights to most fields
        var reqs = document.getElementsByClassName('appFormRequired');
        for ( i=0; i<reqs.length; i++ ) {
            if ( document.getElementsByClassName('appFormRequired')[i].value == '' ) {
                var fieldName = document.getElementsByClassName('appFormRequired')[i].name;
                if ( fieldName.indexOf('||num||') > -1 ) {
                    // do nothing
                } else {
                    reqcount = reqcount + 1;
                }
            }
        }
        // add new highlights to conditional fields - if there's a value in any one of the fields w/this class name then let it pass
        var valNotCount = 0;
        for ( nn=0; nn<10; nn++ ) {
            var reqs = document.getElementsByClassName('appFormRequiredCond' + nn);
            var valNot0 = 0;
            for ( i=0; i<reqs.length; i++ ) {
                if ( document.getElementsByClassName('appFormRequiredCond' + nn)[i].value == '' ) {
                    valNot0 = 1;
                }
            }
            if ( valNot0 == 0 ) {
                for ( i=0; i<reqs.length; i++ ) {
                    reqcount = reqcount + 1;
                    valNotCount = valNotCount + 1;
                }
            }
        }
        // add new highlights to radio buttons
        var raqs = document.getElementsByClassName('appFormRequiredRadio');
        for ( i=0; i<raqs.length; i++ ) {
            var nm = document.getElementsByClassName('appFormRequiredRadio')[i].name;
            if ( nm.indexOf('||num||') == -1  && ( $("input[name=" + nm + "]:checked").val() == undefined || !$("input[name=" + nm + "]:checked") ) ) {
                reqcount = reqcount + 1;
            }
        }
        var totalreqs = reqs.length + valNotCount + raqs.length;
        var reqperc = Math.floor((reqcount / totalreqs) * 100);
        var progressValue = 100-reqperc;
        if ( progressValue < 1 ) { progressValue = 0; }
        $('#appProgressBar').attr('aria-valuenow',progressValue);
        $('#appProgressBar').html(progressValue+'%');
        $('#appProgressBar').css('width',progressValue+'%');
    }
}

var progressBarHolderTop = 0;
if ( $('#appProgressBarHolder').length && $('#appProgressBar').length ) {
    if ( progressBarHolderTop == 0 ) { progressBarHolderTop = document.getElementById('appProgressBarHolder').offsetTop + 200; }
    window.onscroll = function() { stickProgressBar('appProgressBarHolder', progressBarHolderTop ); }
    setInterval('generateProgressBar()',10000);
}

function stickProgressBar ( vv, ff ) {
    if ( window.pageYOffset > ff ) {
        $('#'+vv).addClass('dontMoveV');
    } else {
        $('#'+vv).removeClass('dontMoveV');
    }
}

function checkForCaptcha () {
    if ( $('#formSubWin').length ) {
        var fsw = $('#formSubWin').contents();
        console.log("Trying to find iframe contents.");
        if ( $('#formSubWin').contents().find("Please complete the security check to access az.gov") ) {
            console.log("String found in iframe contents.");
            $('#formSubWin').css({'display': 'block', 'width': '100%', 'height': '300px'});
            smoothScrollTo('formSubWin');
            msgAlert('Please confirm that you are not a robot in the Captcha window shown.');
        } else {
            console.log("String NOT FOUND in iframe contents.");
        }
    }
}

var arrayFromInputs = [];
function buildArrayFromInputs () { 
    arrayFromInputs = [];
    $('input').each( function () { 
        var nm = $(this).attr('name');
        var vl = $(this).val();
        if ( $(this).is(':radio') || $(this).is(':checkbox') ) {
            if ( $(this).is(':checked') ) {
                arrayFromInputs[nm] = vl;
            }
        } else { 
            arrayFromInputs[nm] = vl;
        }
    });
    $('textarea').each( function () { 
        var nm = $(this).attr('name');
        var vl = $(this).val();
        arrayFromInputs[nm] = vl;
    });
    //console.log(arrayFromInputs);
}

function submitAppForm () {
    if ( $("#appForm") ) {
        buildArrayFromInputs();
        //saveForm('appForm','newApplication',getParameterByName('restartForm'));
        // run check specifically on dba name since this one keeps sticking on required
        if ( $('input[name="Have_DBA__c"]:checked').val() == "Yes" ) {
            if ( $('#Doing_Business_As__c').length ) { $('#Doing_Business_As__c').addClass('appFormRequired'); } 
        } else { 
            if ( $('#Doing_Business_As__c').length ) { $('#Doing_Business_As__c').removeClass('appFormRequired'); } 
        }
        if ( $('input[name="LHave_DBA__c"]:checked').val() == "Yes" ) {
            if ( $('#LDoing_Business_As__c').length ) { $('#LDoing_Business_As__c').addClass('appFormRequired'); } 
        } else {
            if ( $('#LDoing_Business_As__c').length ) { $('#LDoing_Business_As__c').removeClass('appFormRequired'); }
        }
        if ( $('input[name="CHave_DBA__c"]:checked').val() == "Yes" ) {
            if ( $('#CDoing_Business_As__c').length ) { $('#CDoing_Business_As__c').addClass('appFormRequired'); }
        } else {
            if ( $('#CDoing_Business_As__c').length ) {  $('#CDoing_Business_As__c').removeClass('appFormRequired'); }
        }
        if ( $('input[name="PHave_DBA__c"]:checked').val() == "Yes" ) {
            if ( $('#PDoing_Business_As__c').length ) { $('#PDoing_Business_As__c').addClass('appFormRequired'); } 
        } else { 
            if ( $('#PDoing_Business_As__c').length ) { $('#PDoing_Business_As__c').removeClass('appFormRequired'); }
        }
        // check for the required fields on the form
        var reqcount = 0; // number to count required fields with no value
        var reqqs = '';
        // remove any previous highlights
        var highs = document.getElementsByClassName('appFormRequiredHighlight');
        var prevcn = "";
        for ( h=0; h<highs.length; h++ ) {
            prevcn = document.getElementsByClassName('appFormRequiredHighlight')[h].className;
            prevcn = prevcn.replace('appFormRequiredHighlight','');
            document.getElementsByClassName('appFormRequiredHighlight')[h].className = prevcn;
        }
        var haghs = document.getElementsByClassName('appFormRequiredHighlightR');
        var pravcn = "";
        for ( h=0; h<haghs.length; h++ ) {
            pravcn = document.getElementsByClassName('appFormRequiredHighlightR')[h].className;
            pravcn = pravcn.replace('appFormRequiredHighlightR','');
            document.getElementsByClassName('appFormRequiredHighlightR')[h].className = pravcn;
        }
        // add new highlights to most fields
        var reqs = document.getElementsByClassName('appFormRequired');
        var reqnames = '';
        for ( i=0; i<reqs.length; i++ ) {
            if ( document.getElementsByClassName('appFormRequired')[i].value == '' ) {
                var fieldName = document.getElementsByClassName('appFormRequired')[i].name;
                if ( fieldName.indexOf('||num||') > -1 ) {
                    // do nothing
                } else {
                    document.getElementsByClassName('appFormRequired')[i].className = document.getElementsByClassName('appFormRequired')[i].className + " appFormRequiredHighlight"; 
                    reqcount = reqcount + 1;
                    reqnames += '<li>'+fieldName+'</li>';
                }
            }
        }
        if ( $('#AZ_Corp_File_Number_Verified').length ) {
            if ( $('#AZ_Corp_File_Number_Verified').val() != '1' && $('#Ownership').val() != "Sole Proprietorship" ) {
                reqcount = reqcount + 1;
                document.getElementById('AZ_Corp_File_Number__c').className = document.getElementById('AZ_Corp_File_Number__c').className + " appFormRequiredHighlight"; 
                document.getElementById('LAZ_Corp_File_Number__c').className = document.getElementById('LAZ_Corp_File_Number__c').className + " appFormRequiredHighlight"; 
                document.getElementById('PAZ_Corp_File_Number__c').className = document.getElementById('PAZ_Corp_File_Number__c').className + " appFormRequiredHighlight"; 
            }
        }
        // add new highlights to conditional fields - if there's a value in any one of the fields w/this class name then let it pass
        for ( nn=0; nn<10; nn++ ) {
            var reqs = document.getElementsByClassName('appFormRequiredCond' + nn);
            var valNot0 = 0;
            for ( i=0; i<reqs.length; i++ ) {
                if ( document.getElementsByClassName('appFormRequiredCond' + nn)[i].value == '' ) {
                    valNot0 = 1;
                }
            }
            if ( valNot0 == 0 ) {
                for ( i=0; i<reqs.length; i++ ) {
                    document.getElementsByClassName('appFormRequiredCond' + nn)[i].className = document.getElementsByClassName('appFormRequiredCond' + nn)[i].className + " appFormRequiredHighlight"; 
                    reqcount = reqcount + 1;
                    reqnames += '<li>'+fieldName+'</li>';
                }
            }
        }
        // add new highlights to radio buttons
        var raqs = document.getElementsByClassName('appFormRequiredRadio');
        for ( i=0; i<raqs.length; i++ ) {
            var nm = document.getElementsByClassName('appFormRequiredRadio')[i].name;
            if ( nm.indexOf('||num||') == -1  && ( $("input[name=" + nm + "]:checked").val() == undefined || !$("input[name=" + nm + "]:checked") ) ) {
                document.getElementsByClassName('appFormRequiredRadio')[i].className = document.getElementsByClassName('appFormRequiredRadio')[i].className + " appFormRequiredHighlightR"; 
                reqcount = reqcount + 1;
                reqnames += '<li>'+fieldName+'</li>';
                reqqs = reqqs + "Missing: " + document.getElementsByClassName('appFormRequiredRadio')[i].name + "<br>";
            }
        }
        if ( reqcount == 0 ) { // if ready for submission
            if ( $('#saveButton') ) { $('#saveButton').addClass('hide'); }
            // submit form
            console.log('Form submitted!');
            if ( document.getElementById('appForm') != null ) {
                if ( $('#showLoading') ) { 
                    $('#appForm').css('max-height','0px'); 
                    $('#appForm').css('overflow','hidden'); 
                    //$('#showLoading').css('display', 'block'); 
                    $('#showLoading').removeClass('hide');
                    openSub('showLoading'); 
                    smoothScrollTo('showLoading');
                }
                document.getElementById('appForm').style.maxHeight = "0px";
                document.getElementById('appForm').style.overflow = "hidden";
                //document.appForm.action = '/sites/all/modules/contrib/roc_salesforce/roc_salesforce.php?f=postApplication';
                document.appForm.action = '/sfapi?ff=postApplication';
                document.appForm.target = '_self'; // 'formSubWin' '_blank';
                document.forms['appForm'].action = '/sfapi?ff=postApplication';
                document.forms['appForm'].target = '_self'; // 'formSubWin' '_blank';
                document.appForm.submit();
                //document.forms['appForm'].submit();
                setTimeout('document.appForm.submit()',1000);
                setTimeout('checkForCaptcha()',2000);
                /*
                if ( formname == '' || formuri == '' || rsToken == '' || formname == null || formuri == null || rsToken == null ) {
                    formuri = getParameterByName('ff');
                    if ( formuri == "newApplication" ) { formname = "appForm"; } else { formname = "complaintForm"; }
                    rsToken = getParameterByName('restartForm');
                }
                // this is where we'll run the post to the API page stored in the drupal plugin
                if ( document.getElementById( formname ) != null ) {
                    document.forms[ formname ].action = '/sfapi?sf=saveForm&formname=' + formname + '&ff=' + formuri + '&restartForm=' + rsToken + '&lastStep=' + lastStep;
                    document.forms[ formname ].target = 'formSubWin'; //'_blank';
                    document.forms[ formname ].submit();
                    document.forms[ formname ].submit();
                }
                */
            } else {
                msgAlert("Sorry but we couldn't find the application form. If this issue continues, please contact our tech support department at <a href=\"mailto:webmaster@roc.az.gov\">webmaster@roc.az.gov</a>.");
            }
        } else {
            // open any hidden sections
            $('#step1inner').removeClass('hide');
            $('#step2inner').removeClass('hide');
            $('#step3inner').removeClass('hide');
            $('#step4inner').removeClass('hide');
            $('#step5inner').removeClass('hide');
            $('#step6inner').removeClass('hide');
            $('#step7inner').removeClass('hide');
            $('#step8inner').removeClass('hide');
            $('#step9inner').removeClass('hide');
            var reqlist = '';
            if ( reqnames != '' ) { reqlist = '<ul>'+reqnames+'</ul>'; }
            msgAlert("There are required fields missing information on this application. Please look for any items with a red outline and make sure they have the appropriate information filled in. If you feel like you've received this message in error, please contact our webmaster at <a href='mailto:webmaster@roc.az.gov'>webmaster@roc.az.gov</a>.<br><br>" + reqlist + reqqs);
        }
    }
}

var appNumber = "APP-0000000000";
var aaId = '';
function appSubmitSteps () {
    console.log('Step 1 submitted.');
    if ( $('#appFormStepHolder').length && $('#aaId').val() != '' ) {
        setInterval('spinSubmitStepWaiting()',2000);
        if ( document.getElementById('aaNumber').value != '' ) { aaNumber = document.getElementById('aaNumber').value; } else { aaNumber = ''; }
        if ( document.getElementById('aaId').value != '' ) { aaId = document.getElementById('aaId').value; } else { aaId = ''; }
        if ( $('#appFormStep1').length ) {
            if ( aaId != '' ) {
                $('#appFormStep1Icon').removeClass('fa-hourglass-start');
                $('#appFormStep1Icon').removeClass('fa-hourglass-half');
                $('#appFormStep1Icon').removeClass('fa-hourglass-end');
                $('#appFormStep1Icon').removeClass('appFormStepIconWaiting');
                $('#appFormStep1Icon').addClass('fa-check-circle');
                $('#appFormStep1Icon').addClass('appFormStepIconDone');
                $('#appFormStep1').removeClass('appFormStepWaiting');
                $('#appFormStep1').addClass('appFormStepDone');
                $('#appFormStep1Title').html('Submitted the Applicant and Business Information');
                $('#appFormStep1Msg').html('Application ID: ' + aaNumber);
                appSubmitSteps2(aaId, aaNumber);
            } else { 
                msgAlert("The Application ID could not be returned through the script. Please contact us at <a href='mailto:webmaster@roc.az.gov'>webmaster@roc.az.gov</a> for assistance.");
            }
        } else { 
            msgAlert("The first step of the form wasn't found. Please contact us at <a href='mailto:webmaster@roc.az.gov'>webmaster@roc.az.gov</a> for assistance.");
        }
    }
    console.log('Step 1 run.');
}
function appSubmitSteps2 ( aaId, aaNumber ) {
    console.log('Step 2 submitted.');
    if ( $('#appFormStep2').length ) {
        // now run step 2
        $('#appFormStep2Icon').removeClass('fa-ban');
        $('#appFormStep2Icon').addClass('fa-hourglass-start');
        $('#appFormStep2Icon').removeClass('appFormStepIconNotYet');
        $('#appFormStep2Icon').addClass('appFormStepIconWaiting');
        $('#appFormStep2').removeClass('appFormStepNotYet');
        $('#appFormStep2').addClass('appFormStepWaiting');
        $('#appFormStep2Title').html('Submitting Disclosures for Prior Licenses, Felonies and/or Unlicensed Activities');
        var stepComplete = 0;
        $.ajax({ 
            type: "GET", 
            url: '/sfapi?ff=newAppSubmissions&aaId=' + aaId, 
            success: function ( data ) { 
                console.log('Step 2 submit success.');
                console.log(data);
                if ( data['error'] != null || data['subId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( jret['subId'] != '' && jret['subId'] != null ) { 
                    stepComplete = 1;
                    $('#appFormStep2Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep2Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep2Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep2Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep2Icon').addClass('fa-check-circle');
                    $('#appFormStep2Icon').addClass('appFormStepIconDone');
                    $('#appFormStep2').removeClass('appFormStepWaiting');
                    $('#appFormStep2').addClass('appFormStepDone');
                    $('#appFormStep2Title').html('Submitted the Disclosures for Prior Licenses, Felonies and/or Unlicensed Activities');
                    $('#appFormStep2Msg').html('All disclosure documents have been attached to the application.');
                    appSubmitSteps3(aaId, aaNumber);
                } else {
                    $('#appFormStep2Msg').html(jret['error']);
                }
            }, 
            error: function ( data ) { 
                console.log('Step 2 submit error.');
                console.log(data);
                if ( data['error'] != null || data['subId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( jret['subId'] != '' && jret['subId'] != null ) { 
                    stepComplete = 1;
                    $('#appFormStep2Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep2Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep2Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep2Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep2Icon').addClass('fa-check-circle');
                    $('#appFormStep2Icon').addClass('appFormStepIconDone');
                    $('#appFormStep2').removeClass('appFormStepWaiting');
                    $('#appFormStep2').addClass('appFormStepDone');
                    $('#appFormStep2Title').html('Submitted the Disclosures for Prior Licenses, Felonies and/or Unlicensed Activities');
                    $('#appFormStep2Msg').html('All disclosure documents have been attached to the application.');
                    appSubmitSteps3(aaId, aaNumber);
                } else {
                    $('#appFormStep2Msg').html(jret['error']);
                }
            }
        });
    } else { 
        msgAlert("The second step of the form wasn't found. Please contact us at <a href='mailto:webmaster@roc.az.gov'>webmaster@roc.az.gov</a> for assistance.");
    }
    console.log('Step 3 run.');
}
function appSubmitSteps3 ( aaId, aaNumber ) {
    console.log('Step 3 submitted.');
    if ( $('#appFormStep3').length ) {
        // now run step 3
        $('#appFormStep3Icon').removeClass('fa-ban');
        $('#appFormStep3Icon').addClass('fa-hourglass-start');
        $('#appFormStep3Icon').removeClass('appFormStepIconNotYet');
        $('#appFormStep3Icon').addClass('appFormStepIconWaiting');
        $('#appFormStep3').removeClass('appFormStepNotYet');
        $('#appFormStep3').addClass('appFormStepWaiting');
        $('#appFormStep3Title').html('Submitting Qualifying Party Information');
        var stepComplete = 0;
        $.ajax({ 
            type: "GET", 
            url: '/sfapi?ff=newAppQP&aaId=' + aaId, 
            success: function ( data ) {
                console.log('Step 3 success.');
                console.log(data);
                if ( data['error'] != null || data['qcontId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( ( jret['error'] == '' || jret['error'] == undefined ) && jret['subId'] != '' ) { 
                    stepComplete = 1;
                    $('#appFormStep3Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep3Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep3Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep3Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep3Icon').addClass('fa-check-circle');
                    $('#appFormStep3Icon').addClass('appFormStepIconDone');
                    $('#appFormStep3').removeClass('appFormStepWaiting');
                    $('#appFormStep3').addClass('appFormStepDone');
                    $('#appFormStep3Title').html('Submitted Qualifying Party Information');
                    $('#appFormStep3Msg').html('The qualifying party has been added to the application.');
                    appSubmitSteps4( aaId, aaNumber );
                } else {
                    $('#appFormStep3Msg').html(jret['error']);
                }
            }, 
            error: function ( data ) {
                console.log('Step 3 error.');
                console.log(data);
                if ( data['error'] != null || data['qcontId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( ( jret['error'] == '' || jret['error'] == undefined ) && jret['subId'] != '' ) { 
                    stepComplete = 1;
                    $('#appFormStep3Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep3Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep3Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep3Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep3Icon').addClass('fa-check-circle');
                    $('#appFormStep3Icon').addClass('appFormStepIconDone');
                    $('#appFormStep3').removeClass('appFormStepWaiting');
                    $('#appFormStep3').addClass('appFormStepDone');
                    $('#appFormStep3Title').html('Submitted Qualifying Party Information');
                    $('#appFormStep3Msg').html('The qualifying party has been added to the application.');
                    appSubmitSteps4( aaId, aaNumber );
                } else {
                    $('#appFormStep3Msg').html(jret['error']);
                }
            }
        });
    }
    console.log('Step 3 run.');
}
function appSubmitSteps4 ( aaId, aaNumber ) {
    console.log('Step 4 submitted.');
    if ( $('#appFormStep4').length ) {
        // now run step 4
        $('#appFormStep4Icon').removeClass('fa-ban');
        $('#appFormStep4Icon').addClass('fa-hourglass-start');
        $('#appFormStep4Icon').removeClass('appFormStepIconNotYet');
        $('#appFormStep4Icon').addClass('appFormStepIconWaiting');
        $('#appFormStep4').removeClass('appFormStepNotYet');
        $('#appFormStep4').addClass('appFormStepWaiting');
        var prevCont = $('#appFormStep4Title').html();
        prevCont = prevCont.split('Submitting ').join('Submitted ');
        $('#appFormStep4Title').html(prevCont);
        var stepComplete = 0;
        $.ajax({ 
            type: "GET",
            url: '/sfapi?ff=newAppOfficers&aaId=' + aaId, 
            success: function ( data ) { 
                console.log('Step 4 success.');
                console.log(data);
                if ( data['error'] != null || data['contId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( ( jret['error'] == '' || jret['error'] == undefined ) && jret['subId'] != '' ) { 
                    stepComplete = 1;
                    $('#appFormStep4Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep4Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep4Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep4Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep4Icon').addClass('fa-check-circle');
                    $('#appFormStep4Icon').addClass('appFormStepIconDone');
                    $('#appFormStep4').removeClass('appFormStepWaiting');
                    $('#appFormStep4').addClass('appFormStepDone');
                    prevCont = prevCont.split('Submitting ').join('Submitted ');
                    $('#appFormStep4Title').html(prevCont);
                    $('#appFormStep4Msg').html('All additional officers/directors, members or partners have been added to the application.');
                    appSubmitSteps5(aaId, aaNumber);
                } else {
                    $('#appFormStep4Msg').html(jret['error']);
                }
            }, 
            error: function ( data ) { 
                console.log('Step 4 error.');
                console.log(data);
                if ( data['error'] != null || data['contId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( ( jret['error'] == '' || jret['error'] == undefined ) && jret['subId'] != '' ) { 
                    stepComplete = 1;
                    $('#appFormStep4Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep4Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep4Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep4Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep4Icon').addClass('fa-check-circle');
                    $('#appFormStep4Icon').addClass('appFormStepIconDone');
                    $('#appFormStep4').removeClass('appFormStepWaiting');
                    $('#appFormStep4').addClass('appFormStepDone');
                    prevCont = prevCont.split('Submitting ').join('Submitted ');
                    $('#appFormStep4Title').html(prevCont);
                    $('#appFormStep4Msg').html('All additional officers/directors, members or partners have been added to the application.');
                    appSubmitSteps5(aaId, aaNumber);
                } else {
                    $('#appFormStep4Msg').html(jret['error']);
                }
            }
        });
    }
    console.log('Step 4 run.');
}
function appSubmitSteps5 ( aaId, aaNumber ) {
    console.log('Step 5 submitted.');
    if ( $('#appFormStep5').length ) {
        // now run step 5
        $('#appFormStep5Icon').removeClass('fa-ban');
        $('#appFormStep5Icon').addClass('fa-hourglass-start');
        $('#appFormStep5Icon').removeClass('appFormStepIconNotYet');
        $('#appFormStep5Icon').addClass('appFormStepIconWaiting');
        $('#appFormStep5').removeClass('appFormStepNotYet');
        $('#appFormStep5').addClass('appFormStepWaiting');
        $('#appFormStep5Title').html('Submitting Bond Information');
        var stepComplete = 0;
        $.ajax({ 
            type: "GET", 
            url: '/sfapi?ff=newAppBonds&aaId=' + aaId, 
            success: function ( data ) { 
                console.log('Step 5 success.');
                console.log(data);
                if ( data['error'] != null || data['aaId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( ( jret['error'] == '' || jret['error'] == undefined ) && jret['subId'] != '' ) { 
                    stepComplete = 1;
                    $('#appFormStep5Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep5Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep5Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep5Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep5Icon').addClass('fa-check-circle');
                    $('#appFormStep5Icon').addClass('appFormStepIconDone');
                    $('#appFormStep5').removeClass('appFormStepWaiting');
                    $('#appFormStep5').addClass('appFormStepDone');
                    $('#appFormStep5Title').html('Submitted Bond Information');
                    $('#appFormStep5Msg').html('All bonds have been added to the application.');
                    appSubmitSteps6(aaId, aaNumber);
                } else {
                    $('#appFormStep5Msg').html(jret['error']);
                }
            },
            error: function ( data ) { 
                console.log('Step 5 error.');
                console.log(data);
                if ( data['error'] != null || data['aaId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( ( jret['error'] == '' || jret['error'] == undefined ) && jret['subId'] != '' ) { 
                    stepComplete = 1;
                    $('#appFormStep5Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep5Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep5Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep5Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep5Icon').addClass('fa-check-circle');
                    $('#appFormStep5Icon').addClass('appFormStepIconDone');
                    $('#appFormStep5').removeClass('appFormStepWaiting');
                    $('#appFormStep5').addClass('appFormStepDone');
                    $('#appFormStep5Title').html('Submitted Bond Information');
                    $('#appFormStep5Msg').html('All bonds have been added to the application.');
                    appSubmitSteps6(aaId, aaNumber);
                } else {
                    $('#appFormStep5Msg').html(jret['error']);
                }
            }
        });
    }
    console.log('Step 5 run.');
}
function appSubmitSteps6 ( aaId, aaNumber ) {
    console.log('Step 6 submitted.');
    if ( $('#appFormStep6').length ) {
        // now run step 5
        $('#appFormStep6Icon').removeClass('fa-ban');
        $('#appFormStep6Icon').addClass('fa-hourglass-start');
        $('#appFormStep6Icon').removeClass('appFormStepIconNotYet');
        $('#appFormStep6Icon').addClass('appFormStepIconWaiting');
        $('#appFormStep6').removeClass('appFormStepNotYet');
        $('#appFormStep6').addClass('appFormStepWaiting');
        $('#appFormStep6Title').html('Uploading Documents');
        var stepComplete = 0;
        $.ajax({ 
            type: "GET", 
            url: '/sfapi?ff=newAppUploadDocs&aaId=' + aaId, 
            success: function ( data ) { 
                console.log('Step 6 success.');
                console.log(data);
                if ( data['error'] != null || data['aaId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( ( jret['error'] == '' || jret['error'] == undefined ) && jret['subId'] != '' ) { 
                    stepComplete = 1;
                    $('#appFormStep6Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep6Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep6Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep6Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep6Icon').addClass('fa-check-circle');
                    $('#appFormStep6Icon').addClass('appFormStepIconDone');
                    $('#appFormStep6').removeClass('appFormStepWaiting');
                    $('#appFormStep6').addClass('appFormStepDone');
                    $('#appFormStep6Title').html('Uploaded Documents');
                    $('#appFormStep6Msg').html('All documents have been uploaded to the application.');
                    $('#appFormPaymentHolder').removeClass('hide');
                    $('#appFormSignatureHolder').removeClass('hide');
                } else {
                    $('#appFormStep6Msg').html(jret['error']);
                }
            }, 
            error: function ( data ) { 
                console.log('Step 6 error.');
                console.log(data);
                if ( data['error'] != null || data['aaId'] != null ) {
                    var jret = data;
                } else { 
                    var jret = $.parseJSON(data);
                }  
                if ( ( jret['error'] == '' || jret['error'] == undefined ) && jret['subId'] != '' ) { 
                    stepComplete = 1;
                    $('#appFormStep6Icon').removeClass('fa-hourglass-start');
                    $('#appFormStep6Icon').removeClass('fa-hourglass-half');
                    $('#appFormStep6Icon').removeClass('fa-hourglass-end');
                    $('#appFormStep6Icon').removeClass('appFormStepIconWaiting');
                    $('#appFormStep6Icon').addClass('fa-check-circle');
                    $('#appFormStep6Icon').addClass('appFormStepIconDone');
                    $('#appFormStep6').removeClass('appFormStepWaiting');
                    $('#appFormStep6').addClass('appFormStepDone');
                    $('#appFormStep6Title').html('Uploaded Documents');
                    $('#appFormStep6Msg').html('All documents have been uploaded to the application.');
                    $('#appFormPaymentHolder').removeClass('hide');
                    $('#appFormSignatureHolder').removeClass('hide');
                } else {
                    $('#appFormStep6Msg').html(jret['error']);
                }
            }
        });
    }
    console.log('Step 6 run.');
}
var hourglassCount = 0;
function spinSubmitStepWaiting () {
    if ( $('.appFormStepIconWaiting').length ) {
        if ( hourglassCount == 0 ) { 
            $('.appFormStepIconWaiting').removeClass('fa-hourglass-start');
            $('.appFormStepIconWaiting').addClass('fa-hourglass-half'); 
            hourglassCount = 1;
        } else if ( hourglassCount == 1 ) { 
            $('.appFormStepIconWaiting').removeClass('fa-hourglass-half');
            $('.appFormStepIconWaiting').addClass('fa-hourglass-end');  
            hourglassCount = 2;
        } else { 
            $('.appFormStepIconWaiting').removeClass('fa-hourglass-end');
            $('.appFormStepIconWaiting').addClass('fa-hourglass-start'); 
            hourglassCount = 0; 
        }
    }
}
if ( $('#appFormStepHolder').length ) { appSubmitSteps(); }

function submitRenewalApp () {
    if ( $("#renewalForm") ) {
        //saveForm('appForm','newApplication',getParameterByName('restartForm'));
        // check for the required fields on the form
        var reqcount = 0; // number to count required fields with no value
        // remove any previous highlights
        var highs = document.getElementsByClassName('appFormRequiredHighlight');
        var prevcn = "";
        for ( h=0; h<highs.length; h++ ) {
            prevcn = document.getElementsByClassName('appFormRequiredHighlight')[h].className;
            prevcn = prevcn.replace('appFormRequiredHighlight','');
            document.getElementsByClassName('appFormRequiredHighlight')[h].className = prevcn;
        }
        var haghs = document.getElementsByClassName('appFormRequiredHighlightR');
        var pravcn = "";
        for ( h=0; h<haghs.length; h++ ) {
            pravcn = document.getElementsByClassName('appFormRequiredHighlightR')[h].className;
            pravcn = pravcn.replace('appFormRequiredHighlightR','');
            document.getElementsByClassName('appFormRequiredHighlightR')[h].className = pravcn;
        }
        // add new highlights to most fields
        var reqs = document.getElementsByClassName('appFormRequired');
        for ( i=0; i<reqs.length; i++ ) {
            if ( document.getElementsByClassName('appFormRequired')[i].value == '' ) {
                var fieldName = document.getElementsByClassName('appFormRequired')[i].name;
                if ( fieldName.indexOf('||num||') > -1 ) {
                    // do nothing
                } else {
                    document.getElementsByClassName('appFormRequired')[i].className = document.getElementsByClassName('appFormRequired')[i].className + " appFormRequiredHighlight"; 
                    reqcount = reqcount + 1;
                }
            }
        }
        // add new highlights to conditional fields - if there's a value in any one of the fields w/this class name then let it pass
        for ( nn=0; nn<10; nn++ ) {
            var reqs = document.getElementsByClassName('appFormRequiredCond' + nn);
            var valNot0 = 0;
            for ( i=0; i<reqs.length; i++ ) {
                if ( document.getElementsByClassName('appFormRequiredCond' + nn)[i].value == '' ) {
                    valNot0 = 1;
                }
            }
            if ( valNot0 == 0 ) {
                for ( i=0; i<reqs.length; i++ ) {
                    document.getElementsByClassName('appFormRequiredCond' + nn)[i].className = document.getElementsByClassName('appFormRequiredCond' + nn)[i].className + " appFormRequiredHighlight"; 
                    reqcount = reqcount + 1;
                }
            }
        }
        // add new highlights to radio buttons
        var raqs = document.getElementsByClassName('appFormRequiredRadio');
        for ( i=0; i<raqs.length; i++ ) {
            var nm = document.getElementsByClassName('appFormRequiredRadio')[i].name;
            if ( nm.indexOf('||num||') == -1  && ( $("input[name=" + nm + "]:checked").val() == undefined || !$("input[name=" + nm + "]:checked") ) ) {
                document.getElementsByClassName('appFormRequiredRadio')[i].className = document.getElementsByClassName('appFormRequiredRadio')[i].className + " appFormRequiredHighlightR"; 
                reqcount = reqcount + 1;
            }
        }
        var wrongAnswer = '';
        if ( $('input[name=Workers_Compensation_Compliant__c]') ) {
            if ( $('input[name=Workers_Compensation_Compliant__c]:checked').val() != 'Insurance Carrier' && $('input[name=Workers_Compensation_Compliant__c]:checked').val() != 'Self-Insured' && $('input[name=Workers_Compensation_Compliant__c]:checked').val() != 'Exemption' ) {
                if ( wrongAnswer != '' ) { wrongAnswer = wrongAnswer + "<br><br>"; }
                wrongAnswer = wrongAnswer + "For your license renewal application to be processed, you will need to be compliant with Worker's Compensation laws. Please click on the small \"i\" next to the selected Worker's Compensation method you would like to use to get more information on how to be compliant.";
            }
        }
        if ( $('input[name=Bond_Current__c]') ) {
            if ( $('input[name=Bond_Current__c]:checked').val() != 'Yes' ) {
                if ( wrongAnswer != '' ) { wrongAnswer = wrongAnswer + "<br><br>"; }
                wrongAnswer = wrongAnswer + "For your license renewal application to be processed, you will need to have a current bond of sufficient amount for your license classification and sales volume. Please secure your bond before proceeding. For more information on getting a bond, you can view our <a href=\"https://roc.az.gov/bond-information\" target=\"_blank\">Bond Information page on roc.az.gov</a>.";
            }
        }
        if ( $('input[name=Felony_New__c]') ) {
            if ( $('input[name=Felony_New__c]:checked').val() != 'No' ) {
                if ( wrongAnswer != '' ) { wrongAnswer = wrongAnswer + "<br><br>"; }
                wrongAnswer = wrongAnswer + "For your license renewal application to be processed, you will need to use the <a href=\"/sfapi?ff=serviceRequest\" target=\"_blank\">Service Request Option</a> to disclose the new felony conviction or charge.";
            }
        }
        if ( $('input[name=AZCC_Current__c]') ) {
            if ( $('input[name=AZCC_Current__c]:checked').val() != 'Yes' ) {
                if ( wrongAnswer != '' ) { wrongAnswer = wrongAnswer + "<br><br>"; }
                wrongAnswer = wrongAnswer + "For your license renewal application to be processed, your business registration with the Arizona Corporation Commission will need to be up-to-date and current. Please visit the <a href=\"http://www.azcc.gov\" target=\"_blank\">Corporation Commission's website at azcc.gov</a> to update your business entity registration.";
            }
        }
        if ( reqcount == 0 ) { // if ready for submission
            if ( wrongAnswer != '' ) {
                msgAlert(wrongAnswer);
            } else {
                if ( $('#saveBtn') ) { $('#saveBtn').addClass('hide'); }
                // submit form
                console.log('Form submitted!');
                if ( document.getElementById('renewalForm') != null ) {
                    if ( $('#showLoading') ) { 
                        $('#renewalForm').css('max-height','0px'); 
                        $('#renewalForm').css('overflow','hidden'); 
                        //$('#showLoading').css('display', 'block'); 
                        $('#showLoading').removeClass('hide');
                        openSub('showLoading'); 
                        smoothScrollTo('showLoading');
                    }
                    document.getElementById('renewalForm').style.maxHeight = "0px";
                    document.getElementById('renewalForm').style.overflow = "hidden";
                    //document.appForm.action = '/sites/all/modules/contrib/roc_salesforce/roc_salesforce.php?f=postApplication';
                    document.renewalForm.action = '/sfapi?ff=postRenewal';
                    //document.appForm.target = 'formSubWin'; //'_blank';
                    document.renewalForm.submit();
                    setTimeout('document.renewalForm.submit()',1000);
                    setTimeout('checkForCaptcha()',2000);
                } else {
                    msgAlert("Sorry but we couldn't find the renewal application form. If this issue continues, please contact our tech support department at <a href=\"mailto:webmaster@roc.az.gov\">webmaster@roc.az.gov</a>.");
                }
            }
        } else {
            msgAlert("There are required fields missing information on this renewal application. Please look for any items with a red outline and make sure they have the appropriate information filled in. If you feel like you've received this message in error, please contact our webmaster at <a href='mailto:webmaster@roc.az.gov'>webmaster@roc.az.gov</a>.");
        }
    }
}

function submitServiceRequest () {
    if ( $("#serviceRequestForm") ) {
        // check for the required fields on the form
        var reqcount = 0; // number to count required fields with no value
        if ( reqcount == 0 ) { // if ready for submission
            if ( $('#saveBtn') ) { $('#saveBtn').addClass('hide'); }
            // submit form
            console.log('Form submitted!');
            if ( document.getElementById('serviceRequestForm') != null ) {
                if ( $('#showLoading') ) { 
                    $('#serviceRequestForm').css('max-height','0px'); 
                    $('#serviceRequestForm').css('overflow','hidden'); 
                    //$('#showLoading').css('display', 'block'); 
                    $('#showLoading').removeClass('hide');
                    openSub('showLoading'); 
                    smoothScrollTo('showLoading');
                }
                document.getElementById('serviceRequestForm').style.maxHeight = "0px";
                document.getElementById('serviceRequestForm').style.overflow = "hidden";
                //document.appForm.action = '/sites/all/modules/contrib/roc_salesforce/roc_salesforce.php?f=postApplication';
                document.serviceRequestForm.action = '/sfapi?ff=postServiceRequest';
                //document.appForm.target = 'formSubWin'; //'_blank';
                document.serviceRequestForm.submit();
                setTimeout('document.serviceRequestForm.submit()',1000);
            } else {
                msgAlert("Sorry but we couldn't find the service request form. If this issue continues, please contact our tech support department at <a href=\"mailto:webmaster@roc.az.gov\">webmaster@roc.az.gov</a>.");
            }
        } else {
            msgAlert("There are required fields missing information on this service request. Please look for any items with a red outline and make sure they have the appropriate information filled in. If you feel like you've received this message in error, please contact our webmaster at <a href='mailto:webmaster@roc.az.gov'>webmaster@roc.az.gov</a>.");
        }
    }
}

var licenseTypeForBond = '';
function setBondTable () {
    if ( $("#Classifications_Chosen__c").val() != '' && $('#BondSize') ) {
        var chosen = $("#Classifications_Chosen__c").val();
        var chosenR = chosen.split(',');
        var chose = chosenR[0];
        $('#BondSize option').each(function () { $(this).remove(); });
        $('#BondSize').append('<option value="">Select one...</option>');
        if ( chose.indexOf('K-') > -1 ) {
            licenseTypeForBond = 'General Dual';
            $('#BondSize').append('<option value="Less than $750,000">Less than $750,000</option>');
            $('#BondSize').append('<option value="$750,000 or more">$750,000 or more</option>');
        } else if ( chose.indexOf('A') > -1 || chose.indexOf('B-1') > -1 || chose.indexOf('B-2') > -1 ) {
            licenseTypeForBond = 'General Commercial';
            $('#BondSize').append('<option value="$150,000 or less">$150,000 or less</option>');
            $('#BondSize').append('<option value="In excess of $150,000 but not more than $500,000">In excess of $150,000 but not more than $500,000</option>');
            $('#BondSize').append('<option value="In excess of $500,000 but not more than $1,000,000">In excess of $500,000 but not more than $1,000,000</option>');
            $('#BondSize').append('<option value="In excess of $1,000,000 but not more than $5,000,000">In excess of $1,000,000 but not more than $5,000,000</option>');
            $('#BondSize').append('<option value="In excess of $5,000,000 but not more than $10,000,000">In excess of $5,000,000 but not more than $10,000,000</option>');
            $('#BondSize').append('<option value="Over $10,000,000"></option>');
        } else if ( chose.indexOf('B') > -1 && chose.indexOf('B-1') == -1 && chose.indexOf('B-2') == -1 ) {
            licenseTypeForBond = 'General Residential';
            $('#BondSize').append('<option value="Less than $750,000">Less than $750,000</option>');
            $('#BondSize').append('<option value="$750,000 or more">$750,000 or more</option>');
        } else if ( chose.indexOf('CR') > -1 ) {
            licenseTypeForBond = 'Specialty Dual';
            $('#BondSize').append('<option value="$150,000 or less">$150,000 or less</option>');
            $('#BondSize').append('<option value="In excess of $150,000 but not more than $500,000">In excess of $150,000 but not more than $500,000</option>');
            $('#BondSize').append('<option value="In excess of $500,000 but not more than $1,000,000">In excess of $500,000 but not more than $1,000,000</option>');
            $('#BondSize').append('<option value="In excess of $1,000,000 but not more than $5,000,000">In excess of $1,000,000 but not more than $5,000,000</option>');
            $('#BondSize').append('<option value="In excess of $5,000,000 but not more than $10,000,000">In excess of $5,000,000 but not more than $10,000,000</option>');
            $('#BondSize').append('<option value="Over $10,000,000"></option>');
        } else if ( chose.indexOf('C-') > -1 ) {
            licenseTypeForBond = 'Specialty Commercial';
            $('#BondSize').append('<option value="$150,000 or less">$150,000 or less</option>');
            $('#BondSize').append('<option value="In excess of $150,000 but not more than $500,000">In excess of $150,000 but not more than $500,000</option>');
            $('#BondSize').append('<option value="In excess of $500,000 but not more than $1,000,000">In excess of $500,000 but not more than $1,000,000</option>');
            $('#BondSize').append('<option value="In excess of $1,000,000 but not more than $5,000,000">In excess of $1,000,000 but not more than $5,000,000</option>');
            $('#BondSize').append('<option value="In excess of $5,000,000 but not more than $10,000,000">In excess of $5,000,000 but not more than $10,000,000</option>');
            $('#BondSize').append('<option value="Over $10,000,000"></option>');
        } else if ( chose.indexOf('R-') > -1 && chose.indexOf('R-37 P') == -1 ) {
            licenseTypeForBond = 'Specialty Residential';
            $('#BondSize').append('<option value="Less than $375,000">Less than $375,000</option>');
            $('#BondSize').append('<option value="$350,000 or more">$350,000 or more</option>');
        } else {
            licenseTypeForBond = 'General Residential';
            $('#BondSize').append('<option value="Less than $750,000">Less than $750,000</option>');
            $('#BondSize').append('<option value="$750,000 or more">$750,000 or more</option>');
        }
    }
}

function calculateBondSize ( rev ) {
    if ( $('#calculatedBondSize') ) {
        var toReturn = '';
        var min = 2500;
        if ( licenseTypeForBond == 'General Dual' ) {
            if ( rev == "Less than $750,000" ) {
                toReturn = "$9,000";
                min= 9000;
            } else { //"$750,000 or more">$750,000 or more
                toReturn = "$15,000";
                min= 15000;
            }
        } else if ( licenseTypeForBond == 'General Commercial' ) {
            if ( rev == "$150,000 or less" ) {
                toReturn = "$5,000";
                min= 5000;
            } else if ( rev == "In excess of $150,000 but not more than $500,000" ) {
                toReturn = "$15,000";
                min= 15000;
            } else if ( rev == "In excess of $500,000 but not more than $1,000,000" ) {
                toReturn = "$25,000";
                min= 25000;
            } else if ( rev == "In excess of $1,000,000 but not more than $5,000,000" ) {
                toReturn = "$50,000";
                min= 50000;
            } else if ( rev == "In excess of $5,000,000 but not more than $10,000,000" ) {
                toReturn = "$75,000";
                min= 75000;
            } else  { // "Over $10,000,000"
                toReturn = "$100,000";
                min= 100000;
            }
        } else if ( licenseTypeForBond == 'Specialty Dual' || licenseTypeForBond == 'Specialty Commercial' ) {
            if ( rev == "$150,000 or less" ) {
                toReturn = "$2,500";
                min= 2500;
            } else if ( rev == "In excess of $150,000 but not more than $500,000" ) {
                toReturn = "$7,000";
                min= 7000;
            } else if ( rev == "In excess of $500,000 but not more than $1,000,000" ) {
                toReturn = "$17,500";
                min= 17500;
            } else if ( rev == "In excess of $1,000,000 but not more than $5,000,000" ) {
                toReturn = "$25,000";
                min= 25000;
            } else if ( rev == "In excess of $5,000,000 but not more than $10,000,000" ) {
                toReturn = "$37,500";
                min= 37500;
            } else  { // "Over $10,000,000"
                toReturn = "$50,000";
                min= 50000;
            }
        } else if ( licenseTypeForBond == 'Specialty Residential' ) {
            if ( rev == "Less than $750,000" ) {
                toReturn = "$4,250";
                min= 4250;
            } else { //"$750,000 or more">$750,000 or more
                toReturn = "$7,500";
                min= 7500;
            }
        } else {
            //licenseTypeForBond = 'General Residential';
            if ( rev == "Less than $750,000" ) {
                toReturn = "$9,000";
                min= 9000;
            } else { //"$750,000 or more">$750,000 or more
                toReturn = "$15,000";
                min= 15000;
            }
        }
        //if ( $('#Bond_Amount__c') ) { $('#Bond_Amount__c').attr({'min': min}); }
        //if ( $('#CD_Amount__c') ) { $('#CD_Amount__c').attr({'min': min}); }
        //if ( $('#Cash_Amount__c') ) { $('#Cash_Amount__c').attr({'min': min}); }
        // they should be able to put in multiple bonds adding up to the minimum, this is something I'll need to fix but for now let's just skip the min check
        $('#calculatedBondSize').html("Required Total Bond Amount: <span>" + toReturn + "</span>");
    }
}

function validateCCNumber ( num ) {
    if ( num.length != 15 && num.length != 16 ) {
        msgAlert("The credit card number submitted has the incorrect number of digits. Please check your credit card number again.");
        return true;
    } else {
        if ( num.substr(0,1) != "3" || num.substr(0,1) != "4" || num.substr(0,1) != "5" || num.substr(0,1) != "6" ) {
            msgAlert("Sorry, at this time we are only accepting American Express, Visa, Mastercard and Discover Card payments online.");
            return true;
        } else {
            return true;
        }
    }
}

function disableSubmitButton ( bid ) {
    if ( document.getElementById( bid ) != null ) {
        document.getElementById( bid ).attributes.disabled = true;
    }
}

var lastTab = '';
function lastTabSet ( t ) {
    if ( lastTab != '' && lastTab != t ) {
        hideSub(lastTab);
        if ( $('#'+lastTab+'Tab') ) { $('#'+lastTab+'Tab').removeClass('active'); }
    }
    if ( $('#'+t+'Tab') ) { $('#'+t+'Tab').addClass('active'); }
    lastTab = t;
}

var addMoreCount = [];
var addMoreTemplates = [];

function addMore ( divId, templateId, divCount, eNum ) {
    // define these variables INSIDE this function because 1) they're not used elsewhere and 2) they need to change as we go
    //addMoreTemplates['priorExperience'] = '<div class="formElement formElementHalf"><label for="QP_Prior_Experience_Forms__c||num||">Upload prior experience forms (||num+1||):</label><input type="file" name="QP_Prior_Experience_Forms__c||num||" id="QP_Prior_Experience_Forms__c||num||" value="" accept="pdf,jpg,jpeg,gif,png" /></div>';
    if ( $("#priorExperience").length ) { 
        addMoreTemplates['priorExperience'] = $("#priorExperience .priorExperienceH").html();
        // add wrappers
        addMoreTemplates['priorExperience'] = '<fieldset class="formElementFieldset priorExperienceH">'+addMoreTemplates['priorExperience']+'</fieldset>';
    }
    addMoreTemplates['backgroundCheck'] = '<div class="formElement formElementHalf"><label for="QP_Background_Check_Receipts__c||num||">Background check receipt # for <span id="QP_Background_Check_Receipt_Name__c||num||"></span>:</label><input type="text" name="QP_Background_Check_Receipts__c||num||" id="QP_Background_Check_Receipts__c||num||" value="" class="appFormRequired" /></div>';
    if ( $("#officerPartnerInfoTemplate").length ) { 
        addMoreTemplates['officerPartners'] = $("#officerPartnerInfoTemplate").html(); 
        addMoreTemplates['ooStateLicense'] = $("#officerPartnerInfoTemplate .ooStateLicenseH").html();
        addMoreTemplates['subOOSDiscipline'] = $("#officerPartnerInfoTemplate .ooStateLicenseH .subOOSDisciplineH").html();
        addMoreTemplates['felonyConviction'] = $("#officerPartnerInfoTemplate .felonyConvictionH").html();
        addMoreTemplates['citedUnlicensed'] = $("#officerPartnerInfoTemplate .citedUnlicensedH").html();
        // add wrappers
        var extraH3OP = '<h3>||officerpartner|| Information</h3>';
        if ( divCount == 0 ) { extraH3OP = ''; }
        addMoreTemplates['officerPartners'] = '<div class="officerPartnerH">'+extraH3OP+addMoreTemplates['officerPartners']+'</div><br><br><hr><br>'; 
        addMoreTemplates['ooStateLicense'] = '<div class="ooStateLicenseH">'+addMoreTemplates['ooStateLicense']+'</div>';
        addMoreTemplates['subOOSDiscipline'] = '<div class="subOOSDisciplineH">'+addMoreTemplates['subOOSDiscipline']+'</div>';
        addMoreTemplates['felonyConviction'] = '<div class="felonyConvictionH">'+addMoreTemplates['felonyConviction']+'</div>';
        addMoreTemplates['citedUnlicensed'] = '<div class="citedUnlicensedH">'+addMoreTemplates['citedUnlicensed']+'</div>';
    }
    if ( $("#qpInfoTemplate").length ) { 
        addMoreTemplates['QP_ooStateLicense'] = $("#qpInfoTemplate .QP_ooStateLicenseH").html();
        addMoreTemplates['QP_subOOSDiscipline'] = $("#qpInfoTemplate .QP_ooStateLicenseH .QP_subOOSDisciplineH").html();
        addMoreTemplates['QP_felonyConviction'] = $("#qpInfoTemplate .QP_felonyConvictionH").html();
        addMoreTemplates['QP_citedUnlicensed'] = $("#qpInfoTemplate .QP_citedUnlicensedH").html();
        // add wrappers
        addMoreTemplates['QP_ooStateLicense'] = '<div class="QP_ooStateLicenseH">'+addMoreTemplates['QP_ooStateLicense']+'</div>';
        addMoreTemplates['QP_subOOSDiscipline'] = '<div class="QP_subOOSDisciplineH">'+addMoreTemplates['QP_subOOSDiscipline']+'</div>';
        addMoreTemplates['QP_felonyConviction'] = '<div class="QP_felonyConvictionH">'+addMoreTemplates['QP_felonyConviction']+'</div>';
        addMoreTemplates['QP_citedUnlicensed'] = '<div class="QP_citedUnlicensedH">'+addMoreTemplates['QP_citedUnlicensed']+'</div>';
    }
    if ( $("#AddressChangeTemplate").length ) { 
        addMoreTemplates['AddressChange'] = '<div class="AddressChangeH">' + $("#AddressChangeTemplate").html() + '</div>';
    }
    if ( $("#PhoneEmailTemplate").length ) { 
        addMoreTemplates['PhoneEmail'] = '<div class="PhoneEmailH">' + $("#PhoneEmailTemplate").html() + '</div>';
    }
    if ( $("#NameChangeTemplate").length ) { 
        addMoreTemplates['NameChange'] = '<div class="NameChangeH">' + $("#NameChangeTemplate").html() + '</div>';
    }
    if ( $("#QPChangesTemplate").length ) { 
        addMoreTemplates['QPChanges'] = '<div class="QPChangesH">' + $("#QPChangesTemplate").html() + '</div>';
    }
    if ( $("#PersonnelChangeTemplate").length ) { 
        addMoreTemplates['PersonnelChange'] = '<div class="PersonnelChangeH">' + $("#PersonnelChangeTemplate").html() + '</div>';
    }
    if ( $("#BondsTemplate").length ) { 
        addMoreTemplates['Bonds'] = '<div class="BondsH">' + $("#BondsTemplate").html() + '</div>';
    }
    if ( $("#AddPersonnelTemplate").length ) { 
        addMoreTemplates['AddPersonnel'] = '<div class="AddPersonnelH">' + $("#AddPersonnelTemplate").html() + '</div>';
        addMoreTemplates['ooStateLicense'] = $("#AddPersonnelTemplate .ooStateLicenseH").html();
        addMoreTemplates['subOOSDiscipline'] = $("#AddPersonnelTemplate .ooStateLicenseH .subOOSDisciplineH").html();
        addMoreTemplates['felonyConviction'] = $("#AddPersonnelTemplate .felonyConvictionH").html();
        addMoreTemplates['citedUnlicensed'] = $("#AddPersonnelTemplate .citedUnlicensedH").html();
        // add wrappers
        addMoreTemplates['ooStateLicense'] = '<div class="ooStateLicenseH">'+addMoreTemplates['ooStateLicense']+'</div>';
        addMoreTemplates['subOOSDiscipline'] = '<div class="subOOSDisciplineH">'+addMoreTemplates['subOOSDiscipline']+'</div>';
        addMoreTemplates['felonyConviction'] = '<div class="felonyConvictionH">'+addMoreTemplates['felonyConviction']+'</div>';
        addMoreTemplates['citedUnlicensed'] = '<div class="citedUnlicensedH">'+addMoreTemplates['citedUnlicensed']+'</div>';
    }
    addMoreTemplates['divId'] = "";
    //console.log('DivID: ' +divId + ' templateID:' + templateId + ' divCount:' + divCount + ' eNum:' + eNum);

    if ( addMoreCount[divId] == undefined ) { addMoreCount[divId] = parseInt(divCount) - 1; if ( addMoreCount[divId] < 0 ) { addMoreCount[divId] = 0; } }
    addMoreCount[divId] = addMoreCount[divId] + 1;
    var ot = 'Officer/Director';
    if ( ownershipType == "LLC" ) { ot = "Manager/Member"; }
    if ( ownershipType == "Partnership" ) { ot = "Partner"; }
    if ( ownershipType == "SoleProp" ) { ot = "Sole Proprietor"; }
    //console.log('ownershipType: ' + ot);
    if ( $("#"+divId) && addMoreTemplates[templateId] != undefined ) {
        //console.log('Div and Template Found!');
        var toAdd = addMoreTemplates[templateId].split('||num||').join(addMoreCount[divId]);
        //var toAdd = addMoreTemplates[divId].replace(/||num||/g, addMoreCount[divId]);
        addMoreCount[divId] = parseInt(addMoreCount[divId]) + 1;
        toAdd = toAdd.split('||num+1||').join(addMoreCount[divId]);
        //toAdd = toAdd.replace('||num+1||').join(addMoreCount[divId]);
        // I added eNum but I'm not sure I need it
        var enumm = 0;
        while ( addMoreCount[divId+"_" +enumm] != undefined ) {
            enumm = enumm + 1;
        }
        toAdd = toAdd.split('||enum||').join(enumm);
        toAdd = toAdd.split('||officerpartner||').join(ot);
        $("#"+divId).append(toAdd);
    }
}
if ( $("#officerPartners") ) { addMore('officerPartners','officerPartners',0,''); }
if ( $("#qpInfoTemplate") ) { 
    addMore('QP_ooStateLicense','QP_ooStateLicense',0,0); 
    addMore('QP_felonyConviction','QP_felonyConviction',0,0);
    addMore('QP_citedUnlicensed','QP_citedUnlicensed',0,0);
}
if ( $("#priorExperience").length ) { addMore('priorExperience','priorExperience',0,''); }

function setServiceRequestFor ( tab, name ) {
    if ( name != '' ) {
        var nameOnly = name;
        var idOnly = name;
        var nameAndId = name.split('||');
        if ( tab != '' ) { addMore( tab, tab, 1, 0 ); }
        if ( nameAndId[0] != null && nameAndId[0] != '' ) { nameOnly = nameAndId[0]; }
        if ( nameAndId[1] != null && nameAndId[1] != '' ) { idOnly = nameAndId[1]; }
        if ( $('#'+tab) ) {
            var replaceName = $('#'+tab+' .'+tab+'H').last().html();
            replaceName = replaceName.split('[ServiceRequestFor]').join(nameOnly);
            replaceName = replaceName.split('[ServiceRequestId]').join(idOnly);
            $('#'+tab+' .'+tab+'H').last().html(replaceName);
            if ( $('#'+tab+'For') && tab != 'QPChanges' ) {
                $('#'+tab+'For option[value="' + name + '"]').each(function() { $(this).remove(); });
            } else if ( $('#'+tab+'For') && tab == 'QPChanges' ) {
                $('#'+tab+'For option').each(function() { $(this).remove(); }); // remove all after adding one because only one allowed
            }
        }
    }
}

function verifyACC ( divId, num ) {
    // divId is the div id to show the result in
    // num is the number supplied to check the AZCC status of
    // L17027260 for testing
    var vurl = 'https://roc.az.gov/sfapi?ff=getAZCC&entityNumber=' + num;
    var found = 0;
    var fmsg = '';
    $.ajax( {
        type: "GET",
        url: vurl, 
        //data: dd,
        success: function( data ) {
            if ( data['return'] == null ) { data = $.parseJSON(data); } 
            if ( data['return'] != '' && data['return'] != null ) {
                if ( data['return'] == "Active" ) {
                    fmsg = "Entity is Active!";
                    found = 1;
                } else if ( data['return'] == "Inactive" ) {
                    fmsg = "Entity found but it is INACTIVE! The AZ Corporation Commission has this business listed as INACTIVE. It will need to be in an active status with the AZ Corporation Commission before we can process your application.";
                } else { 
                    fmsg = "Entity Number Not Found! Please double-check the AZ Corporation Commission Entity Number that you entered and make sure it is correct. It should be 8 or 9 numbers long and may have a letter prefixing it. Do not include any special characters. It may look like 'L123456789' or '123456789'.";
                }
            } else { 
                found = 0;
                fmsg = "The entity ID was not found in the AZ Corporation Commission system.";
            }
            if ( document.getElementById( divId ) != null ) {
                $('#' + divId).removeClass('hide');
                $('#' + divId).html(fmsg);
                if ( $('#AZ_Corp_File_Number_Verified').length ) { $('#AZ_Corp_File_Number_Verified').val(found); }
            } 
        },
        error: function( data ) {
            if ( data['return'] == null ) { data = $.parseJSON(data); } 
            if ( data['return'] != '' && data['return'] != null ) {
                if ( data['return'] == "Active" ) {
                    fmsg = "Entity is Active!";
                    found = 1;
                } else if ( data['return'] == "Inactive" ) {
                    fmsg = "Entity found but it is INACTIVE! The AZ Corporation Commission has this business listed as INACTIVE. It will need to be in an active status with the AZ Corporation Commission before we can process your application.";
                } else { 
                    fmsg = "Entity Number Not Found! Please double-check the AZ Corporation Commission Entity Number that you entered and make sure it is correct. It should be 8 or 9 numbers long and may have a letter prefixing it. Do not include any special characters. It may look like 'L123456789' or '123456789'.";
                }
            } else { 
                found = 0;
                fmsg = "The entity ID was not found in the AZ Corporation Commission system.";
            }
            if ( document.getElementById( divId ) != null ) {
                $('#' + divId).removeClass('hide');
                $('#' + divId).html(fmsg);
                if ( $('#AZ_Corp_File_Number_Verified').length ) { $('#AZ_Corp_File_Number_Verified').val(found); }
            } 
        }
    });
}

//setTimeout('fixZoneContent()',5000);
var lastStep = 'step1'; 
if ( complaintForm != 'complaintForm' ) { lastStep = 'step2'; } // skip step1
var lastStepNumber = 1;
function formNav ( st ) {
    var err = '';
    var ros = document.getElementsByClassName('redOutline');
    var rem = '';
    var recap = '';
    if ( complaintForm == 'complaintForm' && $('input[name="selectComplaintType"]:checked').val() != "non-payment" && st == 'step6' ) { st = 'step7';  }
    var stepNumber = parseInt(st.replace('step', ''));
    for ( r=0; r<ros.length; r++ ) {
        rem = document.getElementsByClassName('redOutline')[r].className;
        rem = rem.replace('redOutline', '');
        document.getElementsByClassName('redOutline')[r].className = rem;
    }
    if ( st != '' ) {
        if ( complaintForm == 'complaintForm' ) {
            if ( $('#' + lastStep) ) {
                if ( ( lastStep == 'step1' && st != 'step1' ) || stepNumber > 1 ) {
                    if ( $('input[name="selectComplaintType"]:checked').length < 1 ) { 
                        err += '<li>Select Complaint Type</li>'; 
                        $('#selectComplaintType0').addClass('redOutline'); 
                        $('#selectComplaintType1').addClass('redOutline'); 
                        $('#selectComplaintType2').addClass('redOutline'); 
                        $('#selectComplaintType3').addClass('redOutline'); 
                        $('#selectComplaintType4').addClass('redOutline');
                    }
                    if ( $('input[name="acknowledgeInstLic"]:checked').length < 1 && $('input[name="acknowledgeInstUnlic"]:checked').length < 1 && $('input[name="acknowledgeInstNonp"]:checked').length < 1 ) { 
                        err += '<li>Acknowledge that you have read the instructions and checklist</li>'; 
                        $('#acknowledgeInstLic').addClass('redOutline'); 
                        $('#acknowledgeInstUnlic').addClass('redOutline'); 
                        $('#acknowledgeInstNonp').addClass('redOutline'); 
                    } 
                    if ( $('input[name="selectComplaintType"]:checked').val() == 'licensed' ) {
                        recap = 'Type of Complaint: Licensed Contractor';
                    } else if ( $('input[name="selectComplaintType"]:checked').val() == 'unlicensed' ) {
                        recap = 'Type of Complaint: Unlicensed Contractor';
                    } else if ( $('input[name="selectComplaintType"]:checked').val() == 'non-payment' ) {
                        recap = 'Type of Complaint: Non-Payment';
                    }
                    if ( err != '' ) { 
                        $('#step1inner').removeClass('hide');
                        $('#step1recap').addClass('hide');
                        st = 1; 
                    }
                }
                if ( ( lastStep == 'step2' && st != 'step2' ) || stepNumber > 2 ) {
                    if ( $('#Complainant_First_Name').val() == '' ) { 
                        err += '<li>Your First Name</li>'; 
                        $('#Complainant_First_Name').addClass('redOutline'); 
                    }
                    if ( $('#Complainant_Last_Name').val() == '' ) { 
                        err += '<li>Your Last Name</li>'; 
                        $('#Complainant_Last_Name').addClass('redOutline'); 
                    }
                    if ( $('#Complainant_Mailing_Address').val() == '' || $('#Complainant_City').val() == '' || $('#Complainant_State_Prov').val() == '' || $('#Complainant_Zip_Post_Code').val() == '' ) { 
                        err += '<li>Your Full Mailing Address</li>'; 
                        $('#Complainant_Mailing_Address').addClass('redOutline'); 
                        $('#Complainant_City').addClass('redOutline'); 
                        $('#Complainant_State_Prov').addClass('redOutline'); 
                        $('#Complainant_Zip_Post_Code').addClass('redOutline'); 
                    }
                    if ( $('input[name="Consent_to_Receive_Electronic_Communicat"]:checked').length < 1 ) { 
                        err += '<li>Consent for Electronic Communication</li>'; 
                        $('#Consent_to_Receive_Electronic_Communicat0').addClass('redOutline'); 
                        $('#Consent_to_Receive_Electronic_Communicat1').addClass('redOutline'); 
                    }
                    if ( $('#Year_of_Birth').val() == '' && $('input[name="selectComplaintType"]:checked').val() == 'unlicensed' ) { 
                        err += '<li>Your Birth Year</li>'; 
                        $('#Year_of_Birth').addClass('redOutline'); 
                    }
                    recap = 'Your Name: ' + $('#Complainant_First_Name').val() + ' ' + $('#Complainant_Last_Name').val();
                    if ( err != '' && stepNumber > 3 ) { 
                        $('#step2inner').removeClass('hide');
                        $('#step2recap').addClass('hide');
                        st = 2; 
                    }
                }
                if ( ( lastStep == 'step3' && st != 'step3' ) || stepNumber > 3 ) {
                    if ( $('input[name="working_with_an_attorney"]:checked').length < 1 ) { 
                        err += '<li>Are you working with an attorney on this case?</li>'; 
                        $('#working_with_an_attorney0').addClass('redOutline'); 
                        $('#working_with_an_attorney1').addClass('redOutline'); 
                    }
                    if ( $('#Name_of_Attorney').val() == '' && $('input[name="working_with_an_attorney"]:checked').val() == 'Yes' ) { 
                        err += "<li>Your Attorney's Name</li>"; 
                        $('#Name_of_Attorney').addClass('redOutline'); 
                    }
                    if ( ( $('#Attorney_Street_Address').val() == '' || $('#Attorney_City').val() == '' || $('#Attorney_State').val() == '' || $('#Attorney_Zip_Post_Code').val() == '' ) && $('input[name="working_with_an_attorney"]:checked').val() == 'Yes' ) { 
                        err += "<li>Your Attorney's Full Mailing Address</li>"; 
                        $('#Attorney_Street_Address').addClass('redOutline'); 
                        $('#Attorney_City').addClass('redOutline'); 
                        $('#Attorney_State').addClass('redOutline'); 
                        $('#Attorney_Zip_Post_Code').addClass('redOutline'); 
                    }
                    if ( $('#Name_of_Attorney').val() == '' ) {
                        recap = 'No, you are not working with an attorney.';
                    } else {
                        recap = 'Your Attorney: ' + $('#Name_of_Attorney').val() + ', ' + $('#Attorney_City').val() + ' ' + $('#Attorney_State').val();
                    }
                    if ( err != '' && stepNumber > 4 ) { 
                        $('#step3inner').removeClass('hide');
                        $('#step3recap').addClass('hide');
                        st = 3; 
                    }
                }
                if ( ( lastStep == 'step4' && st != 'step4' ) || stepNumber > 4 ) {
                    if ( $('#Respondent_Full_Name').val() == '' && $('#Name_of_the_Business').val() == '' ) { 
                        err += '<li>Contractor Business Name or Contact Name</li>'; 
                        $('#Respondent_Full_Name').addClass('redOutline');
                        $('#Name_of_the_Business').addClass('redOutline'); 
                    }
                    recap = 'Contractor Name &amp; License #: ' + $('#Respondent_Full_Name').val() + ' '  + $('#Name_of_the_Business').val() + ' ' + $('#License_Number_Respondent').val();
                    if ( err != '' && stepNumber > 5 ) { 
                        $('#step4inner').removeClass('hide');
                        $('#step4recap').addClass('hide');
                        st = 4; 
                    }
                }
                if ( ( lastStep == 'step5' && st != 'step5' ) || stepNumber > 5 ) {
                    if ( $('input[name="This_project_involved"]:checked').length < 1 ) { 
                        if ( $('input[name="selectComplaintType"]:checked').val() != "unlicensed" ) {
                            err += '<li>What the Project Involved</li>'; 
                            $('#This_project_involved0').addClass('redOutline'); 
                            $('#This_project_involved1').addClass('redOutline'); 
                            $('#This_project_involved2').addClass('redOutline'); 
                            $('#This_project_involved3').addClass('redOutline');
                        } else { 
                            $('input[name="This_project_involved"]').filter('[value="Other"]').attr('checked', true);
                            document.getElementById('This_project_involved_other').value = 'Unlicensed Complaint Form';
                        } 
                    }
                    if ( $('input:radio[name="This_project_involved"]:checked').val() == 'New Home' && $('#Move_In_Date_New_Home').val() == '' && $('#Close_of_Escrow_New_Home').val() == '' ) { 
                        err += '<li>New Home Escrow and Closing Dates</li>'; 
                        $('#Close_of_Escrow_New_Home').addClass('redOutline'); 
                        $('#Move_In_Date_New_Home').addClass('redOutline'); 
                    }
                    if ( $('input[name="This_complaint_is_for"]:checked').length < 1 && $('input[name="selectComplaintType"]:checked').val() != "unlicensed" ) { 
                        err += '<li>Type of Complaint</li>'; 
                        $('#This_complaint_is_for0').addClass('redOutline'); 
                        $('#This_complaint_is_for1').addClass('redOutline'); 
                        $('#This_complaint_is_for2').addClass('redOutline'); 
                        $('#This_complaint_is_for3').addClass('redOutline'); 
                    }
                     if ( $('input[name="This_project_was"]:checked').length < 1 ) { 
                        err += '<li>Location of Project</li>'; 
                        $('#This_project_was0').addClass('redOutline'); 
                        $('#This_project_was1').addClass('redOutline'); 
                        $('#This_project_was2').addClass('redOutline'); 
                    }
                    if ( $('#Jobsite_Street_Address').val() == '' || $('#Jobsite_City').val() == '' || $('#Jobsite_State').val() == '' || $('#Jobsite_Zip_Post_Code').val() == '' ) { 
                        err += '<li>Jobsite Address</li>'; 
                        $('#Jobsite_Street_Address').addClass('redOutline'); 
                        $('#Jobsite_City').addClass('redOutline'); 
                        $('#Jobsite_State').addClass('redOutline'); 
                        $('#Jobsite_Zip_Post_Code').addClass('redOutline'); 
                    }
                    if ( ( $('input[name="A_building_permit_was_obtained_by"]:checked').val() == 'Contractor' || $('input[name="A_building_permit_was_obtained_by"]:checked').val() == 'Property Owner' ) && $('#Building_Permit_Number').val() == '' && $('#Building_Permit_County') == '' ) { 
                        err += '<li>Building Permit Number and County</li>'; 
                        $('#Building_Permit_Number').addClass('redOutline');
                        $('#Building_Permit_County').addClass('redOutline'); 
                    }
                    recap = 'This project was: ' + $('input[name="This_project_was"]:checked').val();
                    if ( $('input[name="selectComplaintType"]:checked').val() != "unlicensed" ) {
                        recap += '<br>This project involved: ' + $('input[name="This_project_involved"]:checked').val() + '<br>This complaint is for: ' + $('input[name="This_complaint_is_for"]:checked').val();
                    }
                    if ( err != '' && stepNumber > 6 ) { 
                        $('#step5inner').removeClass('hide');
                        $('#step5recap').addClass('hide');
                        st = 5; 
                    }
                }
                if ( ( ( lastStep == 'step6' && st != 'step6' ) || stepNumber > 6 ) && $('input[name="selectComplaintType"]:checked').val() == "non-payment" ) { 
                    if ( $('input[name="selectComplaintType"]:checked').val() == "non-payment" ) {
                        if ( $('#Principal_Amount_Due').val() == '' ) {
                            err += '<li>Principal Amount Due</li>'; 
                            $('#Principal_Amount_due').addClass('redOutline');
                        } 
                        if ( $('#Contract_Date1').val() == '' ) {
                            err += '<li>Contract Date</li>'; 
                            $('#Contract_Date1').addClass('redOutline');
                        }
                        if ( $('input[name="Have_you_filed_a_civil_complaint"]:checked').val() < 1 ) { 
                            err += '<li>Whether or not you filed a civil complaint</li>'; 
                            $('#Have_you_filed_a_civil_complaint0').addClass('redOutline'); 
                            $('#Have_you_filed_a_civil_complaint1').addClass('redOutline'); 
                        }
                        recap = 'Principal Amount Due: ' + $('#Principal_Amount_Due').val();
                        if ( err != '' && stepNumber > 7 ) { 
                            $('#step6inner').removeClass('hide');
                            $('#step6recap').addClass('hide');
                            st = 6; 
                        }
                    } else { 
                        st = 'step7';
                        stepNumber = 7;
                    }
                }
                if ( ( lastStep == 'step7' && st != 'step7' ) || stepNumber > 7 ) {
                    if ( $('#compItem0').val() == '' ) { 
                        err += '<li>Complaint or Unpaid Item</li>'; 
                        $('#compItem0').addClass('redOutline'); 
                    }
                    if ( $('input[name="selectComplaintType"]:checked').val() == 'non-payment' ) {
                        recap = 'Unpaid Items include: ' + $('#compItem0').val();
                    } else {
                        recap = 'Complaints include: ' + $('#compItem0').val();
                    }
                    if ( err != '' && stepNumber > 8 ) { 
                        $('#step7inner').removeClass('hide');
                        $('#step7recap').addClass('hide');
                        st = 7; 
                    }
                }
                if ( ( lastStep == 'step8' && st != 'step8' ) || stepNumber > 8 ) {
                    if ( $('input[name="have_written_contract"]:checked').val() == 'Yes' && $('#attach_contract').val() == '' ) { 
                        err += '<li>Contract File</li>'; 
                        $('#attach_contract').addClass('redOutline'); 
                    } else if ( $('input[name="have_written_contract"]:checked').val() == 'No' && $('#attach_nocontract_doc').val() == '' ) {
                        err += '<li>Document Describing the Lack Of Contract</li>'; 
                        $('#attach_nocontract_doc').addClass('redOutline');
                    }
                    if ( $('#attach_cancelled_checks').val() == '' && $('#attach_cc_statements').val() == '' && $('#attach_liens_waivers').val() == '' && $('#attach_bank_doc').val() == '' ) {
                        err += '<li>Documents Showing Payment or Credit Extended</li>'; 
                        $('#attach_cancelled_checks').addClass('redOutline');
                        $('#attach_cc_statements').addClass('redOutline');
                        $('#attach_liens_waivers').addClass('redOutline');
                        $('#attach_bank_doc').addClass('redOutline');
                    }
                    recap = 'Files to Upload include: ' + $('#attach_contract').val() + ' ' + $('#attach_nocontract_doc').val() + ' ' + $('#attach_cancelled_checks').val();
                    if ( err != '' && stepNumber > 9 ) { 
                        $('#step8inner').removeClass('hide');
                        $('#step8recap').addClass('hide');
                        st = 8; 
                    }
                }
                if ( err == '' ) {
                    $('#' + lastStep + 'inner').addClass('hide');
                    $('#' + lastStep + 'recap').html(recap);
                    $('#' + lastStep + 'recap').removeClass('hide');
                } else { 
                    msgAlert('<strong>Sorry, but required fields were left missing.</strong> Please go complete the fields with the red outline to continue.<ul>' + err + '</ul>');
                    //return false;
                }
            }
        } else if ( complaintForm == 'anonComplaintForm' ) {
            if ( $('#' + lastStep) ) {
                if ( ( lastStep == 'step1' && st != 'step1' ) || stepNumber > 1 ) {
                    if ( $('input[name="selectComplaintType"]:checked').length < 1 ) { 
                        err += '<li>Select Complaint Type</li>'; 
                        $('#selectComplaintType0').addClass('redOutline'); 
                        $('#selectComplaintType1').addClass('redOutline'); 
                        $('#selectComplaintType2').addClass('redOutline'); 
                        $('#selectComplaintType3').addClass('redOutline'); 
                        $('#selectComplaintType4').addClass('redOutline');
                    }
                    if ( $('input[name="acknowledgeInstLic"]:checked').length < 1 && $('input[name="acknowledgeInstUnlic"]:checked').length < 1 && $('input[name="acknowledgeInstNonp"]:checked').length < 1 ) { 
                        err += '<li>Acknowledge that you have read the instructions and checklist</li>'; 
                        $('#acknowledgeInstLic').addClass('redOutline'); 
                        $('#acknowledgeInstUnlic').addClass('redOutline'); 
                        $('#acknowledgeInstNonp').addClass('redOutline'); 
                    } 
                    if ( $('input[name="selectComplaintType"]:checked').val() == 'licensed' ) {
                        recap = 'Type of Complaint: Licensed Contractor';
                    } else if ( $('input[name="selectComplaintType"]:checked').val() == 'unlicensed' ) {
                        recap = 'Type of Complaint: Unlicensed Contractor';
                    } else if ( $('input[name="selectComplaintType"]:checked').val() == 'non-payment' ) {
                        recap = 'Type of Complaint: Non-Payment';
                    }
                    if ( err != '' ) { 
                        $('#step1inner').removeClass('hide');
                        $('#step1recap').addClass('hide');
                        st = 1; 
                    }
                }
                if ( ( lastStep == 'step2' && st != 'step2' ) || stepNumber > 2 ) {
                    recap = 'Your Name: ' + $('#Complainant_First_Name').val() + ' ' + $('#Complainant_Last_Name').val();
                    if ( err != '' && stepNumber > 3 ) { 
                        $('#step2inner').removeClass('hide');
                        $('#step2recap').addClass('hide');
                        st = 2; 
                    }
                }
                if ( ( lastStep == 'step3' && st != 'step3' ) || stepNumber > 3 ) {
                    if ( $('#Name_of_Attorney').val() == '' ) {
                        recap = 'No, you are not working with an attorney.';
                    } else {
                        recap = 'Your Attorney: ' + $('#Name_of_Attorney').val() + ', ' + $('#Attorney_City').val() + ' ' + $('#Attorney_State').val();
                    }
                    if ( err != '' && stepNumber > 4 ) { 
                        $('#step3inner').removeClass('hide');
                        $('#step3recap').addClass('hide');
                        st = 3; 
                    }
                }
                if ( ( lastStep == 'step4' && st != 'step4' ) || stepNumber > 4 ) {
                    if ( $('#Respondent_Full_Name').val() == '' && $('#Name_of_the_Business').val() == '' ) { 
                        err += '<li>Contractor Business Name or Contact Name</li>'; 
                        $('#Respondent_Full_Name').addClass('redOutline');
                        $('#Name_of_the_Business').addClass('redOutline'); 
                    }
                    recap = 'Contractor Name &amp; License #: ' + $('#Respondent_Full_Name').val() + ' '  + $('#Name_of_the_Business').val() + ' ' + $('#License_Number_Respondent').val();
                    if ( err != '' && stepNumber > 5 ) { 
                        $('#step4inner').removeClass('hide');
                        $('#step4recap').addClass('hide');
                        st = 4; 
                    }
                }
                if ( ( lastStep == 'step5' && st != 'step5' ) || stepNumber > 5 ) {
                    if ( $('input[name="This_project_involved"]:checked').length < 1 ) { 
                        if ( $('input[name="selectComplaintType"]:checked').val() != "unlicensed" ) {
                            err += '<li>What the Project Involved</li>'; 
                            $('#This_project_involved0').addClass('redOutline'); 
                            $('#This_project_involved1').addClass('redOutline'); 
                            $('#This_project_involved2').addClass('redOutline'); 
                            $('#This_project_involved3').addClass('redOutline');
                        } else { 
                            $('input[name="This_project_involved"]').filter('[value="Other"]').attr('checked', true);
                            document.getElementById('This_project_involved_other').value = 'Unlicensed Complaint Form';
                        } 
                    }
                    if ( $('input:radio[name="This_project_involved"]:checked').val() == 'New Home' && $('#Move_In_Date_New_Home').val() == '' && $('#Close_of_Escrow_New_Home').val() == '' ) { 
                        err += '<li>New Home Escrow and Closing Dates</li>'; 
                        $('#Close_of_Escrow_New_Home').addClass('redOutline'); 
                        $('#Move_In_Date_New_Home').addClass('redOutline'); 
                    }
                    if ( $('input[name="This_complaint_is_for"]:checked').length < 1 && $('input[name="selectComplaintType"]:checked').val() != "unlicensed" ) { 
                        err += '<li>Type of Complaint</li>'; 
                        $('#This_complaint_is_for0').addClass('redOutline'); 
                        $('#This_complaint_is_for1').addClass('redOutline'); 
                        $('#This_complaint_is_for2').addClass('redOutline'); 
                        $('#This_complaint_is_for3').addClass('redOutline'); 
                    }
                     if ( $('input[name="This_project_was"]:checked').length < 1 ) { 
                        err += '<li>Location of Project</li>'; 
                        $('#This_project_was0').addClass('redOutline'); 
                        $('#This_project_was1').addClass('redOutline'); 
                        $('#This_project_was2').addClass('redOutline'); 
                    }
                    if ( $('#Jobsite_Street_Address').val() == '' || $('#Jobsite_City').val() == '' || $('#Jobsite_State').val() == '' || $('#Jobsite_Zip_Post_Code').val() == '' ) { 
                        err += '<li>Jobsite Address</li>'; 
                        $('#Jobsite_Street_Address').addClass('redOutline'); 
                        $('#Jobsite_City').addClass('redOutline'); 
                        $('#Jobsite_State').addClass('redOutline'); 
                        $('#Jobsite_Zip_Post_Code').addClass('redOutline'); 
                    }
                    if ( ( $('input[name="A_building_permit_was_obtained_by"]:checked').val() == 'Contractor' || $('input[name="A_building_permit_was_obtained_by"]:checked').val() == 'Property Owner' ) && $('#Building_Permit_Number').val() == '' && $('#Building_Permit_County') == '' ) { 
                        err += '<li>Building Permit Number and County</li>'; 
                        $('#Building_Permit_Number').addClass('redOutline');
                        $('#Building_Permit_County').addClass('redOutline'); 
                    }
                    recap = 'This project was: ' + $('input[name="This_project_was"]:checked').val();
                    if ( $('input[name="selectComplaintType"]:checked').val() != "unlicensed" ) {
                        recap += '<br>This project involved: ' + $('input[name="This_project_involved"]:checked').val() + '<br>This complaint is for: ' + $('input[name="This_complaint_is_for"]:checked').val();
                    }
                    if ( err != '' && stepNumber > 6 ) { 
                        $('#step5inner').removeClass('hide');
                        $('#step5recap').addClass('hide');
                        st = 5; 
                    }
                }
                if ( ( ( lastStep == 'step6' && st != 'step6' ) || stepNumber > 6 ) && $('input[name="selectComplaintType"]:checked').val() == "non-payment" ) { 
                    if ( $('input[name="selectComplaintType"]:checked').val() == "non-payment" ) {
                        recap = 'Principal Amount Due: ' + $('#Principal_Amount_Due').val();
                        if ( err != '' && stepNumber > 7 ) { 
                            $('#step6inner').removeClass('hide');
                            $('#step6recap').addClass('hide');
                            st = 6; 
                        }
                    } else { 
                        st = 'step7';
                        stepNumber = 7;
                    }
                }
                if ( ( lastStep == 'step7' && st != 'step7' ) || stepNumber > 7 ) {
                    if ( $('#compItem0').val() == '' ) { 
                        err += '<li>Complaint or Unpaid Item</li>'; 
                        $('#compItem0').addClass('redOutline'); 
                    }
                    if ( $('input[name="selectComplaintType"]:checked').val() == 'non-payment' ) {
                        recap = 'Unpaid Items include: ' + $('#compItem0').val();
                    } else {
                        recap = 'Complaints include: ' + $('#compItem0').val();
                    }
                    if ( err != '' && stepNumber > 8 ) { 
                        $('#step7inner').removeClass('hide');
                        $('#step7recap').addClass('hide');
                        st = 7; 
                    }
                }
                if ( ( lastStep == 'step8' && st != 'step8' ) || stepNumber > 8 ) {
                    recap = 'Files to Upload include: ' + $('#attach_contract').val() + ' ' + $('#attach_nocontract_doc').val() + ' ' + $('#attach_cancelled_checks').val();
                    if ( err != '' && stepNumber > 9 ) { 
                        $('#step8inner').removeClass('hide');
                        $('#step8recap').addClass('hide');
                        st = 8; 
                    }
                }
                if ( err == '' ) {
                    $('#' + lastStep + 'inner').addClass('hide');
                    $('#' + lastStep + 'recap').html(recap);
                    $('#' + lastStep + 'recap').removeClass('hide');
                } else { 
                    msgAlert('<strong>Sorry, but required fields were left missing.</strong> Please go complete the fields with the red outline to continue.<ul>' + err + '</ul>');
                    //return false;
                }
            }
        } else if ( complaintForm == 'buildingConfidence' ) {
            if ( $('#' + lastStep) ) {
                if ( ( lastStep == 'step1' && st != 'step1' ) || stepNumber > 1 ) {
                    if ( st == 'step1' ) { st = 'step2'; }
                    if ( stepNumber == 1 ) { stepNumber = 2; }
                    if ( lastStep == 'step1' ) { lastStep = 'step2'; }
                }
                if ( ( lastStep == 'step2' && st != 'step2' ) || stepNumber > 2 ) {
                    if ( $('#Complainant_First_Name').val() == '' ) { 
                        err += '<li>Your First Name</li>'; 
                        $('#Complainant_First_Name').addClass('redOutline'); 
                    }
                    if ( $('#Complainant_Last_Name').val() == '' ) { 
                        err += '<li>Your Last Name</li>'; 
                        $('#Complainant_Last_Name').addClass('redOutline'); 
                    }
                    if ( $('#Complainant_Mailing_Address').val() == '' || $('#Complainant_City').val() == '' || $('#Complainant_State_Prov').val() == '' || $('#Complainant_Zip_Post_Code').val() == '' ) { 
                        err += '<li>Your Full Mailing Address</li>'; 
                        $('#Complainant_Mailing_Address').addClass('redOutline'); 
                        $('#Complainant_City').addClass('redOutline'); 
                        $('#Complainant_State_Prov').addClass('redOutline'); 
                        $('#Complainant_Zip_Post_Code').addClass('redOutline'); 
                    }
                    if ( $('input[name="Consent_to_Receive_Electronic_Communicat"]:checked').length < 1 ) { 
                        err += '<li>Consent for Electronic Communication</li>'; 
                        $('#Consent_to_Receive_Electronic_Communicat0').addClass('redOutline'); 
                        $('#Consent_to_Receive_Electronic_Communicat1').addClass('redOutline'); 
                    }
                    recap = 'Your Name: ' + $('#Complainant_First_Name').val() + ' ' + $('#Complainant_Last_Name').val();
                    if ( err != '' && stepNumber > 3 ) { 
                        $('#step2inner').removeClass('hide');
                        $('#step2recap').addClass('hide');
                        st = 2; 
                    }
                }
                if ( ( lastStep == 'step3' && st != 'step3' ) || stepNumber > 3 ) {
                    if ( $('#Property_Owner_First_Name').val() == '' ) { 
                        err += '<li>Your First Name</li>'; 
                        $('#Property_Owner_First_Name').addClass('redOutline'); 
                    }
                    if ( $('#Property_Owner_Last_Name').val() == '' ) { 
                        err += '<li>Your Last Name</li>'; 
                        $('#Property_Owner_Last_Name').addClass('redOutline'); 
                    }
                    if ( $('#Property_Owner_Mailing_Address').val() == '' || $('#Property_Owner_City').val() == '' || $('#Property_Owner_State').val() == '' || $('#Property_Owner_Zip_Post_Code').val() == '' ) { 
                        err += '<li>Your Full Mailing Address</li>'; 
                        $('#Property_Owner_Mailing_Address').addClass('redOutline'); 
                        $('#Property_Owner_City').addClass('redOutline'); 
                        $('#Property_Owner_State').addClass('redOutline'); 
                        $('#Property_Owner_Zip_Post_Code').addClass('redOutline'); 
                    }
                    if ( err != '' && stepNumber > 4 ) { 
                        $('#step3inner').removeClass('hide');
                        $('#step3recap').addClass('hide');
                        st = 3; 
                    }
                }
                if ( ( lastStep == 'step4' && st != 'step4' ) || stepNumber > 4 ) {
                    if ( $('#Respondent_Full_Name').val() == '' && $('#Name_of_the_Business').val() == '' ) { 
                        err += '<li>Contractor Business Name or Contact Name</li>'; 
                        $('#Respondent_Full_Name').addClass('redOutline');
                        $('#Name_of_the_Business').addClass('redOutline'); 
                    }
                    recap = 'Contractor Name &amp; License #: ' + $('#Respondent_Full_Name').val() + ' '  + $('#Name_of_the_Business').val() + ' ' + $('#License_Number_Respondent').val();
                    if ( err != '' && stepNumber > 5 ) { 
                        $('#step4inner').removeClass('hide');
                        $('#step4recap').addClass('hide');
                        st = 4; 
                    }
                }
                if ( ( lastStep == 'step5' && st != 'step5' ) || stepNumber > 5 ) {
                    if ( $('#Jobsite_Street_Address').val() == '' || $('#Jobsite_City').val() == '' || $('#Jobsite_State').val() == '' || $('#Jobsite_Zip_Post_Code').val() == '' ) { 
                        err += '<li>Jobsite Address</li>'; 
                        $('#Jobsite_Street_Address').addClass('redOutline'); 
                        $('#Jobsite_City').addClass('redOutline'); 
                        $('#Jobsite_State').addClass('redOutline'); 
                        $('#Jobsite_Zip_Post_Code').addClass('redOutline'); 
                    }
                    recap = 'Jobsite Address: ' + $('#Jobsite_Street_Address').val() + ', ' + $('#Jobsite_City').val() + ' ' + $('#Jobsite_State').val() + ' ' + $('#Jobsite_Zip_Post_Code').val();
                    if ( err != '' && stepNumber > 6 ) { 
                        $('#step5inner').removeClass('hide');
                        $('#step5recap').addClass('hide');
                        st = 5; 
                    }
                }
                if ( ( lastStep == 'step6' && st != 'step6' ) || stepNumber > 6 ) { 
                    if ( st == 'step6' ) { st = 'step7'; }
                    if ( stepNumber == 6 ) { stepNumber = 7; }
                    if ( lastStep == 'step7' ) { lastStep = 'step6'; }
                }
                if ( ( lastStep == 'step7' && st != 'step7' ) || stepNumber > 7 ) {
                    if ( $('#compItem0').val() == '' ) { 
                        err += '<li>Item(s) of Concern</li>'; 
                        $('#compItem0').addClass('redOutline'); 
                    }
                    recap = 'Item(s) of Concern: ' + $('#compItem0').val();
                    if ( err != '' && stepNumber > 8 ) { 
                        $('#step7inner').removeClass('hide');
                        $('#step7recap').addClass('hide');
                        st = 7; 
                    }
                }
                if ( ( lastStep == 'step8' && st != 'step8' ) || stepNumber > 8 ) {
                    if ( st == 'step8' ) { st = 'step9'; }
                    if ( stepNumber == 8 ) { stepNumber = 9; }
                    if ( lastStep == 'step8' ) { lastStep = 'step9'; }
                }
                if ( err == '' ) {
                    $('#' + lastStep + 'inner').addClass('hide');
                    $('#' + lastStep + 'recap').html(recap);
                    $('#' + lastStep + 'recap').removeClass('hide');
                } else { 
                    msgAlert('<strong>Sorry, but required fields were left missing.</strong> Please go complete the fields with the red outline to continue.<ul>' + err + '</ul>');
                    //return false;
                }
            }
        } else if ( complaintForm == 'recoveryFund' ) {
            if ( $('#' + lastStep) ) {
                if ( ( lastStep == 'step1' && st != 'step1' ) || stepNumber > 1 ) {
                    if ( st == 'step1' ) { st = 'step2'; }
                    if ( stepNumber == 1 ) { stepNumber = 2; }
                    if ( lastStep == 'step1' ) { lastStep = 'step2'; }
                }
                if ( ( lastStep == 'step2' && st != 'step2' ) || stepNumber > 2 ) {
                    if ( $('#Complainant_First_Name').val() == '' ) { 
                        err += '<li>Your First Name</li>'; 
                        $('#Complainant_First_Name').addClass('redOutline'); 
                    }
                    if ( $('#Complainant_Last_Name').val() == '' ) { 
                        err += '<li>Your Last Name</li>'; 
                        $('#Complainant_Last_Name').addClass('redOutline'); 
                    }
                    if ( $('#Complainant_Mailing_Address').val() == '' || $('#Complainant_City').val() == '' || $('#Complainant_State_Prov').val() == '' || $('#Complainant_Zip_Post_Code').val() == '' ) { 
                        err += '<li>Your Full Mailing Address</li>'; 
                        $('#Complainant_Mailing_Address').addClass('redOutline'); 
                        $('#Complainant_City').addClass('redOutline'); 
                        $('#Complainant_State_Prov').addClass('redOutline'); 
                        $('#Complainant_Zip_Post_Code').addClass('redOutline'); 
                    }
                    if ( $('input[name="Consent_to_Receive_Electronic_Communicat"]:checked').length < 1 ) { 
                        err += '<li>Consent for Electronic Communication</li>'; 
                        $('#Consent_to_Receive_Electronic_Communicat0').addClass('redOutline'); 
                        $('#Consent_to_Receive_Electronic_Communicat1').addClass('redOutline'); 
                    }
                    recap = 'Your Name: ' + $('#Complainant_First_Name').val() + ' ' + $('#Complainant_Last_Name').val();
                    if ( err != '' && stepNumber > 3 ) { 
                        $('#step2inner').removeClass('hide');
                        $('#step2recap').addClass('hide');
                        st = 2; 
                    }
                }
                if ( ( lastStep == 'step3' && st != 'step3' ) || stepNumber > 3 ) {
                    if ( $('input[name="working_with_an_attorney"]:checked').length < 1 ) { 
                        err += '<li>Are you working with an attorney on this case?</li>'; 
                        $('#working_with_an_attorney0').addClass('redOutline'); 
                        $('#working_with_an_attorney1').addClass('redOutline'); 
                    }
                    if ( $('#Name_of_Attorney').val() == '' && $('input[name="working_with_an_attorney"]:checked').val() == 'Yes' ) { 
                        err += "<li>Your Attorney's Name</li>"; 
                        $('#Name_of_Attorney').addClass('redOutline'); 
                    }
                    if ( ( $('#Attorney_Street_Address').val() == '' || $('#Attorney_City').val() == '' || $('#Attorney_State').val() == '' || $('#Attorney_Zip_Post_Code').val() == '' ) && $('input[name="working_with_an_attorney"]:checked').val() == 'Yes' ) { 
                        err += "<li>Your Attorney's Full Mailing Address</li>"; 
                        $('#Attorney_Street_Address').addClass('redOutline'); 
                        $('#Attorney_City').addClass('redOutline'); 
                        $('#Attorney_State').addClass('redOutline'); 
                        $('#Attorney_Zip_Post_Code').addClass('redOutline'); 
                    }
                    if ( $('#Name_of_Attorney').val() == '' ) {
                        recap = 'No, you are not working with an attorney.';
                    } else {
                        recap = 'Your Attorney: ' + $('#Name_of_Attorney').val() + ', ' + $('#Attorney_City').val() + ' ' + $('#Attorney_State').val();
                    }
                    if ( err != '' && stepNumber > 4 ) { 
                        $('#step3inner').removeClass('hide');
                        $('#step3recap').addClass('hide');
                        st = 3; 
                    }
                }
                if ( ( lastStep == 'step4' && st != 'step4' ) || stepNumber > 4 ) {
                    if ( $('#Respondent_Full_Name').val() == '' && $('#Name_of_the_Business').val() == '' ) { 
                        err += '<li>Contractor Business Name or Contact Name</li>'; 
                        $('#Respondent_Full_Name').addClass('redOutline');
                        $('#Name_of_the_Business').addClass('redOutline'); 
                    }
                    recap = 'Contractor Name &amp; License #: ' + $('#Respondent_Full_Name').val() + ' '  + $('#Name_of_the_Business').val() + ' ' + $('#License_Number_Respondent').val();
                    if ( err != '' && stepNumber > 5 ) { 
                        $('#step4inner').removeClass('hide');
                        $('#step4recap').addClass('hide');
                        st = 4; 
                    }
                }
                if ( ( lastStep == 'step5' && st != 'step5' ) || stepNumber > 5 ) {
                    if ( $('#Jobsite_Street_Address').val() == '' || $('#Jobsite_City').val() == '' || $('#Jobsite_State').val() == '' || $('#Jobsite_Zip_Post_Code').val() == '' ) { 
                        err += '<li>Jobsite Address</li>'; 
                        $('#Jobsite_Street_Address').addClass('redOutline'); 
                        $('#Jobsite_City').addClass('redOutline'); 
                        $('#Jobsite_State').addClass('redOutline'); 
                        $('#Jobsite_Zip_Post_Code').addClass('redOutline'); 
                    }
                     if ( $('input[name="This_project_was"]:checked').length < 1 ) { 
                        err += '<li>Legal classification of jobsite address</li>'; 
                        $('#This_project_was0').addClass('redOutline'); 
                        $('#This_project_was1').addClass('redOutline'); 
                        $('#This_project_was2').addClass('redOutline'); 
                    }
                    recap = 'Jobsite Address: ' + $('#Jobsite_Street_Address').val() + ', ' + $('#Jobsite_City').val() + ' ' + $('#Jobsite_State').val() + ' ' + $('#Jobsite_Zip_Post_Code').val();
                    if ( err != '' && stepNumber > 6 ) { 
                        $('#step5inner').removeClass('hide');
                        $('#step5recap').addClass('hide');
                        st = 5; 
                    }
                }
                if ( ( lastStep == 'step6' && st != 'step6' ) || stepNumber > 6 ) { 
                    
                    recap = 'Your Name: ' + $('#Complainant_First_Name').val() + ' ' + $('#Complainant_Last_Name').val();
                    if ( err != '' && stepNumber > 3 ) { 
                        $('#step6inner').removeClass('hide');
                        $('#step6ainner').removeClass('hide');
                        $('#step6recap').addClass('hide');
                        st = 2; 
                    }
                }
                if ( ( lastStep == 'step7' && st != 'step7' ) || stepNumber > 7 ) {
                    if ( $('#compItem0').val() == '' ) { 
                        err += '<li>List of All Payments Made to Original Contractor:</li>'; 
                        $('#compItem0a').addClass('redOutline'); 
                        $('#compItem0b').addClass('redOutline'); 
                        $('#compItem0c').addClass('redOutline'); 
                        $('#compItem0d').addClass('redOutline'); 
                        $('#compItem0e').addClass('redOutline'); 
                        $('#compItem0f').addClass('redOutline'); 
                    }
                    recap = 'List of All Payments Made to Original Contractor: ' + $('#compItem0a').val() + ' | ' + $('#compItem0b').val() + ' | $' + $('#compItem0e').val() + ' ' + $('#compItem0d').val() + '... ';
                    if ( err != '' && stepNumber > 8 ) { 
                        $('#step7inner').removeClass('hide');
                        $('#step7recap').addClass('hide');
                        st = 7; 
                    }
                }
                if ( ( lastStep == 'step8' && st != 'step8' ) || stepNumber > 8 ) {
                    
                    recap = 'Your Name: ' + $('#Complainant_First_Name').val() + ' ' + $('#Complainant_Last_Name').val();
                    if ( err != '' && stepNumber > 3 ) { 
                        $('#step8inner').removeClass('hide');
                        $('#step8recap').addClass('hide');
                        st = 2; 
                    }
                }
                if ( err == '' ) {
                    $('#' + lastStep + 'inner').addClass('hide');
                    $('#' + lastStep + 'recap').html(recap);
                    $('#' + lastStep + 'recap').removeClass('hide');
                } else { 
                    msgAlert('<strong>Sorry, but required fields were left missing.</strong> Please go complete the fields with the red outline to continue.<ul>' + err + '</ul>');
                    //return false;
                }
            }
        }// end if by page
        if ( $('#' + st) ) {
            $('#' + st + 'inner').removeClass('hide');
            $('#' + st + 'recap').addClass('hide');
        }
        lastStep = st;
        lastStepNumber = stepNumber;
        if ( $(st).length ) { 
            smoothScrollTo(st);
        }
    }
}
var infoBoxOpened = 0;
function openInfoBox ( i ) {
    if ( $('#' + i) ) {
        $('#' + i).show();
        infoBoxOpened = 1;
        $(document).mouseup(function(e){
            if ( $('#' + i) && infoBoxOpened == 1 ) { $('#' + i).hide(); }
        });
    }
}
function openInfoBox2 ( i ) {
    if ( $('#' + i) ) {
        $('#' + i).css("display","inline-block");
        infoBoxOpened = 1;
        $(document).mouseup(function(e){
            if ( $('#' + i) && infoBoxOpened == 1 ) { $('#' + i).css("display","none"); }
        });
    }
}
function openSub ( subN ) {
    if ( $('#' + subN ) ) {
        $('#' + subN ).removeClass('hide');
    }
}
function hideSub ( subN ) {
    if ( $('#' + subN ) ) {
        $('#' + subN ).addClass('hide');
    }
}
function openFelony ( subN ) {
    if ( $('#' + subN ) ) {
        $('#' + subN ).removeClass('hide');
    }
    if ( $('#addMoreLink' + subN ) ) {
        $('#addMoreLink' + subN ).removeClass('hide');
    }
}
function hideFelony ( subN ) {
    var sh = 0;
    if ( subN.indexOf("QP_") == 0 ) { 
        if ( $('input[name=QP_Been_Convicted_of_a_Felony__c]:checked').val() == "Yes" ) { sh = 1; } 
        if ( $('input[name=QP_Felony_Charge_Pending__c]:checked').val() == "Yes" ) { sh = 1; }
    } else {
        // get the number of the officerpartner and then check the value
        var sn = subN.replace("felonyConviction","");
        if ( $('input[name=Been_Convicted_of_a_Felony__c' + sn + ']:checked').val() == "Yes" ) { sh = 1; } 
        if ( $('input[name=Felony_Charge_Pending__c' + sn + ']:checked').val() == "Yes" ) { sh = 1; }
    }
    if ( sh == 0 ) {
        if ( $('#' + subN ) ) {
            $('#' + subN ).addClass('hide');
        }
        if ( $('#addMoreLink' + subN ) ) {
            $('#addMoreLink' + subN ).addClass('hide');
        }
    }
}
function toggleSub ( subN ) {
    if ( $('#' + subN ).hasClass('hide') ) {
        $('#' + subN ).removeClass('hide');
    } else {
        $('#' + subN ).addClass('hide');
    }
}
function smoothScrollTo ( tid ) {
    var target = $('#' + tid);
    var target2 = '';
    if ( tid != '' && tid.length > 1 ) { tid.substr(1); }
    target = target.length ? target : $('input[name=' + target2 +']');
    if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70
        }, 500);
        return false;
    }
}
function submitComplaintForm () {
    // this is where we'll run the post to the API page stored in the drupal plugin
    if ( document.getElementById('complaintForm') != null ) {
        document.getElementById('complaintForm').style.maxHeight = "0px";
        document.getElementById('complaintForm').style.overflow = "hidden";
        //document.complaintForm.action = '/sites/all/modules/contrib/roc_salesforce/roc_salesforce.php?f=postComplaint';
        document.complaintForm.action = '/sfapi?ff=postComplaint';
        //document.complaintForm.target = 'formSubWin'; //'_blank';
        document.complaintForm.submit();
        setTimeout('document.complaintForm.submit()',1000);
        /*
        if ( document.getElementById('showLoading') != null ){
            document.getElementById('showLoading').style.display = 'block';
            smoothScrollTo('page-title');
        }
        if ( document.getElementById('formSubWin') != null ) {
            var iframe = document.getElementById('formSubWin');
            var vv = 0;
            while ( iframe.innerHTML == '' && vv < 10000 ) {
                // do nothing, just wait
                vv++;
                if ( vv == 2000 ) {
                    document.complaintForm.submit();
                }
            }
            iframe.addEventListener("load", function () {
                if ( document.getElementById('showLoading') != null ){
                    var ret = iframe.contentWindow.document.body.innerHTML;
                    //ret = ret.substr(ret.indexOf("<body") + 5);
                    //ret = ret.substr(0,(ret.indexOf("/body>")-1));
                    //iframe.innerHTML = ret;
                    //alert(ret);
                    if ( ret.indexOf('[{"attributes"') > -1 ) { ret = ret.substring(ret.indexOf('[{"attributes"')); } else { ret = ret.substring(ret.indexOf('[{"errorCode"')); }
                    ret = ret.substring(0, (ret.indexOf('}]') + 2));
                    //alert(ret);
                    //ret = ret.replace("[","");
                    //ret = ret.replace("]","");
                    //console.log(ret);
                    var ret1 = "";
                    var jret1 = $.parseJSON(ret);
                    var jret = jret1[0];
                    var saveLoading = document.getElementById('showLoading').innerHTML;
                    //console.log(jret);
                    $('#showLoading').empty();
                    if ( complaintForm == "buildingConfidence" ) {
                        if ( !jret.error && !jret.errorCode ) {
                            $('#showLoading').append("<h2>Your Building Confidence Request has been received.</h2><br>");
                            $('#showLoading').append("<p>Thank you for your time and patience. We have entered your request into our records and an investigator will be assigned. If your request is missing any important information, someone will contact you to get the additional information. If you have any questions while waiting for our reply, please feel free to call us at 602-542-1525. Thank you.</p>");
                            $('#showLoading').append("<h4>Summary of Building Confidence Program Submission</h4><br>");
                            ret1 += "<li>Your Name: " + jret.Complainant_First_Name__c + ' ' + jret.Complainant_Last_Name__c + "</li>";
                            ret1 += "<li>Your Address: " + jret.Complainant_Mailing_Address__c + ', ' + jret.Complainant_City__c + ', ' + jret.Complainant_State_Prov__c + ' ' + jret.Complainant_Zip_Post_Code__c + "</li>";
                            ret1 += "<li>Your Phone Number: " + jret.Complainant_Phone_Main__c + "</li>";
                            ret1 += "<li>Your Email: " + jret.Complainant_Email__c + "</li>";
                            //if ( jret.Name_of_Attorney__c != '' && jret.Name_of_Attorney__c != null ) {
                            //    ret1 += "<li>Your Attorney: " + jret.Name_of_Attorney__c + ', ' + jret.Attorney_Street_Address__c + ', ' + jret.Attorney_City + ', ' + jret.Attorney_State__c + ' ' + jret.Attorney_Zip_Post_Code__c + "</li>";
                            //    ret1 += "<li>Your Attorney's Phone and Email: " + jret.Attorney_Phone_Number__c + ' ' + jret.Attorney_Email__c + "</li>";
                            //}
                            if ( jret.Name_of_the_Business__c != '' && jret.Name_of_the_Business__c != null ) { 
                                ret1 += "<li>Business Name: " + jret.Name_of_the_Business__c + "</li>"; 
                            }
                            ret1 += "<li>Contractor Name: " + jret.Respondent_Full_Name__c + "</li>";
                            if ( jret.Respondent_Street_Address__c != '' && jret.Respondent_Street_Address__c != null ) {
                                ret1 += "<li>Contractor Address (if known): " + jret.Respondent_Street_Address__c + ', ' + jret.Respondent_City__c + ' ' + jret.Respondent_State__c + ' ' + jret.Respondent_Zip_Post_Code__c + "</li>";
                            }
                            if ( jret.Respondent_Phone_Number__c != '' && jret.Respondent_Phone_Number__c != null ) {
                                ret1 += "<li>Contractor Phone and  Email (if known): " + jret.Respondent_Phone_Number__c + ' ' + jret.Respondent_Email__c + "</li>";
                            }
                            if ( jret.Contract_Date__c != '' && jret.Contract_Date__c != null ) {
                                ret1 += "<li>Contract Date: " + jret.Contract_Date__c + "</li>";
                                ret1 += "<li>Contract Amount: $ " + jret.Contract_Amount__c + "</li>";
                                ret1 += "<li>Amount Paid: $ " + jret.Amount_Paid__c + "</li>";
                            }
                            if ( jret.Date_Work_Started__c != '' && jret.Date_Work_Started__c != null ) { ret1 += "<li>Date Work Started: " + jret.Date_Work_Started__c + "</li>"; }
                            if ( jret.Date_Work_Stopped__c != '' && jret.Date_Work_Stopped__c != null ) { ret1 += "<li>Date Work Stopped: " + jret.Date_Work_Stopped__c + "</li>"; }
                            if ( jret.Date_Work_was_Completed__c != '' && jret.Date_Work_Was_Completed__c != null ) { ret1 += "<li>Date Work was Completed: " + jret.Date_Work_Was_Completed__c + "</li>"; }
                            
                            ret1 += "<li>Jobsite Address: " + jret.Jobsite_Street_Address__c + ', ' + jret.Jobsite_City__c + ', ' + jret.Jobsite_State__c + ' ' + jret.Jobsite_Zip_Post_Code__c + "</li>";
                            //if ( jret.This_complaint_is_for__c != 'Other' && jret.This_complaint_is_for__c != null ) {
                            //    ret1 += "<li>Complaint Reason: " + jret.This_complaint_is_for__c + "</li>";
                            //}
                            //if ( jret.This_project_involved__c != '' && jret.This_project_involved__c != null ) {
                            //    ret1 += "<li>Project Type: " + jret.This_project_involved__c + "</li>";
                            //}
                            if ( jret.Alleged_Violation__c != '' && jret.Alleged_Violation__c != null ) {
                                ret1 += "<li>Item(s) of Concern: " + jret.Alleged_Violation__c + "</li>";
                            }
                            ret1 += "<li>Temporary Request Id: " + jret.Id + "</li>";
                            $('#showLoading').append("<ul>" + ret1 + "</ul><br><br>");
                        } else {
                            var err = '';
                            if ( jret.error ) {
                                err = jret.error;
                            } else { 
                                err = jret.message;
                            }
                            document.getElementById('complaintForm').style.maxHeight = "none";
                            document.getElementById('complaintForm').style.overflow = "inherit";
                            document.getElementById('showLoading').innerHTML = saveLoading;
                            document.getElementById('showLoading').style.display = 'none';
                            msgAlert("An error was encountered while processing your request. Please review the information you submitted and enter any missing information to resubmit your form. If the issue persists, please contact the ROC webmaster at webmaster@roc.az.gov. We're sorry for any inconvenience.<br><br><small>Error Message: " + err + "</small>");
                        }
                    } else if ( complaintForm == "complaintForm" ) {
                        if ( !jret.error && !jret.errorCode ) {
                            $('#showLoading').append("<h2>Your complaint has been received.</h2><br>");
                            $('#showLoading').append("<p>Thank you for your time and patience. We have entered your complaint into our records and an investigator will be assigned. If your complaint is missing any important information, someone will contact you to get the additional information. If you have any questions while waiting for our reply, please feel free to call us at 602-542-1525. Thank you.</p>");
                            $('#showLoading').append("<h4>Summary of Complaint Submission</h4><br>");
                            ret1 += "<li>Your Name: " + jret.Complainant_First_Name__c + ' ' + jret.Complainant_Last_Name__c + "</li>";
                            ret1 += "<li>Your Address: " + jret.Complainant_Mailing_Address__c + ', ' + jret.Complainant_City__c + ', ' + jret.Complainant_State_Prov__c + ' ' + jret.Complainant_Zip_Post_Code__c + "</li>";
                            ret1 += "<li>Your Phone Number: " + jret.Complainant_Phone_Main__c + "</li>";
                            ret1 += "<li>Your Email: " + jret.Complainant_Email__c + "</li>";
                            if ( jret.Name_of_Attorney__c != '' && jret.Name_of_Attorney__c != null ) {
                                ret1 += "<li>Your Attorney: " + jret.Name_of_Attorney__c + ', ' + jret.Attorney_Street_Address__c + ', ' + jret.Attorney_City + ', ' + jret.Attorney_State__c + ' ' + jret.Attorney_Zip_Post_Code__c + "</li>";
                                ret1 += "<li>Your Attorney's Phone and Email: " + jret.Attorney_Phone_Number__c + ' ' + jret.Attorney_Email__c + "</li>";
                            }
                            if ( jret.Name_of_the_Business__c != '' && jret.Name_of_the_Business__c != null ) { 
                                ret1 += "<li>Business Name: " + jret.Name_of_the_Business__c + "</li>"; 
                            }
                            ret1 += "<li>Contractor Name: " + jret.Respondent_Full_Name__c + "</li>";
                            if ( jret.Respondent_Street_Address__c != '' && jret.Respondent_Street_Address__c != null ) {
                                ret1 += "<li>Contractor Address (if known): " + jret.Respondent_Street_Address__c + ', ' + jret.Respondent_City__c + ' ' + jret.Respondent_State__c + ' ' + jret.Respondent_Zip_Post_Code__c + "</li>";
                            }
                            if ( jret.Respondent_Phone_Number__c != '' && jret.Respondent_Phone_Number__c != null ) {
                                ret1 += "<li>Contractor Phone and  Email (if known): " + jret.Respondent_Phone_Number__c + ' ' + jret.Respondent_Email__c + "</li>";
                            }
                            if ( jret.Contract_Date__c != '' && jret.Contract_Date__c != null ) {
                                ret1 += "<li>Contract Date: " + jret.Contract_Date__c + "</li>";
                                ret1 += "<li>Contract Amount: $ " + jret.Contract_Amount__c + "</li>";
                                ret1 += "<li>Amount Paid: $ " + jret.Amount_Paid__c + "</li>";
                            }
                            if ( jret.Date_Work_Started__c != '' && jret.Date_Work_Started__c != null ) { ret1 += "<li>Date Work Started: " + jret.Date_Work_Started__c + "</li>"; }
                            if ( jret.Date_Work_Stopped__c != '' && jret.Date_Work_Stopped__c != null ) { ret1 += "<li>Date Work Stopped: " + jret.Date_Work_Stopped__c + "</li>"; }
                            if ( jret.Date_Work_was_Completed__c != '' && jret.Date_Work_Was_Completed__c != null ) { ret1 += "<li>Date Work was Completed: " + jret.Date_Work_Was_Completed__c + "</li>"; }
                            
                            ret1 += "<li>Jobsite Address: " + jret.Jobsite_Street_Address__c + ', ' + jret.Jobsite_City + ', ' + jret.Jobsite_State__c + ' ' + jret.Jobsite_Zip_Post_Code__c + "</li>";
                            if ( jret.This_complaint_is_for__c != 'Other' && jret.This_complaint_is_for__c != null ) {
                                ret1 += "<li>Complaint Reason: " + jret.This_complaint_is_for__c + "</li>";
                            }
                            if ( jret.This_project_involved__c != '' && jret.This_project_involved__c != null ) {
                                ret1 += "<li>Project Type: " + jret.This_project_involved__c + "</li>";
                            }
                            if ( jret.Alleged_Violation__c != '' && jret.Alleged_Violation__c != null ) {
                                ret1 += "<li>Complaints: " + jret.Alleged_Violation__c + "</li>";
                            }
                            if ( jret.List_of_Unpaid_Items__c != '' && jret.List_of_Unpaid_Items__c != null ) {
                                ret1 += "<li>Unpaid Items: " + jret.List_of_Unpaid_Items__c + "</li>";
                            }
                            ret1 += "<li>Temporary Submission Id: " + jret.Id + "</li>";
                            $('#showLoading').append("<ul>" + ret1 + "</ul><br><br>");
                        } else {
                            var err = '';
                            if ( jret.error ) {
                                err = jret.error;
                            } else { 
                                err = jret.message;
                            }
                            document.getElementById('complaintForm').style.maxHeight = "none";
                            document.getElementById('complaintForm').style.overflow = "inherit";
                            document.getElementById('showLoading').innerHTML = saveLoading;
                            document.getElementById('showLoading').style.display = 'none';
                            msgAlert("An error was encountered while processing your complaint. Please review the information you submitted and enter any missing information to resubmit your form. If the issue persists, please contact the ROC webmaster at webmaster@roc.az.gov. We're sorry for any inconvenience.<br><br><small>Error Message: " + err + "</small>");
                        }
                    } else if ( complaintForm == 'recoveryFund' ) {
                        if ( !jret.error && !jret.errorCode ) {
                            $('#showLoading').append("<h2>Your Building Confidence Request has been received.</h2><br>");
                            $('#showLoading').append("<p>Thank you for your time and patience. We have entered your request into our records and an investigator will be assigned. If your request is missing any important information, someone will contact you to get the additional information. If you have any questions while waiting for our reply, please feel free to call us at 602-542-1525. Thank you.</p>");
                            $('#showLoading').append("<h4>Summary of Building Confidence Program Submission</h4><br>");
                            ret1 += "<li>Your Name: " + jret.Complainant_First_Name__c + ' ' + jret.Complainant_Last_Name__c + "</li>";
                            ret1 += "<li>Your Address: " + jret.Complainant_Mailing_Address__c + ', ' + jret.Complainant_City__c + ', ' + jret.Complainant_State_Prov__c + ' ' + jret.Complainant_Zip_Post_Code__c + "</li>";
                            ret1 += "<li>Your Phone Number: " + jret.Complainant_Phone_Main__c + "</li>";
                            ret1 += "<li>Your Email: " + jret.Complainant_Email__c + "</li>";
                            //if ( jret.Name_of_Attorney__c != '' && jret.Name_of_Attorney__c != null ) {
                            //    ret1 += "<li>Your Attorney: " + jret.Name_of_Attorney__c + ', ' + jret.Attorney_Street_Address__c + ', ' + jret.Attorney_City + ', ' + jret.Attorney_State__c + ' ' + jret.Attorney_Zip_Post_Code__c + "</li>";
                            //    ret1 += "<li>Your Attorney's Phone and Email: " + jret.Attorney_Phone_Number__c + ' ' + jret.Attorney_Email__c + "</li>";
                            //}
                            if ( jret.Name_of_the_Business__c != '' && jret.Name_of_the_Business__c != null ) { 
                                ret1 += "<li>Business Name: " + jret.Name_of_the_Business__c + "</li>"; 
                            }
                            ret1 += "<li>Contractor Name: " + jret.Respondent_Full_Name__c + "</li>";
                            if ( jret.Respondent_Street_Address__c != '' && jret.Respondent_Street_Address__c != null ) {
                                ret1 += "<li>Contractor Address (if known): " + jret.Respondent_Street_Address__c + ', ' + jret.Respondent_City__c + ' ' + jret.Respondent_State__c + ' ' + jret.Respondent_Zip_Post_Code__c + "</li>";
                            }
                            if ( jret.Respondent_Phone_Number__c != '' && jret.Respondent_Phone_Number__c != null ) {
                                ret1 += "<li>Contractor Phone and  Email (if known): " + jret.Respondent_Phone_Number__c + ' ' + jret.Respondent_Email__c + "</li>";
                            }
                            if ( jret.Contract_Date__c != '' && jret.Contract_Date__c != null ) {
                                ret1 += "<li>Contract Date: " + jret.Contract_Date__c + "</li>";
                                ret1 += "<li>Contract Amount: $ " + jret.Contract_Amount__c + "</li>";
                                ret1 += "<li>Amount Paid: $ " + jret.Amount_Paid__c + "</li>";
                            }
                            if ( jret.Date_Work_Started__c != '' && jret.Date_Work_Started__c != null ) { ret1 += "<li>Date Work Started: " + jret.Date_Work_Started__c + "</li>"; }
                            if ( jret.Date_Work_Stopped__c != '' && jret.Date_Work_Stopped__c != null ) { ret1 += "<li>Date Work Stopped: " + jret.Date_Work_Stopped__c + "</li>"; }
                            if ( jret.Date_Work_was_Completed__c != '' && jret.Date_Work_Was_Completed__c != null ) { ret1 += "<li>Date Work was Completed: " + jret.Date_Work_Was_Completed__c + "</li>"; }
                            
                            ret1 += "<li>Jobsite Address: " + jret.Jobsite_Street_Address__c + ', ' + jret.Jobsite_City + ', ' + jret.Jobsite_State__c + ' ' + jret.Jobsite_Zip_Post_Code__c + "</li>";
                            //if ( jret.This_complaint_is_for__c != 'Other' && jret.This_complaint_is_for__c != null ) {
                            //    ret1 += "<li>Complaint Reason: " + jret.This_complaint_is_for__c + "</li>";
                            //}
                            //if ( jret.This_project_involved__c != '' && jret.This_project_involved__c != null ) {
                            //    ret1 += "<li>Project Type: " + jret.This_project_involved__c + "</li>";
                            //}
                            if ( jret.Alleged_Violation__c != '' && jret.Alleged_Violation__c != null ) {
                                ret1 += "<li>Item(s) of Concern: " + jret.Alleged_Violation__c + "</li>";
                            }
                            ret1 += "<li>Temporary Request Id: " + jret.Id + "</li>";
                            $('#showLoading').append("<ul>" + ret1 + "</ul><br><br>");
                        } else {
                            var err = '';
                            if ( jret.error ) {
                                err = jret.error;
                            } else { 
                                err = jret.message;
                            }
                            document.getElementById('complaintForm').style.maxHeight = "none";
                            document.getElementById('complaintForm').style.overflow = "inherit";
                            document.getElementById('showLoading').innerHTML = saveLoading;
                            document.getElementById('showLoading').style.display = 'none';
                            msgAlert("An error was encountered while processing your request. Please review the information you submitted and enter any missing information to resubmit your form. If the issue persists, please contact the ROC webmaster at webmaster@roc.az.gov. We're sorry for any inconvenience.<br><br><small>Error Message: " + err + "</small>");
                        }
                    }
                    //document.getElementById('showLoading').innerHTML = ret1;
                }
            });
        }
        */
    }
}
function msgAlert ( msg ) {
    if ( msg.trim() != '' && document.getElementById('msgAlert') ) {
        document.getElementById('msgAlert').innerHTML = msg + '<br><small>Click anywhere to close this message.</small>';
        $('#msgAlert').show();
        var msgOpen = 1;
        $(document).mouseup(function(e){
            if ( $('#msgAlert') && msgOpen == 1 ) { $('#msgAlert').hide(); }
        });
    }
}
function updatePropOwner ( a ) {
    if ( a.toLowerCase() == 'yes' ) {
        if ( $('#Complainant_First_Name').val() != '' ) { $('#Property_Owner_First_Name').val($('#Complainant_First_Name').val()); }
        if ( $('#Complainant_Middle_Name').val() != '' ) { $('#Property_Owner_Middle_Name').val($('#Complainant_Middle_Name').val()); }
        if ( $('#Complainant_Last_Name').val() != '' ) { $('#Property_Owner_Last_Name').val($('#Complainant_Last_Name').val()); }
        if ( $('#Name_of_the_Business').val() != '' ) { $('#Property_Owner_Business').val($('#Name_of_the_Business').val()); }
        if ( $('#Complainant_Mailing_Address').val() != '' ) { $('#Property_Owner_Mailing_Address').val($('#Complainant_Mailing_Address').val()); }
        if ( $('#Complainant_City').val() != '' ) { $('#Property_Owner_City').val($('#Complainant_City').val()); }
        if ( $('#Complainant_State_Prov').val() != '' ) { $('#Property_Owner_State').val($('#Complainant_State_Prov').val()).change(); }
        if ( $('#Complainant_Zip_Post_Code').val() != '' ) { $('#Property_Owner_Zip_Post_Code').val($('#Complainant_Zip_Post_Code').val()); }
        if ( $('#Complainant_Phone_Main').val() != '' ) { $('#Phone_Number_of_Construction_Site_Owner').val($('#Complainant_Phone_Main').val()); }
        if ( $('#Complainant_Email').val() != '' ) { $('#Email_of_Construction_Site_Owner').val($('#Complainant_Email').val()); }
    } else {
        $('#Property_Owner_First_Name').val('');
        $('#Property_Owner_Middle_Name').val('');
        $('#Property_Owner_Last_Name').val('');
        $('#Property_Owner_Business').val('');
        $('#Property_Owner_Mailing_Address').val('');
        $('#Property_Owner_City').val('');
        $('#Property_Owner_State').val('').change();
        $('#Property_Owner_Zip_Post_Code').val('');
        $('#Phone_Number_of_Construction_Site_Owner').val('');
        $('#Email_of_Construction_Site_Owner').val('');
    }
}

function correlateOwnerToBackgroundCheck () {
    for ( i=0; i<100; i++ ) {
        if ( document.getElementById('OfficerPartner_First_Name__c' + i) != null ) {
            if ( document.getElementById('QP_Background_Check_Receipts__c' + i) != null ) {
                // then a background check receipt field exists for this owner/director/partner/member, so we don't need to do anything
            } else {
                // need to create a background check receipt for this owner/director/partner/member
                if ( document.getElementById('OfficerPartner_First_Name__c' + i).value != '' ) {
                    addMore('backgroundCheck','backgroundCheck',i,'');
                    if ( document.getElementById('QP_Background_Check_Receipts__c' + i) != null ) {
                        if ( document.getElementById('QP_Background_Check_Receipt_Name__c' + i) != null ) {
                            document.getElementById('QP_Background_Check_Receipt_Name__c' + i).innerHTML = document.getElementById('OfficerPartner_First_Name__c' + i).value + " " + document.getElementById('OfficerPartner_Middle_Name__c' + i).value + " " + document.getElementById('OfficerPartner_Last_Name__c' + i).value;
                        }
                    }
                }
            }
            /*
            if ( document.getElementById('additionalSignatures') != null ) {
                if ( document.getElementById('Signature' + i) != null ) {
                    // signature for this person exists, so no need to worry
                } else { 
                    var addSign = '<div class="formElement formElementFull"><label for="Signature' + i + '">' + document.getElementById('OfficerPartner_First_Name__c' + i).value + " " + document.getElementById('OfficerPartner_Middle_Name__c' + i).value + " " + document.getElementById('OfficerPartner_Last_Name__c' + i).value + ' Signature:</label><input id="Signature' + i + '" name="Signature' + i + '" type="text" value="" class="appFormRequired" /><br /></div>';
                    document.getElementById('additionalSignatures').innerHTML = document.getElementById('additionalSignatures').innerHTML + addSign;
                }
            }
            */
        }
    }
    if ( document.getElementById('QP_First_Name__c') != null ) {
        if ( document.getElementById('QP_Background_Check_Receipts__cQP') != null ) {
            // then a background check receipt field exists for this owner/director/partner/member, so we don't need to do anything
        } else {
            // need to create a background check receipt for this owner/director/partner/member
            //addMore('backgroundCheck','backgroundCheck',100,'');
            if ( document.getElementById('QP_Background_Check_Receipts__cQP') != null ) {
                if ( document.getElementById('QP_Background_Check_Receipt_Name__cQP') != null ) {
                    document.getElementById('QP_Background_Check_Receipt_Name__cQP').innerHTML = document.getElementById('QP_First_Name__c').value + " " + document.getElementById('QP_Middle_Name__c').value + " " + document.getElementById('QP_Last_Name__c').value;
                }
            }
        }
    }
}

function checkNameOwnerToBackgroundCheck () {
    for ( i=0; i<100; i++ ) {
        if ( document.getElementById('OfficerPartner_First_Name__c' + i) != null ) {
            if ( document.getElementById('OfficerPartner_First_Name__c' + i).value != '' && document.getElementById('QP_Background_Check_Receipts__c' + i) != null ) {
                if ( document.getElementById('QP_Background_Check_Receipt_Name__c' + i) != null ) {
                    document.getElementById('QP_Background_Check_Receipt_Name__c' + i).innerHTML = document.getElementById('OfficerPartner_First_Name__c' + i).value + " " + document.getElementById('OfficerPartner_Middle_Name__c' + i).value + " " + document.getElementById('OfficerPartner_Last_Name__c' + i).value;
                }
            }
        }
    }
    if ( document.getElementById('QP_First_Name__c') != null ) {
        if ( document.getElementById('QP_Background_Check_Receipts__cQP') != null ) {
            if ( document.getElementById('QP_Background_Check_Receipts__cQP') != null ) {
                if ( document.getElementById('QP_Background_Check_Receipt_Name__cQP') != null ) {
                    document.getElementById('QP_Background_Check_Receipt_Name__cQP').innerHTML = document.getElementById('QP_First_Name__c').value + " " + document.getElementById('QP_Middle_Name__c').value + " " + document.getElementById('QP_Last_Name__c').value;
                }
            }
        }
    }
}

function parseAndInsertSavedInfo ( sv ) {
    //console.log(sv);
    var sv1 = $.parseJSON(sv);
    var toCheckForOpen = [];
    $.each( sv1, function (index, element) {
        if ( index == 'lastStep' ) {
            formNav( element );
        } else { 
            if ( element != '' && element != null ) {
                //console.log(index + ' = ' + element);
                if ( index.indexOf('||') == -1 && index.indexOf('#') == -1 ) {
                    if ( !$('#'+index).length ) { // if element doesn't exist
                        if ( index.indexOf('OfficerPartner_First_Name__c') > -1 ) { // if it's an extra officer/partner field, add it
                            var num = index.replace('OfficerPartner_First_Name__c','');
                            if ( parseInt(num) < 99 ) { addMore('officerPartners','officerPartners',parseInt(num),''); }
                            //console.log('addMore(officerPartners,officerPartners,'+parseInt(num)+',);');
                        } else if ( index.indexOf('OOSL_State_License_Held_In__c') > -1 ) { // if it's an extra out of state license field, add it
                            var num = index.replace('OOSL_State_License_Held_In__c','');
                            var nums = num.split('_');
                            if ( nums[1] == undefined ) { nums[1] = ''; }
                            if ( parseInt(nums[0]) < 99 ) { addMore('ooStateLicense'+nums[0],'ooStateLicense',parseInt(nums[0]),parseInt(nums[1])); }
                            //console.log('addMore(ooStateLicense'+nums[0]+',ooStateLicense,'+parseInt(num[0])+','+parseInt(nums[1])+');');
                        } else if ( index.indexOf('OOSL_Past_Discipline_Dates__c') > -1 ) { // if it's an extra out of state discipline field, add it
                            var num = index.replace('OOSL_Past_Discipline_Dates__c','');
                            var nums = num.split('_');
                            if ( nums[1] == undefined ) { nums[1] = ''; }
                            if ( nums[2] != undefined ) { nums[0] = nums[0] + "_" + nums[1]; nums[1] = nums[2]; }
                            if ( parseInt(nums[0]) < 99 ) { addMore('subOOSDiscipline'+nums[0],'subOOSDiscipline',parseInt(nums[0]),parseInt(nums[1])); }
                            //console.log('addMore(subOOSDiscipline'+nums[0]+',subOOSDiscipline,'+parseInt(num[0])+','+parseInt(nums[1])+');');
                        } else if ( index.indexOf('Felony_Conviction_Date__c') > -1 ) { // if it's an extra felony field, add it
                            var num = index.replace('Felony_Conviction_Date__c','');
                            var nums = num.split('_');
                            if ( nums[1] == undefined ) { nums[1] = ''; }
                            if ( parseInt(nums[0]) < 99 ) { addMore('felonyConviction'+nums[0],'felonyConviction',parseInt(nums[0]),parseInt(nums[1])); }
                            //console.log('addMore(felonyConviction'+nums[0]+',felonyConviction,'+parseInt(num[0])+','+parseInt(nums[1])+');');
                        } else if ( index.indexOf('Unlicensed_Citation_Case_Number__c') > -1 ) { // if it's an extra unlicensed field, add it
                            var num = index.replace('Unlicensed_Citation_Case_Number__c','');
                            var nums = num.split('_');
                            if ( nums[1] == undefined ) { nums[1] = ''; }
                            if ( parseInt(nums[0]) < 99 ) { addMore('citedUnlicensed'+nums[0],'citedUnlicensed',parseInt(nums[0]),parseInt(nums[1])); }
                            //console.log('addMore(citedUnlicensed'+nums[0]+',citedUnlicensed,'+parseInt(num[0])+','+parseInt(nums[1])+');');
                        } else if ( index.indexOf('QP_Prior_Experience_Business_Name__c') > -1 ) { // if it's an extra prior experience field, add it
                            var num = index.replace('QP_Prior_Experience_Business_Name__c','');
                            if ( parseInt(num) < 99 ) { addMore('priorExperience','priorExperience',parseInt(num),''); }
                            //console.log('addMore(priorExperience,priorExperience,'+parseInt(num)+',);');
                        } else if ( index.indexOf('QP_Background_Check_Receipts__c') > -1 ) { // if it's an extra background check field, add it
                            var num = index.replace('QP_Background_Check_Receipts__c','');
                            if ( parseInt(num) < 99 ) { addMore('backgroundCheck','backgroundCheck',parseInt(num),''); }
                            //console.log('addMore(backgroundCheck,backgroundCheck,'+parseInt(num)+',);');
                        } else if ( index.indexOf('Bond_Type__c') > -1 ) { // if it's an extra background check field, add it
                            var num = index.replace('Bond_Type__c','');
                            if ( parseInt(num) < 99 ) { addMore('Bonds','Bonds',parseInt(num),''); }
                            openBondSubNum(sv1["Bond_Type__c"+num], num); 
                            hideSub('subNoBond'+num); 
                            openSub('subHaveBond'+num);
                            //console.log('openBondSubNum('+sv1["Bond_Type__c"+num]+', '+num+');');
                        } 
                        //setTimeout(function(){parseAndInsertSavedInfo(sv);}, 2000);
                    }
                }
                if ( $('#'+index).length && element != '' && element != null ) {
                    if ( $('#'+index).is(':file') ) { 
                        var tmpTxt = $('label[for=' + index +']').html();
                        $('label[for=' + index +']').html(tmpTxt + ' <em>File previously uploaded:</em> <a href="'+ element + '" target="_blank">View</a> | <a href="javascript:removePrevFile(\'' + index + '\');">Remove</a>');
                        $('#'+index).addClass('hide');
                        $('#'+index).get(0).type = 'text';
                        $('#'+index).val(element);
                    } 
                    $('#'+index).val(element);
                    if ( $('#' + index).is(':checkbox') ) {
                        var radios = $('input:checkbox[name="' + index + '"]');
                        if ( radios.is(':checked') === false ) {
                            radios.filter('[value="' + element + '"]').prop('checked',true);
                        }
                    }
                } else {
                    if ( element != '' && element != null ) {
                        $("input:radio[name="+index+"][value='"+element+"']").prop('checked',true);
                        //if ( $("input:checkbox[name='"+index+"']") ) {
                            var radios = $('input:checkbox[name="' + index + '"]');
                            if ( radios.is(':checked') === false ) {
                                radios.filter('[value="' + element + '"]').prop('checked',true);
                            }
                        //}
                        $("select[name='"+index+"']").each(function(){
                            $('#'+index + ' option[value=' + element + ']').attr('selected','selected');
                        });
                    }
                }
            }
        }
    });
    // now check to see if we have to open hidden divs
    toCheckForOpen[toCheckForOpen.length] = 'Licensed_in_Another_State';
    toCheckForOpen[toCheckForOpen.length] = 'OOSL_Past_Disciplinary_Record__c';
    toCheckForOpen[toCheckForOpen.length] = 'Been_Convicted_of_a_Felony__c';
    toCheckForOpen[toCheckForOpen.length] = 'Felony_Charge_Pending__c';
    toCheckForOpen[toCheckForOpen.length] = 'Been_Cited_for_Unlicensed__c';
    var lnk = window.location.href;
    if ( sv1["selectComplaintType"] != '' ) {
        selectCompType(sv1["selectComplaintType"]);
        setTimeout('reattemptSelectCompType()',5000);
    }
    if ( lnk.indexOf('ff=newApplication') > -1 ) { // || lnk.indexOf('ff=licenseApplication')
        if ( sv1["Ownership"] ) { checkOwnership(sv1["Ownership"]); }
        if ( sv1["Classifications_Chosen__c"] != '' && sv1["Classifications_Chosen__c"] != undefined ) { 
            var elm = sv1["Classifications_Chosen__c"];
            var sc = elm.split(",");
            for ( scc=0; scc<sc.length; scc++ ) { 
                chooseClassification(sc[scc]);
            } 
            if ( $('#step3inner .formStepSub') ) { $('#step3inner .formStepSub').css('display','block'); }
        }
        if ( sv1["Bond_Type__c1"] != '' ) { openBondSubNum(sv1["Bond_Type__c1"],1); hideSub('subNoBond1'); openSub('subHaveBond1'); }
        if ( sv1["Complete_Trade_Exams__c"] == 'Yes' ) { hideSub('didntCompletedTradeExam'); openSub('completedTradeExam'); }
        if ( sv1["Have_Bond__c"] == "Yes" ) { hideSub('subNoBond'); openSub('subHaveBond'); }
        if ( sv1["Have_Restricted_License_Code__c"] == "Yes" ) { hideSub('subNoRestrictedLic'); openSub('subRestrictedLic'); }
        if ( sv1["QP_Licensed_in_Another_State__c"] == "Yes" ) { openSub('QP_ooStateLicense'); }
        if ( sv1["QP_OOSL_Past_Disciplinary_Record__c"] == "Yes" ) { openSub('QP_subOOSDiscipline'); }
        if ( sv1["QP_Been_Convicted_of_a_Felony__c"] == "Yes" ) { openSub('QP_felonyConviction'); }
        if ( sv1["Felony_Charge_Pending__c"] == "Yes" ) { hideSub('sub'); openSub('QP_felonyConviction'); }
        if ( sv1["QP_Been_Cited_for_Unlicensed__c"] == "Yes" ) { openSub('QP_citedUnlicensed'); }
        if ( sv1["QP_Has_Prior_Experience__c"] == "Yes" ) { hideSub('priorExperienceRequired'); openSub('priorExperience'); }
        if ( sv1["QP_Have_Background_Check__c"] == "Yes" ) { hideSub('backgroundCheckNeeded'); openSub('backgroundCheck'); }
        if ( sv1["Cancel_Prior_License_Upon_Issuance__c"] == "Yes" ) { openSub('cancelUponIssuance'); }
        for ( i=0; i<toCheckForOpen.length; i++ ) {
            for ( ii=0; ii<21; ii++ ) {
                if ( $('input[name=' + toCheckForOpen[i] + ii + ']').length > 0 ) {
                    if ( $('input[name=' + toCheckForOpen[i] + ii + ']:selected').val() == 'Yes' || sv1[toCheckForOpen[i] + ii] == "Yes" ) { 
                        if ( toCheckForOpen[i] == 'Licensed_in_Another_State' ) {
                            openSub('ooStateLicense' + ii);
                            openSub('addMoreLinkooStateLicense' + ii);
                        } else if ( toCheckForOpen[i] == 'OOSL_Past_Disciplinary_Record__c' ) {
                            openSub('subOOSDiscipline' + ii);
                            openSub('addMoreLinksubOOSDiscipline' + ii);
                        } else if ( toCheckForOpen[i] == 'Been_Convicted_of_a_Felony__c' ) {
                            openSub('felonyConviction' + ii);
                        } else if ( toCheckForOpen[i] == 'Felony_Charge_Pending__c' ) {
                            openSub('felonyConviction' + ii);
                        } else if ( toCheckForOpen[i] == 'Been_Cited_for_Unlicensed__c' ) {
                            openSub('citedUnlicensed' + ii);
                            openSub('addMoreLinkcitedUnlicensed' + ii);
                        }
                    } 
                }
            }
        }
        correlateOwnerToBackgroundCheck();
        checkNameOwnerToBackgroundCheck();
    }
    if ( $('#appProgressBarHolder').length && $('#appProgressBar').length ) {
        generateProgressBar();
    }
}

function reattemptSelectCompType () {
    if ( document.getElementById("selectComplaintType") != null ) {
        selectCompType($("input[name=selectComplaintType]:checked").val());
    }
}

function removePrevFile ( index ) {
    if ( $('#'+index).is(':text') ) { 
        var tmpTxt = $('label[for=' + index +']').html();
        tmpTxt = tmpTxt.substr(0,tmpTxt.indexOf(' <em>File previously uploaded:</em>'));
        $('label[for=' + index +']').html(tmpTxt);
        $('#'+index).removeClass('hide');
        $('#'+index).val('');
        $('#'+index).get(0).type = 'file';
    } 
}

function showSavedForm () {
    if ( document.getElementById('showSaving') != null ){
        document.getElementById('showSaving').innerHTML = '';
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function saveForm ( formname, formuri, rsToken ) {
    buildArrayFromInputs();
    var previousAction = '';
    var previousTarget = '';
    if ( formname == '' || formuri == '' || rsToken == '' || formname == null || formuri == null || rsToken == null ) {
        formuri = getParameterByName('ff');
        if ( formuri == "newApplication" ) { formname = "appForm"; } else { formname = "complaintForm"; }
        rsToken = getParameterByName('restartForm');
    }
    //console.log('arrayFromInputs size: ' + Object.keys(arrayFromInputs).length);
    if ( Object.keys(arrayFromInputs).length > 0 ) {

        // change arrayFromInputs to string 
        var arrayFromInputsAsString = '';
        Object.keys(arrayFromInputs).forEach ( function ( key, index ) {
            arrayFromInputsAsString += key + '=' + arrayFromInputs[key] + '&';
        }, arrayFromInputs);
        //console.log(arrayFromInputsAsString);
        var arrayFromInputsSerialized = $(":input").serializeArray();
        if ( document.getElementById('showSaving') != null ){
            document.getElementById('showSaving').innerHTML = '<br>Saving your form...';
        }
        $.ajax({
            type: 'GET',
            url: '/sfapi?sf=saveForm&formname=' + formname + '&ff=' + formuri + '&restartForm=' + rsToken + '&lastStep=' + lastStep + '&' + arrayFromInputsAsString,
            //data: jQuery.param(arrayFromInputsSerialized),
            //data: arrayFromInputsAsString,
            dataType: 'json'
        }).success( function (data) {
            //console.log(data);
            if ( data.responseText.indexOf('Form Saved') > -1 ) { 
                if ( document.getElementById('showSaving') != null ){
                    document.getElementById('showSaving').innerHTML = '<br>Form Saved!';
                } 
            } else { 
                if ( document.getElementById('showSaving') != null ){
                    document.getElementById('showSaving').innerHTML = '<br>Error - Form not saved!';
                } 
            }
        }).error( function (data) {
            //console.log(data);
            if ( data.responseText.indexOf('Form Saved') > -1 ) { 
                if ( document.getElementById('showSaving') != null ){
                    document.getElementById('showSaving').innerHTML = '<br>Form Saved!';
                } 
            } else { 
                if ( document.getElementById('showSaving') != null ){
                    document.getElementById('showSaving').innerHTML = '<br>Error - Form not saved!';
                } 
            }
        });
        setTimeout('showSavedForm()',10000);

    } else { // arrayFromInputs not working, run it the other way instead
        
        // this is where we'll run the post to the API page stored in the drupal plugin
        if ( document.getElementById( formname ) != null ) {
            previousAction = document.forms[ formname ].action;
            previousTarget = document.forms[ formname ].target;
            if ( previousTarget == '' || previousTarget == undefined ) { previousTarget = '_self'; } 
            document.forms[ formname ].action = '/sfapi?sf=saveForm&formname=' + formname + '&ff=' + formuri + '&restartForm=' + rsToken + '&lastStep=' + lastStep;
            document.forms[ formname ].target = 'formSubWin'; //'_blank';
            document.forms[ formname ].submit();
            document.forms[ formname ].submit();
            setTimeout('checkForCaptcha()',2000);
            //setTimeout("document.complaintForm['" + formname + "'].submit()",1000);
            if ( document.getElementById('showSaving') != null ){
                document.getElementById('showSaving').innerHTML = '<br>Saving your form...';
            }
            if ( formuri == null || formuri == '' ){
                formuri = window.location.href;
            }
            if ( document.getElementById('formSubWin') != null ) {
                var iframe = document.getElementById('formSubWin');
                var vv = 0;
                while ( iframe.innerHTML == '' && vv < 10000 ) {
                    // do nothing, just wait
                    vv++;
                    if ( vv == 2000 ) {
                        document.forms[ formname ].submit();
                        setTimeout('checkForCaptcha()',2000);
                    }
                }
                iframe.addEventListener("load", function () {
                    setTimeout('checkForCaptcha()',2000);
                    if ( document.getElementById('showSaving') != null ){
                        var ret = iframe.contentWindow.document.body.innerHTML;
                        if ( ret.indexOf('Form Saved') > -1 ) { 
                            if ( document.getElementById('showSaving') != null ){
                                document.getElementById('showSaving').innerHTML = '<br>Form Saved!';
                            } 
                        } else { 
                            if ( document.getElementById('showSaving') != null ){
                                checkForCaptcha();
                                document.getElementById('showSaving').innerHTML = '<br>Error - Form not saved!';
                            } 
                        }
                    }
                    setTimeout('showSavedForm()',10000);
                });
            }
            document.forms[ formname ].action = previousAction;
            document.forms[ formname ].target = previousTarget; //'_blank';
        }
    }
}

function getComplaintStatus() {
    if ( document.getElementById('complaintId') != null ) {
        var cid = document.getElementById('complaintId').value;
        window.location = 'https://' + window.location.host + '/sfapi?ff=pendingComplaintStatus&complaintId=' + cid;
    }
}

function getAppStatus() {
    if ( document.getElementById('appId') != null ) {
        var cid = document.getElementById('appId').value;
        window.location = 'https://' + window.location.host + '/sfapi?ff=pendingAppStatus&appId=' + cid;
    }
}

function ammendComplaint () {
    // this is where we'll run the post to the API page stored in the drupal plugin
    if ( document.getElementById('addAmendment') != null ) {
        document.getElementById('addAmendment').style.maxHeight = "0px";
        document.getElementById('addAmendment').style.overflow = "hidden";
        document.addAmendment.action = '/sfapi?ff=pendingComplaintStatus&fff=ammendComplaint&complaintId=' + document.getElementById('complaintId').value;
        document.addAmendment.target = 'formSubWin'; //'_blank';
        //document.addAmendment.submit();
        setTimeout('document.addAmendment.submit()',1000);
        if ( document.getElementById('showLoading') != null ){
            //document.getElementById('showLoading').style.display = 'block';
            $('#showLoading').removeClass('hide');
            smoothScrollTo('page-title');
        }
        if ( document.getElementById('formSubWin') != null ) {
            var iframe = document.getElementById('formSubWin');
            var vv = 0;
            while ( iframe.innerHTML == '' && vv < 10000 ) {
                // do nothing, just wait
                vv++;
                if ( vv == 2000 ) {
                    document.addAmendment.submit();
                }
            }
            iframe.addEventListener("load", function () {
                if ( document.getElementById('showLoading') != null ){
                    var ret = iframe.contentWindow.document.body.innerHTML;
                    //ret = ret.substr(ret.indexOf("<body") + 5);
                    //ret = ret.substr(0,(ret.indexOf("/body>")-1));
                    //iframe.innerHTML = ret;
                    //alert(ret);
                    if ( ret.indexOf('[{"attributes"') > -1 ) { ret = ret.substring(ret.indexOf('[{"attributes"')); } else { ret = ret.substring(ret.indexOf('[{"errorCode"')); }
                    ret = ret.substring(0, (ret.indexOf('}]') + 2));
                    //alert(ret);
                    //ret = ret.replace("[","");
                    //ret = ret.replace("]","");
                    //console.log(ret);
                    var ret1 = "";
                    var jret1 = $.parseJSON(ret);
                    var jret = jret1[0];
                    //console.log(jret);
                    $('#showLoading').empty();
                    if ( !jret.error && !jret.errorCode ) {
                        $('#showLoading').append("<h2>Your Complaint Amendment has been Added.</h2><br>");
                        $('#showLoading').append("<p>It will be added to the complaint record and your representative will contact you.</p>");
                    } else {
                        var err = '';
                        if ( jret.error ) {
                            err = jret.error;
                        } else { 
                            err = jret.message;
                        }
                        document.getElementById('addAmendment').style.maxHeight = "none";
                        document.getElementById('addAmendment').style.overflow = "inherit";
                        msgAlert("An error was encountered while processing your request. Please review the information you submitted and enter any missing information to resubmit your form. If the issue persists, please contact the ROC webmaster at webmaster@roc.az.gov. We're sorry for any inconvenience.<br><br><small>Error Message: " + err + "</small>");
                    }
                }
                //document.getElementById('showLoading').innerHTML = ret1;
            });
        }
    }
}

var sessionTime = 3000000;

function sessionCountdown () {
    sessionTime = sessionTime - 30000;
    if ( sessionTime <= 30000 ) {
        msgAlert("Your session will expire soon. We suggest saving the form you're working on and refreshing this page.");
    }
}

var unlic = [];
var cols = ['Individual','Doing Business As','Location','Adjudicated Date','Found Issues','Fine','Restitution','ROC Civil Fine'];
var sortState = ['asc','','','','','','',''];
var plic = [];
var pcols = ['Business Name','Doing Business As','Address','Address2','City','State','Zip','Receipt Number','Class','Application Date','Qualifying Party','Members'];
var psortState = ['asc','','','','','','','','','','',''];
var nlic = [];
var ncols = ['License No','Business Name','Doing Business As','Address','Address2','City','State','Zip','Qualifying Party','Class','Class Detail','Issued Date','Expiration Date','Status'];
var nsortState = ['','asc','','','','','','','','','','','',''];
var dlic = [];
var dcols = ['License No','Business Name','Doing Business As','Address','Address2','City','State','Zip','Qualifying Party','Class','Class Detail','Issued Date','Expiration Date','Status'];
var dsortState = ['','asc','','','','','','','','','','','',''];

function setHeaderRow () { 
	if ( document.getElementById('ctrlist') != null ) { 
		var th = "";
		th += '<th onclick="setSortState(0);">Individual <span id="dir0">&#x25B2;</span></th>';
		th += '<th onclick="setSortState(1);">Doing Business As <span id="dir1"></span></th>';
		th += '<th onclick="setSortState(2);">Location <span id="dir2"></span></th>';
		th += '<th onclick="setSortState(3);">Adjudicated Date <span id="dir3"></span></th>';
		th += '<th onclick="setSortState(4);">Found Issues <span id="dir4"></span></th>';
		th += '<th onclick="setSortState(5);">Fine <span id="dir5"></span></th>';
		th += '<th onclick="setSortState(6);">Restitution <span id="dir6"></span></th>';
		th += '<th onclick="setSortState(7);">ROC Civil Fine <span id="dir7"></span></th>';
		$("#ctrlist tr:first-child").html( th );
	}
}
function setHeaderRowP () { 
	if ( document.getElementById('ctrlistP') != null ) { 
		var th = "";
		th += '<th onclick="setSortStateP(0);">Business Name <span id="pdir0">&#x25B2;</span></th>';
		th += '<th onclick="setSortStateP(1);">Doing Business As <span id="pdir1"></span></th>';
		th += '<th onclick="setSortStateP(2);">Address <span id="pdir2"></span></th>';
		th += '<th onclick="setSortStateP(3);">Address (2) <span id="pdir3"></span></th>';
		th += '<th onclick="setSortStateP(4);">City <span id="pdir4"></span></th>';
		th += '<th onclick="setSortStateP(5);">State <span id="pdir5"></span></th>';
		th += '<th onclick="setSortStateP(6);">Zip <span id="pdir6"></span></th>';
		th += '<th onclick="setSortStateP(7);">Receipt Number <span id="pdir7"></span></th>';
		th += '<th onclick="setSortStateP(8);">Class <span id="pdir8"></span></th>';
		th += '<th onclick="setSortStateP(9);">Application Date <span id="pdir9"></span></th>';
		th += '<th onclick="setSortStateP(10);">Qualifying Party <span id="pdir10"></span></th>';
		th += '<th onclick="setSortStateP(11);">Members <span id="pdir11"></span></th>';
		$("#ctrlistP tr:first-child").html( th );
	}
}
function setHeaderRowN () { 
	if ( document.getElementById('ctrlistN') != null ) { 
		var th = "";
        th += '<th onclick="setSortStateN(0);">License No <span id="ndir0"></span></th>';
		th += '<th onclick="setSortStateN(1);">Business Name <span id="ndir1">&#x25B2;</span></th>';
		th += '<th onclick="setSortStateN(2);">Doing Business As <span id="ndir2"></span></th>';
		th += '<th onclick="setSortStateN(3);">Address <span id="ndir3"></span></th>';
		th += '<th onclick="setSortStateN(4);">Address (2) <span id="ndir4"></span></th>';
		th += '<th onclick="setSortStateN(5);">City <span id="ndir5"></span></th>';
		th += '<th onclick="setSortStateN(6);">State <span id="ndir6"></span></th>';
		th += '<th onclick="setSortStateN(7);">Zip <span id="ndir7"></span></th>';
		th += '<th onclick="setSortStateN(8);">Qualifying Party <span id="ndir8"></span></th>';
		th += '<th onclick="setSortStateN(9);">Class <span id="ndir9"></span></th>';
		th += '<th onclick="setSortStateN(10);">Class Detail <span id="ndir10"></span></th>';
		th += '<th onclick="setSortStateN(11);">Issued Date <span id="ndir11"></span></th>';
		th += '<th onclick="setSortStateN(12);">Expiration Date <span id="ndir12"></span></th>';
		th += '<th onclick="setSortStateN(13);">Status <span id="ndir13"></span></th>';
		$("#ctrlistN tr:first-child").html( th );
	}
}
function setHeaderRowD () { 
	if ( document.getElementById('ctrlistD') != null ) { 
		var th = "";
        th += '<th onclick="setSortStateD(0);">Business Name <span id="ddir0"></span></th>';
		th += '<th onclick="setSortStateD(1);">Doing Business As <span id="ddir1">&#x25B2;</span></th>';
		th += '<th onclick="setSortStateD(2);">Address <span id="ddir2"></span></th>';
		//th += '<th onclick="setSortStateD(3);">Address (2) <span id="ddir3"></span></th>';
		th += '<th onclick="setSortStateD(4);">City <span id="ddir4"></span></th>';
		th += '<th onclick="setSortStateD(5);">State <span id="ddir5"></span></th>';
		th += '<th onclick="setSortStateD(6);">Zip <span id="ddir6"></span></th>';
		th += '<th onclick="setSortStateD(7);">License No. <span id="ddir7"></span></th>';
		th += '<th onclick="setSortStateD(8);">License Classification <span id="ddir8"></span></th>';
		th += '<th onclick="setSortStateD(9);">Case Number <span id="ddir9"></span></th>';
		th += '<th onclick="setSortStateD(10);">Description <span id="ddir13"></span></th>';
		$("#ctrlistD tr:first-child").html( th );
	}
}

window.onload = setHeaderRow();
setTimeout('setHeaderRow',5000);
window.onload = setHeaderRowP();
setTimeout('setHeaderRowP',5000);
window.onload = setHeaderRowN();
setTimeout('setHeaderRowN',5000);
window.onload = setHeaderRowD();
setTimeout('setHeaderRowD',5000);

function setSortState ( col ) { 
	if ( sortState[ col ] != undefined ) {
		if ( sortState[ col ] == '' ) { 
			sortState[ col ] = 'asc'; 
			sortUnlicList( col ,'asc');
			if ( document.getElementById('dir' + col) != null ) {
				document.getElementById('dir' + col).innerHTML = '&#x25B2;';
			}
		} else if ( sortState[ col ] == 'asc' ) { 
			sortState[ col ] = 'desc'; 
			sortUnlicList( col ,'desc');
			if ( document.getElementById('dir' + col) != null ) {
				document.getElementById('dir' + col).innerHTML = '&#x25BC;';
			}
		} else { 
			sortState[ col ] = 'asc'; 
			sortUnlicList( col ,'asc');
			if ( document.getElementById('dir' + col) != null ) {
				document.getElementById('dir' + col).innerHTML = '&#x25B2;';
			}
		}
	} 
	for ( i = 0; i < cols.length; i++ ) { 
		if ( i != col ) { 
			if ( document.getElementById('dir' + i) != null ) {
				document.getElementById('dir' + i).innerHTML = '';
			} 
			sortState[i] = '';
		} 
	}
}
function setSortStateP ( col ) { 
	if ( psortState[ col ] != undefined ) {
		if ( psortState[ col ] == '' ) { 
			psortState[ col ] = 'asc'; 
			sortPendingList( col ,'asc');
			if ( document.getElementById('pdir' + col) != null ) {
				document.getElementById('pdir' + col).innerHTML = '&#x25B2;';
			}
		} else if ( psortState[ col ] == 'asc' ) { 
			psortState[ col ] = 'desc'; 
			sortPendingList( col ,'desc');
			if ( document.getElementById('pdir' + col) != null ) {
				document.getElementById('pdir' + col).innerHTML = '&#x25BC;';
			}
		} else { 
			psortState[ col ] = 'asc'; 
			sortPendingList( col ,'asc');
			if ( document.getElementById('pdir' + col) != null ) {
				document.getElementById('pdir' + col).innerHTML = '&#x25B2;';
			}
		}
	} 
	for ( i = 0; i < pcols.length; i++ ) { 
		if ( i != col ) { 
			if ( document.getElementById('pdir' + i) != null ) {
				document.getElementById('pdir' + i).innerHTML = '';
			} 
			psortState[i] = '';
		} 
	}
}
function setSortStateN ( col ) { 
	if ( nsortState[ col ] != undefined ) {
		if ( nsortState[ col ] == '' ) { 
			nsortState[ col ] = 'asc'; 
			sortNewList( col ,'asc');
			if ( document.getElementById('ndir' + col) != null ) {
				document.getElementById('ndir' + col).innerHTML = '&#x25B2;';
			}
		} else if ( nsortState[ col ] == 'asc' ) { 
			nsortState[ col ] = 'desc'; 
			sortNewList( col ,'desc');
			if ( document.getElementById('ndir' + col) != null ) {
				document.getElementById('ndir' + col).innerHTML = '&#x25BC;';
			}
		} else { 
			nsortState[ col ] = 'asc'; 
			sortNewList( col ,'asc');
			if ( document.getElementById('ndir' + col) != null ) {
				document.getElementById('ndir' + col).innerHTML = '&#x25B2;';
			}
		}
	} 
	for ( i = 0; i < ncols.length; i++ ) { 
		if ( i != col ) { 
			if ( document.getElementById('ndir' + i) != null ) {
				document.getElementById('ndir' + i).innerHTML = '';
			} 
			nsortState[i] = '';
		} 
	}
}
function setSortStateD ( col ) { 
	if ( dsortState[ col ] != undefined ) {
		if ( dsortState[ col ] == '' ) { 
			dsortState[ col ] = 'asc'; 
			sortDiscList( col ,'asc');
			if ( document.getElementById('ddir' + col) != null ) {
				document.getElementById('ddir' + col).innerHTML = '&#x25B2;';
			}
		} else if ( dsortState[ col ] == 'asc' ) { 
			dsortState[ col ] = 'desc'; 
			sortDiscList( col ,'desc');
			if ( document.getElementById('ddir' + col) != null ) {
				document.getElementById('ddir' + col).innerHTML = '&#x25BC;';
			}
		} else { 
			dsortState[ col ] = 'asc'; 
			sortDiscList( col ,'asc');
			if ( document.getElementById('ddir' + col) != null ) {
				document.getElementById('ddir' + col).innerHTML = '&#x25B2;';
			}
		}
	} 
	for ( i = 0; i < dcols.length; i++ ) { 
		if ( i != col ) { 
			if ( document.getElementById('ddir' + i) != null ) {
				document.getElementById('ddir' + i).innerHTML = '';
			} 
			dsortState[i] = '';
		} 
	}
}

function buildUnlicList () { 
	if ( document.getElementById('ctrlist') != null ) {
		var tbl = document.getElementById('ctrlist');
		var trc = 0;
		$('#ctrlist tr').each(function(){
			var tdc = 0;
			unlic[trc] = [];
			$(this).find('td').each(function(){
				unlic[trc][tdc] = $(this).html();
				if ( tdc == 3 ) { 
					if ( unlic[trc][tdc].indexOf("../index.html") > -1 ) { 
						var darr = unlic[trc][tdc].split("../index.html");
						unlic[trc][tdc] = darr[2] + "/" + darr[0] + "/" + darr[1];
					} 
				}
				tdc = tdc + 1;
			});
			trc = trc + 1;
		});
	}
}
function buildPendingList () { 
	if ( document.getElementById('ctrlistP') != null ) {
		var tbl = document.getElementById('ctrlistP');
		var trc = 0;
		$('#ctrlistP tr').each(function(){
			var tdc = 0;
			plic[trc] = [];
			$(this).find('td').each(function(){
				plic[trc][tdc] = $(this).html();
				if ( tdc == 3 ) { 
					if ( plic[trc][tdc].indexOf("../index.html") > -1 ) { 
						var darr = plic[trc][tdc].split("../index.html");
						plic[trc][tdc] = darr[2] + "/" + darr[0] + "/" + darr[1];
					} 
				}
				tdc = tdc + 1;
			});
			trc = trc + 1;
		});
	}
}
function buildNewList () { 
	if ( document.getElementById('ctrlistN') != null ) {
		var tbl = document.getElementById('ctrlistN');
		var trc = 0;
		$('#ctrlistN tr').each(function(){
			var tdc = 0;
			nlic[trc] = [];
			$(this).find('td').each(function(){
				nlic[trc][tdc] = $(this).html();
				if ( tdc == 3 ) { 
					if ( nlic[trc][tdc].indexOf("../index.html") > -1 ) { 
						var darr = nlic[trc][tdc].split("../index.html");
						nlic[trc][tdc] = darr[2] + "/" + darr[0] + "/" + darr[1];
					} 
				}
				tdc = tdc + 1;
			});
			trc = trc + 1;
		});
	}
}
function buildDiscList () { 
	if ( document.getElementById('ctrlistD') != null ) {
		var tbl = document.getElementById('ctrlistD');
		var trc = 0;
		$('#ctrlistD tr').each(function(){
			var tdc = 0;
			dlic[trc] = [];
			$(this).find('td').each(function(){
				dlic[trc][tdc] = $(this).html();
				if ( tdc == 3 ) { 
					if ( dlic[trc][tdc].indexOf("../index.html") > -1 ) { 
						var darr = dlic[trc][tdc].split("../index.html");
						dlic[trc][tdc] = darr[2] + "/" + darr[0] + "/" + darr[1];
					} 
				}
				tdc = tdc + 1;
			});
			trc = trc + 1;
		});
	}
}

function writeUnlicList ( arr ) { 
	var narr = '<tr></tr>'; //<tr><th>Individual</th><th>Doing Business As</th><th>Location</th><th>Adjudicated Date</th><th>Found Issues</th><th>Fine</th><th>Restitution</th><th>ROC Civil Fine</th></tr>';
	if ( Array.isArray(arr) && arr.length > 0 ) { 
		for ( i = 0; i < arr.length; i++ ) { 
			if ( Array.isArray(arr[i]) ) {
			     if ( arr[i][2] != undefined && arr[i][0] != undefined && arr[i][0].trim() != "Individual" ) { 	
				narr += "<tr><td>" + arr[i][0] + "</td><td>" + arr[i][1] + "</td><td>" + arr[i][2] + "</td><td>" + arr[i][3] + "</td><td>" + arr[i][4] + "</td><td>" + arr[i][5] + "</td><td>" + arr[i][6] + "</td><td>" + arr[i][7] + "</td></tr>";
			     }
			}
		}
	}
	return narr;
}
function writePendingList ( arr ) { 
	var narr = '<tr></tr>'; //<tr><th>Individual</th><th>Doing Business As</th><th>Location</th><th>Adjudicated Date</th><th>Found Issues</th><th>Fine</th><th>Restitution</th><th>ROC Civil Fine</th></tr>';
	if ( Array.isArray(arr) && arr.length > 0 ) { 
		for ( i = 0; i < arr.length; i++ ) { 
			if ( Array.isArray(arr[i]) ) {
			     if ( arr[i][2] != undefined && arr[i][0] != undefined && arr[i][0].trim() != "Business Name" ) { 	
				narr += "<tr><td>" + arr[i][0] + "</td><td>" + arr[i][1] + "</td><td>" + arr[i][2] + "</td><td>" + arr[i][3] + "</td><td>" + arr[i][4] + "</td><td>" + arr[i][5] + "</td><td>" + arr[i][6] + "</td><td>" + arr[i][7] + "</td><td>" + arr[i][8] + "</td><td>" + arr[i][9] + "</td><td>" + arr[i][10] + "</td><td>" + arr[i][11] + "</td></tr>";
			     }
			}
		}
	}
	return narr;
}
function writeNewList ( arr ) { 
	var narr = '<tr></tr>'; //<tr><th>Individual</th><th>Doing Business As</th><th>Location</th><th>Adjudicated Date</th><th>Found Issues</th><th>Fine</th><th>Restitution</th><th>ROC Civil Fine</th></tr>';
	if ( Array.isArray(arr) && arr.length > 0 ) { 
		for ( i = 0; i < arr.length; i++ ) { 
			if ( Array.isArray(arr[i]) ) {
			     if ( arr[i][2] != undefined && arr[i][0] != undefined && arr[i][0].trim() != "Business Name" ) { 	
				narr += "<tr><td>" + arr[i][0] + "</td><td>" + arr[i][1] + "</td><td>" + arr[i][2] + "</td><td>" + arr[i][3] + "</td><td>" + arr[i][4] + "</td><td>" + arr[i][5] + "</td><td>" + arr[i][6] + "</td><td>" + arr[i][7] + "</td><td>" + arr[i][8] + "</td><td>" + arr[i][9] + "</td><td>" + arr[i][10] + "</td><td>" + arr[i][11] + "</td><td>" + arr[i][12] + "</td><td>" + arr[i][13] + "</td></tr>";
			     }
			}
		}
	}
	return narr;
}
function writeDiscList ( arr ) { 
	var narr = '<tr></tr>'; //<tr><th>Individual</th><th>Doing Business As</th><th>Location</th><th>Adjudicated Date</th><th>Found Issues</th><th>Fine</th><th>Restitution</th><th>ROC Civil Fine</th></tr>';
	if ( Array.isArray(arr) && arr.length > 0 ) { 
		for ( i = 0; i < arr.length; i++ ) { 
			if ( Array.isArray(arr[i]) ) {
			     if ( arr[i][2] != undefined && arr[i][0] != undefined && arr[i][0].trim() != "Business Name" ) { 	
				narr += "<tr><td>" + arr[i][0] + "</td><td>" + arr[i][1] + "</td><td>" + arr[i][2] + "</td><td>" + arr[i][3] + "</td><td>" + arr[i][4] + "</td><td>" + arr[i][5] + "</td><td>" + arr[i][6] + "</td><td>" + arr[i][7] + "</td><td>" + arr[i][8] + "</td><td>" + arr[i][9] + "</td></tr>";
			     } // <td>" + arr[i][3] + "</td>
			}
		}
	}
	return narr;
}

function sortUnlicList ( itm, dir ) { 
	if ( !Array.isArray(unlic) ) { 
		unlic = []; 
		buildUnlicList();
	} 
	if ( unlic.length == 0 ) { 
		buildUnlicList();
	} 
	if ( dir == 'desc' ) { 
		unlic.sort(function(a,b){ 
			if ( a[ itm ] == undefined ) { a[ itm ] = ""; }
			if ( b[ itm ] == undefined ) { b[ itm ] = ""; }
			if ( a[ itm ].toLowerCase() < b[ itm ].toLowerCase() ) { 
				return 1; 
			} else if ( a[ itm ].toLowerCase() > b[ itm ].toLowerCase() ) {
				return -1;
			} else { 
				return 0;
			}
		});
	} else { 
		unlic.sort(function(a,b){  
			if ( a[ itm ] == undefined ) { a[ itm ] = ""; }
			if ( b[ itm ] == undefined ) { b[ itm ] = ""; }
			if ( a[ itm ].toLowerCase() < b[ itm ].toLowerCase() ) { 
				return -1; 
			} else if ( a[ itm ].toLowerCase() > b[ itm ].toLowerCase() ) {
				return 1;
			} else { 
				return 0;
			}
		});
	} 
    $("#ctrlist").html( writeUnlicList(unlic) );
    setHeaderRow();
}

function sortPendingList ( itm, dir ) { 
	if ( !Array.isArray(plic) ) { 
		plic = []; 
		buildPendingList();
	} 
	if ( plic.length == 0 ) { 
		buildPendingList();
	} 
	if ( dir == 'desc' ) { 
		plic.sort(function(a,b){ 
			if ( a[ itm ] == undefined ) { a[ itm ] = ""; }
			if ( b[ itm ] == undefined ) { b[ itm ] = ""; }
			if ( a[ itm ].toLowerCase() < b[ itm ].toLowerCase() ) { 
				return 1; 
			} else if ( a[ itm ].toLowerCase() > b[ itm ].toLowerCase() ) {
				return -1;
			} else { 
				return 0;
			}
		});
	} else { 
		plic.sort(function(a,b){  
			if ( a[ itm ] == undefined ) { a[ itm ] = ""; }
			if ( b[ itm ] == undefined ) { b[ itm ] = ""; }
			if ( a[ itm ].toLowerCase() < b[ itm ].toLowerCase() ) { 
				return -1; 
			} else if ( a[ itm ].toLowerCase() > b[ itm ].toLowerCase() ) {
				return 1;
			} else { 
				return 0;
			}
		});
	} 
    $("#ctrlistP").html( writePendingList(plic) );
    setHeaderRowP();
}

function sortNewList ( itm, dir ) { 
	if ( !Array.isArray(plic) ) { 
		nlic = []; 
		buildNewList();
	} 
	if ( nlic.length == 0 ) { 
		buildNewList();
	} 
	if ( dir == 'desc' ) { 
		nlic.sort(function(a,b){ 
			if ( a[ itm ] == undefined ) { a[ itm ] = ""; }
			if ( b[ itm ] == undefined ) { b[ itm ] = ""; }
			if ( a[ itm ].toLowerCase() < b[ itm ].toLowerCase() ) { 
				return 1; 
			} else if ( a[ itm ].toLowerCase() > b[ itm ].toLowerCase() ) {
				return -1;
			} else { 
				return 0;
			}
		});
	} else { 
		nlic.sort(function(a,b){  
			if ( a[ itm ] == undefined ) { a[ itm ] = ""; }
			if ( b[ itm ] == undefined ) { b[ itm ] = ""; }
			if ( a[ itm ].toLowerCase() < b[ itm ].toLowerCase() ) { 
				return -1; 
			} else if ( a[ itm ].toLowerCase() > b[ itm ].toLowerCase() ) {
				return 1;
			} else { 
				return 0;
			}
		});
	} 
    $("#ctrlistN").html( writeNewList(nlic) );
    setHeaderRowN();
}

function sortDiscList ( itm, dir ) { 
	if ( !Array.isArray(plic) ) { 
		dlic = []; 
		buildDiscList();
	} 
	if ( dlic.length == 0 ) { 
		buildDiscList();
	} 
	if ( dir == 'desc' ) { 
		dlic.sort(function(a,b){ 
			if ( a[ itm ] == undefined ) { a[ itm ] = ""; }
			if ( b[ itm ] == undefined ) { b[ itm ] = ""; }
			if ( a[ itm ].toLowerCase() < b[ itm ].toLowerCase() ) { 
				return 1; 
			} else if ( a[ itm ].toLowerCase() > b[ itm ].toLowerCase() ) {
				return -1;
			} else { 
				return 0;
			}
		});
	} else { 
		dlic.sort(function(a,b){  
			if ( a[ itm ] == undefined ) { a[ itm ] = ""; }
			if ( b[ itm ] == undefined ) { b[ itm ] = ""; }
			if ( a[ itm ].toLowerCase() < b[ itm ].toLowerCase() ) { 
				return -1; 
			} else if ( a[ itm ].toLowerCase() > b[ itm ].toLowerCase() ) {
				return 1;
			} else { 
				return 0;
			}
		});
	} 
    $("#ctrlistD").html( writeDiscList(dlic) );
    setHeaderRowD();
}

function resetUnlicList () {
	$('#ctrlist .hide').each(function(){
		$(this).removeClass('hide');
	});
	if ( document.getElementById('ctrlist') != null ) {
		var tbl = document.getElementById('ctrlist');
		// clear all previous highlights
		tbl.innerHTML = tbl.innerHTML.split('<strong>').join(''); 
		tbl.innerHTML = tbl.innerHTML.split('</strong>').join('');
	}
	document.getElementById('searchTerm').value = "";
}

function resetPendingList () {
	$('#ctrlistP .hide').each(function(){
		$(this).removeClass('hide');
	});
	if ( document.getElementById('ctrlistP') != null ) {
		var tbl = document.getElementById('ctrlistP');
		// clear all previous highlights
		tbl.innerHTML = tbl.innerHTML.split('<strong>').join(''); 
		tbl.innerHTML = tbl.innerHTML.split('</strong>').join('');
	}
	document.getElementById('searchPendingTerm').value = "";
}

function resetNewList () {
	$('#ctrlistN .hide').each(function(){
		$(this).removeClass('hide');
	});
	if ( document.getElementById('ctrlistN') != null ) {
		var tbl = document.getElementById('ctrlistN');
		// clear all previous highlights
		tbl.innerHTML = tbl.innerHTML.split('<strong>').join(''); 
		tbl.innerHTML = tbl.innerHTML.split('</strong>').join('');
	}
	document.getElementById('searchNewTerm').value = "";
}

function resetDiscList () {
	$('#ctrlistD .hide').each(function(){
		$(this).removeClass('hide');
	});
	if ( document.getElementById('ctrlistD') != null ) {
		var tbl = document.getElementById('ctrlistD');
		// clear all previous highlights
		tbl.innerHTML = tbl.innerHTML.split('<strong>').join(''); 
		tbl.innerHTML = tbl.innerHTML.split('</strong>').join('');
	}
	document.getElementById('searchDiscTerm').value = "";
}

function searchUnlicList () { 
    var sf = document.getElementById('searchTerm').value;
    sf = sf.trim();
    var errMsg = '';
    if ( sf.length > 2 ) { 
        if ( document.getElementById('ctrlist') != null ) {
            var tbl = document.getElementById('ctrlist');
            // clear all previous highlights
            tbl.innerHTML = tbl.innerHTML.split('<strong>').join(''); 
            tbl.innerHTML = tbl.innerHTML.split('</strong>').join(''); 

            var found = 0;
            var td = 0;
            console.log('sf: ' + sf);
            
            // loop through the rows of the table
            $('#ctrlist tr').each(function(){
                found = 0;
                td = 0;
                $(this).removeClass('hide');
                var tdc = 0;
                $(this).find('td').each(function(){
                    td = 1;
                    tdc = tdc + 1;
                    var ht = $(this).html();
                    if ( ht.match(new RegExp( sf, "i")) && tdc < 3 ) { 
                        found = 1;
                        console.log('found! ' + ht);
                        ht = ht.replace( new RegExp( sf, "i" ), '<strong>' + sf.toUpperCase() + '</strong>');
                        $(this).html( ht );
                    }
                });
                if ( found == 0 && td == 1 ) { $(this).addClass('hide'); }
            });
        } else { 
            msgAlert("Sorry, the unlicensed contractor violations list does not appear to be present, so we can't search it. We apologize for the inconvenience.");
        }
    } else { 
        msgAlert("Please search for a string of 3 or more characters (excluding spaces).");
    } 
}


function searchPendingList () { 
    var sf = document.getElementById('searchPendingTerm').value;
    sf = sf.trim();
    if ( sf.length > 2 ) { 
        if ( document.getElementById('ctrlistP') != null ) {
            var tbl = document.getElementById('ctrlistP');
            // clear all previous highlights
            tbl.innerHTML = tbl.innerHTML.split('<strong>').join(''); 
            tbl.innerHTML = tbl.innerHTML.split('</strong>').join(''); 

            var found = 0;
            var td = 0;
            console.log('sf: ' + sf);
            
            // loop through the rows of the table
            $('#ctrlistP tr').each(function(){
                found = 0;
                td = 0;
                $(this).removeClass('hide');
                var tdc = 0;
                $(this).find('td').each(function(){
                    td = 1;
                    tdc = tdc + 1;
                    var ht = $(this).html();
                    if ( ht.match(new RegExp( sf, "i")) && tdc < 3 ) { 
                        found = 1;
                        console.log('found! ' + ht);
                        ht = ht.replace( new RegExp( sf, "i" ), '<strong>' + sf.toUpperCase() + '</strong>');
                        $(this).html( ht );
                    }
                });
                if ( found == 0 && td == 1 ) { $(this).addClass('hide'); }
            });
        } else { 
            msgAlert("Sorry, the pending applications list does not appear to be present, so we can't search it. We apologize for the inconvenience.");
        }
    } else { 
        msgAlert("Please search for a string of 3 or more characters (excluding spaces).");
    } 
}

function searchNewList () { 
    var sf = document.getElementById('searchNewTerm').value;
    sf = sf.trim();
    if ( sf.length > 2 ) { 
        if ( document.getElementById('ctrlistN') != null ) {
            var tbl = document.getElementById('ctrlistN');
            // clear all previous highlights
            tbl.innerHTML = tbl.innerHTML.split('<strong>').join(''); 
            tbl.innerHTML = tbl.innerHTML.split('</strong>').join(''); 

            var found = 0;
            var td = 0;
            console.log('sf: ' + sf);
            
            // loop through the rows of the table
            $('#ctrlistN tr').each(function(){
                found = 0;
                td = 0;
                $(this).removeClass('hide');
                var tdc = 0;
                $(this).find('td').each(function(){
                    td = 1;
                    tdc = tdc + 1;
                    var ht = $(this).html();
                    if ( ht.match(new RegExp( sf, "i")) && tdc < 3 ) { 
                        found = 1;
                        console.log('found! ' + ht);
                        ht = ht.replace( new RegExp( sf, "i" ), '<strong>' + sf.toUpperCase() + '</strong>');
                        $(this).html( ht );
                    }
                });
                if ( found == 0 && td == 1 ) { $(this).addClass('hide'); }
            });
        } else { 
            msgAlert("Sorry, the new licenses list does not appear to be present, so we can't search it. We apologize for the inconvenience.");
        }
    } else { 
        msgAlert("Please search for a string of 3 or more characters (excluding spaces).");
    } 
}

function searchDiscList () { 
    var sf = document.getElementById('searchDiscTerm').value;
    sf = sf.trim();
    if ( sf.length > 2 ) { 
        if ( document.getElementById('ctrlistD') != null ) {
            var tbl = document.getElementById('ctrlistD');
            // clear all previous highlights
            tbl.innerHTML = tbl.innerHTML.split('<strong>').join(''); 
            tbl.innerHTML = tbl.innerHTML.split('</strong>').join(''); 

            var found = 0;
            var td = 0;
            console.log('sf: ' + sf);
            
            // loop through the rows of the table
            $('#ctrlistD tr').each(function(){
                found = 0;
                td = 0;
                $(this).removeClass('hide');
                var tdc = 0;
                $(this).find('td').each(function(){
                    td = 1;
                    tdc = tdc + 1;
                    var ht = $(this).html();
                    if ( ht.match(new RegExp( sf, "i")) && tdc < 3 ) { 
                        found = 1;
                        console.log('found! ' + ht);
                        ht = ht.replace( new RegExp( sf, "i" ), '<strong>' + sf.toUpperCase() + '</strong>');
                        $(this).html( ht );
                    }
                });
                if ( found == 0 && td == 1 ) { $(this).addClass('hide'); }
            });
        } else { 
            msgAlert("Sorry, the disciplinary actions list does not appear to be present, so we can't search it. We apologize for the inconvenience.");
        }
    } else { 
        msgAlert("Please search for a string of 3 or more characters (excluding spaces).");
    } 
}




/* ///////////////////////////////////  JS FROM CONTRACTOR SEARCH ///////////////////////////////// */


var shortFormatLicense="";
var pageno = 1;
var totalRecordsFound = 0;
var currentPage = 1;
var maxPage = 1;
var userIP = '';
var submt = 'SUBMIT';

function  clearSearchResults () {
    shortFormatLicense="";
    pageno = 1;
    totalRecordsFound = 0;
    currentPage = 1;
    maxPage = 1;
    userIP = '';
    submt = 'SUBMIT';
}

var lastSearch = "";

if ( document.getElementById('searchfor') != null ) {
    document.getElementById('searchfor').addEventListener('keyup', function (e) { 
        var key = e.which || e.keyCode;
        //console.log(key);
        if (key == 9 || key == 13) { // 9 is tab, 13 is enter
            submitAction();
        } 
    });
    document.getElementById('submit_form').addEventListener('keyup', function (e) { 
        var key = e.which || e.keyCode;
        //console.log(key);
        if (key == 9 || key == 13) { // 9 is tab, 13 is enter
            submitAction();
        } 
    });
}

function checkAZCCStatus () {
    if ( document.getElementById('AZ_Corp_File_Number__c') != null ) {

    }
}

function checkForSearchResults () {
    if ( $('#jqResults').length ) {
        setTimeout('showSlowSearchMsg()',15000);
    }
}

function showSlowSearchMsg () {
    if ( $('#jqResults').html() == '' && $('#msgAlert').hasClass('hide') ) {
        msgAlert("Your search seems to be running a little slow. We apologize for the inconvenience. Slow search results can be the product of one or more situations - network congestion, complex search strings, server load, etc. Generally our searches return results in 15 seconds or less. If you are experiencing issues getting results, please feel free to email the webmaster at <a href='mailto:webmaster@roc.az.gov'>webmaster@roc.az.gov</a> and report the issue. Again, we apologize for the inconvenience.");
    }
}

function submitAction() {

    var sff = $('#searchfor').val();

    var sffn = '';
    if ( sff != '' && sff.trim() != '' ) {
        sffn = sff.match(/\d/g);
        if ( sffn != null ) {
            sffn = sffn.join('');
            var sffb = sff.replace('ROC','');
            sffb = sffb.replace('Roc','');
            sffb = sffb.replace('roc','');
            sffb = sffb.replace('#','');
            sffb = sffb.replace(' ','');
            sffb = sffb.trim();
            if ( (sffn.length == sff.length || sffb.length == sffn.length) && sffn.length > 0 ) { // if string is only numbers, require 6 digits only
                if ( sffn.length < 6 ) {
                    var lengthToAdd = 6 - sffn.length;
                    for ( sffa=0;sffa<lengthToAdd; sffa++ ) {
                        sffn = "0" + sffn;
                    }
                } else if ( sffn.length > 6 ) {
                    sffn = sffn.substring(0,6);
                }
                sff = sffn;
            }
        }
    }
    if ( sff != '' ) { sff = sff.replace('&','-ampersand-'); }

    if ( $('#resultSearchCount') ) {
        $('#resultSearchCount').addClass('hide');
        $('#resultSearchCountRepeat').addClass('hide');
    }
    var trimSearchFor = document.getElementById('searchfor').value;
    //trimSearchFor = trimSearchFor.replace(/^[\s]+|[\s]+$/g,"");

    //console.log('Running jquery post call...');
    var classType, ctrType, searchCity, licenseStatus, personType, resultstoreturn, clientIP;
    if ( document.getElementById('resultstoreturn') != null ) { resultstoreturn = document.getElementById('resultstoreturn').value; } else { resultstoreturn = ''; }
    if ( document.getElementById('persontype') != null ) { personType = document.getElementById('persontype').value; } else { personType = ''; }
    if ( document.getElementById('licensestatus') != null ) { licenseStatus = document.getElementById('licensestatus').value; } else { licenseStatus = ''; }
    if ( document.getElementById('city') != null ) { searchCity = document.getElementById('city').value; } else { searchCity = ''; }
    if ( document.getElementById('ctrtype') != null ) { ctrType = document.getElementById('ctrtype').value; } else { ctrType = ''; }
    if ( document.getElementById('classtype') != null ) { classType = document.getElementById('classtype').value; } else { classType = ''; }
    if ( document.getElementById('clientIP') != null ) { clientIP = document.getElementById('clientIP').value; } else if ( document.getElementById('remoteIP') != null ) { clientIP = document.getElementById('remoteIP').value; } else { clientIP = 'UNKNOWN'; }

    if ( sessionStorage ) {
        sessionStorage.setItem('searchfor', trimSearchFor);
        sessionStorage.setItem('resultstoreturn', resultstoreturn);
        sessionStorage.setItem('persontype', personType);
        sessionStorage.setItem('licenseStatus', licenseStatus);
        sessionStorage.setItem('searchCity', searchCity);
        sessionStorage.setItem('ctrType', ctrType);
        sessionStorage.setItem('classType', classType);
    }

    //if ( pageno > 1 ) { backno = ((parseInt(recordscount) - parseInt(row)) - parseInt(row)) + 1; }
    //if ( submt.indexOf(" BACK") > -1 ) { backno = fri; } // - parseInt(recordscount); if ( backno < 1 ) { backno = 1; } } 
    //console.log('pageno: ' + pageno + ', fri: ' + fri + ', lri: ' + lri + ', backno: ' + backno + ', nxt: ' + nxt);
    //var dd = { searchfor: trimSearchFor, back: backno, skipto: '', next: nxt, fri: fri, lri: lri, pages: maxPage, pageno: pageno, resultstoreturn: parseInt(row), stringlocation: stringloc, submit_form: submt, persontype: personType, licensestatus: licenseStatus, city: searchCity, ctrtype: ctrType, classtype: classType, tpage: parseInt(pageno), searchstr: trimSearchFor, records: parseInt(totalRecordsFound), userIP: userIP, submit_formJ: '' }
    //console.log(dd);
    var vurl = "/sfapi?ff=contractorSearchResults&searchfor=" + sff + "&city=" + searchCity + "&persontype=" + personType + "&ctrtype=" + ctrType + "&licensestatus=" + licenseStatus + "&resultstoreturn=" + resultstoreturn + "&classtype=" + classType + "&clientIP=" + clientIP;
    var vurl1 = "/sfapi?ff=contractorSearchResults&getCount=1&searchfor=" + sff + "&city=" + searchCity + "&persontype=" + personType + "&ctrtype=" + ctrType + "&licensestatus=" + licenseStatus + "&resultstoreturn=" + resultstoreturn + "&classtype=" + classType + "&clientIP=" + clientIP;
    //vurl = encodeURI(vurl);
    //vurl1 = encodeURI(vurl1);
    //console.log(vurl);
    if ( lastSearch !=  vurl ) { // only run if different from last search
        //console.log(vurl);
        lastSearch = vurl;
        var recCount = 0;
        $('#showLoading').removeClass('hide');
        $('#resultSearchCount').addClass('hide');
        $('#jqResults').empty();
        checkForSearchResults();
        /*$.ajax({ 
            type: "GET", 
            url: vurl1, 
            success: function ( data ) { 
                var ddata1 = data;
                if ( ddata1[0] != null || ddata1 == "[]" ) {
                    var jret11 = ddata1;
                } else { 
                    var jret11 = $.parseJSON(ddata1);
                }  
                recCount = jret11.length; 
                if ( document.getElementById('resultSearchCount') != null && jret11[0]['noresults'] != "no results" && jret11['noresults'] != "no results" ) { 
                    $('#resultSearchCount').removeClass('hide');
                    if ( $('#resultSearchCountTotal') ) {
                        if ( jret11.length > 100 ) {
                            $('#resultSearchCountTotal').html("(" + jret11.length + "  or More Total Found)");
                        } else {
                            $('#resultSearchCountTotal').html("(" + jret11.length + " Total Found)");
                        }
                    }
                }
            }
        });
        */
        $.ajax( {
            type: "GET",
            url: vurl, 
            //data: dd,
            success: function( data ) {
                //console.log('jquery results are being written...');
                var ddata = data; //.slice((data.indexOf('<pre>') + 5), data.indexOf("</pre>CONTRACTORSEARCHRESULTS///////////////////////"));
                if ( ddata[0] != null || ddata == "[]" ) {
                    var jret1 = ddata;
                } else { 
                    var jret1 = $.parseJSON(ddata);
                } 
                //$('#msgAlert').addClass('hide');
                //console.log('ddata: ' + ddata.slice(0,125));
                //console.log(ddata);
                // parse out ddata
                var jret = jret1[0];
                var rend = "";
                var statusClass = "";
                var lastResult = "";
                var continueResult = 1;
                //console.log(jret1);
                $('#jqResults').empty();
                if ( !jret.error && !jret.errorCode ) {
                    if ( jret1.length == 0 || jret1[0]['noresults'] == "no results" || jret1['noresults'] == "no results" ) {
                        if ( window.location.hostname == 'dev-az-roc.pantheonsite.io' ) { console.log('NO results.'); }
                        //msgAlert("No results were found for those search criteria. Please widen your search and try again.");
                        rend = '<h3 style="text-align: center; color: #900;">Sorry, your search returned 0 results. Please change your search criteria and try again.</h3>';
                    } else {
                        if ( window.location.hostname == 'dev-az-roc.pantheonsite.io' ) { console.log('NOT no results.'); }
                        if ( parseInt(resultstoreturn) > 0 ) { resultstoreturn = parseInt(resultstoreturn); } else { resultstoreturn = 20; }
                        if ( resultstoreturn > jret1.length ) { resultstoreturn = jret1.length; }
                        if ( document.getElementById('resultSearchCount') != null ) { 
                            $('#resultSearchCount').removeClass('hide');
                            if ( $('#resultSearchCountTotal') ) {
                                $('#resultSearchCount').removeClass('hide');
                                if ( $('#resultSearchCountShown') ) { $('#resultSearchCountShown').html(resultstoreturn); }
                                /*if ( jret1.length >= 100 ) {
                                    if ( jret1.length != resultstoreturn ) { $('#resultSearchCountTotal').html("(" + jret1.length + "  or More Total Found)"); } else { $('#resultSearchCountTotal').html(''); }
                                } else {
                                    if ( jret1.length != resultstoreturn ) { $('#resultSearchCountTotal').html("(" + jret1.length + " Total Found)"); } else { $('#resultSearchCountTotal').html(''); }
                                }*/
                            }
                        }
                        //rend += '<div class="resultSearchCount"><h3>' + jret1.length + ' Results Show (' + recCount + ' Total Found)</h3></div>';
                        rend += '<table class="resultSearchTable"><tr><th>Business</th><th colspan="2">Name and Title</th><th>License No.</th><th>Class</th><th>Status</th><th>City, State Zip</th><th>More Info</th></tr>';
                        //console.log(jret1); jret1.length
                        for ( i=0; i<resultstoreturn; i++ ) {
                            /*if ( i < jret1.length ) {
                                if (  jret1[i]['License__r'] != undefined ) {
                                    if ( jret1[i]['Account_Contact__c'] != undefined && jret1[i]['Account_Contact__r']['Contact_Name__c'] && i > 0 ) {
                                        if ( lastResult == jret1[i]['Account_Contact__c'] || jret1[i]['Account_Contact__r']['Contact_Name__c'] == jret1[i-1]['Account_Contact__r']['Contact_Name__c'] ) {
                                            continueResult = 0;
                                            resultstoreturn = resultstoreturn + 1;
                                        } else { 
                                            continueResult = 1;
                                            lastResult = jret1[i]['Account_Contact__c'];
                                        }
                                    } else { 
                                        continueResult = 1;
                                        lastResult = jret1[i]['Account_Contact__c'];
                                    }
                                    if ( continueResult == 1 || continueResult == 0 ) {
                                        rend += '<tr>'; // jret1[i]['Id']+'<br>'+
                                        if ( jret1[i]['License__r']['MUSW__Primary_Licensee__r'] != undefined ) {
                                            rend += '<td>'+boldSearchTerms(sff, jret1[i]['License__r']['MUSW__Primary_Licensee__r']['Name']);
                                            if ( jret1[i]['License__r']['Doing_Business_As__c'] != undefined ) { rend += '<br>(DBA: ' + jret1[i]['License__r']['Doing_Business_As__c'] + ')'; }
                                            rend += '</td>';
                                            if ( jret1[i]['Active__c'] == 'true' || jret1[i]['Active__c'] == true ) {
                                                rend += '<td>Qualifying Party</td>';
                                            } else {
                                                rend += '<td>Member</td>';
                                            }
                                        } else {
                                            rend += '<td>&nbsp;</td><td>&nbsp;</td>'
                                        }
                                        if ( jret1[i]['Account_Contact__r'] != undefined && jret1[i]['Account_Contact__r']['Contact_Name__c'] != undefined ) {
                                            rend += '<td>'+boldSearchTerms(sff, jret1[i]['Account_Contact__r']['Contact_Name__c'])+'</td>';
                                        } else {
                                            if ( jret1[i]['Qualifying_Party_Name__c'] ) {
                                                rend += '<td>'+boldSearchTerms(sff, jret1[i]['Qualifying_Party_Name__c'])+'</td>';
                                            } else {
                                                rend += '<td>&nbsp;</td>';
                                            }
                                        }
                                        rend += '<td>'+jret1[i]['License__r']['Name'].replace('ROC ','')+'</td>';
                                        if ( jret1[i]['License__r']['MUSW__Class__c'] != undefined ) {
                                            rend += '<td>'+boldSearchTerms(classType, jret1[i]['License__r']['MUSW__Class__c'])+'</td>';
                                        } else {
                                            if ( jret1[i]['License__r']['License_Subtype__c'] != undefined ) {
                                                rend += '<td>'+boldSearchTerms(classType, jret1[i]['License__r']['License_Subtype__c'])+'</td>';
                                            } else {
                                                rend += '<td>&nbsp;</td>';
                                            }
                                        }
                                        if ( jret1[i]['License__r']['MUSW__Status__c'] == 'Suspended' || jret1[i]['License__r']['MUSW__Status__c'] == 'Frozen' || jret1[i]['License__r']['MUSW__Status__c'] == 'Lapsed' || jret1[i]['License__r']['MUSW__Status__c'] == 'Expired' ) { 
                                            statusClass = 'licenseStatusSuspended';
                                        } else if ( jret1[i]['License__r']['MUSW__Status__c'] == 'Revoked' || jret1[i]['License__r']['MUSW__Status__c'] == 'Voluntary Cancellation' || jret1[i]['License__r']['MUSW__Status__c'] == 'Inactive' || jret1[i]['License__r']['MUSW__Status__c'] == 'Closed' ) { 
                                            statusClass = 'licenseStatusRevoked';
                                        } else if ( jret1[i]['License__r']['MUSW__Status__c'] == 'Current' || jret1[i]['License__r']['MUSW__Status__c'] == 'Active' ) { 
                                            statusClass = 'licenseStatusCurrent';
                                        }
                                        rend += '<td><div class="licenseStatus ' + statusClass + '">'+jret1[i]['License__r']['MUSW__Status__c']+'</div></td>';
                                        rend += '<td>'+boldSearchTerms(searchCity, jret1[i]['License__r']['MailingCityStateZip__c'])+'</td>';
                                        rend += '<td><a href="/contractor-search?Id='+jret1[i]['License__r']['Id']+'" target="_blank">More Info</a></td>';
                                        rend += '</tr>';
                                    }
                                }*/
                                var account = 0;
                                var liccount = 0;
                                var tpqp = '';
                                if ( jret1[i]['Name'].indexOf('Inc') > -1 ) { tpqp = 'Officer'; } else if ( jret1[i]['Name'].indexOf('LLC') > -1 )  { tpqp = 'Member'; } else { tpqp = 'Member'; }
                                var lastQPName = '';
                                //console.log(jret1[i]);
                                if (  jret1[i]['MUSW__License2s__r'] != undefined ) {
                                    var rendextra = [];
                                    var rendextra1 = [];
                                    var rendextra1a = [];
                                    var rendextra2 = [];
                                    var rendextraText = '';
                                    var dbal = '';
                                    var lastdba = '';
                                    if ( jret1[i]['MUSW__License2s__r']['totalSize'] != undefined ) { liccount = parseInt(jret1[i]['MUSW__License2s__r']['totalSize']); } else { liccount = 1; }
                                    rend += '<tr>'; // jret1[i]['Id']+'<br>'+
                                    //rend += '<td rowspan="' + liccount + '"><span class="licenseeNameSmllr"><a href="/contractor-search?Id='+jret1[i]['MUSW__License2s__r']['records'][0]['Id']+'" target="_blank">'+boldSearchTerms(sff, jret1[i]['Name'])+'</a></span>';
                                    rend += '<td rowspan="' + liccount + '"><span class="licenseeNameSmllr">'+boldSearchTerms(sff, jret1[i]['Name'])+'</span>';
                                    if ( jret1[i]['Doing_Business_As__c'] != undefined ) { dbal = jret1[i]['Doing_Business_As__c']; }
                                    for ( nn=0;nn<liccount;nn++ ) {
                                        //if ( nn > 0 ) { 
                                            if ( jret1[i]['MUSW__License2s__r']['records'][nn]['Doing_Business_As__c'] != undefined && lastdba != jret1[i]['MUSW__License2s__r']['records'][nn]['Doing_Business_As__c'] ) {
                                                if ( dbal != '' ) { dbal += ', '; }
                                                dbal += boldSearchTerms(classType, jret1[i]['MUSW__License2s__r']['records'][nn]['Doing_Business_As__c']);
                                                lastdba = jret1[i]['MUSW__License2s__r']['records'][nn]['Doing_Business_As__c'];
                                            } 
                                        //} 
                                    }    
                                    if ( dbal != '' ) { rend += '<br>(DBA: ' + dbal + ')'; }
                                    rend += '</td>';
                                    if ( jret1[i]['MUSW__Account_Contacts__r'] != undefined ) {
                                        if ( jret1[i]['MUSW__Account_Contacts__r']['totalSize'] != undefined ) { account = parseInt(jret1[i]['MUSW__Account_Contacts__r']['totalSize']); } else { account = 1; }
                                        rend += '<td rowspan="' + liccount + '" colspan="2">';
                                        for ( jj=0;jj<account;jj++ ) {
                                            if ( jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['End_Date__c'] != undefined ) {
                                                // if there's an end date, ignore this listing
                                            } else {
                                                if ( jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Related_Entity__r'] != undefined ) {
                                                    if ( jj > 0 ) { rend += '<br>'; }
                                                    rend += boldSearchTerms(sff, jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Related_Entity__r']['Name']) + ' (' + jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Title_Position__c'] + ')';
                                                } else {
                                                    // && lastQPName != jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Contact_Name__c'] 
                                                    if ( jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Contact_Name__c'] != 'Qp Exempt' && lastQPName != (jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Contact_Name__c'] + jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Qualifying_Party__c']) && jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Contact_Name__c'] != undefined ) {
                                                        tpqp = 'Member';
                                                        if ( jret1[i]['MUSW__Account_Contacts__r']['records'][jj] != undefined ) {
                                                            //console.log(jret1[i]['MUSW__Account_Contacts__r']['records'][jj]);
                                                            //console.log(jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Contact_Name__c'] + ' Disassociation Date: ' + jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Disassociation_Date__c']);
                                                            if ( jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Disassociation_Date__c'] == '' || jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Disassociation_Date__c'] == undefined ) { 
                                                                if ( jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Qualifying_Party__c'] != true && jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Qualifying_Party__c'] != 1 ) { 
                                                                    if ( jret1[i]['Name'].indexOf('Inc') > -1 ) { tpqp = 'Officer'; } else if ( jret1[i]['Name'].indexOf('LLC') > -1 )  { tpqp = 'Member'; } else { tpqp = jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Title_Position__c']; }
                                                                    tplicno = ''; 
                                                                } else { 
                                                                    tpqp = 'Qualifying Party'; 
                                                                    if ( jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['License_Name__c'] != '' && jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['License_Name__c'] != undefined ) {
                                                                        tplicno = ' for License # ' + jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['License_Name__c'].replace('ROC ',''); 
                                                                    } else { 
                                                                        tplicno = '';
                                                                    }
                                                                }
                                                                if ( jj > 0 ) { rend += '<br>'; }
                                                                rend += boldSearchTerms(sff, jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Contact_Name__c']) + ' (' + tpqp + tplicno + ')';
                                                            }
                                                        }
                                                        lastQPName = jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Contact_Name__c'] + jret1[i]['MUSW__Account_Contacts__r']['records'][jj]['Qualifying_Party__c'];
                                                    }
                                                }
                                            }
                                        }
                                        rend += '</td>';
                                    } else {
                                        rend += '<td rowspan="' + liccount + '" colspan="2">&nbsp;</td>';
                                    }
                                    rend += '<td>';
                                    for ( nn=0;nn<liccount;nn++ ) {
                                        if ( nn > 0 ) { 
                                            rendextra[nn] = '<a href="/contractor-search?Id='+jret1[i]['MUSW__License2s__r']['records'][nn]['Id']+'" target="_blank">' + jret1[i]['MUSW__License2s__r']['records'][nn]['Name'].replace('ROC ','') + '</a>';
                                        } else {
                                            rend += '<a href="/contractor-search?Id='+jret1[i]['MUSW__License2s__r']['records'][nn]['Id']+'" target="_blank">' + jret1[i]['MUSW__License2s__r']['records'][nn]['Name'].replace('ROC ','') + '</a>';
                                        }
                                    }
                                    rend += '</td>';
                                    rend += '<td>';
                                    for ( nn=0;nn<liccount;nn++ ) {
                                        var lclass = '';
                                        var lcclass = '';
                                        var lrclass = '';
                                        var lblink = '';
                                        var lalink = '';
                                        if ( nn > 0 ) { 
                                            if ( jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Class__c'] != undefined ) {
                                                lclass = jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Class__c'];
                                                if ( lclass.indexOf(' ') > -1 ) { lclass = lclass.substring(0,lclass.indexOf(' ')); }
                                                if ( lclass.indexOf('CR-') > -1 ) { lclass = lclass.replace('CR-','CR'); }
                                                lclass = lclass.trim();
                                                if ( classificationInfo[lclass] != undefined ) { 
                                                    lblink = '<a href="javas' + 'cript:msgAlert(\'' + lclass + ' : \' + classificationInfo[\'' + lclass + '\'] + ';
                                                    if ( lclass.indexOf('CR') == 0 || lclass.indexOf('KB') == 0 || lclass.indexOf('KA') == 0 ) { 
                                                        // if dual license, bring in separate license definitions too
                                                        if ( lclass.indexOf('KB-1') == 0 ) {
                                                            lcclass = "B";
                                                            lrclass = "B-1";
                                                        } else if ( lclass.indexOf('KB-2') == 0 ) {
                                                            lcclass = "B";
                                                            lrclass = "B-2";
                                                        } else if ( lclass.indexOf('KA-6') == 0 ) {
                                                            lcclass = "A-19";
                                                            lrclass = "B-6";
                                                        } else if ( lclass.indexOf('KA-5') == 0 ) {
                                                            lcclass = "A-9";
                                                            lrclass = "B-5";
                                                        } else { 
                                                            // get C and R of number
                                                            lcclass = lclass.replace('CR','C-');
                                                            lrclass = lclass.replace('CR','R-');
                                                        }
                                                        if ( classificationInfo[lcclass] != undefined ) {
                                                            lblink += ' \' <hr> ' + lcclass + ' : \' + classificationInfo[\'' + lcclass + '\'] + '; 
                                                        }
                                                        if ( classificationInfo[lrclass] != undefined ) {
                                                            lblink += ' \' <hr> ' + lrclass + ' : \' + classificationInfo[\'' + lrclass + '\'] + '; 
                                                        }
                                                    }
                                                    lblink += '\' <br>\');">'; 
                                                    lalink = '</a>'; 
                                                }
                                                rendextra1a[nn] = lblink + boldSearchTerms(classType, jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Class__c']) + lalink;
                                            } else {
                                                if ( jret1[i]['MUSW__License2s__r']['records'][nn]['License_Subtype__c'] != undefined ) {
                                                    lclass = jret1[i]['MUSW__License2s__r']['records'][nn]['License_Subtype__c'];
                                                    if ( lclass.indexOf(' ') > -1 ) { lclass = lclass.substring(0,lclass.indexOf(' ')); }
                                                    if ( lclass.indexOf('CR-') > -1 ) { lclass = lclass.replace('CR-','CR'); }
                                                    lclass = lclass.trim();
                                                    if ( classificationInfo[lclass] != undefined ) { 
                                                        lblink = '<a href="javas' + 'cript:msgAlert(\'' + lclass + ' : \' + classificationInfo[\'' + lclass + '\'] + ';
                                                        if ( lclass.indexOf('CR') == 0 || lclass.indexOf('KB') == 0 || lclass.indexOf('KA') == 0 ) { 
                                                            // if dual license, bring in separate license definitions too
                                                            if ( lclass.indexOf('KB-1') == 0 ) {
                                                                lcclass = "B";
                                                                lrclass = "B-1";
                                                            } else if ( lclass.indexOf('KB-2') == 0 ) {
                                                                lcclass = "B";
                                                                lrclass = "B-2";
                                                            } else if ( lclass.indexOf('KA-6') == 0 ) {
                                                                lcclass = "A-19";
                                                                lrclass = "B-6";
                                                            } else if ( lclass.indexOf('KA-5') == 0 ) {
                                                                lcclass = "A-9";
                                                                lrclass = "B-5";
                                                            } else { 
                                                                // get C and R of number
                                                                lcclass = lclass.replace('CR','C-');
                                                                lrclass = lclass.replace('CR','R-');
                                                            }
                                                            if ( classificationInfo[lcclass] != undefined ) {
                                                                lblink += ' \' <hr> ' + lcclass + ' : \' + classificationInfo[\'' + lcclass + '\'] + '; 
                                                            }
                                                            if ( classificationInfo[lrclass] != undefined ) {
                                                                lblink += ' \' <hr> ' + lrclass + ' : \' + classificationInfo[\'' + lrclass + '\'] + '; 
                                                            }
                                                        }
                                                        lblink += '\' <br>\');">'; 
                                                        lalink = '</a>'; 
                                                    }
                                                    rendextra1a[nn] = lblink + boldSearchTerms(classType, jret1[i]['MUSW__License2s__r']['records'][nn]['License_Subtype__c']) + lalink;
                                                } else {
                                                    rendextra1a[nn] = '';
                                                }
                                            }
                                        } else {
                                            if ( jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Class__c'] != undefined ) {
                                                lclass = jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Class__c'];
                                                if ( lclass.indexOf(' ') > -1 ) { lclass = lclass.substring(0,lclass.indexOf(' ')); }
                                                if ( lclass.indexOf('CR-') > -1 ) { lclass = lclass.replace('CR-','CR'); }
                                                lclass = lclass.trim();
                                                if ( classificationInfo[lclass] != undefined ) { 
                                                    lblink = '<a href="javas' + 'cript:msgAlert(\'' + lclass + ' : \' + classificationInfo[\'' + lclass + '\'] + ';
                                                    if ( lclass.indexOf('CR') == 0 || lclass.indexOf('KB') == 0 || lclass.indexOf('KA') == 0 ) { 
                                                        // if dual license, bring in separate license definitions too
                                                        if ( lclass.indexOf('KB-1') == 0 ) {
                                                            lcclass = "B";
                                                            lrclass = "B-1";
                                                        } else if ( lclass.indexOf('KB-2') == 0 ) {
                                                            lcclass = "B";
                                                            lrclass = "B-2";
                                                        } else if ( lclass.indexOf('KA-6') == 0 ) {
                                                            lcclass = "A-19";
                                                            lrclass = "B-6";
                                                        } else if ( lclass.indexOf('KA-5') == 0 ) {
                                                            lcclass = "A-9";
                                                            lrclass = "B-5";
                                                        } else { 
                                                            // get C and R of number
                                                            lcclass = lclass.replace('CR','C-');
                                                            lrclass = lclass.replace('CR','R-');
                                                        }
                                                        if ( classificationInfo[lcclass] != undefined ) {
                                                            lblink += ' \' <hr> ' + lcclass + ' : \' + classificationInfo[\'' + lcclass + '\'] + '; 
                                                        }
                                                        if ( classificationInfo[lrclass] != undefined ) {
                                                            lblink += ' \' <hr> ' + lrclass + ' : \' + classificationInfo[\'' + lrclass + '\'] + '; 
                                                        }
                                                    }
                                                    lblink += '\' <br>\');">'; 
                                                    lalink = '</a>'; 
                                                }
                                                rend += lblink + boldSearchTerms(classType, jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Class__c']) + lalink;
                                            } else {
                                                if ( jret1[i]['MUSW__License2s__r']['records'][nn]['License_Subtype__c'] != undefined ) {
                                                    lclass = jret1[i]['MUSW__License2s__r']['records'][nn]['License_Subtype__c'];
                                                    if ( lclass.indexOf(' ') > -1 ) { lclass = lclass.substring(0,lclass.indexOf(' ')); }
                                                    if ( lclass.indexOf('CR-') > -1 ) { lclass = lclass.replace('CR-','CR'); }
                                                    lclass = lclass.trim();
                                                    //if ( classificationInfo[lclass] != undefined ) { lblink = '<a href="javas' + 'cript:msgAlert(\'' + lclass + ' : \' + classificationInfo[\'' + lclass + '\'] + \' <br>\');">'; lalink = '</a>'; }
                                                    if ( classificationInfo[lclass] != undefined ) { 
                                                        lblink = '<a href="javas' + 'cript:msgAlert(\'' + lclass + ' : \' + classificationInfo[\'' + lclass + '\'] + ';
                                                        if ( lclass.indexOf('CR') == 0 || lclass.indexOf('KB') == 0 || lclass.indexOf('KA') == 0 ) { 
                                                            // if dual license, bring in separate license definitions too
                                                            if ( lclass.indexOf('KB-1') == 0 ) {
                                                                lcclass = "B";
                                                                lrclass = "B-1";
                                                            } else if ( lclass.indexOf('KB-2') == 0 ) {
                                                                lcclass = "B";
                                                                lrclass = "B-2";
                                                            } else if ( lclass.indexOf('KA-6') == 0 ) {
                                                                lcclass = "A-19";
                                                                lrclass = "B-6";
                                                            } else if ( lclass.indexOf('KA-5') == 0 ) {
                                                                lcclass = "A-9";
                                                                lrclass = "B-5";
                                                            } else { 
                                                                // get C and R of number
                                                                lcclass = lclass.replace('CR','C-');
                                                                lrclass = lclass.replace('CR','R-');
                                                            }
                                                            if ( classificationInfo[lcclass] != undefined ) {
                                                                lblink += ' \' <hr> ' + lcclass + ' : \' + classificationInfo[\'' + lcclass + '\'] + '; 
                                                            }
                                                            if ( classificationInfo[lrclass] != undefined ) {
                                                                lblink += ' \' <hr> ' + lrclass + ' : \' + classificationInfo[\'' + lrclass + '\'] + '; 
                                                            }
                                                        }
                                                        lblink += '\' <br>\');">'; 
                                                        lalink = '</a>'; 
                                                    }
                                                    rend += lblink + boldSearchTerms(classType, jret1[i]['MUSW__License2s__r']['records'][nn]['License_Subtype__c']) + lalink;
                                                } else {
                                                    rend += '';
                                                }
                                            }
                                        }
                                    }
                                    rend += '</td>';
                                    rend += '<td>';
                                    for ( nn=0;nn<liccount;nn++ ) {
                                        if ( jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Suspended' || jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Frozen' || jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Lapsed' || jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Expired' ) { 
                                            statusClass = 'licenseStatusSuspended';
                                        } else if ( jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Revoked' || jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Voluntary Cancellation' || jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Inactive' || jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Closed' ) { 
                                            statusClass = 'licenseStatusRevoked';
                                        } else if ( jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Current' || jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c'] == 'Active' ) { 
                                            statusClass = 'licenseStatusCurrent';
                                        }
                                        if ( nn > 0 ) { 
                                            rendextra1[nn] = '<div class="licenseStatus ' + statusClass + '">'+jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c']+'</div>';
                                        } else {
                                            rend += '<div class="licenseStatus ' + statusClass + '">'+jret1[i]['MUSW__License2s__r']['records'][nn]['MUSW__Status__c']+'</div>';
                                        }
                                    }
                                    rend += '</td>';
                                    rend += '<td rowspan="' + liccount + '">'+boldSearchTerms(searchCity, jret1[i]['MUSW__License2s__r']['records'][0]['MailingCityStateZip__c'])+'</td>';
                                    rend += '<td>';
                                    for ( nn=0;nn<liccount;nn++ ) {
                                        if ( nn > 0 ) { 
                                            rendextra2[nn] = '<span class="licenseeNameSmllr"><a href="/contractor-search?Id='+jret1[i]['MUSW__License2s__r']['records'][nn]['Id']+'" target="_blank">More Info</a></span>';
                                        } else {
                                            rend += '<span class="licenseeNameSmllr"><a href="/contractor-search?Id='+jret1[i]['MUSW__License2s__r']['records'][nn]['Id']+'" target="_blank">More Info</a></span>';
                                        }
                                    }
                                    rend += '</td>';
                                    rend += '</tr>';
                                    for ( nn=1; nn<liccount; nn++ ) {
                                        rendextraText += "<tr><td>" + rendextra[nn] + "</td><td>" + rendextra1a[nn] + "</td><td>" + rendextra1[nn] + "</td><td>" + rendextra2[nn] + "</td></tr>";
                                        //console.log(rendextraText);
                                    }
                                    //console.log(rendextra);
                                    //console.log(rendextra1);
                                    rend += rendextraText;
                                    rend += '<tr><td colspan="8" class="resultSearchTableEmptyRow">&nbsp;</td></tr>';
                                }
                            //}
                        }
                        rend += '</table>';
                    }
                } else {
                    if ( window.location.hostname == 'dev-az-roc.pantheonsite.io' ) { console.log('ERROR results.'); }
                    var err = '';
                    if ( jret.error ) {
                        err = jret.error;
                    } else { 
                        err = jret.message;
                    }
                    msgAlert("An error was encountered while processing your request. Please review the information you submitted and enter any missing information to resubmit your form. If the issue persists, please contact the ROC webmaster at webmaster@roc.az.gov. We're sorry for any inconvenience.<br><br><small>Error Message: " + err + "</small>");
                }
                $('#showLoading').addClass('hide'); 
                $("#jqResults").html( rend );
            },
            error: function (error) {
                //$('#msgAlert').addClass('hide');
                $("#jqResults").html('<h3 style="text-align: center; color: #900;">Sorry, your search returned 0 results. Please change your search criteria and try again.</h3>');
                $('#showLoading').addClass('hide'); 
            }
        });
    } else { 
        //console.log('Same as last search.');
        //$('#resultSearchCountRepeat').html('Same as previous search');
        $('#resultSearchCountRepeat').removeClass('hide');
        //msgAlert('<h3 style="align: center; color: #900;">Sorry, your search returned 0 results. Please change your search criteria and try again.</h3>');
    }
    
    return true;
}

function ifSavedSearchInSessionStorage () {
    
    if ( $('#searchfor').length && $('#searchfor').val() == '' ) {
        var classType, ctrType, searchCity, licenseStatus, personType, resultstoreturn, srchfor;
        var openAdvanced = 0;
        
        if ( sessionStorage ) {
            if ( sessionStorage.getItem('searchfor') ) { srchfor = sessionStorage.getItem('searchfor').trim(); } 
            if ( sessionStorage.getItem('resultstoreturn') ) { resultstoreturn = sessionStorage.getItem('resultstoreturn').trim(); } 
            if ( sessionStorage.getItem('persontype') ) { personType = sessionStorage.getItem('persontype').trim(); }
            if ( sessionStorage.getItem('licenseStatus') ) { licenseStatus = sessionStorage.getItem('licenseStatus').trim(); }
            if ( sessionStorage.getItem('searchCity') ) { searchCity = sessionStorage.getItem('searchCity').trim(); }
            if ( sessionStorage.getItem('ctrType') ) { ctrType = sessionStorage.getItem('ctrType').trim(); }
            if ( sessionStorage.getItem('classType') ) { classType = sessionStorage.getItem('classType').trim(); }
            
            if ( document.getElementById('searchfor') != null && srchfor != '' && srchfor != undefined && srchfor != null ) {
                $('#searchfor').val(srchfor);
            }
            if ( document.getElementById('resultstoreturn') != null ) {
                $("select[name='resultstoreturn']").each(function(){
                    $('#resultstoreturn option[value=' + resultstoreturn + ']').attr('selected','selected');
                });
                if ( resultstoreturn != 20 && resultstoreturn != '' && resultstoreturn != undefined ) { openAdvanced = 1; }
            }
            if ( document.getElementById('persontype') != null ) {
                $("select[name='persontype']").each(function(){
                    $('#persontype option[value=' + personType + ']').attr('selected','selected');
                });
                if ( personType != '' && personType != undefined ) { openAdvanced = 1; }
            }
            if ( document.getElementById('licensestatus') != null ) {
                $("select[name='licensestatus']").each(function(){
                    $('#licensestatus option[value=' + licenseStatus + ']').attr('selected','selected');
                });
                if ( licenseStatus != '' && licenseStatus != undefined ) { openAdvanced = 1; }
            }
            if ( document.getElementById('city') != null && searchCity != '' && searchCity != undefined && searchCity != null ) {
                $('#city').val(searchCity);
                if ( searchCity != '' && searchCity != undefined ) { openAdvanced = 1; }
            }
            if ( document.getElementById('ctrtype') != null ) {
                $("select[name='ctrtype']").each(function(){
                    $('#ctrtype option[value=' + ctrType + ']').attr('selected','selected');
                });
                if ( ctrType != '' && ctrType != undefined ) { openAdvanced = 1; }
            }
            if ( document.getElementById('classtype') != null ) {
                $("select[name='classtype']").each(function(){
                    $('#classtype option[value=' + classType + ']').attr('selected','selected');
                });
                if ( classType != '' && classType != undefined ) { openAdvanced = 1; }
            }
            if ( openAdvanced == 1 ) {
                showHide('searchOptions');
                fixOptionCorners();
            }
        }
    }
}

window.onload = setTimeout('ifSavedSearchInSessionStorage()',4000);


function loadLicenseDetails( licno, accno ) {
    if ( licno != '' && accno != '00000000000' ) {
        if ( $('#detailsQP').length ) {
            if ( $('#detailsQP').html() == '' ) {
                $('#detailsQP').html('<div class="centeredText noFloat padd20 appFormStepWaiting"><i class=\"appFormStepIcon noFloat marg20auto appFormStepIconWaiting fa fa-hourglass-start\"></i></div>');
                setInterval('spinSubmitStepWaiting()',2000);
                var vurl1 = "https://roc.az.gov/sfapi?ff=getLicenseDetailsQP&licno=" + licno + "&accno=" + accno;
                $.ajax({ 
                    type: "GET", 
                    url: vurl1, 
                    success: function ( data ) { 
                        $('#detailsQP').html(data);
                        loadLicenseDetails1( licno, accno );
                    },
                    error: function ( data ) {
                        $('#detailsQP').html(data);
                        loadLicenseDetails1( licno, accno );
                    }
                });
            }
        }
    }
}
function loadLicenseDetails1( licno, accno ) {
    if ( licno != '' && accno != '00000000000' ) {
        if ( $('#detailsComplaints').length ) {
            if ( $('#detailsComplaints').html() == '' ) {
                $('#detailsComplaints').html('<div class="centeredText noFloat padd20 appFormStepWaiting"><i class=\"appFormStepIcon noFloat marg20auto appFormStepIconWaiting fa fa-hourglass-start\"></i></div>');
                var vurl1 = "https://roc.az.gov/sfapi?ff=getLicenseDetailsComplaints&licno=" + licno + "&accno=" + accno;
                $.ajax({ 
                    type: "GET", 
                    url: vurl1, 
                    success: function ( data ) { 
                        $('#detailsComplaints').html(data);
                        loadLicenseDetails2( licno, accno );
                    },
                    error: function ( data ) {
                        $('#detailsComplaints').html(data);
                        loadLicenseDetails2( licno, accno );
                    }
                });
            }
        }
    }
}
function loadLicenseDetails2( licno, accno ) {
    if ( licno != '' && accno != '00000000000' ) {
        var showCom = '';
        if ( window.location.href.indexOf('&showComments=YES') > -1 ) { showCom = '&showComments=YES'; }
        if ( $('#detailsComments').length ) {
            if ( $('#detailsComments').html() == '' ) {
                $('#detailsComments').html('<div class="centeredText noFloat padd20 appFormStepWaiting"><i class=\"appFormStepIcon noFloat marg20auto appFormStepIconWaiting fa fa-hourglass-start\"></i></div>');
                var vurl1 = "https://roc.az.gov/sfapi?ff=getLicenseDetailsComments&licno=" + licno + "&accno=" + accno + showCom;
                $.ajax({ 
                    type: "GET", 
                    url: vurl1, 
                    success: function ( data ) { 
                        $('#detailsComments').html(data);
                        loadLicenseDetails3( licno, accno );
                    },
                    error: function ( data ) {
                        $('#detailsComments').html(data);
                        loadLicenseDetails3( licno, accno );
                    }
                });
            }
        }
    }
}
function loadLicenseDetails3( licno, accno ) {
    if ( licno != '' && accno != '00000000000' ) {
        if ( $('#detailsBonds').length ) {
            if ( $('#detailsBonds').html() == '' ) {
                $('#detailsBonds').html('<div class="centeredText noFloat padd20 appFormStepWaiting"><i class=\"appFormStepIcon noFloat marg20auto appFormStepIconWaiting fa fa-hourglass-start\"></i></div>');
                var vurl1 = "https://roc.az.gov/sfapi?ff=getLicenseDetailsBonds&licno=" + licno + "&accno=" + accno;
                $.ajax({ 
                    type: "GET", 
                    url: vurl1, 
                    success: function ( data ) { 
                        $('#detailsBonds').html(data);
                    },
                    error: function ( data ) {
                        $('#detailsBonds').html(data);
                    }
                });
            }
        }
    }
}
if ( window.location.href.indexOf('/contractor-search?Id=') > -1 ) {
    if ( loadLicenseDetailsLicno != null && loadLicenseDetailsAccno != null ) {
        //console.log('Additional Contractor Info has been called for...');
        loadLicenseDetails( loadLicenseDetailsLicno, loadLicenseDetailsAccno );
    } else {
        //console.log('Did not call for Additional Contractor Info...  LicNo: ' + loadLicenseDetailsLicno + ' AccNo: ' + loadLicenseDetailsAccno);
    }
}

function boldSearchTerms ( sf, sr ) {
    // sf = search for term, sr = source to search
    if ( sf == undefined ) { sf = ''; }
    if ( sr == undefined ) { sr = ''; }
    if ( sf != '' && sr != '' ) {
        sf = sf.toUpperCase();
        var v = sr.replace( new RegExp( sf, "i" ), '<strong>' + sf + '</strong>');
        return v;
    } else {
        return sr;
    }
}

function setResultNavigation () {
	var showNext = 0;
	var showPrev = 0;
	if ( maxPage > currentPage ) { 
		showNext = 1;
	} 
	if ( currentPage > 1 ) { 
		showPrev = 1;
	}
	if ( showPrev == 1 || showNext == 1 ) { 
		if ( showPrev == 1 && document.getElementById('showPrev') ) { 
			document.getElementById('showPrev').style.display = 'inline-block';
		} else {
		    if ( document.getElementById('showPrev') ) { 
			document.getElementById('showPrev').style.display = 'none';
		    }
                }
		if ( showNext == 1 && document.getElementById('showNext') ) { 
			document.getElementById('showNext').style.display = 'inline-block';
		} else {
		    if ( document.getElementById('showNext') ) { 
			document.getElementById('showNext').style.display = 'none';
		    }
                }
		if ( document.getElementById('showNav') ) { 
			document.getElementById('showNav').style.display = 'block';
		} else {
		    if ( document.getElementById('showNav') ) { 
			document.getElementById('showNav').style.display = 'none';
		    }
                }
	} else {
		if ( document.getElementById('showPrev') ) { 
			document.getElementById('showPrev').style.display = 'none';
		}
		if ( document.getElementById('showNext') ) { 
			document.getElementById('showNext').style.display = 'none';
		}
		if ( document.getElementById('showNav') ) { 
			document.getElementById('showNav').style.display = 'none';
		}
	}
	if ( document.getElementById('showTotalResults') ) { 
		document.getElementById('showTotalResults').innerHTML = totalRecordsFound + ' Total Results Found [current page: ' + currentPage + ' of ' + maxPage + ']';
		document.getElementById('showTotalResults').style.background = 'none';
	}
}

function navigateResults ( dir ) {
	if ( dir == -1 ) { 
		if ( ( pageno - 1) > 1 ) { pageno = pageno - 1; } else { pageno = 1; }
		submt = '? BACK';
	} else if ( dir == 1 ) { 
		if ( ( pageno + 1 ) <= maxPage ) { pageno = pageno + 1; } else { pageno = maxPage; }
		submt = 'NEXT ?';
	} else { 
		pageno = 1;
		submt = 'SUBMIT';
	}
        currentPage = pageno;
	submitAction(document.forms["selform"]);
}

$(document).ready(function() {
    $('#selform').on('submit', function (e) {
       e.preventDefault();
    });
});

function resetForm () {
	if ( document.getElementById('selform') ) {
        document.getElementById('selform').reset();
        if ( document.getElementById('resultstoreturn') != null ) {
            $("select[name='resultstoreturn']").each(function(){
                $('#resultstoreturn option[value=""]').attr('selected','selected');
            });
        }
        if ( document.getElementById('persontype') != null ) {
            $("select[name='persontype']").each(function(){
                $('#persontype option[value=""]').attr('selected','selected');
            });
        }
        if ( document.getElementById('licensestatus') != null ) {
            $("select[name='licensestatus']").each(function(){
                $('#licensestatus option[value=""]').attr('selected','selected');
            });
        }
        if ( document.getElementById('city') != null ) {
            $('#city').val('');
        }
        if ( document.getElementById('ctrtype') != null ) {
            $("select[name='ctrtype']").each(function(){
                $('#ctrtype option[value=""]').attr('selected','selected');
            });
        }
        if ( document.getElementById('classtype') != null ) {
            $("select[name='classtype']").each(function(){
                $('#classtype option[value=""]').attr('selected','selected');
            });
        }
	}
}

function showHide ( dv ) { 
    if ( dv == 'searchOptions' || dv == "divInstructions" ) {
		var r = '#' + dv;
		if ( $(r).hasClass('searchOptionsHidden') ) {
			$(r).removeClass('searchOptionsHidden');
			$(r).css("max-height", "none");
			var height = $(r).outerHeight();
			$(r).css("max-height", "0");
			setTimeout(function(){
				$(r).css({
					"max-height": height
				});
			}, 1);
		} else {
			$(r).css('max-height', '0');
			$(r).addClass('searchOptionsHidden');
		}
	} else {
		if ( document.getElementById( dv ) != null ) {
			if ( document.getElementById( dv ).style.display == "block" ) { 
				document.getElementById( dv ).style.display = "none";
			} else { 
				document.getElementById( dv ).style.display = "block";
			}
		}
	}
}

function fixOptionCorners () {
    if ( document.getElementById('showOptions') ) { 
        if ( document.getElementById('showOptions').style.borderBottomLeftRadius == '0px' ) { 
             document.getElementById('showOptions').style.borderBottomLeftRadius = '12px';
             document.getElementById('showOptions').style.borderBottomRightRadius = '12px';
             $("#resultstoreturn").val("14");
             $("#persontype").val("");
             $("#licensestatus").val("");
             $("#ctrtype").val("");
             $("#classtype").val("");
             $("#city").val("");
        } else {
             document.getElementById('showOptions').style.borderBottomLeftRadius = '0px';
             document.getElementById('showOptions').style.borderBottomRightRadius = '0px';
       }
    }
}
/*
	var commercial=new Array();
	var residential=new Array();
	
	function splitClassTitles()
	{
        if ( document.getElementById('selform') != null ) {
            var sel=document.forms['selform'].classtype;
            var ops=sel.options;
            
            for(var i=0; i<ops.length; i++)
            {
            
                var opsText=ops[i].text;
                //var classtype=optiontext.substring(optiontext.indexOf("("));
                ops[i].text=ops[i].text+' ['+ops[i].value+']';
                
                if(opsText.indexOf("(R)") > -1)
                {
                    residential.push(ops[i]);
                }
                
                if(opsText.indexOf("(C)") > -1)
                {
                    commercial.push(ops[i]);
                }
                
            }
        
            //commercial.reverse();
            //residential.reverse();
        
            ops.length=1;
        
            
            for(var i=0; i<commercial.length; i++)
            {
                commercial[i].style.background= (i%2==0 ? "#ffa" : "#fff");
            }						
        
            for(var i=0; i<residential.length; i++)
            {
                residential[i].style.background= (i%2==0 ? "#ffa" : "#fff");
            }	
            
            ops[0].text='Select a "Classification" above ^';
            document.getElementById('classtype').disabled = true;
        } // only run if selform exists
	
	}			
	
	splitClassTitles();
*/	

	function switchVals(oplistChoice)
	{
	/*	var sel=document.forms['selform'].classtype;
		var ops=sel.options;

		ops.length=1;
		
		if(oplistChoice=="")
		{
			sel.style.background="#ffecec";
			ops[0].text='Select a "Classification" above ^';
			document.getElementById('classtype').disabled = true;
		}
		
		else if(oplistChoice=="'C','D'")
		{
			ops[0].text='Select a COMMERCIAL classification (highlighted in yellow)';
			sel.style.background="#ffecec";
			document.getElementById('classtype').disabled = false;

			for(var i=0; i<commercial.length; i++)
			{
				sel.options.add(commercial[i]);
			}						
		}
	
		else if(oplistChoice=="'R','D'")
		{
			ops[0].text='Select a RESIDENTIAL classification (highlighted in yellow)';
			sel.style.background="#ffecec";
			document.getElementById('classtype').disabled = false;

			for(var i=0; i<residential.length; i++)
			{
				sel.options.add(residential[i]);
				
			}						
		}

		ops[0].selected="selected";
*/

	}


