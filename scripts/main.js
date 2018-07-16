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

    /**
     * Temporary function to show "Coming Soon" text when user clicks on "Donate" button.
     * @param  {Object} evt The click event
     * @return {Undefined}
     */
    function showComingSoonText(evt) {
      var comingSoonText = 'Coming Soon!';
      var donateText = 'Donate';
      var buttonEl = evt.target;

      buttonEl.innerHTML = comingSoonText;

      setTimeout(function () {
        buttonEl.innerHTML = donateText;
      }, 3000);
    }

    var listItems = Array.prototype.slice.call(document.getElementsByClassName('nav-item'));
    var mobileMenu = document.getElementById('sticky-mobile');
    var desktopMenu = document.getElementById('sticky-desktop');
    var docBody = document.getElementsByTagName('html')[0];
    var donateBtn = document.getElementsByClassName('donate')[0];

    document.getElementById('menu-open').addEventListener('click', openMenu);
    document.getElementById('menu-clox').addEventListener('click', closeMenu);
    window.addEventListener('scroll', toggleStickyMenuBorder);
    donateBtn.addEventListener('click', showComingSoonText);
    addFollower();
  })();
