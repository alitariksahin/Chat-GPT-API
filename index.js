const login = require("./cookies/cookies");
const chat = require("./controller/chat");



const start = async () => {
    try {
        const email = "example@gmail.com"; // type your email with which you registered chatGPT.
        const password = "123456"; // type your password with which you registered chatGPT.
        await login(email , password); // Once you login you can comment this line out.
        
        const input = "write me an acrostic poem with the letters of chatgpt"; //here your input goes.
        const output = await chat(input);
        console.log(output);

    } catch (error) {
        console.log(error);
    }
}

start();
