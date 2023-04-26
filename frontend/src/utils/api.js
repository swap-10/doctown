const BASE_URL = 'http://localhost:8000/api';

async function request(endpoint, method='GET', body) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export async function login(body) {
    const data = await request('auth/login', 'POST', body);
    return data;
}

export async function logout(body) {
    const data = await request('auth/logout', 'POST', body);
    return data;
}

export async function signup(body) {
    const data = await request('auth/signup', 'POST', body);
    return data;
}

export async function getProfile() {
    return request('users/me', 'GET');
}

export async function updateProfile(newProfile) {
    return request('users/me', 'PUT', newProfile);
}

export async function createPost(title, content) {
    return request('posts', 'POST', { title, content });
}

export async function getPostById(id) {
    return request(`posts/${id}`);
}

export async function updatePostById(id, updatedPost) {
    return request(`posts/${id}`, 'PUT', updatedPost);
}

export async function deletePostById(id) {
    return request(`posts/${id}`, 'DELETE');
}


