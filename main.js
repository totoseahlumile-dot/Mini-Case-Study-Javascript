document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.getElementById("login-form");
	const usernameInput = document.getElementById("uname");
	const passwordInput = document.getElementById("pwd");
	const errorModal = document.getElementById("login-error-modal");
	const tryAgainButton = errorModal ? errorModal.querySelector("button") : null;
	const errorMessage = errorModal ? errorModal.querySelector("p") : null;
	const sidebar = document.querySelector(".nav-sidebar");
	const toggleButton = document.querySelector(".btn-toggle-nav");

	// Demo credentials used for the basic login check.
	const validCredentials = {
		username: "asive",
		password: "asive123",
	};

	const hideErrorModal = () => {
		if (errorModal) {
			errorModal.hidden = true;
		}
	};

	// Show the login error modal with a message.
	const showErrorModal = (message) => {
		if (!errorModal) {
			return;
		}

		if (errorMessage) {
			errorMessage.textContent = message;
		}

		errorModal.hidden = false;
	};

	// Update the sidebar and toggle button to match the open/closed state.
	const setSidebarState = (isOpen) => {
		if (sidebar) {
			sidebar.classList.toggle("nav-sidebar--open", isOpen);
		}

		if (toggleButton) {
			toggleButton.classList.toggle("btn-toggle-nav--open", isOpen);
			toggleButton.setAttribute("aria-expanded", String(isOpen));
		}
	};

	// Keep the existing inline sidebar toggle call working.
	window.toggleNav = () => {
		if (!sidebar || !toggleButton) {
			return;
		}

		const willOpen = !sidebar.classList.contains("nav-sidebar--open");
		setSidebarState(willOpen);
	};

	// Start with the sidebar closed and the error modal hidden.
	setSidebarState(false);
	hideErrorModal();

	// Validate the login form before redirecting to the home page.
	if (loginForm) {
		loginForm.addEventListener("submit", (event) => {
			event.preventDefault();

			const enteredUsername = usernameInput ? usernameInput.value.trim() : "";
			const enteredPassword = passwordInput ? passwordInput.value : "";

			if (
				enteredUsername === validCredentials.username &&
				enteredPassword === validCredentials.password
			) {
				window.location.href = "index.html";
				return;
			}

			showErrorModal("Incorrect username or password. Please try again.");
			if (passwordInput) {
				passwordInput.value = "";
			}
			if (usernameInput) {
				usernameInput.focus();
				usernameInput.select();
			}
		});
	}

	// Let the user dismiss the error modal and try again.
	if (tryAgainButton) {
		tryAgainButton.addEventListener("click", () => {
			hideErrorModal();
			if (passwordInput) {
				passwordInput.focus();
			}
		});
	}
});

