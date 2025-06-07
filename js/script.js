// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Variables Globales y Datos Simulados ---
    // Usar localStorage para persistir usuarios y productos entre sesiones del navegador.
    // Inicializar con datos si no existen en localStorage.
    let users = JSON.parse(localStorage.getItem('users')) || {
        'cliente@correo.com': { password: 'password123', role: 'client', fullName: 'Cliente Ejemplo', email: 'cliente@correo.com', address: 'Av. Siempre Viva 742', phone: '+56911112222' },
        'admin@correo.com': { password: 'admin123', role: 'admin', fullName: 'Admin Ejemplo', email: 'admin@correo.com', address: 'Calle Ficticia 101', phone: '+56933334444' }
    };
    // Guardar los usuarios iniciales (o los cargados) en localStorage si no estaban ya.
    localStorage.setItem('users', JSON.stringify(users));

    let comicsData = JSON.parse(localStorage.getItem('comicsData')) || [
        // Tus datos de productos aquí (asegúrate de que estén completos)
        { id: 1, title: 'Fullmetal Alchemist - Tomo 1', author: 'Hiromu Arakawa', price: 9.990, image: 'img/manga1.jpg', type: 'manga' },
        { id: 2, title: 'Shingeki no Kyojin - Tomo 1', author: 'Hajime Isayama', price: 11.990, image: 'img/manga2.jpg', type: 'manga' },
        { id: 3, title: 'JoJos Bizarre Adventure: Stardust Crusaders - Tomo 2', author: 'Hirohiko Araki', price: 16.990, type: 'manga', image: 'img/manga3.jpg' },
        { id: 4, title: 'Dragon Ball - Tomo 1', author: 'Akira Toriyama', price: 9.990, image: 'img/manga4.jpg', type: 'manga' },
        { id: 5, title: 'One Piece - Tomo 2', author: 'Eiichirō Oda', price: 9.990, image: 'img/manga5.jpg', type: 'manga' },
        { id: 6, title: 'Akatsuki no Yona - Tomo 12', author: 'Mizuho Kusanagi', price: 11.990, image: 'img/manga6.jpg', type: 'manga' },
        { id: 7, title: 'Pokémon Rojo - Tomo 1', author: 'Hidenori Kusaka', price: 18.990, image: 'img/manga7.jpg', type: 'manga' },
        { id: 8, title: 'Cardcaptor Sakura - Tomo 1', author: 'CLAMP', price: 15.990, image: 'img/manga8.jpg', type: 'manga' },
        { id: 9, title: 'Fairy Tail - Tomo 34', author: 'Hiro Mashima', price: 9.990, image: 'img/manga9.jpg', type: 'manga' },
        { id: 10, title: 'Dungeon Meshi - Tomo 2', author: 'Ryōko Kui', price: 15.990, image: 'img/manga10.jpg', type: 'manga' },
        { id: 11, title: 'Inuyasha - Tomo 18', author: 'Rumiko Takahashi', price: 15.990, image: 'img/manga11.jpg', type: 'manga' },
        { id: 12, title: 'Sword art online Phantom Bullet - Tomo 1', author: 'Reki Kawahara', price: 9.990, image: 'img/manga12.jpg', type: 'manga' },
        { id: 13, title: 'Batman N#50 ', author: 'Scott Snyder,Marcio Takara,', price: 9.990, image: 'img/comic1.jpg', type: 'comic' },
        { id: 14, title: 'Watchmen', author: 'Alan Moore ', price: 24.990, image: 'img/comic2.jpg', type: 'comic' },
        { id: 15, title: 'The Amazing Spider-Man N#70', author: 'Joe Kelly', price: 55.000, image: 'img/comic3.jpg', type: 'comic' },
        { id: 16, title: 'batman who laughs', author: 'Scott Snyder', price: 27.990, image: 'img/comic4.jpg', type: 'comic' },
        { id: 17, title: 'Los Vengadores N#1', author: 'Stan Lee', price: 49.990, image: 'img/comic5.jpg', type: 'comic' },
        { id: 18, title: 'Spawn N#300', author: 'Scott Snyder', price: 23.990, image: 'img/comic6.jpg', type: 'comic' },
        { id: 19, title: 'Star Wars N#13', author: 'Greg Pak', price: 9.990, image: 'img/comic7.jpg', type: 'comic' },
        { id: 20, title: 'Venom: Lethal Protector N#11', author: 'David Michelinie', price: 20.990, image: 'img/comic8.jpg', type: 'comic' },
        { id: 21, title: 'X-Men (2024) N#1', author: 'Jed Mackay', price: 9.990, image: 'img/comic9.jpg', type: 'comic' },
        { id: 22, title: 'Iron Man N#26/145', author: 'Christopher Cantwell, Murewa Ayodele', price: 7.990, image: 'img/comic10.jpg', type: 'comic' },
        { id: 23, title: 'Invencible Vol.27', author: 'Robert Kirkman', price: 25.650, image: 'img/comic11.jpg', type: 'comic' },
        { id: 24, title: 'Warhammer 40k Ahriman Vol. 1: Exilio', author: 'John French', price: 20.900, image: 'img/comic12.jpg', type: 'comic' },
    ];
    localStorage.setItem('comicsData', JSON.stringify(comicsData)); // Guarda los productos en localStorage.

    // El carrito se mantiene en sessionStorage para que sea por sesión.
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // --- Funciones de Utilidad para la Sesión ---
    function getCurrentUserRole() {
        return sessionStorage.getItem('userRole');
    }

    function setCurrentUserRole(role) {
        sessionStorage.setItem('userRole', role);
    }

    function getCurrentUserEmail() {
        return sessionStorage.getItem('currentUserEmail');
    }

    function setCurrentUserEmail(email) {
        sessionStorage.setItem('currentUserEmail', email);
    }

    // --- Referencias de la Barra de Navegación (Elementos para Escritorio y Offcanvas) ---
    // Referencias para la Navbar de Escritorio (Desktop)
    const loginMenuItemDesktop = document.getElementById('loginMenuItemDesktop');
    const registerMenuItemDesktop = document.getElementById('registerMenuItemDesktop');
    const loggedInUserNameDropdownContainerDesktop = document.getElementById('loggedInUserNameDropdownContainerDesktop');
    const profileMenuItemDesktop = document.getElementById('profileMenuItemDesktop');
    const adminMenuItemDesktop = document.getElementById('adminMenuItemDesktop');
    const userMenuDividerDesktop = document.getElementById('userMenuDividerDesktop'); // Si tienes un divisor en desktop
    const logoutMenuItemDesktop = document.getElementById('logoutMenuItemDesktop');
    const loggedInUserNameDesktop = document.getElementById('loggedInUserNameDesktop'); // Para el nombre junto al ícono de usuario en desktop
    const loggedInUserNameDropdownDesktopText = document.getElementById('loggedInUserNameDropdownDesktopText'); // Para el nombre dentro del dropdown de desktop
    const cartCountDesktop = document.getElementById('cartCountDesktop');
    const logoutLinkDesktop = document.getElementById('logoutLinkDesktop'); // Enlace de logout específico para desktop

    // Referencias para la Navbar Móvil (Offcanvas)
    const loginMenuItemOffcanvas = document.getElementById('loginMenuItemOffcanvas');
    const registerMenuItemOffcanvas = document.getElementById('registerMenuItemOffcanvas');
    const loggedInUserNameOffcanvasContainer = document.getElementById('loggedInUserNameOffcanvasContainer');
    const loggedInUserNameOffcanvas = document.getElementById('loggedInUserNameOffcanvas'); // Para el nombre en el offcanvas
    const profileMenuItemOffcanvas = document.getElementById('profileMenuItemOffcanvas');
    const adminMenuItemOffcanvas = document.getElementById('adminMenuItemOffcanvas');
    const logoutMenuItemOffcanvas = document.getElementById('logoutMenuItemOffcanvas');
    const cartCountOffcanvas = document.getElementById('cartCountOffcanvas');
    const logoutLinkOffcanvas = document.getElementById('logoutLinkOffcanvas'); // Enlace de logout específico para offcanvas

    // Referencias para los formularios de búsqueda (tanto desktop como mobile)
    const searchFormDesktop = document.getElementById('searchFormDesktop');
    const searchInputDesktop = document.getElementById('searchInputDesktop');
    const searchFormMobile = document.getElementById('searchFormMobile');
    const searchInputMobile = document.getElementById('searchInputMobile');

    // Referencias para el carrito
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const simulatePurchaseBtn = document.getElementById('simulatePurchaseBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const cartLink = document.getElementById('cartLink'); // Asumiendo que este es el botón/enlace para abrir el modal del carrito

    // --- Lógica de la Barra de Navegación Dinámica (Actualizada) ---
    function updateNavbar() {
        const userRole = getCurrentUserRole();
        const userEmail = getCurrentUserEmail();
        const isLoggedIn = !!userRole && !!userEmail && users[userEmail]; // Verificar si hay usuario logueado

        // --- Lógica para la barra de navegación DESKTOP ---
        if (loginMenuItemDesktop) loginMenuItemDesktop.classList.toggle('d-none', isLoggedIn);
        if (registerMenuItemDesktop) registerMenuItemDesktop.classList.toggle('d-none', isLoggedIn);

        if (loggedInUserNameDropdownContainerDesktop) loggedInUserNameDropdownContainerDesktop.classList.toggle('d-none', !isLoggedIn);
        if (profileMenuItemDesktop) profileMenuItemDesktop.classList.toggle('d-none', !isLoggedIn);
        if (userMenuDividerDesktop) userMenuDividerDesktop.classList.toggle('d-none', !isLoggedIn); // Mostrar/ocultar el divisor
        if (logoutMenuItemDesktop) logoutMenuItemDesktop.classList.toggle('d-none', !isLoggedIn);

        if (loggedInUserNameDesktop && isLoggedIn) loggedInUserNameDesktop.textContent = users[userEmail].fullName || userEmail.split('@')[0];
        if (loggedInUserNameDropdownDesktopText && isLoggedIn) loggedInUserNameDropdownDesktopText.textContent = users[userEmail].fullName || userEmail.split('@')[0];

        if (adminMenuItemDesktop) adminMenuItemDesktop.classList.toggle('d-none', userRole !== 'admin');

        // --- Lógica para la barra de navegación MÓVIL (Offcanvas) ---
        if (loginMenuItemOffcanvas) loginMenuItemOffcanvas.classList.toggle('d-none', isLoggedIn);
        if (registerMenuItemOffcanvas) registerMenuItemOffcanvas.classList.toggle('d-none', isLoggedIn);

        if (loggedInUserNameOffcanvasContainer) loggedInUserNameOffcanvasContainer.classList.toggle('d-none', !isLoggedIn);
        if (loggedInUserNameOffcanvas && isLoggedIn) loggedInUserNameOffcanvas.textContent = users[userEmail].fullName || userEmail.split('@')[0];
        if (profileMenuItemOffcanvas) profileMenuItemOffcanvas.classList.toggle('d-none', !isLoggedIn);
        if (adminMenuItemOffcanvas) adminMenuItemOffcanvas.classList.toggle('d-none', userRole !== 'admin');
        if (logoutMenuItemOffcanvas) logoutMenuItemOffcanvas.classList.toggle('d-none', !isLoggedIn);

        // Actualizar conteo del carrito (se aplica a ambos si existen)
        const currentCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountDesktop) cartCountDesktop.textContent = currentCartCount;
        if (cartCountOffcanvas) cartCountOffcanvas.textContent = currentCartCount;
    }


    // --- Lógica del Catálogo (Principal y Vistas Separadas) ---
    const comicsContainer = document.getElementById('comicsContainer'); // Usado en index.html o comics.html
    const mangasContainer = document.getElementById('mangasContainer'); // Usado en index.html o mangas.html

    function createProductCardHtml(item) {
        let imagePath = item.image;
        // Ajustar la ruta de la imagen si estamos en una subpágina (ej. pages/mangas.html)
        const currentPagePath = window.location.pathname;
        if (currentPagePath.includes('/pages/')) {
            imagePath = '../' + item.image;
        }

        return `
            <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${imagePath}" class="card-img-top" alt="${item.title}" style="max-height: 200px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title small">${item.title}</h5>
                        <p class="card-text text-muted small">${item.author}</p>
                        <p class="card-text fw-bold small">$${item.price.toFixed(3)}</p>
                        <button class="btn btn-primary btn-sm mt-auto add-to-cart" data-id="${item.id}">Añadir</button>
                    </div>
                </div>
            </div>
        `;
    }

    function attachAddToCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                addToCart(itemId);
            });
        });
    }

    /**
     * Carga y renderiza los productos en los contenedores correspondientes,
     * aplicando filtros de búsqueda y redireccionando si es necesario.
     */
    function loadProducts(searchQuery = '') {
        const normalizedSearchQuery = searchQuery.toLowerCase().trim();

        // Determinar la página actual de forma más robusta
        const currentPagePath = window.location.pathname;
        const currentPageIsComics = currentPagePath.includes('comics.html');
        const currentPageIsMangas = currentPagePath.includes('mangas.html');
        const currentPageIsMain = currentPagePath.endsWith('index.html') || currentPagePath.endsWith('/');

        if (!comicsContainer && !mangasContainer) {
            // No hay contenedores de productos en esta página, no es una página de catálogo.
            return;
        }

        // Limpiar los contenedores antes de mostrar nuevos resultados
        if (comicsContainer) comicsContainer.innerHTML = '';
        if (mangasContainer) mangasContainer.innerHTML = '';

        // Filtrar todos los productos, sin importar la categoría inicial de la página
        const allFilteredProducts = comicsData.filter(item => {
            const matchesTitle = item.title.toLowerCase().includes(normalizedSearchQuery);
            const matchesAuthor = item.author.toLowerCase().includes(normalizedSearchQuery);
            return matchesTitle || matchesAuthor;
        });

        const comicsFound = allFilteredProducts.filter(item => item.type === 'comic');
        const mangasFound = allFilteredProducts.filter(item => item.type === 'manga');

        // Lógica de redirección y display
        if (normalizedSearchQuery && allFilteredProducts.length === 0) {
            // No se encontraron productos con la búsqueda
            const noResultsMessage = '<div class="col-12 text-center py-5"><p class="lead">No se encontraron productos que coincidan con su búsqueda.</p></div>';
            if (comicsContainer) comicsContainer.innerHTML = noResultsMessage;
            if (mangasContainer) mangasContainer.innerHTML = ''; // Asegura que solo se muestra el mensaje en un lugar si ambos existen
            return;
        }

        if (normalizedSearchQuery) { // Si hay una búsqueda activa
            // Mostrar resultados de búsqueda en la página actual o redirigir
            if (comicsContainer && mangasContainer) { // En la página principal (index.html)
                if (mangasFound.length > 0) {
                    mangasFound.forEach(item => {
                        mangasContainer.innerHTML += createProductCardHtml(item);
                    });
                } else {
                    mangasContainer.innerHTML = '<div class="col-12 text-center py-3"><p class="lead">No se encontraron mangas que coincidan con la búsqueda.</p></div>';
                }
                if (comicsFound.length > 0) {
                    comicsFound.forEach(item => {
                        comicsContainer.innerHTML += createProductCardHtml(item);
                    });
                } else {
                    comicsContainer.innerHTML = '<div class="col-12 text-center py-3"><p class="lead">No se encontraron cómics que coincidan con la búsqueda.</p></div>';
                }
            } else if (currentPageIsMangas) { // En la página de mangas
                if (mangasFound.length > 0) {
                    mangasFound.forEach(item => {
                        mangasContainer.innerHTML += createProductCardHtml(item);
                    });
                } else if (comicsFound.length > 0) { // Si solo hay cómics, redirigir a comics.html
                    window.location.href = `comics.html?q=${encodeURIComponent(normalizedSearchQuery)}`;
                    return;
                } else {
                    mangasContainer.innerHTML = '<div class="col-12 text-center py-3"><p class="lead">No se encontraron mangas que coincidan con la búsqueda.</p></div>';
                }
            } else if (currentPageIsComics) { // En la página de cómics
                if (comicsFound.length > 0) {
                    comicsFound.forEach(item => {
                        comicsContainer.innerHTML += createProductCardHtml(item);
                    });
                } else if (mangasFound.length > 0) { // Si solo hay mangas, redirigir a mangas.html
                    window.location.href = `mangas.html?q=${encodeURIComponent(normalizedSearchQuery)}`;
                    return;
                } else {
                    comicsContainer.innerHTML = '<div class="col-12 text-center py-3"><p class="lead">No se encontraron cómics que coincidan con la búsqueda.</p></div>';
                }
            }
        } else { // No hay búsqueda, cargar todos los productos según la página
            if (comicsContainer && mangasContainer) { // index.html
                comicsData.filter(item => item.type === 'manga').forEach(item => {
                    mangasContainer.innerHTML += createProductCardHtml(item);
                });
                comicsData.filter(item => item.type === 'comic').forEach(item => {
                    comicsContainer.innerHTML += createProductCardHtml(item);
                });
            } else if (currentPageIsMangas && mangasContainer) { // mangas.html
                comicsData.filter(item => item.type === 'manga').forEach(item => {
                    mangasContainer.innerHTML += createProductCardHtml(item);
                });
            } else if (currentPageIsComics && comicsContainer) { // comics.html
                comicsData.filter(item => item.type === 'comic').forEach(item => {
                    comicsContainer.innerHTML += createProductCardHtml(item);
                });
            }
        }
        attachAddToCartListeners(); // Volver a adjuntar listeners después de renderizar.
    }


    // --- Event Listeners para los Formularios de Búsqueda (Desktop y Mobile) ---
    function setupSearch(formElement, inputElement) {
        if (formElement && inputElement) {
            formElement.addEventListener('submit', function(event) {
                event.preventDefault();
                const query = inputElement.value;
                // Redirige al index.html con el parámetro de búsqueda si no estás ya en el index
                const currentPagePath = window.location.pathname;
                if (!currentPagePath.endsWith('index.html') && !currentPagePath.endsWith('/')) {
                    let redirectPath = 'index.html';
                    if (currentPagePath.includes('/pages/')) {
                        redirectPath = '../index.html'; // Si estás en pages/, sube un nivel
                    }
                    window.location.href = `${redirectPath}?q=${encodeURIComponent(query)}`;
                } else {
                    loadProducts(query); // Si ya estás en index.html, carga directamente
                }
            });
            inputElement.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    // Simula el envío del formulario al presionar Enter
                    formElement.dispatchEvent(new Event('submit'));
                } else if (this.value.trim() === '' && (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/'))) {
                    // Si el campo se vacía en la página principal, recarga sin filtro
                    loadProducts('');
                }
            });
        }
    }

    setupSearch(searchFormDesktop, searchInputDesktop);
    setupSearch(searchFormMobile, searchInputMobile);

    // Lógica para sincronizar el input de búsqueda con el parámetro 'q' de la URL al cargar
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') || '';

    if (searchInputDesktop) {
        searchInputDesktop.value = initialQuery;
    }
    if (searchInputMobile) {
        searchInputMobile.value = initialQuery;
    }

    // --- Lógica del Carrito ---
    function addToCart(itemId) {
        if (!getCurrentUserRole()) {
            alert('Debes iniciar sesión para añadir productos al carrito y continuar comprando.');
            // Opcional: Redirigir al login
            // window.location.href = 'pages/login.html'; // O '../pages/login.html' dependiendo de dónde estés.
            return;
        }

        const itemToAdd = comicsData.find(item => item.id === itemId);
        if (itemToAdd) {
            const existingItem = cart.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...itemToAdd, quantity: 1 });
            }
            sessionStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en sessionStorage
            updateCartDisplay();
        }
    }

    function updateCartDisplay() {
        if (!cartItemsDiv) return;

        cartItemsDiv.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>El carrito está vacío.</p>';
            if (simulatePurchaseBtn) simulatePurchaseBtn.classList.add('disabled');
        } else {
            if (simulatePurchaseBtn) simulatePurchaseBtn.classList.remove('disabled');
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
                itemElement.innerHTML = `
                    <span>${item.title} x ${item.quantity}</span>
                    <div>
                        <span class="me-2">$${(item.price * item.quantity).toFixed(3)}</span>
                        <button class="btn btn-sm btn-danger remove-from-cart" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItemsDiv.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }
        if (cartTotalSpan) cartTotalSpan.textContent = total.toFixed(3);
        // Actualizar conteo del carrito en la navbar, usando las referencias correctas.
        const currentCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountDesktop) cartCountDesktop.textContent = currentCartCount;
        if (cartCountOffcanvas) cartCountOffcanvas.textContent = currentCartCount;


        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                removeFromCart(itemId);
            });
        });
    }

    function removeFromCart(itemId) {
        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
            sessionStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en sessionStorage
            updateCartDisplay();
        }
    }

    function clearCart() {
        cart = [];
        sessionStorage.removeItem('cart'); // Eliminar carrito de sessionStorage
        updateCartDisplay();
        alert('El carrito ha sido vaciado.');
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    if (simulatePurchaseBtn) {
        simulatePurchaseBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (cart.length === 0) {
                alert('El carrito está vacío. Añade productos para simular una compra.');
                return;
            }

            if (!getCurrentUserRole()) {
                alert('Debes iniciar sesión para simular una compra.');
                const cartModalElement = document.getElementById('cartModal');
                const cartModal = bootstrap.Modal.getInstance(cartModalElement);
                if (cartModal) cartModal.hide();

                const currentPagePath = window.location.pathname;
                if (currentPagePath.includes('/pages/')) {
                    window.location.href = 'login.html'; // De pages/x.html a pages/login.html
                } else {
                    window.location.href = 'pages/login.html'; // De index.html a pages/login.html
                }
                return;
            }

            alert('¡Compra simulada con éxito! Tu pedido ha sido procesado.');
            cart = [];
            sessionStorage.removeItem('cart'); // Asegurarse de limpiar el carrito de sessionStorage
            updateCartDisplay();
            const cartModalElement = document.getElementById('cartModal');
            const cartModal = bootstrap.Modal.getInstance(cartModalElement);
            if (cartModal) {
                cartModal.hide();
            }
            // Opcional: Redirigir a una página de confirmación o al index
            // window.location.href = 'pages/simulated-payment.html'; // Si tuvieras una página de pago simulado
            // window.location.href = '../index.html'; // O volver al index si ya estabas en una subpágina
        });
    }

    // --- Manejo de Eventos de Logout (para ambos enlaces de logout) ---
    function setupLogoutListeners() {
        // Función para manejar el logout
        const performLogout = (event) => {
            event.preventDefault();
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('currentUserEmail');
            cart = []; // Vacía el carrito al cerrar sesión
            sessionStorage.removeItem('cart'); // Asegurarse de limpiar el carrito de sessionStorage

            alert('Has cerrado sesión correctamente.');
            updateNavbar(); // Actualiza la navbar para mostrar los elementos de "login/register"

            // Redirige a la página principal, ajustando la ruta si es necesario
            const currentPagePath = window.location.pathname;
            if (currentPagePath.includes('/pages/')) {
                window.location.href = '../index.html'; // Si estás en pages/, sube un nivel
            } else {
                window.location.href = 'index.html'; // Si ya estás en la raíz, recarga o quédate
            }
        };

        // Adjuntar el listener al enlace de logout de escritorio si existe
        if (logoutLinkDesktop) {
            logoutLinkDesktop.removeEventListener('click', performLogout); // Evitar duplicados
            logoutLinkDesktop.addEventListener('click', performLogout);
        }
        // Adjuntar el listener al enlace de logout del offcanvas si existe
        if (logoutLinkOffcanvas) {
            logoutLinkOffcanvas.removeEventListener('click', performLogout); // Evitar duplicados
            logoutLinkOffcanvas.addEventListener('click', performLogout);
        }
    }


    // --- Lógica de Formularios de Autenticación (login, register, forgot-password, profile) ---

    // Manejo del formulario de inicio de sesión.
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!loginForm.checkValidity()) {
                event.stopPropagation();
            }
            loginForm.classList.add('was-validated');

            if (loginForm.checkValidity()) {
                const emailOrUsername = document.getElementById('emailOrUsername').value;
                const password = document.getElementById('password').value;

                const user = users[emailOrUsername];

                if (user && user.password === password) {
                    setCurrentUserRole(user.role);
                    setCurrentUserEmail(user.email);
                    alert(`¡Bienvenido, ${user.fullName} (${user.role})!`);

                    const currentPagePath = window.location.pathname;
                    if (user.role === 'client') {
                        if (currentPagePath.includes('/pages/')) {
                            window.location.href = '../index.html';
                        } else {
                            window.location.href = 'index.html';
                        }
                    } else if (user.role === 'admin') {
                        if (currentPagePath.includes('/pages/')) {
                            window.location.href = 'admin-dashboard.html';
                        } else {
                            window.location.href = 'pages/admin-dashboard.html';
                        }
                    }
                } else {
                    alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
                    document.getElementById('emailOrUsername').classList.add('is-invalid');
                    document.getElementById('password').classList.add('is-invalid');
                    loginForm.classList.remove('was-validated');
                }
            }
        });
    }

    // Manejo del formulario de registro.
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            const passwordField = document.getElementById('password');
            const confirmPasswordField = document.getElementById('confirmPassword');
            const passwordFeedback = document.getElementById('passwordFeedback');
            const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');

            let formIsValid = true;

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

            if (!passwordRegex.test(password)) {
                passwordField.classList.add('is-invalid');
                passwordFeedback.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*()_+).';
                formIsValid = false;
            } else {
                passwordField.classList.remove('is-invalid');
                passwordField.classList.add('is-valid');
            }

            if (password !== confirmPassword) {
                confirmPasswordField.classList.add('is-invalid');
                confirmPasswordFeedback.textContent = 'Las contraseñas no coinciden.';
                formIsValid = false;
            } else {
                confirmPasswordField.classList.remove('is-invalid');
                confirmPasswordField.classList.add('is-valid');
            }

            if (!registerForm.checkValidity() || !formIsValid) {
                event.stopPropagation();
            }
            registerForm.classList.add('was-validated');

            if (registerForm.checkValidity() && formIsValid) {
                if (users[email]) {
                    alert('El email ya está registrado. Por favor, usa otro o inicia sesión.');
                    document.getElementById('email').classList.add('is-invalid');
                    registerForm.classList.remove('was-validated');
                } else {
                    users[email] = {
                        password: password,
                        role: 'client',
                        fullName: fullName,
                        email: email,
                        address: '',
                        phone: ''
                    };
                    localStorage.setItem('users', JSON.stringify(users)); // Guardar el nuevo usuario
                    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                    window.location.href = 'login.html';
                }
            }
        });
    }

    // Manejo del formulario de recuperación de contraseña.
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!forgotPasswordForm.checkValidity()) {
                event.stopPropagation();
            }
            forgotPasswordForm.classList.add('was-validated');

            if (forgotPasswordForm.checkValidity()) {
                const email = document.getElementById('email').value;

                if (users[email]) {
                    alert(`Se ha enviado un enlace de restablecimiento a ${email}. (Simulación)`);
                    window.location.href = 'login.html';
                } else {
                    alert('Este email no está registrado.');
                    document.getElementById('email').classList.add('is-invalid');
                    forgotPasswordForm.classList.remove('was-validated');
                }
            }
        });
    }

    // Manejo del formulario de perfil de usuario.
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        const profileFullName = document.getElementById('profileFullName');
        const profileEmail = document.getElementById('profileEmail');
        const profileAddress = document.getElementById('profileAddress');
        const profilePhone = document.getElementById('profilePhone');
        const currentPassword = document.getElementById('currentPassword');
        const newPassword = document.getElementById('newPassword');
        const confirmNewPassword = document.getElementById('confirmNewPassword');
        const newPasswordFeedback = document.getElementById('newPasswordFeedback');
        const confirmNewPasswordFeedback = document.getElementById('confirmNewPasswordFeedback');

        const currentUserEmail = getCurrentUserEmail();
        const currentUserData = users[currentUserEmail];

        if (!currentUserData) {
            alert('No se ha iniciado sesión. Redirigiendo al login.');
            const currentPagePath = window.location.pathname;
            if (currentPagePath.includes('/pages/')) {
                window.location.href = 'login.html';
            } else {
                window.location.href = 'pages/login.html';
            }
            return; // Detener la ejecución si no hay usuario logueado
        }

        profileFullName.value = currentUserData.fullName;
        profileEmail.value = currentUserData.email;
        profileAddress.value = currentUserData.address;
        profilePhone.value = currentUserData.phone;

        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let formIsValid = true;

            if (!profileForm.checkValidity()) {
                event.stopPropagation();
                formIsValid = false;
            }

            const changingPassword = currentPassword.value || newPassword.value || confirmNewPassword.value;

            if (changingPassword) {
                if (currentPassword.value !== currentUserData.password) {
                    currentPassword.classList.add('is-invalid');
                    if (currentPassword.nextElementSibling) currentPassword.nextElementSibling.textContent = 'Contraseña actual incorrecta.';
                    formIsValid = false;
                } else {
                    currentPassword.classList.remove('is-invalid');
                    currentPassword.classList.add('is-valid');
                }

                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
                if (!passwordRegex.test(newPassword.value)) {
                    newPassword.classList.add('is-invalid');
                    newPasswordFeedback.textContent = 'La nueva contraseña debe cumplir con los requisitos de seguridad.';
                    formIsValid = false;
                } else {
                    newPassword.classList.remove('is-invalid');
                    newPassword.classList.add('is-valid');
                }

                if (newPassword.value !== confirmNewPassword.value) {
                    confirmNewPassword.classList.add('is-invalid');
                    confirmNewPasswordFeedback.textContent = 'Las nuevas contraseñas no coinciden.';
                    formIsValid = false;
                } else {
                    confirmNewPassword.classList.remove('is-invalid');
                    confirmNewPassword.classList.add('is-valid');
                }
            } else {
                // Limpiar validaciones si no se está cambiando la contraseña
                currentPassword.classList.remove('is-invalid', 'is-valid');
                if (currentPassword.nextElementSibling) currentPassword.nextElementSibling.textContent = '';
                newPassword.classList.remove('is-invalid', 'is-valid');
                if (newPasswordFeedback) newPasswordFeedback.textContent = '';
                confirmNewPassword.classList.remove('is-invalid', 'is-valid');
                if (confirmNewPasswordFeedback) confirmNewPasswordFeedback.textContent = '';
            }

            profileForm.classList.add('was-validated');

            if (formIsValid) {
                currentUserData.fullName = profileFullName.value;
                currentUserData.email = profileEmail.value; // Considera si el email puede cambiar o si debe ser solo lectura
                currentUserData.address = profileAddress.value;
                currentUserData.phone = profilePhone.value;

                if (changingPassword && currentPassword.value === currentUserData.password && newPassword.value === confirmNewPassword.value) {
                    currentUserData.password = newPassword.value;
                }
                localStorage.setItem('users', JSON.stringify(users)); // Guardar cambios en localStorage
                alert('¡Perfil actualizado con éxito!');
                currentPassword.value = '';
                newPassword.value = '';
                confirmNewPassword.value = '';
                profileForm.classList.remove('was-validated');
                updateNavbar();
            }
        });
    }

    // --- Lógica de Administración de Productos ---

    const adminProductsTableBody = document.getElementById('adminProductsTableBody');
    const productModalElement = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');
    const addProductBtn = document.getElementById('addProductBtn');
    let productModalInstance = null;

    if (productModalElement) {
        productModalInstance = new bootstrap.Modal(productModalElement);
    }

    function loadAdminProducts() {
        if (!adminProductsTableBody) return;

        adminProductsTableBody.innerHTML = '';

        comicsData.forEach(product => {
            const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td class="d-none d-md-table-cell">${product.author}</td> <td>${product.type.charAt(0).toUpperCase() + product.type.slice(1)}</td>
                    <td>$${product.price.toFixed(3)}</td>
                    <td>
                        <div class="d-flex flex-column flex-sm-row gap-2"> <button class="btn btn-sm btn-warning edit-product flex-grow-1" data-id="${product.id}">Editar</button>
                            <button class="btn btn-sm btn-danger delete-product flex-grow-1" data-id="${product.id}">Eliminar</button>
                        </div>
                    </td>
                </tr>
            `;
            adminProductsTableBody.innerHTML += row;
        });

        document.querySelectorAll('.edit-product').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                const productToEdit = comicsData.find(p => p.id === productId);

                if (productToEdit) {
                    document.getElementById('productModalLabel').textContent = 'Editar Producto';
                    document.getElementById('productId').value = productToEdit.id;
                    document.getElementById('productTitle').value = productToEdit.title;
                    document.getElementById('productAuthor').value = productToEdit.author;
                    document.getElementById('productPrice').value = productToEdit.price.toFixed(3);
                    document.getElementById('productImage').value = productToEdit.image;
                    document.getElementById('productType').value = productToEdit.type;
                    productForm.classList.remove('was-validated');
                    if (productModalInstance) productModalInstance.show();
                }
            });
        });

        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', function() {
                const productIdToDelete = parseInt(this.dataset.id);
                if (confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
                    comicsData = comicsData.filter(p => p.id !== productIdToDelete);
                    localStorage.setItem('comicsData', JSON.stringify(comicsData)); // Guardar cambios
                    loadAdminProducts();
                    // Recargar productos en las vistas de usuario si están presentes
                    if (comicsContainer || mangasContainer) loadProducts(initialQuery);
                    alert('Producto eliminado correctamente.');
                }
            });
        });
    }

    if (adminProductsTableBody) {
        loadAdminProducts();
    }

    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            document.getElementById('productModalLabel').textContent = 'Agregar Nuevo Producto';
            productForm.reset();
            productForm.classList.remove('was-validated');
            document.getElementById('productId').value = '';
            if (productModalInstance) productModalInstance.show();
        });
    }

    if (productForm) {
        productForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!productForm.checkValidity()) {
                event.stopPropagation();
            }
            productForm.classList.add('was-validated');

            if (productForm.checkValidity()) {
                const id = document.getElementById('productId').value ? parseInt(document.getElementById('productId').value) : null;
                const title = document.getElementById('productTitle').value;
                const author = document.getElementById('productAuthor').value;
                const price = parseFloat(document.getElementById('productPrice').value);
                const image = document.getElementById('productImage').value;
                const type = document.getElementById('productType').value;

                if (id) {
                    const index = comicsData.findIndex(p => p.id === id);
                    if (index !== -1) {
                        comicsData[index] = { id, title, author, price, image, type };
                        alert('Producto actualizado con éxito.');
                    }
                } else {
                    const newId = comicsData.length > 0 ? Math.max(...comicsData.map(p => p.id)) + 1 : 1;
                    comicsData.push({ id: newId, title, author, price, image, type });
                    alert('Nuevo producto agregado con éxito.');
                }
                localStorage.setItem('comicsData', JSON.stringify(comicsData)); // Guardar cambios
                loadAdminProducts();
                // Recargar productos en las vistas de usuario
                if (comicsContainer || mangasContainer) loadProducts(initialQuery);
                if (productModalInstance) productModalInstance.hide();
                productForm.classList.remove('was-validated');
            }
        });
    }


    // --- Inicialización al Cargar la Página ---
    // Estas funciones se llaman al cargar el DOM
    updateNavbar(); // Primero, actualiza el estado de la barra de navegación
    setupLogoutListeners(); // Configura los listeners de logout para ambos enlaces
    loadProducts(initialQuery); // Carga los productos inicialmente (con búsqueda si hay)
    updateCartDisplay(); // Asegúrate de que el carrito se muestra correctamente

    // Event listener para el modal del carrito
    const cartModalElement = document.getElementById('cartModal');
    if (cartModalElement) {
        // Cuando el modal del carrito se muestre, actualiza su contenido
        cartModalElement.addEventListener('show.bs.modal', updateCartDisplay);
    }

}); // Fin del DOMContentLoaded