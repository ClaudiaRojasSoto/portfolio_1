import projects from './data.js';

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
          behavior: 'smooth',
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
    closeMenu,
  };
})();

(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', () => {
    mobileMenuModulesCreator.openMenu();
  });
})();

function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  Object.keys(attributes).forEach((attr) => {
    if (attr === 'classList') {
      attributes[attr].forEach((className) => element.classList.add(className));
    } else {
      element[attr] = attributes[attr];
    }
  });

  children.forEach((child) => element.appendChild(child));

  return element;
}

function getData(id) {
  return projects.find((project) => project.id === id);
}

function openPopUp(project) {
  const modal = createElement(
    'div',
    { classList: ['modal'], id: 'projectDetailsModal' },
    [
      createElement('div', { classList: ['modal-content'] }, [
        createElement('span', {
          classList: ['close-btn'],
          id: 'close-btn-modal',
          innerHTML: '<img src="img/IconXpop.svg">',
        }),
        createElement('div', { classList: ['project-details'] }, [
          createElement('div', { classList: ['contenedor-title-modal'] }, [
            createElement('h2', {
              classList: ['modal-title'],
              textContent: project.name,
            }),
          ]),
          createElement('p', { classList: ['modal-subtitle'] }, [
            createElement('span', {
              classList: ['modal-stack-subtitle'],
              textContent: project.subtitle,
            }),
            createElement('span', { classList: ['grey'] }, [
              createElement('img', { src: './img/period.svg' }),
              createElement('span', {
                classList: ['modal-stack'],
                textContent: project.stack,
              }),
              createElement('img', { src: './img/period.svg' }),
              createElement('span', {
                classList: ['modal-year'],
                textContent: project.year,
              }),
            ]),
          ]),
          createElement('div', { classList: ['modal-img-container'] }, [
            createElement('img', {
              classList: ['modal-img'],
              src: project.featuredImage,
            }),
          ]),
          createElement('div', { classList: ['modal-container-desktop'] }, [
            createElement(
              'div',
              { classList: ['modal-container-description'] },
              [
                createElement('p', {
                  classList: ['modal-description'],
                  textContent: project.description,
                }),
                createElement('p', {
                  classList: ['modal-description'],
                  textContent: project.description2,
                }),
              ],
            ),
            createElement(
              'div',
              { classList: ['modal-container-right-buttons'] },
              [
                createElement(
                  'ul',
                  { classList: ['modal-buttons'] },
                  project.technologies.map((tech, index) => createElement(
                    'li',
                    {
                      classList: [
                        `modal-${
                          index < 3 ? ['html', 'css', 'js'][index] : 'js'
                        }-li`,
                      ],
                    },
                    [
                      createElement('span', {
                        classList: [
                          `modal-${
                            index < 3 ? ['html', 'css', 'js'][index] : 'js'
                          }-span`,
                        ],
                        textContent: tech,
                      }),
                    ],
                  )),
                ),
                createElement('div', { classList: ['line'] }),
                createElement(
                  'div',
                  { classList: ['project-links'], id: 'project-link-modal' },
                  [
                    createElement(
                      'a',
                      {
                        classList: ['project-link'],
                        textContent: 'Live Link',
                        href: project.liveLink,
                      },
                      [
                        createElement('img', {
                          classList: ['image-button1'],
                          src: project.buttonLive,
                        }),
                      ],
                    ),
                    createElement(
                      'a',
                      {
                        classList: ['project-link'],
                        textContent: 'Source Link',
                        href: project.sourceLink,
                      },
                      [
                        createElement('img', {
                          classList: ['image-button2'],
                          src: project.buttonSource,
                        }),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ]),
        ]),
      ]),
    ],
  );

  document.body.appendChild(modal);

  modal.classList.add('open');
  modal.style.display = 'block';

  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.style.display = 'none';
    modal.classList.remove('open');
  });
}

function handleProjectButtonClick(event) {
  event.preventDefault();
  const button = event.target;
  const projectId = button.id;
  const project = getData(projectId);
  const projectData = window.innerWidth <= 768 ? project : project.desktopData;
  openPopUp(projectData);
}

function createCards(projects) {
  const cardList = document.getElementById('portfolio');

  projects.forEach((project, index) => {
    const projectData = window.innerWidth <= 768 ? project : project.desktopData;

    const card = createElement('div', { classList: ['card'] });

    const bgImg = createElement('div', {
      classList: [`bg-img${index + 1}`],
      id: window.innerWidth > 768 && (index === 1 || index === 3) ? 'img2' : '',
    });
    card.appendChild(bgImg);

    const img = createElement('img', {
      classList: ['principal-img'],
      src: projectData.featuredImage,
      alt: 'Project image',
    });
    bgImg.appendChild(img);

    const contentCardDesktop = createElement('div', {
      classList: ['content-card-desktop'],
    });
    card.appendChild(contentCardDesktop);

    const title = createElement('h2', {}, [
      document.createTextNode(projectData.name),
    ]);
    contentCardDesktop.appendChild(title);

    const subtitle = createElement('p', { classList: ['subtitle'] }, [
      document.createTextNode(projectData.subtitle),
      createElement('span', { classList: ['grey'] }, [
        createElement('img', {
          src: projectData.point,
          alt: 'Grey period in text',
        }),
        document.createTextNode(projectData.stack),
        createElement('img', {
          src: projectData.point2,
          alt: 'Grey period in text',
        }),
        document.createTextNode(projectData.year),
      ]),
    ]);
    contentCardDesktop.appendChild(subtitle);

    const description = createElement('p', {}, [
      document.createTextNode(projectData.description),
    ]);
    contentCardDesktop.appendChild(description);

    const buttonList = createElement('ul', { classList: ['card-buttons'] });
    const technologies = window.innerWidth <= 768
      ? projectData.technologies.slice(0, 3)
      : project.desktopData.technologies.slice(0, 4);

    technologies.forEach((technology) => {
      const buttonItem = createElement('li', {});
      const button = createElement('button', {}, [
        document.createTextNode(technology),
      ]);
      buttonItem.appendChild(button);
      buttonList.appendChild(buttonItem);
    });

    contentCardDesktop.appendChild(buttonList);

    const projectLinkContainer = createElement('div', {
      classList: ['project-link-container'],
    });
    contentCardDesktop.appendChild(projectLinkContainer);

    const projectLink = createElement(
      'a',
      {
        id: `projectButton${index + 1}`,
        href: '#',
        classList: ['project-link'],
        'data-see-project-button': '',
      },
      [document.createTextNode('See project')],
    );
    projectLink.addEventListener('click', handleProjectButtonClick);
    projectLinkContainer.appendChild(projectLink);

    cardList.appendChild(card);
  });
}

createCards(projects);

const seeProjectsButton = document.querySelectorAll('[data-see-project-button]');

seeProjectsButton.forEach((button) => {
  button.addEventListener('click', () => {
    const projectId = button.id;
    const projectData = getData(projectId);
    const project = window.innerWidth <= 768 ? projectData : projectData.desktopData;
    openPopUp(project);
  });
});

// Validation form and persevere data in browser
const formValidator = document.querySelector('.form-contact-me');

formValidator.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = document.querySelector('input[name="email"]');
  const textArea = document.getElementById('id-textarea');

  const emailValue = emailInput.value;
  const lowercaseEmail = emailValue.toLowerCase();

  if (emailValue !== lowercaseEmail) {
    const errorElement = document.createElement('p');
    errorElement.innerText = 'Send Error. Your email must be written in lowercase letters.';
    errorElement.classList.add('error-message');
    textArea.parentNode.insertBefore(errorElement, textArea.nextSibling);
  } else {
    localStorage.clear();
    formValidator.submit();
  }
});

const formObj = { name: null, email: null, message: null };

const storeDataInLocalStorage = (dataKey, dataValue) => {
  Object.keys(formObj).forEach((key) => {
    if (dataKey === key) {
      formObj[key] = dataValue;
    }
  });
  localStorage.setItem('formData', JSON.stringify(formObj));
};

const formInputs = document.querySelectorAll('[data-form-inputs]');

const loadFormDataFromLocalStorage = () => {
  const storedFormData = localStorage.getItem('formData');
  if (storedFormData) {
    const parsedFormData = JSON.parse(storedFormData);
    Object.assign(formObj, parsedFormData);
    const formInputs = document.querySelectorAll('[data-form-inputs]');
    formInputs.forEach((input) => {
      if (input.name in parsedFormData) {
        input.value = parsedFormData[input.name];
      }
    });
  }
};

formInputs.forEach((input) => {
  input.addEventListener('change', (event) => {
    storeDataInLocalStorage(event.target.name, event.target.value);
  });
});

loadFormDataFromLocalStorage();
