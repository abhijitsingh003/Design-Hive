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

// Toggle Like button visually
window.toggleLike = function (btn) {
    const isLiked = btn.getAttribute('data-liked') === 'true';
    const icon = btn.querySelector('svg'); // Lucide replaces <i> with <svg>

    if (isLiked) {
        btn.setAttribute('data-liked', 'false');
        btn.classList.remove('liked');
        // Remove solid fill
        if (icon) icon.style.fill = 'none';
        btn.style.color = ''; // reset color
    } else {
        btn.setAttribute('data-liked', 'true');
        btn.classList.add('liked');
        // Add solid fill
        if (icon) icon.style.fill = 'currentColor';
        btn.style.color = 'var(--accent-color)'; // Apply DesignHive pink/red
    }
}

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

// Image / Video Preview Logic
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('image-preview-container');
const previewImage = document.getElementById('image-preview');
const previewVideo = document.getElementById('video-preview');
const removeBtn = document.getElementById('remove-image-btn');

if (imageInput) {
    imageInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const isVideo = file.type.startsWith('video/');

            if (isVideo) {
                // Video Preview
                previewImage.style.display = 'none';
                previewVideo.style.display = 'block';

                // For videos, createObjectURL is faster and cleaner than base64
                const videoUrl = URL.createObjectURL(file);
                previewVideo.src = videoUrl;

                previewContainer.style.display = 'block';
                lucide.createIcons();
            } else {
                // Image Preview
                previewVideo.style.display = 'none';
                previewImage.style.display = 'block';

                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                    previewImage.classList.remove('loaded'); // reset class for new images

                    previewImage.onload = () => {
                        previewImage.classList.add('loaded');
                    };

                    previewContainer.style.display = 'block';
                    lucide.createIcons();
                }
                reader.readAsDataURL(file);
            }
        }
    });

    removeBtn.addEventListener('click', function () {
        imageInput.value = ''; // clear the file input
        previewContainer.style.display = 'none';

        previewImage.src = '';
        previewImage.style.display = 'none';

        previewVideo.pause();
        previewVideo.removeAttribute('src');
        previewVideo.load();
        previewVideo.style.display = 'none';
    });
}
