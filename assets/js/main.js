// HEADER TRANSPARENT / SOLID
var navBar = document.querySelectorAll('#top')[0];

window.addEventListener('scroll', () => {
    if (window.scrollY >= 100) {
        navBar.classList.add('headerSolidBg');
    } else if (window.screenY < 100) {
        navBar.classList.remove('headerSolidBg');
    }
});


// *HAMBURGER BUTTON, APPEARS ON SMALL SCREENS +++++++++++++++++++++++++++
const hamburgerButton = document.getElementById('hamburger');
const navList = document.getElementById('navList');
const config = document.getElementById('config');

function toggButton() {
    navList.classList.toggle('show');
    config.classList.toggle('show');

    // Select and remove the span element within the #config div
    const spanElement = config.querySelector('.languages span');
    if (spanElement && config.classList == 'show') {
        spanElement.remove();
    }
}

hamburgerButton.addEventListener('click', toggButton);

// Hamburger button changes to X when clicked
const hamburgerBtn = document.getElementById('hamburger');
hamburgerBtn.addEventListener('click', function () {
    if (this.classList.contains('open')) {
        this.innerHTML = '<i class="fas fa-bars"></i>';
        this.classList.remove('open');
    } else {
        this.innerHTML = '<i class="fas fa-times"></i>';
        this.classList.add('open');
    }
});


// *SET ACTIVE NAV LINK ON SCROLL ++++++++++++++++++++++++++++++++++++++++++++++++++
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('#navList a');
    const sections = document.querySelectorAll('section');
    const btnTop = document.getElementById('btnTop');

    window.onscroll = function () {
        // Get the current scroll position
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // SET ACTIVE CLASS TO THE NAVBAR LINKS
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');

                    // Add active class
                    document.querySelector(`#navList a[href*='#${section.id}']`).classList.add('active');
                });
            };
        });

        //* HIDE THE btnTop ON HOME SCREEN
        // Check if the scroll position is within the "about" section
        if (scrollPosition >= document.getElementById('home').offsetTop &&
            scrollPosition < document.getElementById('home').offsetTop + document.getElementById('home').offsetHeight) {
            // Hide the button
            btnTop.style.display = 'none';
        } else {
            // Show the button
            btnTop.style.display = 'block';
        }
    };
});


// ANIMATION SHOWS ON - SECTION TITLES ++++++++++++++++++++++++
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element));


// *THEME BUTTON +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Automatic theme mode with Jquery based on time.
// $(function () {
//     var hour = (new Date).getHours();

//     if (hour >= 20 || hour <= 8) {
//         $('.lightTheme').removeClass('lightTheme').addClass('darkTheme');
//     } else {
//         $('.darkTheme').removeClass('darkTheme').addClass('lightTheme');
//     }
// });

// Automatic theme mode with Jquery based on browser theme.
$(function () {
    // Check if the browser prefers dark mode
    var prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkMode) {
        $('.lightTheme').removeClass('lightTheme').addClass('darkTheme');
    } else {
        $('.darkTheme').removeClass('darkTheme').addClass('lightTheme');
    }
});

// Ensure the initial state is set when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const themeButton = document.getElementById('themeButton');
    const lightThemeLogo = document.querySelector('.logo-imgLight');
    const darkThemeLogo = document.querySelector('.logo-imgDark');

    // Check the initial state and set the button and logos accordingly
    if (body.classList.contains('lightTheme')) {
        themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        lightThemeLogo.style.display = 'none';
        darkThemeLogo.style.display = 'block';
    } else {
        themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        lightThemeLogo.style.display = 'block';
        darkThemeLogo.style.display = 'none';
    }
});

function changeTheme() {
    const body = document.body;
    body.classList.toggle('lightTheme');
    body.classList.toggle('darkTheme');

    const themeButton = document.getElementById('themeButton');
    const lightThemeLogo = document.querySelector('.logo-imgLight');
    const darkThemeLogo = document.querySelector('.logo-imgDark');

    if (body.classList.contains('lightTheme')) {
        themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        lightThemeLogo.style.display = 'none';
        darkThemeLogo.style.display = 'block';
    } else {
        themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        lightThemeLogo.style.display = 'block';
        darkThemeLogo.style.display = 'none';
    }
}

// *READ JSON FROM JAVASCRIPT IN ABOUT SECTION +++++++++++++++++++++++++++++++++++
// Dinamically update selected language
let currentLanguage = "es"; // Set default language
let projectCards; //the variant is initialized to store the data of each card x project

// Function to change language
function changeLanguage(language) {
    if (language !== currentLanguage) {

        currentLanguage = language;
        // Fetch the language data from the JSON file
        fetch(`./assets/data/languages/data${language.toUpperCase()}.json`)
            .then(response => response.json())
            .then(data => {
                updateContent(data),
                    projectCards = data.projects;
                renderProjectCard(projectCards);
            })
            .catch(error => console.error('Error fetching language data:', error));
    }
}

//navBar & Titles
const homeElements = document.querySelectorAll("[data-home]");
const aboutElements = document.querySelectorAll("[data-about]");
const portfolioElements = document.querySelectorAll("[data-portfolio]");
const skillsetElements = document.querySelectorAll("[data-skillset]");
const contactElements = document.querySelectorAll("[data-contact]");

// Function to update content on the page
function updateContent(data) {
    const navBarData = data.navBar[0];
    // navBar & Titles
    homeElements.forEach(element => {
        element.textContent = navBarData.dataHome;
    });

    aboutElements.forEach(element => {
        element.textContent = navBarData.dataAbout;
    });

    portfolioElements.forEach(element => {
        element.textContent = navBarData.dataPortfolio;
    });

    skillsetElements.forEach(element => {
        element.textContent = navBarData.dataSkillset;
    });

    contactElements.forEach(element => {
        element.textContent = navBarData.dataContact;
    });

    // ********************************************
    //About
    const aboutData = data.about[0];
    const resumeLinkElement = document.querySelector("[data-resume]");
    const resumeLinkElementPhone = document.querySelector("[data-resume-phone]");
    document.querySelector("[data-presentation]").textContent = aboutData.presentation;
    document.querySelector("[data-training]").textContent = aboutData.training;
    document.querySelector("[data-certifications]").textContent = aboutData.certifications;

    // Select Eng or Esp resume link
    if (aboutData) {
        const resumeLink = aboutData.link;
        const resumeText = aboutData.resume;

        if (resumeLinkElement || resumeLinkElementPhone) {
            resumeLinkElement.innerHTML = `${resumeText} <i class="fa-solid fa-download"></i>`;
            resumeLinkElement.setAttribute("href", resumeLink);
            resumeLinkElementPhone.innerHTML = `${resumeText} <i class="fa-solid fa-download"></i>`;
            resumeLinkElementPhone.setAttribute("href", resumeLink);
        } else {
            console.error("Element with data-resume not found");
        }
    } else {
        console.error("Data for about section not found");
    }

    let educationHTML = "";
    for (let i = 0; i < data.education.length; i++) {
        let education = data.education[i];
        let itemHTML = "<li class='item'><strong>" + education.studyType + "</strong>" + " " + "<span>" + education.institution + "</span>" + " " + "<i>" + education.courses + "</i>" + "</li>";
        educationHTML += itemHTML;
    }
    document.querySelector("[data-education]").innerHTML = educationHTML;

    // ********************************************
    //Contact Form
    const contactFormData = data.contactForm[0];
    document.querySelector("[data-name]").textContent = contactFormData.name;
    document.querySelector("#email").placeholder = contactFormData.placeholder;
    document.querySelector("[data-affair]").textContent = contactFormData.affair;
    document.querySelector("[data-message]").textContent = contactFormData.message;
    document.querySelector("[data-sendButton]").textContent = contactFormData.sendButton;

    // ******************************************
    // Footer
    const footerData = data.footer[0];
    const developedElement = document.querySelector("[data-developed]");
    if (developedElement) {
        developedElement.textContent = footerData.developed;
    } else {
        console.error("Element with data-developed not found");
    }

    document.querySelector("[data-developed]").textContent = footerData.developed
    document.querySelector("[data-rights]").textContent = footerData.rights
    document.querySelector("[data-made]").textContent = footerData.made
    document.querySelector("[data-place]").textContent = footerData.place
}

// Fetch the default language data and set the content when the page loads
fetch('./assets/data/languages/dataES.json')
    .then(response => response.json())
    .then(data => {
        updateContent(data);
        projectCards = data.projects;
        renderProjectCard(projectCards);
        document.getElementById(currentLanguage).classList.add('selectedLang');
    })
    .catch(error => console.error('Error fetching default language data:', error));


// * RENDERING OF THE PORTFOLIO CARDS +++++++++++++++++++++++++++++++++++++++++++++++++++++
const projectCard = document.querySelector("[data-project-card]");
const projectCardTemplate = document.getElementById("card-template")
// Function to render the template for each project
function renderProjectCard(cards) {
    projectCard.innerHTML = ""

    cards.forEach(card => {
        const element = projectCardTemplate.content.cloneNode(true)

        element.querySelector("[data-title]").textContent = card.name;
        element.querySelector("[data-description]").textContent = card.description;
        element.querySelector("[data-img]").setAttribute("src", `./assets/img/portfolio/${card.img}.webp`);

        const techContainer = element.querySelector("[data-technologies]");
        card.technologies.forEach(tech => {
            const icon = document.createElement("i");
            icon.className = `fa-${tech.type} fa-${tech.name} fa-2x`;
            techContainer.appendChild(icon)
        });

        const codeLink = element.querySelector("[data-code]");
        codeLink !== null ? (card.code !== "" ? codeLink.href = card.code : codeLink.style.display = "none") : null;

        const projectLink = element.querySelector("[data-link]");
        projectLink !== null ? (card.link !== "" ? projectLink.href = card.link : projectLink.style.display = "none") : null;

        projectCard.append(element)
    })
}

// *FORM VALIDATION ++++++++++++++++++++++++++++
// !CHECK FORM VALIDATION is not correct ===================================================
// document.getElementById('sendButton').addEventListener('submit', function (event) {
//     event.preventDefault();
// });


// function ValidateEmail(emailId) {
//     let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.w{2,4})+$/;
//     if (emailId.value.match(emailRegex)) {
//         document.form.focus();
//         return true;
//     } else {
//         alert("invalid email address.");
//         document.form.focus();
//         return false;
//     }
// }
// !CHECK FORM VALIDATION is not correct ===================================================

const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const validation = {
    name: /^[a-zA-Z]+\s+[a-zA-Z]{2, 20}$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.w{2,4})+$/
}

const validateForm = (e) => {
    switch (e.target.name) {
        case "name":
            if (validation.name.test(e.target.value)) {
                document.getElementById("nameForm").classList.remove("invalidInput");
            } else {
                document.getElementById("nameForm").classList.add("validForm");
            }

            break;
        case "email":

            break;
        case "affair":

            break;
        case "message":

            break;
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validateForm)
    input.addEventListener("blur", validateForm)
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
})


// Replacing the Default Message for Validation
var inputName = document.getElementById('name');
inputName.oninvalid = function (event) {
    event.targetset.setCustomValidity('Ingresa un nombre valido');
}
// !CHECK FORM VALIDATION is not correct ===================================================

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// EmailJs +++++++++++++++++++++++++++++++++++++++++++++++++
function showAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const closeAlert = document.getElementById('closeAlert');

    alertMessage.textContent = message;
    customAlert.style.display = 'block';

    // Close the alert when the "Close" button is clicked
    closeAlert.addEventListener('click', function () {
        customAlert.style.display = 'none';
    });
}


const formHtml = document.getElementById('form');
const btn = document.querySelector("[data-sendButton]")
const closeAlertText = document.querySelector("[data-closeAlert]")

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        if (currentLanguage == "es") {
            btn.textContent = 'Enviando...';
            closeAlertText.textContent = 'Cerrar';
        } else {
            btn.textContent = 'Sending...';
            closeAlertText.textContent = 'Close';
        }


        const serviceID = 'default_service';
        const templateID = 'PortfolioWeb_n38ejdj';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.textContent = 'Send Email';
                if (currentLanguage == "es") {
                    btn.textContent = 'Enviar';
                    showAlert('Enviado correctamente!');
                } else {
                    btn.textContent = 'Send';
                    showAlert('Submitted successfully!');
                }
                formHtml.reset();

            }, (err) => {
                if (currentLanguage == "es") {
                    alert('Hubo un error, inténtalo mas tarde!');
                    alert(JSON.stringify(err));
                } else {
                    alert('There was an error, try again later!');
                    alert(JSON.stringify(err));
                }
            });
    });

// *FOOTER +++++++++++++++++++++++++++++++++++++++++++++++++++++
// CLOCK ++++++++++++++++++++++++++++++++++++++++++++++++++
const time = document.getElementById('time');
const date = document.getElementById('date');

const interval = setInterval(() => {
    const local = new Date();
    time.innerHTML = local.toLocaleTimeString('en-GB');

}, 1000);


// Get current year to display in footer.
const currentYear = document.getElementById('year');
const year = new Date().getFullYear();
currentYear.innerHTML = year;


$(document).ready()
// $load on star
