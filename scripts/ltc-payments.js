var ltcDonateBtns = document.getElementsByClassName('ltc-donate');
var modalElements = [
  document.getElementsByClassName('ltc-calendar-donation-modal')[0],
  document.getElementsByClassName('ltc-calendar-donation-mask')[0],
  document.getElementsByClassName('ltc-modal-container')[0],
];
var nightsSponsored = 1;
var kind;

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

var weekMarkup = '' +
'<div class="ltc-donate-type-container">' +
  '<p>' +
    'Yes! I would like to sponsor one person for a week at the Silverton Area Warming Shelter.' +
  '</p>' +
'</div>' +
'<div class="ltc-beds-amount-input">' +
  '<p>' +
    '$<input disabled id="ltcTotalDonationAmount" type="number" class="ltc-beds-number" value=50>' +
  '</p>' +
'</div>' +
'<div class="ltc-paypal-button-container">' +
'<div class="paypal-button-mask"></div>' +
'<div id="ltc-paypal-button"></div>' +
'</div>' +
'<div style="clear:both;"></div>' +
'';

var fullnightMarkup = '' +
'<div class="ltc-donate-type-container">' +
  '<p>' +
    'Yes! I would like to sponsor one full night of shelter for all at the Silverton Area Warming Shelter.' +
  '</p>' +
'</div>' +
'<div class="ltc-beds-amount-input">' +
  '<p>' +
    '$<input disabled id="ltcTotalDonationAmount" type="number" class="ltc-beds-number" value=250>' +
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
  week: weekMarkup,
  fullnight: fullnightMarkup
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

function saveSponsorMessage(evt) {
  evt.preventDefault();

  var Poster = new XMLHttpRequest();
  var baseUrl = 'https://script.google.com/macros/s/AKfycbwHrqzJsmotLz3yPp4J69fHQbAFYOi_1xq-vtDuMksjbGQSGLnF/exec';
  var nightsSelect = document.getElementById('js-night-select');
  var submitFields = ['firstName', 'lastName', 'sponsorMessage']
  var query = '?isCalendarDonor=true&calendarDonorType=' + encodeURIComponent(kind) + '&';

  if (nightsSelect) {
    query += 'quantity=' + encodeURIComponent(nightsSelect.value) + '&';
  } else {
    query += 'quantity=1&';
  }

  for (let i = 0; i < submitFields.length; i++) {
    query += (submitFields[i] + '=' + encodeURIComponent(evt.target[submitFields[i]].value));
    if (i < submitFields.length - 1) { query += '&'; }
  }

  Poster.open('GET', baseUrl + query);
  Poster.send();
}

function openLtcDonateModal(evt) {
  var nightsSelect = null;

  kind = evt.target.getAttribute('data-donate-type');

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

  document.getElementById('ltc-info-form').addEventListener('submit', saveSponsorMessage);
  document.getElementById('ltc-cancel-btn').addEventListener('click', closeLtcDonateModal);
  renderPaypalBtn();
}

function closeLtcDonateModal(completed) {
  if (completed === true) {
    document.getElementById('ltc-info-form').dispatchEvent(new Event('submit'));
  }

  document.getElementsByTagName('body')[0].classList.remove('noscroll');
  document.getElementById('ltc-dynamic-content').innerHTML = '';

  modalElements.forEach(function(elem) {
    elem.classList.add('nosho');
  });
}

function getDescription() {
  var nightsSelect = document.getElementById('js-night-select');
  var bedText = nightsSelect && parseInt(nightsSelect.value, 10) > 1 ? 'beds' : 'bed';

  switch (kind) {
    case 'beds':
      return 'Thank you for sponsoring ' + nightsSelect.value + ' ' + bedText + ' at the Warming Shelter';
    case 'week':
      return 'Thank you for sponsoring one guest for a week at the Warming Shelter';
    case 'fullnight':
      return 'Thank you for sponsoring all guests for one full night at the Warming Shelter';
    default:
      return 'Thank you for your support of the Silverton Area Warming Shelter';
  }
}

function renderPaypalBtn() {
  // Render the PayPal button
  paypal.Button.render({
    // Set your environment
    env: 'production', // sandbox | production
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
      production: 'AWxPxieXgeYj2LSZZdbdULs3PUS1lWI6O729X1oxMo-GfCzrUrhVkG6mximid52S7s2MJVBCxsLzetFI'
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
              description: getDescription(),
            }
          ],
        }
      });
    },

    onAuthorize: function (data, actions) {
      return actions.payment.execute()
        .then(function() {
          closeLtcDonateModal(true);
        });
    }
  }, '#ltc-paypal-button');
}

Array.prototype.slice.call(ltcDonateBtns).forEach(function(btn) {
  btn.addEventListener('click', openLtcDonateModal);
});
