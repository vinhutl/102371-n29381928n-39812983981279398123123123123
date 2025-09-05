let gamesData = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

fetch('json/apps.json')
  .then(response => response.json())
  .then(data => {
    gamesData = data;
    renderGames(gamesData);
  })
  .catch(error => console.error('Error loading games data:', error));

function renderGames(filteredGames) {
  const gameGrid = document.getElementById('game-grid');
  const starredGrid = document.getElementById('starred-grid');
  const emptyMessage = document.getElementById('empty-favorites-message');

  gameGrid.innerHTML = '';
  starredGrid.innerHTML = '';

  filteredGames.forEach((game) => {
    const gameCard = createGameCard(game, favorites.includes(game.name));
    gameGrid.appendChild(gameCard);
  });

  const starredGames = filteredGames.filter(game => favorites.includes(game.name));
  if (starredGames.length > 0) {
    starredGames.forEach((game) => {
      const gameCard = createGameCard(game, true);
      starredGrid.appendChild(gameCard);
    });
    emptyMessage.classList.add('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
  }

  document.querySelectorAll('.favorite-star').forEach(star => {
    star.addEventListener('click', (e) => {
      e.preventDefault();
      const gameName = star.getAttribute('data-name');
      toggleFavorite(gameName);
    });
  });
}

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

function toggleFavorite(gameName) {
  if (favorites.includes(gameName)) {
    favorites = favorites.filter(name => name !== gameName);
  } else {
    favorites.push(gameName);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderGames(gamesData);
}

let searchTimeout;
document.getElementById('search-input').addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const filteredGames = gamesData.filter(game => game.name.toLowerCase().includes(searchQuery));
    renderGames(filteredGames);
  }, 0);
});