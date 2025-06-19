class NavigationBar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.initializeNavbar();
    }

    initializeNavbar() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                this.closeMenu();
            });
        });
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const nav = new NavigationBar();
});