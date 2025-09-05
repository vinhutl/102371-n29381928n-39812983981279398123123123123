// shared.js
const starsContainer = document.querySelector('.stars');
const starCount = 200; // Increase the number of stars
const stars = [];

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 3 + 1; // Random size between 1 and 4px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.position = 'absolute';
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  starsContainer.appendChild(star);
  stars.push({
    element: star,
    velocityX: (Math.random() - 0.5) * 0.5, // Random velocity in X direction
    velocityY: (Math.random() - 0.5) * 0.5  // Random velocity in Y direction
  });
}

let lastTimestamp = 0;

// Function to animate stars
function animateStars(timestamp) {
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  stars.forEach(star => {
    // Update the star's position based on its velocity and deltaTime
    const currentTransform = star.element.style.transform || 'translate(0, 0)';
    const currentX = parseFloat(currentTransform.split('(')[1]) || 0;
    const currentY = parseFloat(currentTransform.split(',')[1]) || 0;
    // Update position
    star.element.style.transform = `translate(${currentX + star.velocityX}px, ${currentY + star.velocityY}px)`;

    // Check if the star is out of bounds and reposition it
    const starRect = star.element.getBoundingClientRect();
    if (starRect.left < -10 || starRect.right > window.innerWidth + 10 || 
        starRect.top < -10 || starRect.bottom > window.innerHeight + 10) {
      // Reset position to a random location
      star.element.style.top = `${Math.random() * 100}vh`;
      star.element.style.left = `${Math.random() * 100}vw`;
      star.element.style.transform = 'translate(0, 0)'; // Reset transform
    }
  });

  requestAnimationFrame(animateStars); // Call the function again for smooth animation
}

animateStars(); // Start the animation

