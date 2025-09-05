let gamesData = []; // Array to store all game data
let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Array to store favorited games

// Fetch game data from JSON file
fetch('data/games.json')
  .then(response => response.json())
  .then(data => {
    gamesData = data;
    renderGames(gamesData); // Render all games initially
  })
  .catch(error => console.error('Error loading games data:', error));

// Render games in the main grid and starred grid
function renderGames(filteredGames) {
  const gameGrid = document.getElementById('game-grid');
  const starredGrid = document.getElementById('starred-grid');
  const emptyMessage = document.getElementById('empty-favorites-message'); // Get the empty message element

  gameGrid.innerHTML = ''; // Clear the main grid
  starredGrid.innerHTML = ''; // Clear the starred grid

  // Render all games in the main grid
  filteredGames.forEach((game) => {
    const gameCard = createGameCard(game, favorites.includes(game.name));
    gameGrid.appendChild(gameCard);
  });

  // Render favorited games in the starred grid
  const starredGames = filteredGames.filter(game => favorites.includes(game.name));
  if (starredGames.length > 0) {
    starredGames.forEach((game) => {
      const gameCard = createGameCard(game, true);
      starredGrid.appendChild(gameCard);
    });
    emptyMessage.classList.add('hidden'); // Hide the empty message if there are favorited games
  } else {
    emptyMessage.classList.remove('hidden'); // Show the empty message if no games are favorited
  }

  // Add event listeners to favorite stars
  addFavoriteStarEventListeners();
}

// Create a game card element
function createGameCard(game, isStarred) {
  const gameCard = document.createElement('div');
  gameCard.className = 'game-card';
  const isFavorite = favorites.includes(game.name);

  gameCard.innerHTML = `
    <a href="${game.url}" class="block w-full h-full">
      <div class="image-container">
        <img src="${game.image}" alt="${game.name}">
      </div>
      <p>
        <i class="fa-star favorite-star ${isFavorite ? 'fas' : 'far'}" data-name="${game.name}"></i>
        ${game.name}
      </p>
    </a>
  `;

  return gameCard;
}

// Add event listeners to favorite stars
function addFavoriteStarEventListeners() {
  document.querySelectorAll('.favorite-star').forEach(star => {
    star.addEventListener('click', (e) => {
      e.preventDefault();
      const gameName = star.getAttribute('data-name');
      toggleFavorite(gameName);
    });
  });
}

// Toggle a game's favorite status
function toggleFavorite(gameName) {
  if (favorites.includes(gameName)) {
    favorites = favorites.filter(name => name !== gameName); // Remove from favorites
    showNotification(`"${gameName}" has been unfavorited`);
  } else {
    favorites.push(gameName); // Add to favorites
    showNotification(`"${gameName}" has been favorited`);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
  renderGames(gamesData); // Re-render games to reflect changes
}

// Function to show a notification
function showNotification(message) {
  const notificationContainer = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div>${message}</div>
    <div class="close-btn"></div>
    <div class="timer-bar"></div>
  `;

  // Add event listener to close button
  notification.querySelector('.close-btn').addEventListener('click', () => {
    notification.remove();
  });

  // Automatically remove the notification after 4 seconds
  setTimeout(() => {
    notification.remove();
  }, 4000);

  // Add the notification to the container
  notificationContainer.appendChild(notification);
}

// Instant search functionality
document.getElementById('search-input').addEventListener('input', () => {
  const searchQuery = document.getElementById('search-input').value.toLowerCase();
  const filteredGames = gamesData.filter(game => game.name.toLowerCase().includes(searchQuery));
  renderGames(filteredGames); // Render filtered games immediately
});