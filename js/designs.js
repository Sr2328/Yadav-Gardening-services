document.addEventListener('DOMContentLoaded', () => {
    class DesignFilter {
        constructor() {
            this.filterButtons = document.querySelectorAll('.filter-btn');
            this.designCards = document.querySelectorAll('.design-card');
            this.filterSection = document.getElementById('filterSticky');
            
            this.initializeFilters();
            this.initializeStickyBehavior();
            this.initializeAnimations();
        }

        initializeFilters() {
            this.filterCards('all');
            this.filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.filterButtons.forEach(btn => btn.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    const filterValue = e.currentTarget.getAttribute('data-filter');
                    this.filterCards(filterValue);
                });
            });
        }
 filterCards(category) {
            this.designCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                card.classList.remove('fade-in', 'fade-out');

                if (category === 'all' || cardCategory === category) {
                    card.classList.add('fade-in');
                    card.style.display = 'block';
                } else {
                    card.classList.add('fade-out');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
     initializeStickyBehavior() {
            if (!this.filterSection) return;
            const filterOffset = this.filterSection.offsetTop;
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > filterOffset) {
                    this.filterSection.classList.add('sticky');
                } else {
                    this.filterSection.classList.remove('sticky');
                }
            });
        }
initializeAnimations() {
            const observerOptions = {
                threshold: 0.2,
                rootMargin: '50px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('card-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            this.designCards.forEach(card => {
                observer.observe(card);
            });
        }
    }
    const designFilter = new DesignFilter();
});