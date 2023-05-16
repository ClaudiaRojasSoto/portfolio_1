import { projects } from './data.js';

const mobileMenuModulesCreator = (() => {
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
          behavior: 'smooth'
        });
        mobileMenuModulesCreator.closeMenu();
      });
    });
  }

  function createCloseIcon() {
    closeIcon = document.createElement('div');
    closeIcon.classList.add('close-icon');
    const closeIconImage = document.createElement('img');
    closeIconImage.src = 'img/Iconx.png';
    closeIcon.appendChild(closeIconImage);
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
    closeMenu
  };
})();

(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', () => {
    mobileMenuModulesCreator.openMenu();
  });
})();



//Popup
const seeProjectsButton = document.querySelectorAll(
  '[data-see-project-button]'
);

seeProjectsButton.forEach((button) => {
  button.addEventListener("click", () => {
    const projectId = button.id;
    const projectData = getData(projectId);
    const project = (window.innerWidth <= 768) ? projectData : projectData.desktopData;
    openPopUp(project);
  });
});

function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  for (let attr in attributes) {
    if (attr === 'classList') {
      attributes[attr].forEach(className => element.classList.add(className));
    } else {
      element[attr] = attributes[attr];
    }
  }
  children.forEach(child => element.appendChild(child));
  return element;
}

function openPopUp(project) {
  const modal = createElement('div', { classList: ['modal'], id: 'projectDetailsModal' }, [
    createElement('div', { classList: ['modal-content'] }, [
      createElement('span', { classList: ['close-btn'], id: 'close-btn-modal', innerHTML: '<img src="img/Iconx.png">' }),
      createElement('div', { classList: ['project-details'] }, [
        createElement('div', { classList: ['contenedor-title-modal'] }, [
          createElement('h2', { classList: ['modal-title'], textContent: project.name })
        ]),
        createElement('p', { classList: ['modal-subtitle'] }, [
          createElement('span', { classList: ['modal-stack-subtitle'], textContent: project.subtitle }),
          createElement('span', { classList: ['grey'] }, [
            createElement('img', { src: './img/period.svg' }),
            createElement('span', { classList: ['modal-stack'], textContent: project.stack }),
            createElement('img', { src: './img/period.svg' }),
            createElement('span', { classList: ['modal-year'], textContent: project.year }),
          ]),
        ]),
        createElement('div', { classList: ['modal-img-container'] }, [
          createElement('img', { classList: ['modal-img'], src: project.featuredImage }),
        ]),
        createElement('div', { classList: ['modal-container-desktop'] }, [
          createElement('div', { classList: ['modal-container-description'] }, [
            createElement('p', { classList: ['modal-description'], textContent: project.description }),
          ]),
          createElement('div', { classList: ['modal-container-right-buttons'] }, [
            createElement('ul', { classList: ['modal-buttons'] }, 
              project.technologies.map((tech, index) => 
                createElement('li', { classList: [`modal-${index < 3 ? ['html', 'css', 'js'][index] : 'js'}-li`] }, [
                  createElement('span', { classList: [`modal-${index < 3 ? ['html', 'css', 'js'][index] : 'js'}-span`], textContent: tech })
                ])
              )
            ),
            createElement('line', { classList: ['line'] }),
            createElement('div', { classList: ['project-links'], id: 'project-link-modal' }, [
              createElement('a', { classList: ['project-link'], textContent: 'Live Link', href: project.liveLink }, [
                createElement('img', { classList: ['image-button1'], src: project.buttonLive }),
              ]),
              createElement('a', { classList: ['project-link'], textContent: 'Source Link', href: project.sourceLink }, [
                createElement('img', { classList: ['image-button2'], src: project.buttonSource }),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]);
  
  document.body.appendChild(modal);

  modal.classList.add('open');
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';


  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    modal.classList.remove('open');
  });
}

function getData(id) {
  return projects.find((project) => project.id === id);
}



