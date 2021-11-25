import TodoApp from "./TodoApp.js";

const args = process.argv.slice(2);

const app = new TodoApp(args);

app.run();



