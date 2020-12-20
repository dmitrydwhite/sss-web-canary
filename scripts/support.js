var sustainerButtons = {
  business: {
    platinum: '<form action="https://www.paypal.com/donate" method="post" target="_top">' +
      '<input type="hidden" name="hosted_button_id" value="RB87Q2U6ZYMV6" />' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />' +
      '<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />' +
      '</form>',
    gold: '<form action="https://www.paypal.com/donate" method="post" target="_top">' +
      '<input type="hidden" name="hosted_button_id" value="5TYUPNCKKUSLS" />' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />' +
      '<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />' +
      '</form>',
    silver: '<form action="https://www.paypal.com/donate" method="post" target="_top">' +
      '<input type="hidden" name="hosted_button_id" value="MRDNY2TSQWU48" />' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />' +
      '<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />' +
      '</form>',
    bronze: '<form action="https://www.paypal.com/donate" method="post" target="_top">' +
      '<input type="hidden" name="hosted_button_id" value="8XGB4GXXJH9YL" />' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />' +
      '<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />' +
      '</form>'
  },
  individual: {
    platinum: '<form action="https://www.paypal.com/donate" method="post" target="_top">' +
      '<input type="hidden" name="hosted_button_id" value="AN25W94YKVBN2" />' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />' +
      '<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />' +
      '</form>',
    gold: '<form action="https://www.paypal.com/donate" method="post" target="_top">' +
      '<input type="hidden" name="hosted_button_id" value="Q6NR7DB8UFGQU" />' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />' +
      '<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />' +
      '</form>',
    silver: '<form action="https://www.paypal.com/donate" method="post" target="_top">' +
      '<input type="hidden" name="hosted_button_id" value="D85P5MTA22LV4" />' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />' +
      '<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />' +
      '</form>',
    bronze: '<form action="https://www.paypal.com/donate" method="post" target="_top">' +
      '<input type="hidden" name="hosted_button_id" value="RZVLHX4HEADU4" />' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />' +
      '<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />' +
      '</form>'
  },
  monthly: {
    sustainer: '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">' +
      '<input type="hidden" name="cmd" value="_s-xclick">' +
      '<input type="hidden" name="hosted_button_id" value="MQTUCQADYS9RE">' +
      '<table>' +
      '<tr><td><input type="hidden" name="on0" value=""></td></tr><tr><td><select name="os0">' +
        '<option value="Level 3">Level 3 : $100.00 USD - monthly</option>' +
        '<option value="Level 2">Level 2 : $50.00 USD - monthly</option>' +
        '<option value="Level 1">Level 1 : $25.00 USD - monthly</option>' +
      '</select> </td></tr>' +
      '</table>' +
      '<input type="hidden" name="currency_code" value="USD">' +
      '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribe_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">' +
      '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">' +
      '</form>',
  }
};

const sustainerTypes = {
  business: 'Business / Corporate',
  individual: 'Individual',
};

const amounts = {
  business: {
    platinum: '$1000',
    gold: '$500',
    silver: '$250',
    bronze: '$100'
  }
};

var buttons = document.querySelectorAll('div.medal-level');
var modal = document.getElementById('supporter-engage-modal');
var modalMask = document.getElementById('supporter-engage-modal-mask');
var modalCloseBtn = document.getElementById('close-support-modal');
var ppButtonParent = document.getElementById('button-container');
var supporterType = document.getElementById('sustainer-type');
var supporterLevel = document.getElementById('sustainer-level');
var supportAmount = document.getElementById('support-amount');

function showModal(event) {
  var level = event.currentTarget.getAttribute('data-level');
  var kind = event.currentTarget.getAttribute('data-supporter');
  var amount = event.currentTarget.getAttribute('data-amount');
  var levelMaps = sustainerButtons[kind];
  var ppButton = levelMaps[level];

  supporterType.innerHTML = sustainerTypes[kind];
  supporterLevel.innerHTML = level;
  supportAmount.innerHTML = amount;
  ppButtonParent.innerHTML = ppButton;

  if (ppButton) {
    if (window.location.hash === '#donate') {
      window.location.hash = '';
    }

    modalMask.classList.remove('nosho');
    modal.classList.remove('nosho');
  }
}

function hideModal() {
  if (window.location.search && window.location.search.length > 0) {
    window.location.search = '';
  }
  modal.classList.add('nosho');
  modalMask.classList.add('nosho');

  ppButtonParent.innerHTML = '';
}

function handleExactUrl(str) {
  var parts = str.split(/\?|&/);
  var attributes = {};

  for (var p = 0; p < parts.length; p++) {
    if (parts[p]) {
      var values = parts[p].split('=');

      attributes[values[0]] = values[1];
    }
  }

  if (attributes.supporter && attributes.level && amounts[attributes.supporter]) {
    var ct = document.createElement('div');

    ct.setAttribute('data-level', attributes.level);
    ct.setAttribute('data-supporter', attributes.supporter);
    ct.setAttribute('data-amount', amounts[attributes.supporter][attributes.level]);

    showModal({ currentTarget: ct });
  }
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', showModal);
}

modalCloseBtn.addEventListener('click', hideModal);

if (window.location.search && window.location.search.length > 0) {
  handleExactUrl(window.location.search);
}
