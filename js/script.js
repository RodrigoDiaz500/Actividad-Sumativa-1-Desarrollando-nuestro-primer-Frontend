document.addEventListener('DOMContentLoaded', function() {

    // --- Variables Globales y Datos Simulados ---
    let users = {
        'cliente@correo.com': { password: 'password123', role: 'client', fullName: 'Cliente Ejemplo', email: 'cliente@correo.com', address: 'Av. Siempre Viva 742', phone: '+56911112222' },
        'admin@correo.com': { password: 'admin123', role: 'admin', fullName: 'Admin Ejemplo', email: 'admin@correo.com', address: 'Calle Ficticia 101', phone: '+56933334444' }
    };

    let comicsData = [
        { id: 1, title: 'Fullmetal Alchemist - Tomo 1', author: 'Hiromu Arakawa', price: 9.990, image: 'img/manga1.jpg', type: 'manga' },
        { id: 2, title: 'Shingeki no Kyojin - Tomo 1', author: 'Hajime Isayama', price: 11.990, image: 'img/manga2.jpg', type: 'manga' },
        { id: 3, title: 'JoJos Bizarre Adventure: Stardust Crusaders - Tomo 2', author: 'Hirohiko Araki', price: 16.990, image: 'img/manga3.jpg', type: 'manga' },
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

    let cart = [];

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

    // --- Lógica de la Barra de Navegación Dinámica ---
    const authNavLinks = document.getElementById('authNavLinks');
    const loggedInNavLinks = document.getElementById('loggedInNavLinks');
    const navProfileLink = document.getElementById('navProfileLink');
    const navAdminLink = document.getElementById('navAdminLink');
    const loggedInUserNameSpan = document.getElementById('loggedInUserName');
    const cartCountSpan = document.getElementById('cartCount');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');

    function updateNavbar() {
        const userRole = getCurrentUserRole();
        const userEmail = getCurrentUserEmail();

        if (userRole && userEmail && users[userEmail]) {
            if (authNavLinks) authNavLinks.classList.add('d-none');
            if (loggedInNavLinks) loggedInNavLinks.classList.remove('d-none');
            if (loggedInUserNameSpan) loggedInUserNameSpan.textContent = users[userEmail].fullName;

            if (userRole === 'client') {
                if (navProfileLink) navProfileLink.classList.remove('d-none');
                if (navAdminLink) navAdminLink.classList.add('d-none');
            } else if (userRole === 'admin') {
                if (navProfileLink) navProfileLink.classList.remove('d-none');
                if (navAdminLink) navAdminLink.classList.remove('d-none');
            }
        } else {
            if (authNavLinks) authNavLinks.classList.remove('d-none');
            if (loggedInNavLinks) loggedInNavLinks.classList.add('d-none');
            if (navProfileLink) navProfileLink.classList.add('d-none');
            if (navAdminLink) navAdminLink.classList.add('d-none');
        }
        if (cartCountSpan) {
            cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    updateNavbar();

    // --- Lógica del Catálogo (Principal y Vistas Separadas) ---
    const comicsContainer = document.getElementById('comicsContainer');
    const mangasContainer = document.getElementById('mangasContainer');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartLink = document.getElementById('cartLink');
    const simulatePurchaseBtn = document.getElementById('simulatePurchaseBtn');

    function loadProducts(searchQuery = '') {
        const isComicsPage = comicsContainer && !mangasContainer;
        const isMangasPage = mangasContainer && !comicsContainer;
        const isMainCatalogPage = comicsContainer && mangasContainer;

        if (comicsContainer) comicsContainer.innerHTML = '';
        if (mangasContainer) mangasContainer.innerHTML = '';

        const normalizedSearchQuery = searchQuery.toLowerCase().trim();

        const filteredProducts = comicsData.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(normalizedSearchQuery) ||
                                item.author.toLowerCase().includes(normalizedSearchQuery);
            
            if (isMainCatalogPage) {
                return matchesSearch;
            } else if (isComicsPage) {
                return matchesSearch && item.type === 'comic';
            } else if (isMangasPage) {
                return matchesSearch && item.type === 'manga';
            }
            return false; // No debería ocurrir si existe un contenedor
        });

        if (filteredProducts.length === 0) {
            if (comicsContainer) comicsContainer.innerHTML = '<div class="col-12 text-center py-5"><p class="lead">No se encontraron productos que coincidan con su búsqueda.</p></div>';
            if (mangasContainer) mangasContainer.innerHTML = '<div class="col-12 text-center py-5"><p class="lead">No se encontraron productos que coincidan con su búsqueda.</p></div>';
            return;
        }

        filteredProducts.forEach(item => {
            // Ajusta la ruta de la imagen para las páginas dentro del directorio 'pages/'
            let imagePath = item.image;
            const currentPagePath = window.location.pathname;
            if (currentPagePath.includes('/pages/')) {
                // Si la página actual está en 'pages/' (ej., /pages/comics.html), añade '../'
                imagePath = '../' + item.image;
            }

            // INICIO DE LA MODIFICACIÓN PARA TARJETAS MÁS PEQUEÑAS
            const cardHtml = `
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
            // FIN DE LA MODIFICACIÓN

            if (isMainCatalogPage) {
                if (item.type === 'comic') {
                    comicsContainer.innerHTML += cardHtml;
                } else if (item.type === 'manga') {
                    mangasContainer.innerHTML += cardHtml;
                }
            } else if (isComicsPage && item.type === 'comic') {
                comicsContainer.innerHTML += cardHtml;
            } else if (isMangasPage && item.type === 'manga') {
                mangasContainer.innerHTML += cardHtml;
            }
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                addToCart(itemId);
            });
        });
    }

    // Event listener para el envío del formulario de búsqueda
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío predeterminado del formulario
            const query = searchInput.value;
            loadProducts(query); // Recarga los productos con la consulta de búsqueda
        });
    }

    // Event listener para borrar la búsqueda (ej., si el usuario elimina texto del input)
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            // Solo activa la búsqueda si se presiona Enter O si el input está vacío
            if (event.key === 'Enter' || this.value.trim() === '') {
                loadProducts(this.value.trim());
            } else {
                // Opcional: implementar un debounce si quieres búsqueda en vivo mientras escriben
                // let timerId;
                // clearTimeout(timerId);
                // timerId = setTimeout(() => {
                //     loadProducts(this.value.trim());
                // }, 500); // Espera 500ms después de que se detenga la escritura
            }
        });
        // También activa la carga inicial con cualquier parámetro de consulta existente (ej., si la página fue enlazada con ?q=...)
        const urlParams = new URLSearchParams(window.location.search);
        const initialQuery = urlParams.get('q') || '';
        if (initialQuery) {
            searchInput.value = initialQuery;
        }
    }


    function addToCart(itemId) {
        // --- INICIO DE LA MODIFICACIÓN ---
        if (!getCurrentUserRole()) {
            // Si el usuario no está logueado, muestra una alerta y detiene la función.
            alert('Debes registrarte o iniciar sesión para añadir productos al carrito y continuar comprando.');
            return; // Detiene la ejecución de la función aquí.
        }
        // --- FIN DE LA MODIFICACIÓN ---

        const itemToAdd = comicsData.find(item => item.id === itemId);
        if (itemToAdd) {
            const existingItem = cart.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...itemToAdd, quantity: 1 });
            }
            updateCartDisplay();
        }
    }

    function updateCartDisplay() {
        if (cartCountSpan) {
            cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
        
        if (cartItemsDiv) {
            cartItemsDiv.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                cartItemsDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
            } else {
                cart.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
                    itemElement.innerHTML = `
                        <span>${item.title} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span> // <-- Esta es la línea clave
                    `;
                    cartItemsDiv.appendChild(itemElement);
                    total += item.price * item.quantity;
                });
            }
            if (cartTotalSpan) cartTotalSpan.textContent = total.toFixed(2); // <-- Y esta
        }
    }

    if (comicsContainer || mangasContainer) {
        // Carga productos inicialmente, potencialmente con una consulta de búsqueda de la URL si existe
        const urlParams = new URLSearchParams(window.location.search);
        const initialQuery = urlParams.get('q') || '';
        loadProducts(initialQuery);
        updateCartDisplay();
    }

    if (cartLink) {
        cartLink.addEventListener('click', function(event) {
            event.preventDefault();
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            updateCartDisplay();
            cartModal.show();
        });
    }

    if (simulatePurchaseBtn) {
        simulatePurchaseBtn.addEventListener('click', function(event) {
            event.preventDefault();

            if (!getCurrentUserRole()) {
                alert('Debes iniciar sesión o registrarte para simular una compra.');
                const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
                if (cartModal) cartModal.hide();
                const currentPagePath = window.location.pathname;
                if (currentPagePath.includes('/pages/')) {
                    window.location.href = 'login.html';
                } else {
                    window.location.href = 'pages/login.html';
                }
            } else {
                const currentPagePath = window.location.pathname;
                if (currentPagePath.includes('/pages/')) {
                    window.location.href = 'simulated-payment.html';
                } else {
                    window.location.href = 'pages/simulated-payment.html';
                }
            }
        });
    }

    // --- Lógica de Formularios de Autenticación (login, register, forgot-password, profile) ---
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
                    if (user.role === 'client') {
                        window.location.href = '../index.html';
                    } else if (user.role === 'admin') {
                        window.location.href = 'admin-dashboard.html';
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
                    users[email] = { password: password, role: 'client', fullName: fullName, email: email, address: '', phone: '' };
                    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                    window.location.href = 'login.html';
                }
            }
        });
    }

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

        if (currentUserData) {
            profileFullName.value = currentUserData.fullName;
            profileEmail.value = currentUserData.email;
            profileAddress.value = currentUserData.address;
            profilePhone.value = currentUserData.phone;
        }

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
                    currentPassword.nextElementSibling.textContent = 'Contraseña actual incorrecta.';
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
                currentPassword.classList.remove('is-invalid', 'is-valid');
                if (currentPassword.nextElementSibling) currentPassword.nextElementSibling.textContent = 'Por favor, ingresa tu contraseña actual.';
                newPassword.classList.remove('is-invalid', 'is-valid');
                if (newPasswordFeedback) newPasswordFeedback.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.';
                confirmNewPassword.classList.remove('is-invalid', 'is-valid');
                if (confirmNewPasswordFeedback) confirmNewPasswordFeedback.textContent = 'Las contraseñas no coinciden.';
            }
            profileForm.classList.add('was-validated');
            if (formIsValid) {
                currentUserData.fullName = profileFullName.value;
                currentUserData.email = profileEmail.value;
                currentUserData.address = profileAddress.value;
                currentUserData.phone = profilePhone.value;
                if (changingPassword && currentPassword.value === currentUserData.password && newPassword.value === confirmNewPassword.value) {
                    currentUserData.password = newPassword.value;
                }
                alert('¡Perfil actualizado con éxito!');
                currentPassword.value = '';
                newPassword.value = '';
                confirmNewPassword.value = '';
                profileForm.classList.remove('was-validated');
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
                    <td>${product.author}</td>
                    <td>${product.type.charAt(0).toUpperCase() + product.type.slice(1)}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-product me-2" data-id="${product.id}">Editar</button>
                        <button class="btn btn-sm btn-danger delete-product" data-id="${product.id}">Eliminar</button>
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
                    document.getElementById('productPrice').value = productToEdit.price;
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
                    loadAdminProducts();
                    if (comicsContainer || mangasContainer) loadProducts(); // Recarga las vistas del catálogo si están abiertas
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
                loadAdminProducts();
                if (comicsContainer || mangasContainer) loadProducts(); // Recarga las vistas del catálogo
                if (productModalInstance) productModalInstance.hide(); // Cierra el modal de producto
                productForm.classList.remove('was-validated');
            }
        });
    }

    // --- Lógica para cerrar sesión ---
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('currentUserEmail');
            cart = [];
            alert('Has cerrado sesión correctamente.');
            const currentPagePath = window.location.pathname;
            if (currentPagePath.includes('/pages/')) {
                window.location.href = '../index.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }

});