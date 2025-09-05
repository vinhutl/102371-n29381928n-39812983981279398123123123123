// Function to get the appropriate greeting based on the time of day
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  if (hour < 22) return 'Good Evening';
  return 'Good Night';
}

// Function to get the appropriate image based on the time of day
function getGreetingImage() {
  const hour = new Date().getHours();
  if (hour < 12) return '/data/website icons/goodmorning.png';
  if (hour < 18) return '/data/website icons/goodafternoon.png';
  if (hour < 22) return '/data/website icons/goodafternoon.png';
  return '/data/website icons/goodnight.png';
}

// Function to display the greeting
function displayGreeting() {
  const greetingElement = document.getElementById('greeting');
  const userName = localStorage.getItem('userName');
  const greetingText = userName ? `${getGreeting()}, ${userName}!` : `${getGreeting()}, welcome to Night!`;
  const greetingImage = getGreetingImage();

  greetingElement.innerHTML = `<img src="${greetingImage}" alt="Greeting image representing the time of day" class="w-8 h-8 mr-2">${greetingText}`;
}

// Function to show the name popup
function showNamePopup() {
  const popup = document.getElementById('name-popup');
  popup.classList.remove('hidden');
}

// Function to hide the name popup
function hideNamePopup() {
  const popup = document.getElementById('name-popup');
  popup.classList.add('hidden');
}

// Function to handle the "Done" button click
document.getElementById('done-btn').addEventListener('click', () => {
  const nameInput = document.getElementById('name-input');
  const name = nameInput.value.trim();

  if (name) {
    localStorage.setItem('userName', name);
    hideNamePopup();
    window.location.reload(); // Refresh the page after saving the name
  } else {
    alert('Please enter your name.');
  }
});

// Show the name popup if the user's name is not set
window.onload = () => {
  displayGreeting();
  if (!localStorage.getItem('userName')) {
    showNamePopup();
  }
};
function showNotification(message) {
  const notificationContainer = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div>${message}</div>
    <div class="close-btn">&times;</div>
    <div class="timer-bar"></div>
  `;

  // Add event listener to close button
  notification.querySelector('.close-btn').addEventListener('click', () => {
    notification.remove();
  });

  setTimeout(() => {
    notification.remove();
  }, 4000);

  notificationContainer.appendChild(notification);
}

window.addEventListener('load', () => {
  showNotification('Welcome to Night | Beta v0.5');
});

window.addEventListener('load', () => {
  showNotification('Enjoy Your Time!');
});