/* eslint-disable no-unused-vars */
const mobileMenuModulesCreator = (() => {
  // eslint-disable-next-line quotes
  const nav = document.querySelector('.my-nav');

  let closeIcon;
  let menuMobile;
  let menuItems;

  const menuItemsHTML = `
    <li><a href="#portfolio">Portfolio</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  `;

  function removeNavMobile() {
    const navMobile = document.querySelector('.nav-mobile');
    if (nav.contains(navMobile)) {
      nav.removeChild(navMobile);
    }
  }

  function createMenuItems() {
    menuItems = document.createElement('ul');
    menuItems.classList.add('menu-list');
    menuItems.innerHTML = menuItemsHTML;
    menuItems.querySelectorAll('a').forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSection = document.querySelector(item.getAttribute('href'));
        targetSection.scrollIntoView({
          behavior: 'smooth',
        });
        mobileMenuModulesCreator.closeMenu();
      });
    });
  }

  function createCloseIcon() {
    closeIcon = document.createElement('div');
    closeIcon.classList.add('close-icon');
    closeIcon.textContent = 'x';
    closeIcon.addEventListener('click', mobileMenuModulesCreator.closeMenu);
  }

  function createMenuMobile() {
    menuMobile = document.createElement('div');
    menuMobile.classList.add('nav-mobile');
    menuMobile.appendChild(closeIcon);
    menuMobile.appendChild(menuItems);
  }

  function openMenu() {
    nav.classList.add('menu-open');
    createCloseIcon();
    createMenuItems();
    createMenuMobile();
    nav.appendChild(menuMobile);
  }

  function closeMenu() {
    nav.classList.remove('menu-open');
    removeNavMobile();
  }
  return {
    openMenu,
    closeMenu,
  };
})();

const menuToggleModule = (() => {
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', mobileMenuModulesCreator.openMenu);
})();
