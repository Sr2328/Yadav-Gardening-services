// Sample gallery items (you can load from JSON or API too)
const galleryItems = [
  { id: 1, category: 'gardens', img: '../ygs-img/designs-img/snake-plant--catg.jpg', title: 'Zen Garden Design' },
  
];

let visibleCount = 6;
const incrementCount = 3;

// DOM Elements
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.querySelector('.load-more');

// Render gallery items based on filter
function renderGallery(filter = 'all') {
  galleryGrid.innerHTML = '';

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const visibleItems = filteredItems.slice(0, visibleCount);

  visibleItems.forEach(item => {
    const div = document.createElement('div');
    div.className = `gallery-item ${item.category}`;
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" onerror="this.src='fallback.jpg'" />
  <h4>${item.title}</h4>

    `;
    galleryGrid.appendChild(div);
  });

  // Hide "Load More" if all filtered items are shown
  loadMoreBtn.style.display = visibleItems.length >= filteredItems.length ? 'none' : 'inline-flex';
}

// Filter button click
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    visibleCount = 6;
    const filter = button.dataset.filter;
    renderGallery(filter);
  });
});

// Load more functionality
loadMoreBtn.addEventListener('click', () => {
  visibleCount += incrementCount;

  const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
  renderGallery(activeFilter);
});

// Initial load
renderGallery('all');
