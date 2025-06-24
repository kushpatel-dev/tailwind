const navdialog = document.getElementById('nav-dialog')

function handleMenu() {
    navdialog.classList.toggle('hidden');
}

function setupIntersectionObserver(element, isLTR, speed) {
    // Define scroll handler for the specific element
    function scrollHandler() {
        const offset = window.innerHeight - element.getBoundingClientRect().top;
        const translateX = offset * speed;
        const direction = isLTR ? 1 : -1;

        // Apply horizontal transform
        element.style.transform = `translateX(${translateX * direction}px)`;
    }

    // Observe when the element enters/leaves viewport
    const intersectionCallback = (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        if (isIntersecting) {
            document.addEventListener('scroll', scrollHandler);
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }
    };

    const observer = new IntersectionObserver(intersectionCallback);
    observer.observe(element);
}

// Wait until DOM is loaded (important)
window.addEventListener('DOMContentLoaded', () => {
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    // Make sure elements exist
    if (line1 && line2 && line3) {
        setupIntersectionObserver(line1, true, 0.10);
        setupIntersectionObserver(line2, false, 0.15);
        setupIntersectionObserver(line3, true, 0.10);
    } else {
        console.error("One or more elements not found.");
    }
});
