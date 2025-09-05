// tabCloaking.js

// Function to set a cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

// Function to apply tab cloaking
function applyTabCloaking(title, faviconUrl) {
  if (title) {
    document.title = title;
    setCookie("tabTitle", title, 365);
  }
  if (faviconUrl) {
    const favicon = document.getElementById("favicon") || document.createElement('link');
    favicon.id = "favicon";
    favicon.rel = "icon";
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
    setCookie("faviconUrl", faviconUrl, 365);
  }
}

// Function to clear tab cloaking
function clearTabCloaking() {
  document.title = "Night";
  const favicon = document.getElementById("favicon");
  if (favicon) {
    favicon.href = "favicon.ico";
  }
  setCookie("tabTitle", "", -1);
  setCookie("faviconUrl", "", -1);
  document.getElementById("tabTitle").value = "";
  document.getElementById("faviconUrl").value = "";
  document.getElementById("menu-button").innerText = "Select Preset";
  document.getElementById("menu-button").style.width = "auto"; // Reset button width
}

// Load saved settings on page load
window.onload = function () {
  const savedTitle = getCookie("tabTitle");
  const savedFaviconUrl = getCookie("faviconUrl");

  // Apply saved title and favicon if they exist
  if (savedTitle || savedFaviconUrl) {
    applyTabCloaking(savedTitle, savedFaviconUrl);
  }

  // Set saved values in the input fields only if they are custom
  if (savedTitle && !isPresetTitle(savedTitle)) {
    document.getElementById("tabTitle").value = savedTitle;
  } else {
    document.getElementById("tabTitle").value = "";
  }

  if (savedFaviconUrl && !isPresetFavicon(savedFaviconUrl)) {
    document.getElementById("faviconUrl").value = savedFaviconUrl;
  } else {
    document.getElementById("faviconUrl").value = "";
  }

  // Add preset buttons to the menu
  const presets = [
    { previewTitle: "Default", realTitle: "Night", favicon: "favicon.ico" },
    { previewTitle: "Google", realTitle: "Google", favicon: "data/favicons/google.ico" },
    { previewTitle: "Schoology", realTitle: "Home | Schoology", favicon: "data/favicons/schoology.ico" },
    { previewTitle: "Classlink", realTitle: "My Apps", favicon: "data/favicons/classlink.ico" },
    { previewTitle: "Gmail", realTitle: "Inbox", favicon: "data/favicons/gmail.ico" },
    { previewTitle: "Google Classroom", realTitle: "Home", favicon: "data/favicons/googleclassroom.ico" },
    { previewTitle: "Google Drive", realTitle: "My Drive", favicon: "data/favicons/googledrive.ico" },
    { previewTitle: "Google Docs", realTitle: "Google Docs", favicon: "data/favicons/googledocs.ico" },
    { previewTitle: "Google Forms", realTitle: "Google Forms", favicon: "data/favicons/googleforms.ico" },
    { previewTitle: "Google Forms Lock Down Mode", realTitle: "Start your quiz", favicon: "data/favicons/googleforms.ico" },
    { previewTitle: "Google Slides", realTitle: "Google Slides", favicon: "data/favicons/googleslides.ico" },
    { previewTitle: "Google Sites", realTitle: "Google Sites", favicon: "data/favicons/googlesites.ico" },
    { previewTitle: "Home Access Center", realTitle: "Home View Summary", favicon: "data/favicons/hac.ico" },
    { previewTitle: "IXL", realTitle: "IXL | Math, Language Arts, Social Studies, and Spanish ", favicon: "data/favicons/ixl.ico" },
    { previewTitle: "i-Ready Math", realTitle: "Math To Do, i-Ready", favicon: "data/favicons/iready.ico" },
    { previewTitle: "i-Ready Reading", realTitle: "Reading To Do, i-Ready", favicon: "data/favicons/iready.ico" },
    { previewTitle: "Eduphoria", realTitle: "Eduphoria! Login", favicon: "data/favicons/eduphoria.ico" },
    { previewTitle: "McGraw Hill", realTitle: "McGraw Hill Professional | Textbooks | Interactive Learning Solutions", favicon: "data/favicons/mcgrawhill.ico" },
  ];

  const menu = document.getElementById('menu');
  presets.forEach(preset => {
    const button = document.createElement('button');
    button.className = 'preset-button text-white block px-4 py-2 text-sm w-full text-left';
    button.setAttribute('role', 'menuitem');
    button.setAttribute('data-preview-title', preset.previewTitle);
    button.setAttribute('data-real-title', preset.realTitle);
    button.setAttribute('data-favicon', preset.favicon);
    button.innerText = preset.previewTitle; // Show preview title by default
    menu.appendChild(button);
  });

  // Handle preset button clicks
  document.querySelectorAll('.preset-button').forEach(button => {
    button.addEventListener('click', function () {
      const realTitle = this.getAttribute('data-real-title');
      const faviconUrl = this.getAttribute('data-favicon');
      applyTabCloaking(realTitle, faviconUrl);

      // Update the menu button text and resize it
      const menuButton = document.getElementById('menu-button');
      menuButton.innerText = this.getAttribute('data-preview-title');
      menuButton.style.width = `${menuButton.scrollWidth}px`; // Resize button to fit text

      // Clear input fields if a preset is selected
      if (isPresetTitle(realTitle)) {
        document.getElementById("tabTitle").value = "";
      }
      if (isPresetFavicon(faviconUrl)) {
        document.getElementById("faviconUrl").value = "";
      }

      document.getElementById('menu').classList.add('hidden');
    });
  });
};

// Function to check if a title is a preset
function isPresetTitle(title) {
  const presets = [
    "Google", "Schoology", "Classlink", "Gmail", "Google Classroom", "Google Drive", 
    "Google Docs", "Google Forms", "Google Forms Lock Down Mode", "Google Slides", 
    "Google Sites", "Home Access Center", "IXL", "i-Ready Math", "i-Ready Reading", 
    "Eduphoria", "McGraw Hill"
  ];
  return presets.includes(title);
}

// Function to check if a favicon URL is a preset
function isPresetFavicon(faviconUrl) {
  const presetFavicons = [
    "images/favicons/google.png",
    "images/favicons/schoology.png",
    "images/favicons/classlink.png",
    "images/favicons/gmail.png",
    "images/favicons/googleclassroom.png",
    "images/favicons/googledrive.png",
    "images/favicons/googledocs.png",
    "images/favicons/googleforms.png",
    "images/favicons/googleslides.png",
    "images/favicons/googlesites.png",
    "images/favicons/hac.png",
    "images/favicons/ixl.png",
    "images/favicons/iready.png",
    "images/favicons/noiconhere.png",
    "images/favicons/mcgrawhill.png"
  ];
  return presetFavicons.includes(faviconUrl);
}

// Handle Enter key press for Tab Title input
document.getElementById("tabTitle")?.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const tabTitle = this.value;
    applyTabCloaking(tabTitle, null);
  }
});

// Handle Enter key press for Favicon URL input
document.getElementById("faviconUrl")?.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const faviconUrl = this.value;
    applyTabCloaking(null, faviconUrl);
  }
});

// Toggle dropdown menu
document.getElementById('menu-button').addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('hidden');
});

// Close dropdown menu when clicking outside
window.addEventListener('click', function (e) {
  if (!document.getElementById('menu-button').contains(e.target) && !document.getElementById('menu').contains(e.target)) {
    document.getElementById('menu').classList.add('hidden');
  }
});

// Handle clear button click
document.getElementById('clear-button').addEventListener('click', clearTabCloaking);