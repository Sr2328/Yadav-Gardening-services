document.addEventListener('DOMContentLoaded', () => {
    const uploadBox = document.getElementById('uploadBox');
    const spacePhoto = document.getElementById('spacePhoto');
    const previewImage = document.getElementById('previewImage');
    const designStyle = document.getElementById('designStyle');

    // Upload functionality
    uploadBox.addEventListener('click', () => {
        spacePhoto.click();
    });

    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    spacePhoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    // Design style changes
    designStyle.addEventListener('change', () => {
        const style = designStyle.value;
        // Apply different overlay effects based on selected style
        document.querySelector('.design-overlay').className = `design-overlay ${style}`;
    });
});