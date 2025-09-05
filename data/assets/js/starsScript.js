    function toggleStars() {
      const starsScript = document.getElementById('starsScript');
      const starsDiv = document.getElementById('stars');
      if (document.getElementById('disableStars').checked) {
        starsScript.remove();
        starsDiv.style.display = 'none';
      } else {
        const script = document.createElement('script');
        script.src = 'js/stars.js';
        script.id = 'starsScript';
        document.body.appendChild(script);
        starsDiv.style.display = 'block';
      }
    }