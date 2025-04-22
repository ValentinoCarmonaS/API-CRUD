const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const authSection = document.getElementById('auth-section');
const usersSection = document.getElementById('users-section');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authToggle = document.getElementById('auth-toggle');
const authError = document.getElementById('auth-error');
const nameField = document.getElementById('name-field');
const userForm = document.getElementById('user-form');
const userError = document.getElementById('user-error');
const formTitle = document.getElementById('form-title');
const usersTableBody = document.querySelector('#users-table tbody');

// State
let isLogin = true;

// API Request Helper
async function apiRequest(method, endpoint, data = null) {
	const token = localStorage.getItem('token');
	const headers = {
		'Content-Type': 'application/json',
		...(token && { Authorization: `Bearer ${token}` })
	};
	const options = {
		method,
		headers,
		...(data && { body: JSON.stringify(data) })
	};
	try {
		const response = await fetch(
			`${API_BASE_URL}${endpoint}`,
			options
		);
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message ||
					`Request failed with status ${response.status}`
			);
		}
		const result = await response.json();
		if (!result.success) {
			throw new Error(result.message || 'Request failed');
		}
		return result;
	} catch (error) {
		console.error(`API Error: ${error.message}`);
		throw error;
	}
}

// Toggle between Login and Register
function toggleAuth() {
	isLogin = !isLogin;
	authTitle.textContent = isLogin ? 'Login' : 'Register';
	authToggle.innerHTML = isLogin
		? `Don't have an account? <a href="#" onclick="toggleAuth()">Register</a>`
		: `Already have an account? <a href="#" onclick="toggleAuth()">Login</a>`;
	nameField.classList.toggle('hidden', isLogin);
	authForm.querySelector('button').textContent = isLogin
		? 'Login'
		: 'Register';
	authError.textContent = '';
}

// Toggle Password Visibility
function togglePassword(inputId) {
	const input = document.getElementById(inputId);
	const eye = input.parentElement.querySelector('.eye');
	const eyeSlash = input.parentElement.querySelector('.eye-slash');
	if (input.type === 'password') {
		input.type = 'text';
		eye.classList.add('hidden');
		eyeSlash.classList.remove('hidden');
	} else {
		input.type = 'password';
		eye.classList.remove('hidden');
		eyeSlash.classList.add('hidden');
	}
}

// Handle Authentication
authForm.addEventListener('submit', async e => {
	e.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const name = document.getElementById('name').value;
	const endpoint = isLogin ? '/auth/login' : '/auth/register';
	const data = isLogin ? { email, password } : { name, email, password };
	try {
		const result = await apiRequest('POST', endpoint, data);
		localStorage.setItem('token', result.data.token);
		authSection.classList.add('hidden');
		usersSection.classList.remove('hidden');
		authForm.reset();
		fetchUsers();
	} catch (error) {
		authError.textContent =
			error.message || 'Authentication failed';
	}
});

// Fetch and Display Users
async function fetchUsers() {
	try {
		const result = await apiRequest('GET', '/users');
		usersTableBody.innerHTML = '';
		result.users.forEach(user => {
			const tr = document.createElement('tr');
			tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button onclick="editUser('${user._id}')">Edit</button>
          <button onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      `;
			usersTableBody.appendChild(tr);
		});
	} catch (error) {
		userError.textContent = error.message;
	}
}

// Edit User
async function editUser(id) {
	try {
		const result = await apiRequest('GET', `/users/${id}`);
		document.getElementById('user-id').value = result.user._id;
		document.getElementById('user-name').value = result.user.name;
		document.getElementById('user-email').value = result.user.email;
		document.getElementById('user-password').value = '';
		formTitle.textContent = 'Edit User';
		userError.textContent = '';
	} catch (error) {
		userError.textContent = error.message;
	}
}

// Delete User
async function deleteUser(id) {
	if (confirm('Are you sure you want to delete this user?')) {
		try {
			await apiRequest('DELETE', `/users/${id}`);
			fetchUsers();
		} catch (error) {
			userError.textContent = error.message;
		}
	}
}

// Handle User Form Submission
userForm.addEventListener('submit', async e => {
	e.preventDefault();
	const id = document.getElementById('user-id').value;
	const name = document.getElementById('user-name').value;
	const email = document.getElementById('user-email').value;
	const password = document.getElementById('user-password').value;
	const data = password ? { name, email, password } : { name, email };
	const method = id ? 'PUT' : 'POST';
	const endpoint = id ? `/users/${id}` : '/users';
	try {
		await apiRequest(method, endpoint, data);
		resetUserForm();
		fetchUsers();
	} catch (error) {
		userError.textContent = error.message;
	}
});

// Reset User Form
function resetUserForm() {
	userForm.reset();
	document.getElementById('user-id').value = '';
	formTitle.textContent = 'Create User';
	userError.textContent = '';
}

// Logout
function logout() {
	localStorage.removeItem('token');
	usersSection.classList.add('hidden');
	authSection.classList.remove('hidden');
	toggleAuth(); // Reset to login
}

// Check for Token on Load
if (localStorage.getItem('token')) {
	authSection.classList.add('hidden');
	usersSection.classList.remove('hidden');
	fetchUsers();
}
