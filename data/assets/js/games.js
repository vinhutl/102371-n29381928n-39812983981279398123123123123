// script.js
let games = [];

// Fetch games from JSON
fetch('data/games.json')
  .then(response => response.json())
  .then(data => {
    games = data;
    displayGames(games);
  })
  .catch(error => {
    console.error('Error loading games:', error);
  });

// Display games in the grid
function displayGames(gamesToDisplay) {
  const gameGrid = document.getElementById('game-grid');
  gameGrid.innerHTML = gamesToDisplay
    .map(
      game => `
        <div class="game-card" data-game="${game.url}">
          <img src="${game.image}" alt="${game.name}" />
          <p>${game.name}</p>
        </div>
      `
    )
    .join('');
}

// Add click event to game cards
document.addEventListener('click', (e) => {
  if (e.target.closest('.game-card')) {
    const gameUrl = e.target.closest('.game-card').getAttribute('data-game');
    window.location.href = gameUrl; // Redirect to the game's page
  }
});