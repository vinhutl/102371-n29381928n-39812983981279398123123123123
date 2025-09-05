// Define themes
const themes = {
    theme1: {
        "--primary-color": "#181c24",
        "--background-color": "#000000",
        "--text-color": "#FFFFFF",
        "--input-bg": "#2d3748",
        "--input-border": "#4a5568",
    },
    theme2: {
        "--primary-color": "#808080",
        "--background-color": "#FFFFFF",
        "--background-image": "url('/data/backgrounds/whitescreen.jpg')",
        "--text-color": "#000000",
        "--input-bg": "#FFFFFF",
        "--input-border": "#000000",
    },
    theme3: {
        "--primary-color": "#081848",
        "--background-color": "#5f81bf",
        "--background-image": "url('/data/backgrounds/心流.jpg')",
        "--text-color": "#FFFFFF",
        "--input-bg": "#34436a",
        "--input-border": "#081848",
    },
    theme4: {
        "--primary-color": "#203874",
        "--background-color": "#5f81bf",
        "--background-image": "url('/data/backgrounds/invain.jpg')",
        "--text-color": "#FFFFFF",
        "--input-bg": "#9399bd",
        "--input-border": "#7486b4",
    },
    theme5: {
        "--primary-color": "#0e1339",
        "--background-color": "#ff8c71",
        "--background-image": "url('/data/backgrounds/かえりみち.jpg')",
        "--text-color": "#FFFFFF",
        "--input-bg": "#252466",
        "--input-border": "#f48fb1",
    },
    theme6: {
        "--primary-color": "#2a83bb",
        "--background-color": "#2a83bb",
        "--background-image": "url('/data/backgrounds/astray.jpg')",
        "--text-color": "#FFFFFF",
        "--input-bg": "#859ab5",
        "--input-border": "#ffa990",
    },
    theme7: {
        "--primary-color": "#ba527d",
        "--background-color": "#874046",
        "--background-image": "url('/data/backgrounds/sakuracherrybiome.gif')",
        "--text-color": "#FFFFFF",
        "--input-bg": "#859ab5",
        "--input-border": "#ffa990",
    },
    theme8: {
        "--primary-color": "#89b5ce",
        "--background-color": "#fffddb",
        "--background-image": "url('/data/backgrounds/walkbythebeach.gif')",
        "--text-color": "#FFFFFF",
        "--input-bg": "#859ab5",
        "--input-border": "#ffa990",
    },
    theme9: {
        "--primary-color": "#bcc638",
        "--background-color": "#556e4f",
        "--background-image": "url('/data/backgrounds/ponderingcat.jpg')",
        "--text-color": "#FFFFFF",
        "--input-bg": "#859ab5",
        "--input-border": "#ffa990",
    },
    theme10: {
        "--primary-color": "#22abfc",
        "--background-color": "#f6fcfd",
        "--background-image": "url('/data/backgrounds/overlookingjapan.jpg')",
        "--text-color": "#FFFFFF",
        "--input-bg": "#859ab5",
        "--input-border": "#ffa990",
    },
};

function setTheme(themeName) {
    const theme = themes[themeName];
    if (theme) {
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(key, value);
        }

        document.body.style.backgroundAttachment = "fixed";

        localStorage.setItem("night.theme", themeName);

        const themeChangeEvent = new CustomEvent('themeChanged', { detail: themeName });
        document.dispatchEvent(themeChangeEvent);
    }
}

function applyBackgroundImage() {
    const backgroundImageUrl = document.getElementById('backgroundImageUrl').value;

    if (backgroundImageUrl) {
        document.documentElement.style.setProperty('--background-image', `url('${backgroundImageUrl}')`);
        document.body.style.backgroundAttachment = "fixed";

        localStorage.setItem('night.customBackgroundImage', backgroundImageUrl);

        localStorage.removeItem("night.theme");
    } else {
        alert('Please enter a valid image URL.');
    }
}

function removeBackgroundImage() {
    document.documentElement.style.setProperty('--background-image', 'none');
    localStorage.removeItem('night.customBackgroundImage');
}

function loadCustomBackgroundImage() {
    const customBackgroundImage = localStorage.getItem('night.customBackgroundImage');
    if (customBackgroundImage) {
        document.documentElement.style.setProperty('--background-image', `url('${customBackgroundImage}')`);
        document.body.style.backgroundAttachment = "fixed";
        document.getElementById('backgroundImageUrl').value = customBackgroundImage;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("night.theme") || "theme1";
    setTheme(savedTheme);
    loadCustomBackgroundImage();
});