'use strict'
var testCardNumbers = ["1444444444444440", "5100000000000001"];
var testCardTypes = ["visa", "master"];
var validator = (function () {
  /**
  Regular expressions for vlidations
  **/
  var patterns = {
    zip: {
      US: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
      default: /^[a-zA-Z0-9-\s]+$/
    },
    email: {
      first: /^[A-Za-z0-9\+]+([-._][A-Za-z0-9\+]+)*@([A-Za-z0-9\+]+(-[A-Za-z0-9\+]+)*\.)+[A-Za-z]{2,24}$/,
      last: /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/
    },
    phone: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
    cardNumber: {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      master: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6390|6759|676[1-3]|0604)/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
      solo: /^(6334|6767)/,
      laser: /^(6304|670[69]|6771)/
    },
    cardNumberStarting: {
      visa: /^4[0-9]/,
      master: /^((5[1-5])|(2[2-7][0-9]))/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6390|6759|676[1-3]|0604)/,
      amex: /^3[47]/,
      discover: /^6(?:011|5[0-9]{2})/,
      jcb: /^(?:21|180|35)/,
      diners: /^(54|55)/,
      solo: /^(6334|6767)/,
      laser: /^(6304|670[69]|6771)/
    }
  };
  return {
    isValidZip: function (zip, country, pattern) {
      if (typeof pattern !== 'undefined') {
        return pattern.test(zip);
      }
      if (!patterns.zip.hasOwnProperty(country)) {
        return patterns.zip.default.test(zip);
      }
      return patterns.zip[country].test(zip);
    },
    /**
     * Email Address validator
     **/
    isValidEmail: function (email) {
      return patterns.email.first.test(email) && patterns.email.last.test(email);
    },
    isValidPhone: function (phone) {
      return patterns.phone.test(phone);
    },
    /**
     * Card Number Validator
     * Support Visa, Master, Amex, Diner, Discover, Jcb
     * @param cardNumber: A string of Card Number without any masking
     * @param cardType: A string of Card Type
     * @return boolean
     **/
    isValidCardNumber: function (cardNumber, cardType) {
      if (testCardNumbers.includes(cardNumber)) {
        return true;
      }
      if (typeof cardNumber !== 'string' && !(cardNumber instanceof String)) {
        return false;
      }
      if (typeof cardType !== 'string' && !(cardType instanceof String)) {
        return false;
      }
      if (!patterns.cardNumber.hasOwnProperty(cardType)) {
        for (var field in patterns.cardNumber) {
          if (patterns.cardNumber[field].test(cardNumber)) {
            return true;
          }
        }
        return false;
      }
      return patterns.cardNumber[cardType].test(cardNumber);
    },
    /**
     * CVV Validator
     * Support Visa, Master, Amex, Diner, Discover, Jcb
     **/
    isValidCvv: function (phone) {
      return /^\d{3,4}$/.test(phone);
    },
    /**
     * Card Length Provider
     * Support Visa, Master, Amex, Diner, Discover, Jcb
     * @param cardType: A string of Card Type
     **/
    getCardNumberMaxLength: function (cardType) {
      var maxLengths = {
        visa: 16,
        master: 16,
        amex: 15,
        diners: 14,
        discover: 16,
        jcb: 16
      };
      if (!maxLengths.hasOwnProperty(cardType)) {
        return 16;
      }
      return maxLengths[cardType];
    },
    /**
     * Card Type Detector
     * Support Visa, Master, Amex, Diner, Discover, Jcb
     * @param cardNumber: A string of Card Number without any masking
     * @return string if match or boolean false
     **/
    getCardType: function (cardNumber) {
      if (testCardNumbers.includes(cardNumber)) {
        return testCardTypes[testCardNumbers.indexOf(cardNumber)];
      }

      for (var cardType in patterns.cardNumberStarting) {
        if (patterns.cardNumberStarting[cardType].test(cardNumber)) {
          return cardType;
        }
      }
      return false;
    }
  };
}());

// changes the [form] action to [destination] attribute and submits it
function submitToNextStep(form, destination) {
  $(form).attr('action', destination);
  $(form).submit();
}
// validation rules
var testCardNumbers = ["1444444444444440", "5100000000000001"];
var testCardTypes = ["visa", "master"];

var validator = (function () {
  /**
  Regular expressions for vlidations
  **/
  var patterns = {
    zip: {
      US: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
      default: /^[a-zA-Z0-9-\s]+$/
    },
    email: {
      first: /^[A-Za-z0-9\+]+([-._][A-Za-z0-9\+]+)*@([A-Za-z0-9\+]+(-[A-Za-z0-9\+]+)*\.)+[A-Za-z]{2,24}$/,
      last: /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/
    },
    phone: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
    cardNumber: {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      master: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6390|6759|676[1-3]|0604)/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
      solo: /^(6334|6767)/,
      laser: /^(6304|670[69]|6771)/
    },
    cardNumberStarting: {
      visa: /^4[0-9]/,
      master: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6390|6759|676[1-3]|0604)/,
      amex: /^3[47]/,
      discover: /^6(?:011|5[0-9]{2})/,
      jcb: /^(?:21|180|35)/,
      diners: /^(54|55)/,
      solo: /^(6334|6767)/,
      laser: /^(6304|670[69]|6771)/
    }
  };
  return {
    isValidZip: function (zip, country, pattern) {
      if (typeof pattern !== 'undefined') {
        return pattern.test(zip);
      }
      if (!patterns.zip.hasOwnProperty(country)) {
        return patterns.zip.default.test(zip);
      }
      return patterns.zip[country].test(zip);
    },
    /**
     * Email Address validator
     **/
    isValidEmail: function (email) {
      return patterns.email.first.test(email) && patterns.email.last.test(email);
    },
    isValidPhone: function (phone) {
      return patterns.phone.test(phone);
    },
    /**
     * Card Number Validator
     * Support Visa, Master, Amex, Diner, Discover, Jcb
     * @param cardNumber: A string of Card Number without any masking
     * @param cardType: A string of Card Type
     * @return boolean
     **/
    isValidCardNumber: function (cardNumber, cardType) {

      if (testCardNumbers.indexOf(cardNumber)) {
        return true;
      }
      if (typeof cardNumber !== 'string' && !(cardNumber instanceof String)) {
        return false;
      }
      if (typeof cardType !== 'string' && !(cardType instanceof String)) {
        return false;
      }
      if (!patterns.cardNumber.hasOwnProperty(cardType)) {
        for (var field in patterns.cardNumber) {
          if (patterns.cardNumber[field].test(cardNumber)) {
            return true;
          }
        }
        return false;
      }
      return patterns.cardNumber[cardType].test(cardNumber);
    },
    /**
     * CVV Validator
     * Support Visa, Master, Amex, Diner, Discover, Jcb
     **/
    isValidCvv: function (phone) {
      return /^\d{3,4}$/.test(phone);
    },
    /**
     * Card Length Provider
     * Support Visa, Master, Amex, Diner, Discover, Jcb
     * @param cardType: A string of Card Type
     **/
    getCardNumberMaxLength: function (cardType) {
      var maxLengths = {
        visa: 16,
        master: 16,
        amex: 15,
        diners: 14,
        discover: 16,
        jcb: 16
      };
      if (!maxLengths.hasOwnProperty(cardType)) {
        return 16;
      }
      return maxLengths[cardType];
    },
    /**
     * Card Type Detector
     * Support Visa, Master, Amex, Diner, Discover, Jcb
     * @param cardNumber: A string of Card Number without any masking
     * @return string if match or boolean false
     **/
    getCardType: function (cardNumber) {
      if (testCardNumbers.indexOf(cardNumber)) {
        return testCardTypes[testCardNumbers.indexOf(cardNumber)];
      }

      for (var cardType in patterns.cardNumberStarting) {
        if (patterns.cardNumberStarting[cardType].test(cardNumber)) {
          return cardType;
        }
      }
      return false;
    }
  };
}());
// validation rules end
//-------------------FORM FIELDS VALIDATION

function validateFirstName() {
  if ($('#firstName').val() == '') {
    $("#firstName").removeClass("no-error");
    $("#firstName").addClass("has-error");
    return $('#firstName').data('error-message') + '<br>';
  }
  $("#firstName").removeClass("has-error");
  $("#firstName").addClass("no-error");
  return '';
}

function validateLastName() {
  if ($('#lastName').val() == '') {
    $("#lastName").removeClass("no-error");
    $("#lastName").addClass("has-error");
    return $('#lastName').data('error-message') + '<br>';
  }
  $("#lastName").removeClass("has-error");
  $("#lastName").addClass("no-error");
  return '';
}

function validateAddress() {
  if ($('#address1').val() == '') {
    $("#address1").removeClass("no-error");
    $("#address1").addClass("has-error");
    return $('#address1').data('error-message') + '<br>';
  }
  $("#address1").removeClass("has-error");
  $("#address1").addClass("no-error");
  return '';
}

function validateZip() {
  if (!validator.isValidZip($('#postalCode').val(), 'US')) {
    $("#postalCode").removeClass("no-error");
    $("#postalCode").addClass("has-error");
    return $('#postalCode').data('error-message') + '<br>';
  }
  $("#postalCode").removeClass("has-error");
  $("#postalCode").addClass("no-error");
  var zip = $("#postalCode").val();
  $.ajax({
    url: "https://zippopotam.us/us/" + zip,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      $('[name=city]').val(data.places[0]["place name"]).addClass('no-error');
      if (undefined !== data.places[0]["state abbreviation"] &&
        $('select[name="state"] option[value="' + data.places[0]["state abbreviation"] + '"]').length > 0) {
        $('select[name="state"]').val(data.places[0]["state abbreviation"]).addClass('no-error');
      }
    }
  });
  return '';
}

function validateCity() {
  if ($('#city').val() == '') {
    $("#city").removeClass("no-error");
    $("#city").addClass("has-error");
    return $('#city').data('error-message') + '<br>';
  }
  $("#city").removeClass("has-error");
  $("#city").addClass("no-error");
  return '';
}

function validateState() {
  if ($('#state').val() == '') {
    $("#state").removeClass("no-error");
    $("#state").addClass("has-error");
    return $('#state').data('error-message') + '<br>';
  }
  $("#state").removeClass("has-error");
  $("#state").addClass("no-error");
  return '';
}

function validatePhone() {
  if ($('#phone').val() == '') {
    $("#phone").removeClass("no-error");
    $("#phone").addClass("has-error");
    return $('#phone').data('error-message') + '<br>';
  }
  $("#phone").removeClass("has-error");
  $("#phone").addClass("no-error");
  return '';
}

function validateEmail() {
  var email = $('#email'),
    el = email.val(),
    regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    result = regex.test(el);

  if (email.val() == '') {
    email.removeClass("no-error");
    email.addClass("has-error");
    return email.data('error-message') + '<br>';
  }
  if (result == false) {
    email.removeClass("no-error");
    email.addClass("has-error");
    return email.data('error-message') + '<br>';
  } else {
    email.addClass("no-error");
    email.removeClass("has-error");
    return '';
  }
}

function validateCreditCardNumber() {
  // first, sanitize the number by removing all non-digit characters.
  var $el = $("#creditCardNumber");
  var num = $el.val();
  num = num.replace(/-/g, "").replace(/_/g, "");
  if (num == '' || num.length < 16) {
    $el.removeClass('no-error').addClass('has-error');
    return $el.data('error-message') + '<br>';
  }
  // regular visa maestro discover validation
  if (num.match(/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/) && $isMcPage == false) {
    $('#master-modal').modal();
    $el.val('').removeClass('no-error').addClass('has-error');
    console.log('MASTER');
    return $el.data('error-message') + '<br>';
  } 
  if($isMcPage == false) {
    $('#campaignId').val($credit); // set default campaignId for cc
    if(num === '0000000000000000'){
      $el.removeClass('has-error').addClass('no-error');
      return '';
    }
    if (num.match(/^4\d{15}/) || num.match(/^4\d{12}/)) {
      $el.removeClass("has-error");
      $el.addClass("no-error");
      $('#creditCardType').val('VISA');
      console.log('VISA');
    }
    if (num.match(/^3[47]\d{13}/)) {
      $el.removeClass("has-error");
      $el.addClass("no-error");
      console.log('AMEX');
      $('#creditCardType').val('AMEX');
    }
    if (num.match(/^6011\d{12}/)) {
      $el.removeClass("has-error");
      $el.addClass("no-error");
      console.log('DISCOVER');
      $('#creditCardType').val('DISCOVER');
    }
    $.ajax({
      url: "https://lookup.binlist.net/" + num,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Accept-Version", "3");
      },
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
      success: function (data) {
        console.log(JSON.stringify(data));
        if (data.prepaid == true && $isMcPage == false) {
          // update to reroute pp to master 
          $('#pp-modal').modal();
          $el.val('');
          $('#campaignId').val($master); //var from checkout.php
          $('#product1_id').val($prod1_id_c4); // add prepaid prodid
          console.log('is prepaid: ' + data.prepaid);
          // $("input:hidden[name='affId']").val(''); //remove affId on prepaid
          // $('#campaignId').val($prepaid); //var from checkout.php
          // $('#product1_id').val($prod1_id_c2); // add prepaid prodid
          // console.log('is prepaid: ' + data.prepaid);
          // $("input:hidden[name='affId']").val(''); //remove affId on prepaid
        }
        if (data.prepaid == false && $isMcPage == false) {
          $('#campaignId').val($credit); //var from checkout.php
          $('#product1_id').val($prod1_id); // add regular prodid
          console.log('is prepaid: ' + data.prepaid);
        }
      },
      error: function () {
        if (creditCardNumber != '0000000000000000') {
          console.log('Cannot Check Card Type or Invalid credit card number');
        }
      }
    });
  }
  // mastercard validation 
  if (!num.match(/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/) && $isMcPage == true) {
    if(num === '0000000000000000'){
      $el.removeClass('has-error').addClass('no-error');
      return '';
    }
    else{
      $('#master-modal').modal();
      $el.val('').removeClass('no-error').addClass('has-error');
      console.log('NON MASTER');
      return $el.data('error-message') + '<br>';
    }
  }
  else if($isMcPage == true){
    $('#campaignId').val($masterId); // set campaignId for master
    //$("input:hidden[name='affId']").val(''); //remove affId on master
  }
  return '';
}


function validateExpirationDate() {
  var right_now = new Date();
  var the_year = right_now.getFullYear().toString().substr(-2);
  var the_month = right_now.getMonth();
  if (the_month < 10) {
    the_month = 0 + '' + the_month;
  }
  var month = $('#cardMonth').val();
  var year = $('#cardYear').val();
  // console.log(month + ' ' +year+' reference:'+ the_month + ' '+ the_year);
  if (month == '' || year == '') {
    $("#cardMonth, #cardYear").removeClass("no-error");
    $("#cardMonth, #cardYear").addClass("has-error");
    return $("#cardMonth, #cardYear").data('error-message') + '<br>';
  }
  if (month < the_month && year <= the_year) {
    $("#cardMonth").removeClass("no-error");
    $("#cardMonth").addClass("has-error");
    return $("#cardMonth").data('error-message') + '<br>';
  }
  if (year < the_year) {
    $("#cardMonth").removeClass("no-error");
    $("#cardMonth").addClass("has-error");
    return $("#cardMonth").data('error-message') + '<br>';
  } else {
    $("#cardMonth, #cardYear").removeClass("has-error");
    $("#cardMonth, #cardYear").addClass("no-error");
    return '';
  }
}

function validateCVV() {
  if ($('#CVV').val() == '') {
    $("#CVV").removeClass("no-error");
    $("#CVV").addClass("has-error");
    return $('#CVV').data('error-message') + '<br>';
  }
  $("#CVV").removeClass("has-error");
  $("#CVV").addClass("no-error");
  return '';
}

function validateProdId() {
  if ($('#prodid').val() == '') {
    $("#prodid").removeClass("no-error");
    $("#prodid").addClass("has-error");
    return $('#prodid').data('error-message') + '<br>';
  }
  $("#prodid").removeClass("has-error");
  $("#prodid").addClass("no-error");
  return '';
}
//---------------------END FORM FIELDS VALIDATION


// custom validation for the prospect form
function validateProspectForm() {
  var errorTexts = '';
  errorTexts += validateFirstName();
  errorTexts += validateLastName();
  errorTexts += validateAddress();
  errorTexts += validateZip();
  errorTexts += validateCity();
  errorTexts += validateState();
  errorTexts += validatePhone();
  errorTexts += validateEmail();

  if (errorTexts != '') {
    // errors were found => display them using $('#formError') modal
    $('#loading-indicator').removeClass('active');
    $('#error-texts').html(errorTexts);
    $('#formError').modal('show');
    return false;
  } else {
    // errors => form inputs are valid
    return true;
  }
}

// custom validation for the checkout form
function validateCheckoutForm() {
  var errorTexts = '';
  errorTexts += validateCreditCardNumber();
  errorTexts += validateExpirationDate();
  errorTexts += validateCVV();
  errorTexts += validateProdId();
  if ($("input:checkbox[name='billShipSame']").prop('checked') == false) {
    errorTexts += validateFirstName();
    errorTexts += validateLastName();
    errorTexts += validateAddress();
    errorTexts += validateZip();
    errorTexts += validateCity();
    errorTexts += validateState();
  }

  if (errorTexts != '') {
    // errors were found => display them using $('#formError') modal
    $('#loading-indicator').removeClass('active');
    $('#error-texts').html(errorTexts);
    $('#formError').modal('show');
    return false;
  } else {
    // errors => form inputs are valid
    return true;
  }
}

$('#submit-button').click(function (e) {
  e.preventDefault();
  $('#loading-indicator').addClass('active');
  var dataObj = $('#form-contact').serialize();
  if (validateProspectForm()) {
    $.ajax({
      url: submitUrl + 'lead',
      data: dataObj,
      method: "POST",
      type: "POST",
      headers: {
        'Accept': 'application/json'
      },
      success: function (result) {
        var response =JSON.parse(result);
        console.log(response);
        if (response.result == 'ERROR') {
          $('#loading-indicator').removeClass('active');
          $('#error-texts').html(JSON.stringify(response.message));
          $('#formError').modal('show');
        } else {
          document.getElementById("orderId").value = response.message.orderId;
          submitToNextStep('#form-contact', 'checkout.php');

        }
      },
      error: function (result) {
        var $el = result.responseJSON.errors,
          $err = [];
        $.each($el, function (index, value) {
          $err.push(index + ": " + value + '<br>');
        });
        $('#loading-indicator').removeClass('active');
        $('#error-texts').html($err);
        $('#formError').modal('show');
      }
    });
  }
});
$('#submit-button-mob').click(function (e) {
  e.preventDefault();
  $('#loading-indicator').addClass('active');
  var dataObj = $('#form-contact').serialize();
  if (validateProspectForm()) {
    $.ajax({
      url: submitUrl + 'lead',
      data: dataObj,
      method: "POST",
      type: "POST",
      headers: {
        'Accept': 'application/json'
      },
      success: function (result) {
        var response =JSON.parse(result);
        console.log(response);
        if (response.result == 'ERROR') {
          $('#loading-indicator').removeClass('active');
          $('#error-texts').html(JSON.stringify(response.message));
          $('#formError').modal('show');
        } else {
          document.getElementById("orderId").value = response.message.orderId;
          submitToNextStep('#form-contact', 'checkout-mobile.php');

        }
      },
      error: function (result) {
        var $el = result.responseJSON.errors,
          $err = [];
        $.each($el, function (index, value) {
          $err.push(index + ": " + value + '<br>');
        });
        $('#loading-indicator').removeClass('active');
        $('#error-texts').html($err);
        $('#formError').modal('show');
      }
    });
  }
});



$('#submit-button-checkout').click(function (e) {
  e.preventDefault();
  $('#loading-indicator').addClass('active');
  var dataObj = $('#form-checkout').serialize();
  var $el = $("#creditCardNumber");

  if (validateCheckoutForm()) {
    $.ajax({
      url: submitUrl + 'new_order',
      data: dataObj,
      method: "POST",
      type: "POST",
      headers: {
        'Accept': 'application/json'
      },
      success: function (result) {
        var result = JSON.parse(result);
        if (result.result == 'ERROR') {
          var $err = result.message;
          if ($err == 'Transaction Declined: Prepaid Credit Cards Are Not Accepted') {
            $('#loading-indicator').removeClass('active');
            $('#pp-modal').modal();
            $el.val('');
            $('#campaignId').val($master); //var from checkout.php
            $('#product1_id').val($prod1_id_c4); // add prepaid prodid
            // $('#campaignId').val($prepaid);
            // $('#submit-button-checkout').click();
            return;
          }
          $('#loading-indicator').removeClass('active');
          $('#error-texts').html($err);
          $('#formError').modal('show');
          return;
        } else {
          document.getElementById("orderId").value = result.message.orderId;
          document.getElementById("order_json").value = JSON.stringify(result.message);
          submitToNextStep('#form-checkout', 'upsell1.php');
        }
      },
      error: function (result) {
        var $el = result.responseJSON.errors,
          $err = [];
        $.each($el, function (index, value) {
          $err.push(index + ": " + value + '<br>');
        });
        $('#loading-indicator').removeClass('active');
        $('#error-texts').html($err);
        $('#formError').modal('show');
      }
    });
  }
});
$('#submit-button-upsell').click(function (e) {
  e.preventDefault();
  // add correct upsell id quantity
  var $input = $('#prodId'),
    $val = $(this).data('id');
  $input.val($val);
  $('#loading-indicator').addClass('active');
  var dataObj = $('#upsell_form').serialize();
  $.ajax({
    url: submitUrl + 'upsell',
    data: dataObj,
    method: "POST",
    type: "POST",
    headers: {
      'Accept': 'application/json'
    },
    success: function (result) {
      var result = JSON.parse(result);
      if (result.result == 'ERROR') {
        $err = result.message;
        $('#loading-indicator').removeClass('active');
        $('#error-texts').html($err);
        $('#formError').modal('show');
        return;
      } else {
        document.getElementById("order_json").value = JSON.stringify(result.message);
        submitToNextStep('#upsell_form', 'upsell2.php');
      }
    },
    error: function (result) {
      var result = JSON.parse(result.responseText),
        $el = result.errors,
        $err = [];
      $.each($el, function (index, value) {
        $err.push(index + ": " + value + '<br>');
      });
      $('#loading-indicator').removeClass('active');
      $('#error-texts').html($err);
      $('#formError').modal('show');
    }
  });

});
$('#submit-button-upsell2').click(function (e) {
  e.preventDefault();
  var $input = $('#prodId'),
    $val = $(this).data('id');
  $input.val($val);
  $('#loading-indicator').addClass('active');
  var dataObj = $('#upsell_form').serialize();
  $.ajax({
    url: submitUrl + 'upsell',
    data: dataObj,
    method: "POST",
    type: "POST",
    headers: {
      'Accept': 'application/json'
    },
    success: function (result) {
      // console.log(result);
      var result = JSON.parse(result);
      if (result.result == 'ERROR') {
        $err = result.message;
        $('#loading-indicator').removeClass('active');
        $('#error-texts').html($err);
        $('#formError').modal('show');
        return;
      } else {
        document.getElementById("order_json").value = JSON.stringify(result.message);
        submitToNextStep('#upsell_form', 'thankyou.php');
      }
    },
    error: function (result) {
      var result = JSON.parse(result.responseText);
      var $el = result.errors,
        $err = [];
      $.each($el, function (index, value) {
        $err.push(index + ": " + value + '<br>');
      });
      $('#loading-indicator').removeClass('active');
      $('#error-texts').html($err);
      $('#formError').modal('show');
    }
  });

});
$('#submit-button-upsell3').click(function (e) {
  e.preventDefault();
  var $input = $('#prodId'),
    $val = $(this).data('id');
  $input.val($val);
  $('#loading-indicator').addClass('active');
  var dataObj = $('#upsell_form').serialize();
  $.ajax({
    url: submitUrl + 'upsell',
    data: dataObj,
    method: "POST",
    type: "POST",
    headers: {
      'Accept': 'application/json'
    },
    success: function (result) {
      // console.log(result);
      var result = JSON.parse(result);
      if (result.result == 'ERROR') {
        $err = result.message;
        $('#loading-indicator').removeClass('active');
        $('#error-texts').html($err);
        $('#formError').modal('show');
        return;
      } else {
        document.getElementById("order_json").value = JSON.stringify(result.message);
        submitToNextStep('#upsell_form', 'thankyou.php');
      }
    },
    error: function (result) {
      var result = JSON.parse(result.responseText);
      var $el = result.errors,
        $err = [];
      $.each($el, function (index, value) {
        $err.push(index + ": " + value + '<br>');
      });
      $('#loading-indicator').removeClass('active');
      $('#error-texts').html($err);
      $('#formError').modal('show');
    }
  });

});

function setProdId($id) {
  $('#prodid').val($id);
}

$(function () {
  $('a[href*=\\#]:not([href=\\#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});