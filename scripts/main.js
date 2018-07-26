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

    var listItems = Array.prototype.slice.call(document.getElementsByClassName('nav-item'));
    var mobileMenu = document.getElementById('sticky-mobile');
    var desktopMenu = document.getElementById('sticky-desktop');
    var docBody = document.getElementsByTagName('html')[0];
    var hashBeforeDonate = '#';

    document.getElementById('menu-open').addEventListener('click', openMenu);
    document.getElementById('menu-clox').addEventListener('click', closeMenu);
    document.getElementById('donate-clox').addEventListener('click', hideDonateModal);
    window.addEventListener('scroll', toggleStickyMenuBorder);
    window.addEventListener('load', directDonateNav);
    window.addEventListener('hashchange', directDonateNav);
    addFollower();
  })();
