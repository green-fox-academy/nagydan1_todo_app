import fs from 'fs';

export default class TodoApp {
    #args;

    constructor(args) {
        this.#args = args;
    }

    printList() {
        let list = fs.readFileSync("./Data/todos.json", "utf-8");
        let parsedList = JSON.parse(list);
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

    run() {

        if (this.#args.includes("-l")) {
            this.printList();
        } else {
            console.log(
                fs.readFileSync("./intro.txt", "utf-8")
            );
        };
    }
}
