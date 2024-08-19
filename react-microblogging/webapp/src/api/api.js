// src/api/api.js
export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/users.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Optional: Hier könnte eine Fehlerbehandlung hinzugefügt werden
    }
}

export async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Optional: Hier könnte eine Fehlerbehandlung hinzugefügt werden
    }
}

export async function createPost(newPost) {
    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return response.json();
    } catch (error) {
        console.error('Error creating post:', error);
        throw error; // Optional: Hier könnte eine Fehlerbehandlung hinzugefügt werden
    }
}
