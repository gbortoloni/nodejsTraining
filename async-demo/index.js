console.log('before');
//Callback
//getUser(1, getRepositories);
console.log('after');

//Promise
//getUser(1)
//    .then(user => getRepositories(user.gitHubUsername))
//    .then(repos => getCommits(repos[0]))
//    .then(commits => console.log('Commits', commits))
//    .catch(err => console.log('Error', err.message));

//Async-wait
async function displayCommites() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.getCommits);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
        
    }
}
displayCommites();


function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database');
            resolve({ id: id, gitHubUsername: 'giuliano'}); 
        }, 2000)
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            //resolve(['commits']);
            reject(new Error('Error'));
        }, 2000);
    });
}
