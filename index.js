const login = require("./cookies/cookies");
const chat = require("./controller/chat");



const start = async () => {
    try {
        const email = "alhasogluamine@gmail.com"; // type your email with which you registered chatGPT.
        const password = "136.703Ha"; // type your password with which you registered chatGPT.
        //await login(email , password); // Once you login you can comment this line out.
        
        const input = "give me the recipe of caramel latte"; //here your input goes.
        const output = await chat(input);
        console.log(output);

    } catch (error) {
        console.log(error);
    }
}

start();
