let lastScrollTop = 0; // Keep track of the last scroll position

function createTopbar() {
  console.log('Creating topbar...'); // Debugging line

  // Create the topbar container
  const topbar = document.createElement('div');
  topbar.className = 'py-1 px-6 fixed z-20 flex justify-between items-center';
  topbar.style.height = '67px';
  topbar.style.width = '100%';
  topbar.style.maxWidth = '1850px';
  topbar.style.left = '50%';
  topbar.style.transform = 'translateX(-50%)';
  topbar.style.top = '15px'; // Initial position (visible)
  topbar.style.borderRadius = '15px';
  topbar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
  topbar.style.transition = 'top 0.3s ease-in-out'; // Smooth animation
  topbar.style.zIndex = '9999'; // Ensure it's on top

  // Apply theme styles to the topbar
  applyThemeStyles(topbar);

  // Left side of the topbar (logo)
  const leftSide = document.createElement('div');
  leftSide.className = 'flex items-center space-x-2 h-full';

  // Create a link wrapper for the logo image
  const imageLink = document.createElement('a');
  imageLink.href = 'index.html';
  imageLink.className = 'flex items-center nav-link h-full';
  imageLink.style.transition = 'transform 0.3s ease-in-out';

  // Add the logo image
  const customImage = document.createElement('img');
  customImage.src = 'data/website icons/logo.png'; // Path to your logo image
  customImage.alt = 'Logo';
  customImage.className = 'logo-image'; // Add a class for targeting
  customImage.style.width = '190px';
  customImage.style.height = '85px';
  customImage.style.objectFit = 'contain'; // Ensure the logo maintains its aspect ratio
  customImage.style.marginLeft = '-10px'; // Adjust positioning
  imageLink.appendChild(customImage);

  // Append the logo to the left side
  leftSide.appendChild(imageLink);
  topbar.appendChild(leftSide);

  // Right side of the topbar (navigation links)
  const nav = document.createElement('nav');
  nav.className = 'space-x-6 flex items-center h-full';

  // Define navigation links with images
  const links = [
    { image: 'data/website icons/gamesbutton.png', href: 'games.html', alt: 'Games', id: 'games-btn' },
    { image: 'data/website icons/appsbutton.png', href: 'apps.html', alt: 'Apps', id: 'apps-btn' },
    { image: 'data/website icons/settingsbutton.png', href: 'settings.html', alt: 'Settings', id: 'settings-btn' },
  ];

  // Create image-based navigation links
  links.forEach(link => {
    const navLink = document.createElement('a');
    navLink.className = 'flex items-center nav-link';
    navLink.href = link.href;
    if (link.id) {
      navLink.id = link.id;
    }

    // Disable the link until username is set
    if (!localStorage.getItem('userName')) {
      navLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the link from working
      });
    }

    const navImage = document.createElement('img');
    navImage.src = link.image; // Path to the icon image
    navImage.alt = link.alt;
    navImage.className = 'nav-icon'; // Add a class for targeting
    navImage.style.width = '32px';
    navImage.style.height = '32px';
    navImage.style.objectFit = 'contain'; // Ensure the icon maintains its aspect ratio
    navImage.style.transition = 'transform 0.3s ease-in-out';

    // Add hover effects
    navLink.addEventListener('mouseenter', () => {
      navImage.style.transform = 'scale(1.1)';
    });
    navLink.addEventListener('mouseleave', () => {
      navImage.style.transform = 'scale(1)';
    });

    navLink.appendChild(navImage);
    nav.appendChild(navLink);
  });

  // Add a separator
  const separator = document.createElement('div');
  separator.className = 'separator'; // Add a class for targeting
  separator.style.width = '1px';
  separator.style.height = '24px';
  separator.style.backgroundColor = '#ccc'; // Light gray color
  nav.appendChild(separator);

  // Add the Discord image link
  const discordLink = document.createElement('a');
  discordLink.href = 'https://discord.gg/Eub64mWbzk';
  discordLink.className = 'flex items-center nav-link';
  discordLink.style.marginTop = '2px';
  discordLink.style.transition = 'transform 0.3s ease-in-out';

  // Disable the Discord link until username is set
  if (!localStorage.getItem('userName')) {
    discordLink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the link from working
    });
  }

  const discordImage = document.createElement('img');
  discordImage.src = 'data/website icons/discord.png'; // Path to Discord icon
  discordImage.alt = 'Discord Logo';
  discordImage.className = 'discord-logo'; // Add a class for targeting
  discordImage.style.width = '32px';
  discordImage.style.height = '30px';
  discordImage.style.objectFit = 'contain'; // Ensure the Discord logo maintains its aspect ratio

  discordLink.appendChild(discordImage);

  // Add hover effects to the Discord image
  discordLink.addEventListener('mouseenter', () => {
    discordLink.style.transform = 'scale(1.1)';
  });
  discordLink.addEventListener('mouseleave', () => {
    discordLink.style.transform = 'scale(1)';
  });

  nav.appendChild(discordLink);
  topbar.appendChild(nav);

  // Insert the topbar at the top of the body
  document.body.insertBefore(topbar, document.body.firstChild);

  // Apply theme styles when the theme changes
  document.addEventListener('themeChanged', () => {
    applyThemeStyles(topbar);
  });

  // Scroll event listener to hide/show the topbar
  window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Scrolling down, hide the topbar
      topbar.style.top = '-67px';
    } else {
      // Scrolling up, show the topbar
      topbar.style.top = '15px';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
  });
}

function createFooter() {
  const footer = document.createElement('div');
  footer.className = 'w-full py-2 px-6 fixed bottom-0 z-10 flex justify-center items-center'; // Lower z-index than topbar
  applyThemeStyles(footer);

  // Create a container for the navigation links
  const navContainer = document.createElement('div');
  navContainer.className = 'flex space-x-6';

  const links = [
    { text: 'Contact', href: 'contact.html' },
    { text: 'Legal', href: 'legal.html' },
    { text: 'About', href: 'about.html' },
  ];

  links.forEach(link => {
    const navLink = document.createElement('a');
    navLink.className = 'text-lg md:text-xl font-bold nav-link glow-text';
    navLink.href = link.href;
    navLink.textContent = link.text;
    if (link.id) {
      navLink.id = link.id;
    }
    navContainer.appendChild(navLink);
  });

  footer.appendChild(navContainer);

  // Add copyright text
  const copyrightText = document.createElement('p');
  copyrightText.className = 'text-sm text-white-400 absolute left-6';
  copyrightText.textContent = '';

  footer.appendChild(copyrightText);
  document.body.appendChild(footer);

  // Apply theme styles when the theme changes
  document.addEventListener('themeChanged', () => {
    applyThemeStyles(footer);
  });
}

// Function to apply theme styles
function applyThemeStyles(element) {
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();

  element.style.backgroundColor = primaryColor;
  element.style.color = textColor;
}

// Function to enable all buttons after username is set
function enableButtons() {
  const buttons = document.querySelectorAll('.nav-link');
  buttons.forEach(button => {
    button.removeEventListener('click', (e) => e.preventDefault()); // Remove the click blocker
  });
}

// Check if username is set and enable buttons
if (localStorage.getItem('userName')) {
  enableButtons();
}

// Debugging: Ensure the createTopbar and createFooter functions are called
createTopbar();
createFooter();

// Event listener for the blank window link
document.getElementById('blank-top')?.addEventListener('click', function (event) {
  event.preventDefault();
  openBlankWindow();
});

document.getElementById('blank-footer')?.addEventListener('click', function (event) {
  event.preventDefault();
  openBlankWindow();
});

function openBlankWindow() {
  const newWindow = window.open('about:blank', '_blank');

  newWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Tab</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          border: none;
        }
        html, body {
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        body, iframe {
          height: 100vh;
          width: 100vw;
        }
        iframe {
          height: 96vh;
          width: 100vw;
        }
        header {
          display: flex;
          height: 4vh;
          justify-content: center;
          gap: 10px;
        }
        button {
          height: 100%;
          aspect-ratio: 1 / 1;
          background-size: cover;
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
        #home {
          background-image: url("data/website icons/home.png");
        }
        #reload {
          background-image: url("data/website icons/reload.png");
        }
      </style>
    </head>
    <body>
      <header>
        <button id="home" title="Home"></button>
        <button id="reload" title="Reload"></button>
      </header>
      <iframe id="night"></iframe>
      <script>
        let night = document.getElementById("night");
        night.setAttribute("src", "${window.location.href}");
        document.getElementById("reload").addEventListener("click", function () {
          night.contentWindow.location.reload();
        });

        document.getElementById("home").addEventListener("click", function () {
          const homepage = new URL("${window.location.origin}/index.html");
          night.setAttribute("src", homepage.href);
        });
      <\/script>
    </body>
    </html>
  `);
  newWindow.document.close();
}

// Add CSS for mobile devices
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .logo-image {
      width: 150px !important; /* Smaller logo on mobile */
      height: 67px !important; /* Maintain aspect ratio */
      object-fit: contain !important;
    }

    .nav-icon {
      width: 40px !important; /* Bigger buttons on mobile */
      height: 40px !important; /* Bigger buttons on mobile */
      object-fit: contain !important; /* Ensure icons maintain aspect ratio */
    }

    .discord-logo {
      width: 40px !important; /* Bigger Discord logo on mobile */
      height: 37.5px !important; /* Maintain aspect ratio */
      object-fit: contain !important;
    }

    .separator {
      display: block !important; /* Ensure the separator is visible */
      width: 1px !important;
      height: 24px !important;
      background-color: #ccc !important; /* Light gray color */
      margin: 0 8px !important; /* Add spacing around the separator */
    }
  }
`;
document.head.appendChild(style);

// Rest of your code remains unchanged