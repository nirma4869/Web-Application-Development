// Function to fetch all posts from the server
export async function fetchProjects(){
    const response = await fetch("http://localhost:3000/posts.json");

    if(!response.ok){
        throw new Error("HTTP error: ${response.status}");
    }
    const data= await response.json();
    return data;
}

// Function to fetch all users from the server
export async function fetchUser(){
    const response = await fetch("http://localhost:3000/users.json");
    if(!response.ok){
        throw new Error("HTTP error: ${response.status}");
    }
    const data= await response.json();
    return data;
}

// Function to fetch posts for a specific user by user ID
export async function fetchUserProjects(userId){
    const response = await fetch("http://localhost:3000/posts.json");

    if(!response.ok){
        throw new Error("HTTP error: ${response.status}");
    }

    const data= await response.json();
    const filteredPosts = data.filter(post => post.user_id === userId)
    console.log(filteredPosts);
    return filteredPosts
    
}

// Function to fetch users by their name
export async function fetchUserByName(userName){
    const response = await fetch("http://localhost:3000/users.json");
    if(!response.ok){
        throw new Error("HTTP error: ${response.status}");
    }
    const data= await response.json();
    const filteredUser = data.filter(user => user.name === userName)
    console.log(filteredUser)
    return filteredUser;
}

// Function to fetch a user by their ID
export async function fetchUserNameByID(userId){

    const response = await fetch(`http://localhost:3000/users/${userId}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();


}

// Function to create a new post
export async function createPost(message){

    const response = await fetch("http://localhost:3000/posts.json",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
        credentials: "include", 
    });
    if(!response.ok){
        throw new Error("HTTP error: ${response.status}");
    }
    return response.json();
}