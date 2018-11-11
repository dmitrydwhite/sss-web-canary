var ltcDonateBtns = document.getElementsByClassName('ltc-donate');
var modalElements = [
  document.getElementsByClassName('ltc-calendar-donation-modal')[0],
  document.getElementsByClassName('ltc-calendar-donation-mask')[0],
  document.getElementsByClassName('ltc-modal-container')[0],
];
var nightsSponsored = 1;

var bedsMarkup = '' +
'<div class="ltc-donate-type-container">' +
'<p>' +
'  Yes!  I would like to sponsor' +
'  <select id="js-night-select" value=1 disabled>' +
'    <option value=1>1</option>' +
'    <option value=2>2</option>' +
'    <option value=3>3</option>' +
'    <option value=4>4</option>' +
'    <option value=5>5</option>' +
'    <option value=6>6</option>' +
'    <option value=7>7</option>' +
'    <option value=8>8</option>' +
'    <option value=9>9</option>' +
'    <option value=10>10</option>' +
'  </select>' +
'  <span id="ltc-nights-pluralizer">bed</span>' +
'  this winter at the Silverton Area Warming Shelter.' +
'</p>' +
'</div>' +
'<div class="ltc-beds-amount-input">' +
'<p>' +
'  $<input disabled id="ltcTotalDonationAmount" type="number" class="ltc-beds-number" value=10>' +
'</p>' +
'</div>' +
'<div class="ltc-paypal-button-container">' +
'<div class="paypal-button-mask"></div>' +
'<div id="ltc-paypal-button"></div>' +
'</div>' +
'<div style="clear:both;"></div>' +
'';

var nightMarkup = '' +
'<div class="ltc-donate-type-container">' +
  '<p>' +
    'Yes! I would like to sponsor one person for a week at the Silverton Area Warming Shelter.' +
  '</p>' +
'</div>' +
'<div class="ltc-beds-amount-input">' +
  '<p>' +
    '$<input disabled type="number" class="ltc-beds-number" value=50>' +
  '</p>' +
'</div>' +
'<div class="ltc-paypal-button-container">' +
'<div class="paypal-button-mask"></div>' +
'<div id="ltc-paypal-button"></div>' +
'</div>' +
'<div style="clear:both;"></div>' +
'';

var weekMarkup = '' +
'<div class="ltc-donate-type-container">' +
  '<p>' +
    'Yes! I would like to sponsor one full night of shelter for all at the Silverton Area Warming Shelter.' +
  '</p>' +
'</div>' +
'<div class="ltc-beds-amount-input">' +
  '<p>' +
    '$<input disabled type="number" class="ltc-beds-number" value=250>' +
  '</p>' +
'</div>' +
'<div class="ltc-paypal-button-container">' +
'<div class="paypal-button-mask"></div>' +
'<div id="ltc-paypal-button"></div>' +
'</div>' +
'<div style="clear:both;"></div>' +
'';

var populate = {
  beds: bedsMarkup,
  night: nightMarkup,
  week: weekMarkup
};


function getDonationTotal() {
  var totalAmountInput = document.getElementById('ltcTotalDonationAmount');

  return parseInt(totalAmountInput.value, 10);
}

function setBedsValue(evt) {
  var bedAmountInput = document.getElementById('ltcTotalDonationAmount');
  var nightText = document.getElementById('ltc-nights-pluralizer');
  var newValue = parseInt(evt.target.value, 10);

  nightsSponsored = newValue;
  nightText.innerHTML = newValue > 1 ? 'beds' : 'bed';
  bedAmountInput.value = newValue * 10;
}

function openLtcDonateModal(evt) {
  var kind = evt.target.getAttribute('data-donate-type');
  var nightsSelect = null;

  document.getElementsByTagName('body')[0].classList.add('noscroll');

  modalElements.forEach(function(elem) {
    elem.classList.remove('nosho');
  });

  document.getElementById('ltc-dynamic-content').innerHTML = populate[kind];
  nightsSelect = document.getElementById('js-night-select');

  if (nightsSelect) {
    nightsSelect.disabled = false;
    nightsSelect.addEventListener('change', setBedsValue);
  }

  document.getElementById('ltc-cancel-btn').addEventListener('click', closeLtcDonateModal);
  renderPaypalBtn();
}

function closeLtcDonateModal() {
  document.getElementsByTagName('body')[0].classList.remove('noscroll');
  document.getElementById('ltc-dynamic-content').innerHTML = '';

  modalElements.forEach(function(elem) {
    elem.classList.add('nosho');
  });
}

function renderPaypalBtn() {
  // Render the PayPal button
  paypal.Button.render({
    // Set your environment
    env: 'sandbox', // sandbox | production
    // Specify the style of the button
    style: {
      layout: 'horizontal',  // horizontal | vertical
      size:   'responsive',    // medium | large | responsive
      shape:  'pill',      // pill | rect
      color:  'gold'       // gold | blue | silver | white | black
    },
    funding: {
      allowed: [
        paypal.FUNDING.CARD,
      ],
      disallowed: []
    },
    client: {
      sandbox: 'AUHi5ijmZQI76_jMqlkpDSGgLWCq_4g8CQn1K7FMDjyW_NP8YmD3DHiV3_oY2nHBwjoruMKPnN054pZo',
      // production: ''
    },
    commit: true,

    payment: function (data, actions) {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: getDonationTotal(),
                currency: 'USD'
              },
              description: 'Thank you for sponsoring ' + getDonationTotal() / 10 + ' nights at the Warming Shelter'
            }
          ],
        }
      });
    },

    onAuthorize: function (data, actions) {
      return actions.payment.execute()
        .then(closeLtcDonateModal);
    }
  }, '#ltc-paypal-button');
}

Array.prototype.slice.call(ltcDonateBtns).forEach(function(btn) {
  btn.addEventListener('click', openLtcDonateModal);
});
