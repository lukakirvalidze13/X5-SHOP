(function() {
            setTimeout(function() {
                const loader = document.getElementById('nl-preloader');
                if (loader) {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.6s ease';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 600);
                }
            }, 1200); // ზუსტად 1 წამი
        })();