import fs from 'fs';

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
                    `${parseInt(k) + 1} - ${parsedList[k]}`
                )
            }
        }
    }

    addTodo(newTodo) {
        let parsedList = this.getParsedList();
        parsedList.push(newTodo);
        let list = JSON.stringify(parsedList);
        fs.writeFileSync("./Data/todos.json", list);
    }

    run() {

        if (this.#args.includes("-l")) {
            this.printList();
        } else if (this.#args.includes("-a")) {
            let newTodo = this.#args[1];
            this.addTodo(newTodo);
        } else {
            console.log(
                fs.readFileSync("./intro.txt", "utf-8")
            );
        };
    }
}
