// simulated an asyncronous API call to fetch a user
const fetchUser = (nickname, done) => {
	// sample users
	const users = {
		alice: { id: 278, name: "Alice" },
		bob: { id: 41, name: "Bob" },
	};
	
	// simulate network
	setTimeout(() => {
		done(users[nickname]);
	}, Math.random() * 100);
};

// fetch a user by its nickname
fetchUser("bob", (user) => {
	console.log(user);
});

// simulated an asyncronous API call to fetch a project
const fetchProject = (userId, done) => {
	// sample users
	const projects = {
		278: { id: 8362, name: "Bycicle Repair" },
		41: { id: 181, name: "Website Redesign" },
	};

	// simulate network
	setTimeout(() => {
		done(projects[userId]);
	}, Math.random() * 100);
};

// fetch a project by its id
fetchProject(41, (project) => {
	console.log(project);
});

// Function to fetch user and project data using callbacks
function getUserProjectWithCallback(nickname) {
        fetchUser(nickname, (user)  => {
            fetchProject(user.id,(project) => {
                console.log(project.name);
            })
        })

}
// Function to fetch user and project data using Promises
function getUserProjectWithPromise(nickname){
    const userPromise = new Promise((resolve,reject) =>{
        fetchUser(nickname, (user) =>{
        if(user){
            resolve(user);
        }else{
            reject(new Error("User not forund"));
        }
    })
    })
    return userPromise.then((user) => {
        const projectPromise = new Promise((resolve,reject) =>{
            fetchProject(user.id, (project) => {
                if(project){
                    resolve(project);
                }else{
                    reject(new Error("project not forund"));
                }
            })  
})
return projectPromise;
})
}

// Function to fetch user and project data using async/await
async function getUserProjectAsync(nickname){
    const userPromise = new Promise((resolve,reject) =>{
        fetchUser(nickname, (user) =>{
        if(user){
            resolve(user);
        }else{
            reject(new Error("User not forund"));
        }
    })
})

    const user = await userPromise;
    const projectPromise = new Promise((resolve,reject) =>{
        fetchProject(user.id, (project) => {
            if(project){
                resolve(project);
            }else{
                reject(new Error("project not forund"));
            }
        })  
})
    const project = await projectPromise;
    console.log(project.name)
    
};

// Call functions to demonstrate their behavior
getUserProjectWithCallback("alice");
getUserProjectWithPromise("alice")
  .then((project) => {
    console.log("Project with Promise: ", project.name);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
getUserProjectAsync("alice");
