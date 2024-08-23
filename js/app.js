// Getting the elements being used from the HTML
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navList = document.getElementById('navbar__list');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navb = document.querySelector('nav')
    let scrollTimeout;

    // Dynamically building the navigation menu
    sections.forEach(section => {
        // Creating a list item and setting its inner HTML to an anchor tag linking to the section's ID
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `#${section.id}`;
        anchor.textContent = section.getAttribute('data-nav');
        anchor.classList.add('menu__link');
        
        listItem.appendChild(anchor);
        navList.appendChild(listItem);
    });

    // Function hiding the navigation bar
    const hideNavBar = () => {
        // navb.style.opacity = '0';
        navb.style.display = 'none';
        navb.style.transition = 'display 0.5s';
    };

    // Function showing the navigation bar
    const showNavBar = () => {
        // navb.style.opacity = '1';
        navb.style.display = 'flex';
        navb.style.transition = 'display 0.5s';
    };

    // Scroll event listener for all the functions
    window.addEventListener('scroll', () => {
        let currentSection = null;
        
        // getting the current section in the view and adding the 'active-section' class
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -200 && rect.top < window.innerHeight / 2) {
                currentSection = section;
            }
            section.classList.toggle('active-section', section === currentSection);
        });
        
        // Updating the 'active' class on nav links
        document.querySelectorAll('.menu__link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').slice(1) === currentSection?.id);
        });
        
        // Showing the navigation bar when scrolling
        showNavBar();

        // Clear the previous timeout and set a new one to hide the navigation bar after 6 seconds of no scroll
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(hideNavBar, 6000);

        //Displaying back to top button when scrolling
        scrollTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

    // Smooth scrolling  to the section when a nav bar is clicked
    navList.addEventListener('click', (evt) => {
        if (evt.target.tagName === 'A') { 
            evt.preventDefault();
            // Scrolling to the section smoothly after cick
            document.querySelector(evt.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Scrolling to the top of the page when the "Back to Top" button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    });

    // Show the navigation bar when hovering over it
    navb.addEventListener('mouseover', showNavBar);
    navb.addEventListener('mouseout', () => {
        scrollTimeout = setTimeout(hideNavBar, 9000);
    });

    // Hide the navigation bar after 6 seconds on page load
    scrollTimeout = setTimeout(hideNavBar, 9000);
});
