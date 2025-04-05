document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    const animate = (el) => {
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / speed);

        const update = () => {
            count += step;
            if (count < target) {
                el.textContent = count;
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };
        update();
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(({isIntersecting, target}) => {
            if (isIntersecting && !target.classList.contains("counted")) {
                animate(target);
                target.classList.add("counted");
                obs.unobserve(target);
            }
        });
    }, {threshold: 0.5});

    counters.forEach((el) => observer.observe(el));
});

// Function to scroll to the top
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Optionally, hide the button when scrolling down
window.onscroll = function () {
    const button = document.getElementById('scrollToTopBtn');
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        button.style.display = "block"; // Show button
    } else {
        button.style.display = "none"; // Hide button
    }
};