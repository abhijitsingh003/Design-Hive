// Generic Password Visibility Toggle Builder
function makeToggle(btnId, inputId, iconId) {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!btn || !input || !icon) return;

    btn.addEventListener('click', () => {
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        icon.innerHTML = isPass
            ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
               <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
               <line x1="1" y1="1" x2="23" y2="23"/>`
            : `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
               <circle cx="12" cy="12" r="3"/>`;
    });
}

// Initialize specific toggles for Auth Pages
// Login logic uses default btn id, Signup uses numerical suffixes.
if (document.getElementById('togglePassword')) {
    if (document.getElementById('eyeIcon')) {
        makeToggle('togglePassword', 'password', 'eyeIcon');
    } else {
        makeToggle('togglePassword', 'password', 'eyeIcon1');
    }
}
if (document.getElementById('toggleConfirm')) {
    makeToggle('toggleConfirm', 'confirmPassword', 'eyeIcon2');
}

// Auto-hide flash messages after 3 seconds
setTimeout(() => {
    const flashes = document.querySelectorAll('.flash-error, .flash-success');
    flashes.forEach(flash => {
        flash.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        flash.style.opacity = '0';
        flash.style.transform = 'translateY(20px)';
        setTimeout(() => flash.remove(), 400); // Remove from DOM after fade and slide
    });
}, 3000);

// Input wrapper focus logic (lets users click white space to type)
document.querySelectorAll('.input-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', function (e) {
        if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
            const input = this.querySelector('input');
            if (input) input.focus();
        }
    });
});
