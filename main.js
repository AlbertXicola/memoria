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
