document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('themeSwitch');

    // Función para guardar el estado del modo oscuro en localStorage
    function saveThemePreference() {
        localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
    }

    // Función para cargar el estado del modo oscuro desde localStorage
    function loadThemePreference() {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeSwitch.checked = true;
        }
    }

    // Agregar un evento change al interruptor
    themeSwitch.addEventListener('change', function() {
        // Si el interruptor está activado, agregar la clase "dark-mode" al body, de lo contrario, quitarla
        if(this.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        // Guardar la preferencia del usuario al cambiar el interruptor
        saveThemePreference();
    });

    // Cargar la preferencia del usuario al cargar la página
    loadThemePreference();
});

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (query) {
            clearHighlights();
            const found = searchAndHighlight(query);
            if (!found) {
                alert('No se encontraron resultados para: ' + query);
            }
        }
    }

    function searchAndHighlight(query) {
        const contentSections = document.querySelectorAll('main section');
        let found = false;

        contentSections.forEach(section => {
            const sectionHTML = section.innerHTML;
            const regex = new RegExp(`(${query})`, 'gi');
            if (regex.test(sectionHTML)) {
                found = true;
                const newHTML = sectionHTML.replace(regex, '<mark class="highlight">$1</mark>');
                section.innerHTML = newHTML;
                if (!section.classList.contains('highlighted')) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    section.classList.add('highlighted');
                }
            }
        });

        return found;
    }

    function clearHighlights() {
        const marks = document.querySelectorAll('mark.highlight');
        marks.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
        document.querySelectorAll('.highlighted').forEach(section => {
            section.classList.remove('highlighted');
        });
    }
});
