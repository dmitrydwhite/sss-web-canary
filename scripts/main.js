(function () {
    function setMobileMenuItemClickListeners() {
      for (var i=0; i<listItems.length; i++) {
        listItems[i].addEventListener('click', closeMenu);
      }
    }

    function clearAllMobileMenuListeners() {
      for (var i=0; i<listItems.length; i++) {
        listItems[i].removeEventListener('click', closeMenu);
      }
    }

    function openMenu() {
      document.getElementsByClassName('menu-options')[0].classList.add('open');
      document.getElementById('menu-open').classList.add('nosho');
      document.getElementById('menu-clox').classList.remove('nosho');

      setMobileMenuItemClickListeners();
    }

    function closeMenu() {
      document.getElementsByClassName('menu-options')[0].classList.remove('open');
      document.getElementById('menu-clox').classList.add('nosho');
      document.getElementById('menu-open').classList.remove('nosho');
    }

    function toggleStickyMenuBorder(evt) {
      var els = [mobileMenu, desktopMenu].filter(function (x) { return x; });
      var bodyTop = docBody.scrollTop;

      if (bodyTop < 8) {
        els.forEach(function (el) { el.classList.remove('needs-border'); });
      } else {
        els.forEach(function(el) { el.classList.add('needs-border'); });
      }
    }

    function addFollower() {
      var lastTitle = document.getElementById('last');

      if (!lastTitle) return;

      var nextP = lastTitle.nextElementSibling;
      var currHeight = lastTitle.clientHeight;
      var diffHeight;

      while (nextP.tagName.toLowerCase() === 'p') {
        currHeight += nextP.clientHeight;
        nextP = nextP.nextElementSibling;
      }

      diffHeight = window.innerHeight - currHeight;

      document.getElementById('follower').style.height = '' + diffHeight + 'px';
    }

    function extractHashFromEvt(event) {
      var oldURL = event && event.oldURL;
      var hashFound = /#\w*$/.exec(oldURL);

      return (hashFound && hashFound[0]) || hashBeforeDonate;
    }

    function showDonateModal(evt) {
      hashBeforeDonate = extractHashFromEvt(evt);
      document.getElementById('donate-modal').classList.remove('nosho');
    }

    function hideDonateModal() {
      document.getElementById('donate-modal').classList.add('nosho');
      if (window.location.hash === '#donate') window.location.hash = hashBeforeDonate;
    }

    function directDonateNav(evt) {
      if (window.location.hash === '#donate') {
        showDonateModal(evt);
      } else {
        hideDonateModal();
      }
    }

    function showMaskForMobile() {
      document.getElementsByTagName('body')[0].classList.add('noscroll');
      document.getElementsByClassName('loading-mask')[0].classList.remove('nosho');
    }

    function volunteerFormFailure() {
      alert('We had some trouble gathering your info (our fault).  Please try again later.');
    }

    function volunteerFormSuccess() {
      alert('Your information has been received -- Thank You!');
    }

    function doSubmit(formData) {
      var Poster = new XMLHttpRequest();
      var baseUrl = 'https://script.google.com/macros/s/AKfycbwHrqzJsmotLz3yPp4J69fHQbAFYOi_1xq-vtDuMksjbGQSGLnF/exec';
      var query = '?';
      var fields = ['firstName', 'lastName', 'emailAddress', 'phoneNumber'];

      for (var i=0; i<fields.length; i++) {
        query += fields[i] + '=' + encodeURIComponent(formData[fields[i]]);
        if (i < 3) { query += '&'; }
      }

      Poster.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) { volunteerFormSuccess(); }
          else { volunteerFormFailure(); }
        }
      };
      Poster.open('GET', baseUrl + query);
      Poster.send();
    }

    function doFormError(formData) {
      var errorDisplay = document.getElementById('ws-volunteer-form--error');
      var messages = [];

      if (!(formData.firstName && formData.lastName)) {
        messages.push('<div class="triptych-error">⚠️ Both first and last name are required</div>');
      }

      if (!formData.emailAddress || !formData.phoneNumber) {
        messages.push('<div class="triptych-error">⚠️ Please provide either a phone number or email address to contact you</div>');
      }

      errorDisplay.classList.remove('nosho');
      errorDisplay.innerHTML = messages.join('');

      document.getElementById('ws-volunteer-form').addEventListener('focusin', function () {
        errorDisplay.classList.add('nosho');
      });
    }

    function handleVolunteerFormSubmit(evt) {
      evt.preventDefault();

      var formFields = ['firstName', 'lastName', 'emailAddress', 'phoneNumber'];
      var formVals = {};

      formFields.forEach(function (fieldName) {
        formVals[fieldName] = evt.target[fieldName] && evt.target[fieldName].value;
      });

      if (
        formVals.firstName &&
        formVals.lastName &&
        (formVals.emailAddress || formVals.phoneNumber)
      ) {
        doSubmit(formVals);
      } else {
        doFormError(formVals);
      }
    }

    function addFormHandlers() {
      var volunteerForm = document.getElementById('ws-volunteer-form');

      if (volunteerForm) { volunteerForm.addEventListener('submit', handleVolunteerFormSubmit); }
    }

    var listItems = Array.prototype.slice.call(document.getElementsByClassName('nav-item'));
    var mobileMenu = document.getElementById('sticky-mobile');
    var desktopMenu = document.getElementById('sticky-desktop');
    var docBody = document.getElementsByTagName('html')[0];
    var hashBeforeDonate = '#';

    document.getElementById('menu-open').addEventListener('click', openMenu);
    document.getElementById('menu-clox').addEventListener('click', closeMenu);
    document.getElementById('donate-clox').addEventListener('click', hideDonateModal);
    document.getElementById('paypal-form').addEventListener('submit', showMaskForMobile);
    window.addEventListener('scroll', toggleStickyMenuBorder);
    window.addEventListener('load', directDonateNav);
    window.addEventListener('hashchange', directDonateNav);
    addFormHandlers();
    addFollower();
  })();
