function toggleMenu() {
  const nav = document.querySelector('.my-nav');
  const navMobile = document.querySelector('.nav-mobile');

  if (!nav.classList.contains('menu-open')) {
    nav.classList.add('menu-open');

    const closeIcon = document.createElement('div');
    closeIcon.classList.add('close-icon');
    closeIcon.textContent = 'x';

    closeIcon.addEventListener('click', () => {
      nav.classList.remove('menu-open');
      if (nav.contains(navMobile)) {
        nav.removeChild(navMobile);
      }
    });

    const menuMobile = document.createElement('div');
    menuMobile.classList.add('nav-mobile');

    const menuItems = document.createElement('ul');
    menuItems.classList.add('menu-list');
    menuItems.innerHTML = `
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      `;
  } else {
    nav.classList.remove('menu-open');
    const menuMobile = document.querySelector('.nav-mobile');
    if (nav.contains(menuMobile)) {
      nav.removeChild(menuMobile);
    }
  }
}

const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', toggleMenu);