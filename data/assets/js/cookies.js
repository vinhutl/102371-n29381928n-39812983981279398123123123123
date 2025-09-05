document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed"); // Debugging
    const cookiePopup = document.getElementById("cookie-popup");
    console.log("Cookie popup element:", cookiePopup); // Debugging
    const acceptCookiesButton = document.getElementById("accept-cookies");

    // Check if the user has already accepted cookies
    if (!getCookie("cookiesAccepted")) {
        console.log("Cookie not accepted, showing popup"); // Debugging
        cookiePopup.style.display = "block"; // Show the popup
    }

    // When the user clicks the "Accept" button
    acceptCookiesButton.addEventListener("click", function() {
        console.log("Accept button clicked"); // Debugging
        setCookie("cookiesAccepted", true, 365);
        cookiePopup.style.display = "none"; // Hide the popup
    });

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie by name
    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }

});