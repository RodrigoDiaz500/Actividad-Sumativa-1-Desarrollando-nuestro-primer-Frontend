document.addEventListener('DOMContentLoaded', function() {

    // --- Variables Globales y Datos Simulados ---
    // En un proyecto real, estos datos vendrían de un backend o de un almacenamiento persistente como localStorage
    let users = {
        'cliente@correo.com': { password: 'password123', role: 'client', fullName: 'Cliente Ejemplo', email: 'cliente@correo.com', address: 'Av. Siempre Viva 742', phone: '+56911112222' },
        'admin@correo.com': { password: 'admin123', role: 'admin', fullName: 'Admin Ejemplo', email: 'admin@correo.com', address: 'Calle Ficticia 101', phone: '+56933334444' }
    };

    let comicsData = [
        { id: 1, title: 'Batman: The Long Halloween', author: 'Jeph Loeb', price: 25.00, image: '../img/comic1.jpg', description: 'Una misteriosa trama de asesinatos en Gotham City. Batman, junto con el fiscal de distrito Harvey Dent y el capitán de policía James Gordon, corre contra el tiempo para descubrir la identidad de "Holiday", un asesino que mata a sus víctimas en días festivos.' },
        { id: 2, title: 'Watchmen', author: 'Alan Moore', price: 30.00, image: '../img/comic2.jpg', description: 'Considerada una obra maestra del cómic, Watchmen deconstruye el género de superhéroes explorando temas como el totalitarismo, la moralidad y la naturaleza humana. Sigue a un grupo de vigilantes retirados que investigan el asesinato de uno de los suyos.' },
        { id: 3, title: 'Saga Vol. 1', author: 'Brian K. Vaughan', price: 20.00, image: '../img/comic3.jpg', description: 'Una épica de ciencia ficción y fantasía que sigue a Alana y Marko, dos soldados de mundos enemigos que se enamoran y tienen una hija, Hazel, mientras son perseguidos por ambos bandos. Una historia vibrante y llena de personajes memorables.' },
        { id: 4, title: 'Sandman Vol. 1: Preludes & Nocturnes', author: 'Neil Gaiman', price: 28.00, image: '../img/comic4.jpg', description: 'Morfeo, el señor de los sueños, es capturado por un culto ocultista y aprisionado durante décadas. Al escapar, debe recuperar sus herramientas de poder y reconstruir su reino, embarcándose en un viaje a través de los diversos reinos de la existencia.' },
        { id: 5, title: 'Spider-Man: Blue', author: 'Jeph Loeb', price: 22.00, image: '../img/comic5.jpg', description: 'Una emotiva historia que explora los primeros amores de Peter Parker con Gwen Stacy y Mary Jane Watson. Peter narra sus recuerdos de aquellos días a su difunta Gwen, ofreciendo una mirada nostálgica y conmovedora a un período formativo.' },
        { id: 6, title: 'Invincible Vol. 1: Family Matters', author: 'Robert Kirkman', price: 18.00, image: '../img/comic6.jpg', description: 'Mark Grayson es un adolescente normal, excepto por el hecho de que su padre es Omni-Man, el superhéroe más poderoso del planeta. Cuando Mark comienza a desarrollar sus propios poderes, debe aprender a usarlos y equilibrar su vida de superhéroe con sus responsabilidades cotidianas.' },
    ];

    let cart = []; // El carrito de compras (solo para la sesión actual del cliente)

    // --- Funciones de Utilidad para la Sesión ---
    // Simular el rol del usuario logueado usando sessionStorage para persistir en la sesión del navegador
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

    // --- Lógica del Header / Navbar (para todas las páginas con nav) ---
    const dashboardLink = document.getElementById('dashboardLink');
    const clientCartLink = document.getElementById('clientCartLink'); // El <li> que contiene el link al carrito

    if (dashboardLink) {
        const userRole = getCurrentUserRole();
        if (userRole === 'client') {
            dashboardLink.href = 'client-dashboard.html';
            dashboardLink.textContent = 'Catálogo';
            if (clientCartLink) clientCartLink.style.display = 'block'; // Mostrar carrito
        } else if (userRole === 'admin') {
            dashboardLink.href = 'admin-dashboard.html';
            dashboardLink.textContent = 'Administración';
            if (clientCartLink) clientCartLink.style.display = 'none'; // Ocultar carrito para admin
        } else {
            // Si no hay rol (ej. usuario no logueado), ocultar enlaces específicos
            dashboardLink.style.display = 'none'; // Ocultar si no hay sesión activa
            if (clientCartLink) clientCartLink.style.display = 'none';
        }
    }


    // --- 1. Lógica de Inicio de Sesión (index.html) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Detener el envío real del formulario

            if (!loginForm.checkValidity()) {
                event.stopPropagation();
            }
            loginForm.classList.add('was-validated');

            if (loginForm.checkValidity()) {
                const emailOrUsername = document.getElementById('emailOrUsername').value;
                const password = document.getElementById('password').value;

                const user = users[emailOrUsername];

                if (user && user.password === password) {
                    setCurrentUserRole(user.role); // Guarda el rol del usuario
                    setCurrentUserEmail(user.email); // Guarda el email del usuario actual
                    alert(`¡Bienvenido, ${user.fullName} (${user.role})!`);
                    if (user.role === 'client') {
                        window.location.href = 'pages/client-dashboard.html';
                    } else if (user.role === 'admin') {
                        window.location.href = 'pages/admin-dashboard.html';
                    }
                } else {
                    alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
                    document.getElementById('emailOrUsername').classList.add('is-invalid');
                    document.getElementById('password').classList.add('is-invalid');
                    loginForm.classList.remove('was-validated'); // Limpiar para que el usuario intente de nuevo
                }
            }
        });
    }

    // --- 2. Lógica de Registro (pages/register.html) ---
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

            // Validación de contraseña (mínimo 8, mayúscula, minúscula, número, especial)
            // Regex: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
            if (!passwordRegex.test(password)) {
                passwordField.classList.add('is-invalid');
                passwordFeedback.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*()_+).';
                formIsValid = false;
            } else {
                passwordField.classList.remove('is-invalid');
                passwordField.classList.add('is-valid');
            }

            // Validación de coincidencia de contraseñas
            if (password !== confirmPassword) {
                confirmPasswordField.classList.add('is-invalid');
                confirmPasswordFeedback.textContent = 'Las contraseñas no coinciden.';
                formIsValid = false;
            } else {
                confirmPasswordField.classList.remove('is-invalid');
                confirmPasswordField.classList.add('is-valid');
            }

            // Validación general del formulario con Bootstrap
            if (!registerForm.checkValidity() || !formIsValid) {
                event.stopPropagation();
            }

            registerForm.classList.add('was-validated');

            if (registerForm.checkValidity() && formIsValid) {
                // Simular guardado de nuevo usuario
                if (users[email]) {
                    alert('El email ya está registrado. Por favor, usa otro o inicia sesión.');
                    document.getElementById('email').classList.add('is-invalid');
                    registerForm.classList.remove('was-validated'); // Limpiar para reintentar
                } else {
                    // Si el email no existe, se crea un nuevo usuario con rol de 'client' por defecto
                    users[email] = { password: password, role: 'client', fullName: fullName, email: email, address: '', phone: '' };
                    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                    window.location.href = '../index.html';
                }
            }
        });
    }

    // --- 3. Lógica de Recuperar Contraseña (pages/forgot-password.html) ---
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
                // Simular envío de email de restablecimiento
                if (users[email]) {
                    alert(`Se ha enviado un enlace de restablecimiento a ${email}. (Simulación)`);
                    window.location.href = '../index.html';
                } else {
                    alert('Este email no está registrado.');
                    document.getElementById('email').classList.add('is-invalid');
                    forgotPasswordForm.classList.remove('was-validated'); // Limpiar para reintentar
                }
            }
        });
    }

    // --- 4. Lógica de Modificación de Perfil (pages/profile.html) ---
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

        // Cargar datos simulados del usuario actual
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

            // Validar campos de información personal
            if (!profileForm.checkValidity()) {
                event.stopPropagation();
                formIsValid = false;
            }

            // Validar cambio de contraseña si los campos están llenos
            const changingPassword = currentPassword.value || newPassword.value || confirmNewPassword.value;

            if (changingPassword) {
                // Validación de contraseña actual
                if (currentPassword.value !== currentUserData.password) {
                    currentPassword.classList.add('is-invalid');
                    currentPassword.nextElementSibling.textContent = 'Contraseña actual incorrecta.';
                    formIsValid = false;
                } else {
                    currentPassword.classList.remove('is-invalid');
                    currentPassword.classList.add('is-valid');
                }

                // Validación de nueva contraseña (misma regex que en registro)
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
                if (!passwordRegex.test(newPassword.value)) {
                    newPassword.classList.add('is-invalid');
                    newPasswordFeedback.textContent = 'La nueva contraseña debe cumplir con los requisitos de seguridad.';
                    formIsValid = false;
                } else {
                    newPassword.classList.remove('is-invalid');
                    newPassword.classList.add('is-valid');
                }

                // Validación de coincidencia de nueva contraseña
                if (newPassword.value !== confirmNewPassword.value) {
                    confirmNewPassword.classList.add('is-invalid');
                    confirmNewPasswordFeedback.textContent = 'Las nuevas contraseñas no coinciden.';
                    formIsValid = false;
                } else {
                    confirmNewPassword.classList.remove('is-invalid');
                    confirmNewPassword.classList.add('is-valid');
                }
            } else {
                 // Si NO se están cambiando las contraseñas, asegurarse de que no haya validaciones de contraseña pendientes
                currentPassword.classList.remove('is-invalid', 'is-valid');
                currentPassword.nextElementSibling.textContent = 'Por favor, ingresa tu contraseña actual.'; // Resetear mensaje
                newPassword.classList.remove('is-invalid', 'is-valid');
                newPasswordFeedback.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.'; // Resetear mensaje
                confirmNewPassword.classList.remove('is-invalid', 'is-valid');
                confirmNewPasswordFeedback.textContent = 'Las contraseñas no coinciden.'; // Resetear mensaje
            }

            profileForm.classList.add('was-validated');

            if (formIsValid) {
                // Simular actualización de datos
                currentUserData.fullName = profileFullName.value;
                currentUserData.email = profileEmail.value; // ¡Cuidado! Si cambia el email, la "clave" del usuario cambia
                currentUserData.address = profileAddress.value;
                currentUserData.phone = profilePhone.value;
                if (changingPassword && currentPassword.value === currentUserData.password && newPassword.value === confirmNewPassword.value) {
                    currentUserData.password = newPassword.value;
                }
                alert('¡Perfil actualizado con éxito!');
                // Limpiar campos de contraseña después de guardar
                currentPassword.value = '';
                newPassword.value = '';
                confirmNewPassword.value = '';
                profileForm.classList.remove('was-validated'); // Limpiar validación visual
            }
        });
    }


    // --- 5. Lógica del Catálogo del Cliente (pages/client-dashboard.html) ---
    const comicsContainer = document.getElementById('comicsContainer');
    const cartCountSpan = document.getElementById('cartCount');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartLink = document.getElementById('cartLink');

    function loadComics() {
        if (!comicsContainer) return; // Salir si no estamos en la página del catálogo

        comicsContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar

        comicsData.forEach(comic => {
            const comicCard = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="${comic.image}" class="card-img-top" alt="${comic.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${comic.title}</h5>
                            <p class="card-text text-muted">${comic.author}</p>
                            <p class="card-text flex-grow-1 overflow-hidden" style="max-height: 4.5em; text-overflow: ellipsis;">${comic.description}</p>
                            <p class="card-text fs-5 fw-bold">$${comic.price.toFixed(2)}</p>
                            <button class="btn btn-primary mt-auto add-to-cart" data-id="${comic.id}">Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            comicsContainer.innerHTML += comicCard;
        });

        // Añadir event listeners a los botones "Agregar al Carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const comicId = parseInt(this.dataset.id);
                addToCart(comicId);
            });
        });
    }

    // Función para agregar un cómic al carrito
    function addToCart(comicId) {
        const comicToAdd = comicsData.find(comic => comic.id === comicId);
        if (comicToAdd) {
            const existingItem = cart.find(item => item.id === comicId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...comicToAdd, quantity: 1 });
            }
            updateCartDisplay();
            // Para mostrar un mensaje de que se agregó al carrito
            const myModal = new bootstrap.Modal(document.getElementById('cartModal'), {
                keyboard: false
            });
            // Puedes mostrar un toast de Bootstrap en lugar de un alert si quieres algo más elegante
            // alert(`${comicToAdd.title} agregado al carrito.`);
        }
    }

    // Función para actualizar la visualización del carrito
    function updateCartDisplay() {
        if (!cartCountSpan) return; // Asegurarse de que estamos en una página con carrito

        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartItemsDiv) { // Solo actualizar el modal si estamos en la página del catálogo
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
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    `;
                    cartItemsDiv.appendChild(itemElement);
                    total += item.price * item.quantity;
                });
            }
            cartTotalSpan.textContent = total.toFixed(2);
        }
    }

    // Cargar cómics cuando la página del dashboard del cliente se cargue
    if (comicsContainer) {
        loadComics();
        updateCartDisplay(); // Para asegurar que el contador del carrito se actualice al cargar
    }

    // Abrir modal del carrito
    if (cartLink) {
        cartLink.addEventListener('click', function(event) {
            event.preventDefault();
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            updateCartDisplay(); // Asegurar que el modal esté actualizado al abrir
            cartModal.show();
        });
    }

    // --- 6. Lógica de Administración de Cómics (pages/admin-dashboard.html) ---
    const adminComicsTableBody = document.getElementById('adminComicsTableBody');
    const comicModalElement = document.getElementById('comicModal'); // Elemento del modal
    const comicForm = document.getElementById('comicForm');
    const addComicBtn = document.getElementById('addComicBtn');
    let comicModalInstance = null; // Instancia del modal para control

    if (comicModalElement) {
        comicModalInstance = new bootstrap.Modal(comicModalElement);
    }

    function loadAdminComics() {
        if (!adminComicsTableBody) return; // Salir si no estamos en la página de administración

        adminComicsTableBody.innerHTML = ''; // Limpiar la tabla antes de cargar
        comicsData.forEach(comic => {
            const row = `
                <tr>
                    <td>${comic.id}</td>
                    <td>${comic.title}</td>
                    <td>${comic.author}</td>
                    <td>$${comic.price.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-comic me-2" data-id="${comic.id}">Editar</button>
                        <button class="btn btn-sm btn-danger delete-comic" data-id="${comic.id}">Eliminar</button>
                    </td>
                </tr>
            `;
            adminComicsTableBody.innerHTML += row;
        });

        // Añadir event listeners para los botones de Editar
        document.querySelectorAll('.edit-comic').forEach(button => {
            button.addEventListener('click', function() {
                const comicId = parseInt(this.dataset.id);
                const comicToEdit = comicsData.find(c => c.id === comicId);
                if (comicToEdit) {
                    document.getElementById('comicModalLabel').textContent = 'Editar Cómic';
                    document.getElementById('comicId').value = comicToEdit.id;
                    document.getElementById('comicTitle').value = comicToEdit.title;
                    document.getElementById('comicAuthor').value = comicToEdit.author;
                    document.getElementById('comicDescription').value = comicToEdit.description;
                    document.getElementById('comicPrice').value = comicToEdit.price;
                    document.getElementById('comicImage').value = comicToEdit.image;
                    comicForm.classList.remove('was-validated'); // Limpiar validación al abrir modal
                    if (comicModalInstance) comicModalInstance.show(); // Mostrar el modal
                }
            });
        });

        // Añadir event listeners para los botones de Eliminar
        document.querySelectorAll('.delete-comic').forEach(button => {
            button.addEventListener('click', function() {
                const comicIdToDelete = parseInt(this.dataset.id);
                if (confirm('¿Estás seguro de que quieres eliminar este cómic? Esta acción no se puede deshacer.')) {
                    comicsData = comicsData.filter(c => c.id !== comicIdToDelete);
                    loadAdminComics(); // Recargar la tabla después de eliminar
                    alert('Cómic eliminado correctamente.');
                }
            });
        });
    }

    // Cargar cómics en la tabla de administración al cargar la página
    if (adminComicsTableBody) {
        loadAdminComics();
    }

    // Lógica para el botón "Agregar Nuevo Cómic"
    if (addComicBtn) {
        addComicBtn.addEventListener('click', function() {
            document.getElementById('comicModalLabel').textContent = 'Agregar Nuevo Cómic';
            comicForm.reset(); // Limpiar el formulario para un nuevo cómic
            comicForm.classList.remove('was-validated'); // Limpiar validación
            document.getElementById('comicId').value = ''; // Asegurar que el campo ID esté vacío
            if (comicModalInstance) comicModalInstance.show(); // Mostrar el modal
        });
    }

    // Lógica para enviar el formulario de Agregar/Editar Cómic
    if (comicForm) {
        comicForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Detener el envío real del formulario

            if (!comicForm.checkValidity()) {
                event.stopPropagation();
            }
            comicForm.classList.add('was-validated');

            if (comicForm.checkValidity()) {
                const id = document.getElementById('comicId').value ? parseInt(document.getElementById('comicId').value) : null;
                const title = document.getElementById('comicTitle').value;
                const author = document.getElementById('comicAuthor').value;
                const description = document.getElementById('comicDescription').value;
                const price = parseFloat(document.getElementById('comicPrice').value);
                const image = document.getElementById('comicImage').value;

                if (id) {
                    // Editar cómic existente
                    const index = comicsData.findIndex(c => c.id === id);
                    if (index !== -1) {
                        comicsData[index] = { id, title, author, description, price, image };
                        alert('Cómic actualizado con éxito.');
                    }
                } else {
                    // Agregar nuevo cómic
                    // Generar un ID único (simple para simulación)
                    const newId = comicsData.length > 0 ? Math.max(...comicsData.map(c => c.id)) + 1 : 1;
                    comicsData.push({ id: newId, title, author, description, price, image });
                    alert('Nuevo cómic agregado con éxito.');
                }
                loadAdminComics(); // Recargar la tabla con los cambios
                if (comicModalInstance) comicModalInstance.hide(); // Cerrar el modal
                comicForm.classList.remove('was-validated'); // Limpiar las clases de validación
            }
        });
    }

});