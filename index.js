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
                fs.writeFile(response.username + '.md', "<h1 style='color:"+ response.colorChoice + "'>" + information.data.name + "</h1> <img src=" + information.data.avatar_url + "> <p>Bio: " + information.data.bio + "</p> <p>Company: " + information.data.company + "</p> <a href='" + information.data.html_url + "'>" + information.data.name + "'s repos</a>", function(error) {
                    if (error) {
                        console.log("error")
                    }
                })
            })

    })