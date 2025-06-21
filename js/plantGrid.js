import { plantsData } from '../data/plantsData.js';

class PlantGrid {
    constructor() {
        this.plants = plantsData;
        this.filteredPlants = [...plantsData];
        this.init();
    }

    init() {
        this.plantGrid = document.getElementById('plantGrid');
        this.noResults = document.getElementById('noResults');

        this.initializeFilters();
        this.renderPlants();
    }

    initializeFilters() {
        // Category button filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.applyFilters();
            });
        });

        // Dropdown filters
        ['sunlightFilter', 'waterFilter'].forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
            }
        });

        // Price filter
        const priceFilter = document.getElementById('priceFilter');
        if (priceFilter) {
            priceFilter.addEventListener('input', () => this.applyFilters());
        }
    }

    applyFilters() {
        const categoryBtn = document.querySelector('.filter-btn.active');
        const category = categoryBtn ? categoryBtn.dataset.filter : 'all';

        const sunlight = document.getElementById('sunlightFilter').value;
        const water = document.getElementById('waterFilter').value;
        const maxPrice = parseFloat(document.getElementById('priceFilter').value);

        this.filteredPlants = this.plants.filter(plant => {
            const categoryMatch = category === 'all' || plant.category === category;
            const sunlightMatch = !sunlight || plant.sunlight === sunlight;
            const waterMatch = !water || plant.water === water;
            const priceMatch = plant.price <= maxPrice;

            return categoryMatch && sunlightMatch && waterMatch && priceMatch;
        });

        this.renderPlants();
    }

    renderPlants() {
        this.plantGrid.innerHTML = '';

        if (this.filteredPlants.length === 0) {
            this.noResults.classList.remove('hidden');
            return;
        }

        this.noResults.classList.add('hidden');

        this.filteredPlants.forEach((plant, index) => {
            const card = this.createPlantCard(plant, index);
            this.plantGrid.appendChild(card);
        });
    }

    createPlantCard(plant, index) {
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="plant-image">
                <img src="${plant.image}" alt="${plant.name}">
                <div class="plant-tags">
                    ${plant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="plant-info">
                <h3 class="plant-name">${plant.name}</h3>
                <p class="plant-description">${plant.description}</p>
                <div class="care-info">
                    <div class="care-item">
                        <i class="fas fa-sun"></i>
                        <span>${plant.careInfo.sunlight}</span>
                    </div>
                    <div class="care-item">
                        <i class="fas fa-tint"></i>
                        <span>${plant.careInfo.watering}</span>
                    </div>
                </div>
                <div class="plant-footer">
                    <span class="price">$${plant.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="handleAddToCart(${plant.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        return card;
    }
}

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PlantGrid();
});

// Global add-to-cart button handler
window.handleAddToCart = (plantId) => {
    const button = document.querySelector(`button[onclick="handleAddToCart(${plantId})"]`);
    if (button) {
        button.innerHTML = '✓ Added';
        button.style.background = '#388E3C';

        setTimeout(() => {
            button.innerHTML = 'Add to Cart';
            button.style.background = '';
        }, 2000);

        console.log(`Added plant ${plantId} to cart`);
    }
};
