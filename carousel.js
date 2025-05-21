document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('carousel-container');
    const carousel = document.getElementById('carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    let isScrolling = false; // Flag to prevent scroll during transition

    // Function to disable vertical scrolling on the page
    function disableScroll() {
        document.body.style.overflow = 'hidden';  // Disable page scroll
    }

    // Function to enable vertical scrolling on the page
    function enableScroll() {
        document.body.style.overflow = 'auto';  // Enable page scroll
    }

    // Function to move the carousel to a new position
    function scrollCarousel(direction) {
        if (isScrolling) return; // Prevent scroll during transition

        isScrolling = true;

        // Move the index based on the direction (next or prev)
        if (direction === 'next' && currentIndex < totalItems - 1) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }

        // Move the carousel to the appropriate slide
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // If we reached the last item, enable page scroll
        if (currentIndex === totalItems - 1) {
            enableScroll();
        } else {
            disableScroll(); // Lock scroll in the carousel section
        }

        // Reset scroll behavior based on position
            if (currentIndex === 0 || currentIndex === totalItems - 1) {
                enableScroll();  // Allow scrolling at first or last slide
            } else {
                disableScroll(); // Lock scrolling for middle slides
            }
    
            // Wait for the transition to complete before allowing more scroll
            setTimeout(() => {
                isScrolling = false;
            }, 500);  // Transition duration
        }
    
        // Listen for mouse wheel scroll events on the carousel container
        carouselContainer.addEventListener('wheel', (e) => {
        if (isScrolling) return;  // Prevent scroll during transition
        
        e.preventDefault(); // Prevent default scroll behavior
        
        if (e.deltaY > 0) {
            scrollCarousel('next');  // Scroll to the next image
        } else if (e.deltaY < 0) {
            scrollCarousel('prev');  // Scroll to the previous image
        }
        }, { passive: false });

    // Check if the carousel is in view and lock scroll when it is
    let carouselInView = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When carousel enters the viewport, lock the page scroll
                carouselInView = true;
                disableScroll();
            } else {
                // Unlock scroll when carousel leaves the viewport
                carouselInView = false;
                enableScroll();
            }
        });
    }, { threshold: 1 }); // Observe when 100% of the carousel is visible

    observer.observe(carouselContainer);
});

