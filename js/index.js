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

// details-popup-window

let projectLinkContainer = document.querySelector('.project-link-container');

// console.log(projectLinkContainer);

const seeProjectsButton = document.querySelectorAll(
  '[data-see-project-button]'
);

seeProjectsButton.forEach((button) => {
  button.addEventListener('click', () => {
    const projectId = button.id;
    const projectData = getData(projectId);
    if (window.innerWidth <= 768) {
      openPopUp(projectData);
      openPopUpDesktop(projectData);
    }
  });
});

// projectButton1.addEventListener('click', () => {
//   openPopUp(projectButton1.id);
// });

// projectButton2.addEventListener('click', () => {
//   openPopUp(projectButton2.id);
// });

// projectButton3.addEventListener('click', () => {
//   openPopUp(projectButton3.id);
// });

// projectButton4.addEventListener('click', () => {
//   openPopUp(projectButton4.id);
// });

// projectButton1.addEventListener('click', () => {
//   if (window.innerWidth <= 768) {
//     openPopUp(projectButton1.id);
//     const projectData = getDataDesktop(projectButton1.id);
//     openPopUpDesktop(projectData);
//   }
// });

// projectButton2.addEventListener('click', () => {
//   if (window.innerWidth <= 768) {
//     openPopUp(projectButton2.id);
//   } else {
//     const projectData = getDataDesktop(projectButton2.id);
//     openPopUpDesktop(projectData);
//   }
// });

// projectButton3.addEventListener('click', () => {
//   if (window.innerWidth <= 768) {
//     openPopUp(projectButton3.id);
//   } else {
//     const projectData = getDataDesktop(projectButton3.id);
//     openPopUpDesktop(projectData);
//   }
// });

// projectButton4.addEventListener('click', () => {
//   if (window.innerWidth <= 768) {
//     openPopUp(projectButton4.id);
//   } else {
//     const projectData = getDataDesktop(projectButton4.id);
//     openPopUpDesktop(projectData);
//   }
// });

function openPopUp(projectData) {
  const getId = getData(projectData);
  let project;
  if (window.innerWidth <= 768) {
    project = getId;
  } else {
    project = getId.desktopData;
    console.log('validando nombre', project.name);
  }
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.id = 'projectDetailsModal';
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  let closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.id = 'close-btn-modal';
  closeBtn.innerHTML = '<img src="img/Iconx.png">';
  const projectDetails = document.createElement('div');
  projectDetails.classList.add('project-details');
  const contenTitle = document.createElement('div');
  contenTitle.classList.add('contenedor-title-modal');
  //HIJO --modal-title--> contenTitle
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = project.name;
  const subtitleModal = document.createElement('p');
  subtitleModal.classList.add('modal-subtitle');
  //HIJO DE modal-subtitle--> modal-stack-subtitle
  const stackModal = document.createElement('span');
  stackModal.classList.add('modal-stack-subtitle');
  stackModal.textContent = project.subtitle;
  //HIJO DE modal-subtitle--> grey
  const grey = document.createElement('span');
  grey.classList.add('grey');
  //HIJO DE grey--> imgIcon
  const imgIcon = document.createElement('img');
  imgIcon.src = './img/period.svg';
  //HIJO DE grey--> modal-stack
  const modalStack = document.createElement('span');
  modalStack.classList.add('modal-stack');
  modalStack.textContent = project.stack;
  //HIJO DE grey--> imgIcon2
  const imgIcon2 = document.createElement('img');
  imgIcon2.src = './img/period.svg';
  //HIJO DE grey--> modal-year
  const modalYear = document.createElement('span');
  modalYear.classList.add('modal-year');
  modalYear.textContent = project.year;
  const modalImgContainer = document.createElement('div');
  modalImgContainer.classList.add('modal-img-container');
  const modalImg = document.createElement('img');
  modalImg.classList.add('modal-img');
  modalImg.src = project.featuredImage;
  const modalContainerDesktop = document.createElement('div');
  modalContainerDesktop.classList.add('modal-container-desktop');
  const modalContainerDescription = document.createElement('div');
  modalContainerDescription.classList.add('modal-container-description');
  const modalDescription = document.createElement('p');
  modalDescription.classList.add('modal-description');
  modalDescription.textContent = project.description;
  const modalContainerRightButtons = document.createElement('div');
  modalContainerRightButtons.classList.add('modal-container-right-buttons');
  const modalButton = document.createElement('ul');
  modalButton.classList.add('modal-buttons');
  const modalButtonLi1 = document.createElement('li');
  modalButtonLi1.classList.add('modal-html-li');
  const modalButtonLi2 = document.createElement('li');
  modalButtonLi2.classList.add('modal-css-li');
  const modalButtonLi3 = document.createElement('li');
  modalButtonLi3.classList.add('modal-js-li');
  if (window.innerWidth >= 768) {
    const modalButtonLi4 = document.createElement('li');
    modalButtonLi4.classList.add('modal-js-li');
    const modalButtonLi5 = document.createElement('li');
    modalButtonLi5.classList.add('modal-js-li');
    const modalSpan4 = document.createElement('span');
    modalSpan4.classList.add('modal-js-span');
    modalSpan4.textContent = project.technologies[3];
    const modalSpan5 = document.createElement('span');
    modalSpan5.classList.add('modal-js-span');
    modalSpan5.textContent = project.technologies[4];
    modalButtonLi4.appendChild(modalSpan4);
    modalButtonLi5.appendChild(modalSpan5);
    modalButton.appendChild(modalButtonLi4);
    modalButton.appendChild(modalButtonLi5);
  }
  const modalSpan1 = document.createElement('span');
  modalSpan1.classList.add('modal-html-span');
  modalSpan1.textContent = project.technologies[0];
  const modalSpan2 = document.createElement('span');
  modalSpan2.classList.add('modal-css-span');
  modalSpan2.textContent = project.technologies[1];
  const modalSpan3 = document.createElement('span');
  modalSpan3.classList.add('modal-js-span');
  modalSpan3.textContent = project.technologies[2];
  const line = document.createElement('line');
  line.classList.add('line');
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('project-links');
  buttonContainer.id = 'project-link-modal';
  const liveLinkButton = document.createElement('a');
  liveLinkButton.classList.add('project-link');
  liveLinkButton.textContent = 'Live Link';
  liveLinkButton.href = project.liveLink;
  const sourceLinkButton = document.createElement('a');
  sourceLinkButton.classList.add('project-link');
  sourceLinkButton.textContent = 'Source Link';
  sourceLinkButton.href = project.sourceLink;
  const imageButton1 = document.createElement('img');
  imageButton1.classList.add('image-button1');
  imageButton1.src = project.buttonLive;
  const imageButton2 = document.createElement('img');
  imageButton2.classList.add('image-button2');
  imageButton2.src = project.buttonSource;
  grey.appendChild(imgIcon);
  grey.appendChild(modalStack);
  grey.appendChild(imgIcon2);
  grey.appendChild(modalYear);
  subtitleModal.appendChild(stackModal);
  subtitleModal.appendChild(grey);
  contenTitle.appendChild(modalTitle);
  modalButtonLi1.appendChild(modalSpan1);
  modalButtonLi2.appendChild(modalSpan2);
  modalButtonLi3.appendChild(modalSpan3);
  modalButton.appendChild(modalButtonLi1);
  modalButton.appendChild(modalButtonLi2);
  modalButton.appendChild(modalButtonLi3);
  buttonContainer.appendChild(liveLinkButton);
  liveLinkButton.appendChild(imageButton1);
  buttonContainer.appendChild(sourceLinkButton);
  sourceLinkButton.appendChild(imageButton2);
  modalImgContainer.appendChild(modalImg);
  modalContainerDescription.appendChild(modalDescription);
  modalContainerRightButtons.appendChild(modalButton);
  modalContainerRightButtons.appendChild(line);
  modalContainerRightButtons.appendChild(buttonContainer);
  modalContainerDesktop.appendChild(modalContainerDescription);
  modalContainerDesktop.appendChild(modalContainerRightButtons);
  projectDetails.appendChild(contenTitle);
  projectDetails.appendChild(subtitleModal);
  projectDetails.appendChild(modalImgContainer);
  projectDetails.appendChild(modalContainerDesktop);
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(projectDetails);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  // Abrir el modal
  modal.classList.add('open');
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  // Cerrar el modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    modal.classList.remove('open');
  });
}
function getData(id) {
  return projects.find((project) => project.id === id);
}
function getDataDesktop(id) {
  return projects.find((project) => project.id === id).desktopData;
}
