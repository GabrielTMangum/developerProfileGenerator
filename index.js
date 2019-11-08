const inquirer = require('inquirer');
const axios = require('axios')
const fs = require('fs');

inquirer
    .prompt([ 
        {
            type: 'input',
            message: 'What is your Github username?',
            name: 'username'
        },
        {
            type: 'list',
            message: 'Which color would you prefer',
            choices: ['Blue', 'red', 'orange', 'purple', 'green'],
            name: 'colorChoice'
        }
    ]).then(response => {
        axios.get('https://api.github.com/users/' + response.username)
            .then(information => {
                console.log(information.data)
                fs.writeFile(response.username + '.md', 
                "<h1 style='color:"+ response.colorChoice + "'>" + information.data.name + "</h1>" + 
                "<img src=" + information.data.avatar_url + ">" + 
                "<p>Bio: " + information.data.bio + "</p>" + 
                "<p>Company: " + information.data.company + "</p>" + 
                "<a href='" + information.data.html_url + "'>" + information.data.name + "'s repos</a>" +
                "<p>Public repos: " + information.data.public_repos + "</p>" +
                "<p>Followers: " + information.data.followers + "</p>" +
                "<p>Following: " + information.data.following + "</p>" +
                "<p>Location: " + information.data.location + "</p>", function(error) {
                    if (error) {
                        console.log("error")
                    } else {
                        console.log("success")
                    }
                })
            })

    })