// Initialize Lucide icons
lucide.createIcons();

// Flash message auto hide
setTimeout(() => {
    const flashes = document.querySelectorAll('.flash-error, .flash-success');
    flashes.forEach(flash => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 400);
    });
}, 3000);

// Toggle drop down menu
window.toggleDropdown = function (id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach(dropdown => {
        if (!dropdown.parentElement.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
});

// Toggle edit form
window.toggleEdit = function (postId) {
    const form = document.getElementById('edit-form-' + postId);
    const content = document.getElementById('content-' + postId);
    const dropdown = document.getElementById('dropdown-' + postId);

    if (form.style.display === 'none') {
        form.style.display = 'block';
        content.style.display = 'none';
    } else {
        form.style.display = 'none';
        content.style.display = 'block';
    }
    dropdown.classList.remove('show');
}

// Image Preview Logic
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('image-preview-container');
const previewImage = document.getElementById('image-preview');
const removeBtn = document.getElementById('remove-image-btn');

if (imageInput) {
    imageInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'block';
                lucide.createIcons(); // re-init icons just in case the X isn't rendering
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    removeBtn.addEventListener('click', function () {
        imageInput.value = ''; // clear the file input
        previewContainer.style.display = 'none';
        previewImage.src = '';
    });
}
