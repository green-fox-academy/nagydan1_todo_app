import fs from 'fs';
import Todo from "./TodoClass.js";

export default class TodoApp {
    #args;

    constructor(args) {
        this.#args = args;
    }

    getParsedList() {
        let list = fs.readFileSync("./Data/todos.json", "utf-8");
        return JSON.parse(list);
    }

    printList() {
        let parsedList = this.getParsedList();
        if (parsedList.length == 0) {
            console.log(`Nincs mára tennivalód! :)`)
        } else {
            for (let k in parsedList) {
                console.log(
                    `${parseInt(k) + 1} - ${parsedList[k]["todo"]}`
                )
            }
        }
    }

    addTodo(newTodo) {
        let item = new Todo(newTodo);
        let parsedList = this.getParsedList();
        parsedList.push(item);
        writeData(parsedList);
    }

    markDone(doneIndex) {
        let parsedList = this.getParsedList();
        parsedList[doneIndex - 1]["done"] = true;
        writeData(parsedList);
    }

    delete(delIndex) {
        let parsedList = this.getParsedList();
        parsedList.splice(delIndex - 1, 1)
        writeData(parsedList);
    }

    run() {
        if (this.#args.includes("-l")) {
            this.printList();
        } else if (this.#args.includes("-a")) {
            let newTodo = this.#args[1];
            this.addTodo(newTodo);
        } else if (this.#args.includes("-c")) {
            let doneIndex = this.#args[1];
            this.markDone(doneIndex);
        } else if (this.#args.includes("-r")) {
            let delIndex = this.#args[1];
            this.delete(delIndex);
        } else if (this.#args.length == 0) {
            console.log(
                fs.readFileSync("./intro.txt", "utf-8")
            )
        } else {
            console.log("Nem támogatott argumentum!")
        }
    }
}

function writeData(input) {
    let list = JSON.stringify(input);
    fs.writeFileSync("./Data/todos.json", list);
}