// wait for the entire page content to load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // get the hamburger icon and navigation menu
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.nav-bar');

    // toggle the navigation menu visibility when hamburger is clicked
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});
