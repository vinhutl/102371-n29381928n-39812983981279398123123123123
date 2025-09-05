    // Ensure script runs after DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      // Download save functionality
      const downloadsave = document.getElementById('downloadsave');
      if (downloadsave) {
        downloadsave.addEventListener('click', function() {
          const cacheData = { ...localStorage };
          const serializedCache = JSON.stringify(cacheData);
          const blob = new Blob([serializedCache], { type: 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
          
          downloadsave.textContent = 'Downloading...';
          downloadsave.disabled = true;
          
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = 'night.save';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          setTimeout(() => {
            downloadsave.textContent = 'Download Successful';
            downloadsave.disabled = false;
            setTimeout(() => {
              downloadsave.textContent = 'Download Save';
              // Re-add the image that gets removed when text changes
              const img = document.createElement('img');
              img.src = 'data/website icons/download.png';
              img.alt = 'Download Icon';
              img.className = 'mr-2';
              img.height = 20;
              img.width = 20;
              downloadsave.prepend(img);
            }, 2000);
          }, 100);
          
          URL.revokeObjectURL(url);
        });
      }
    
      // Upload save functionality
      const uploadsave = document.getElementById('uploadsave');
      const loadCacheFile = document.getElementById('loadCacheFile');
      
      if (uploadsave && loadCacheFile) {
        uploadsave.addEventListener('click', function() {
          loadCacheFile.click();
        });
        
        loadCacheFile.addEventListener('change', function(event) {
          const file = event.target.files[0];
          if (!file) return;
          
          uploadsave.textContent = 'Uploading...';
          uploadsave.disabled = true;
          
          const reader = new FileReader();
          reader.onload = function(e) {
            try {
              const loadedCache = JSON.parse(e.target.result);
              for (const key in loadedCache) {
                localStorage.setItem(key, loadedCache[key]);
              }
              uploadsave.textContent = 'Finished Upload!';
              uploadsave.disabled = false;
              setTimeout(() => {
                // Re-add the image that gets removed when text changes
                const img = document.createElement('img');
                img.src = 'data/website icons/upload.png';
                img.alt = 'Upload Icon';
                img.className = 'mr-2';
                img.height = 20;
                img.width = 20;
                uploadsave.prepend(img);
                
                window.location.href = '/index.html';
              }, 1000);
            } catch (error) {
              console.error('Error loading cache:', error);
              alert('Invalid cache file.');
              uploadsave.textContent = 'Upload Save';
              uploadsave.disabled = false;
              
              // Re-add the image that gets removed when text changes
              const img = document.createElement('img');
              img.src = 'data/website icons/upload.png';
              img.alt = 'Upload Icon';
              img.className = 'mr-2';
              img.height = 20;
              img.width = 20;
              uploadsave.prepend(img);
            }
          };
          reader.readAsText(file);
        });
      }
      
      // Delete data functionality
      const deleteDataBtn = document.getElementById('deletedata');
      if (deleteDataBtn) {
        deleteDataBtn.addEventListener('click', function() {
          // Show confirmation dialog
          if (confirm('Are you sure you want to delete all website data? This action cannot be undone.')) {
            // Clear all localStorage data
            localStorage.clear();
            
            deleteDataBtn.textContent = 'Deleting...';
            deleteDataBtn.disabled = true;
            
            setTimeout(() => {
              deleteDataBtn.textContent = 'Data Deleted!';
              setTimeout(() => {
                // Re-add the image that gets removed when text changes
                deleteDataBtn.textContent = 'Delete All Data';
                const img = document.createElement('img');
                img.src = 'data/website icons/trash.png';
                img.alt = 'Delete Icon';
                img.className = 'mr-2';
                img.height = 20;
                img.width = 20;
                deleteDataBtn.prepend(img);
                
                // Refresh the page to show changes
                window.location.reload();
              }, 2000);
            }, 500);
          }
        });
      }
    });

    // Tab switching functionality
    document.addEventListener('DOMContentLoaded', function() {
      const tabButtons = document.querySelectorAll('.tab-button');
      const tabContents = document.querySelectorAll('.tab-content');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all tabs
          tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('text-gray-400');
            btn.classList.remove('text-purple-500');
          });
          
          // Hide all tab contents with animation
          tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.opacity = 0;
            content.style.transform = 'translateX(-20px)'; // Slide out to the left
          });
          
          // Add active class to clicked tab
          this.classList.add('active');
          this.classList.remove('text-gray-400');
          this.classList.add('text-purple-500');
          
          // Show corresponding tab content with animation
          const tabId = this.getAttribute('data-tab');
          const activeTab = document.getElementById(tabId);
          if (activeTab) {
            activeTab.classList.add('active');
            setTimeout(() => {
              activeTab.style.opacity = 1;
              activeTab.style.transform = 'translateX(0)'; // Slide in from the left
            }, 10); // Small delay to trigger the animation
          }
        });
      });
    });
        // Function to display current username
        function displayCurrentUsername() {
          const currentUsernameElement = document.getElementById('currentUsername');
          const userName = localStorage.getItem('userName');
          if (userName) {
            currentUsernameElement.textContent = `Current username: ${userName}`;
          } else {
            currentUsernameElement.textContent = 'No username set';
          }
          
          // Also load the current username into the input field
          const usernameInput = document.getElementById('usernameInput');
          if (usernameInput && userName) {
            usernameInput.value = userName;
          }
        }
        
        // Function to handle saving the username
        document.getElementById('saveUsername').addEventListener('click', () => {
          const usernameInput = document.getElementById('usernameInput');
          const username = usernameInput.value.trim();
          if (username) {
            localStorage.setItem('userName', username);
            displayCurrentUsername();
            displayGreeting(); // Update the greeting with the new username
            alert('Username saved successfully!');
          } else {
            alert('Please enter a username.');
          }
        });
        
        // Function to handle clearing the username
        document.getElementById('clearUsername').addEventListener('click', () => {
          if (confirm('Are you sure you want to clear your username?')) {
            localStorage.removeItem('userName');
            document.getElementById('usernameInput').value = '';
            displayCurrentUsername();
            displayGreeting(); // Update the greeting without the username
            alert('Username cleared successfully!');
          }
        });
        
        // Initialize the current username display when the tab is opened
        document.addEventListener('DOMContentLoaded', function() {
          const userTab = document.querySelector('[data-tab="user"]');
          userTab.addEventListener('click', displayCurrentUsername);
          
          // If user tab is active on load, display username
          if (document.querySelector('#user').classList.contains('active')) {
            displayCurrentUsername();
          }
        });
        