import fs from 'fs';
import Todo from "./TodoClass.js";

export default class TodoApp {
    #firstArg;
    #secondArg;
    #parsedList = this.getParsedList();

    constructor(args) {
        this.#firstArg = args[0];
        this.#secondArg = args[1];
    }

    getParsedList() {
        try {
            let list = fs.readFileSync("./Data/todos.json", "utf-8");
            return JSON.parse(list);
        } catch (error) {
            console.log("A hiányzó fájlok létrehozása megtörtént. Kérlek próbáld újra.");
            fs.mkdirSync("./Data");
            fs.writeFileSync("./Data/todos.json", "[]")
        }
    }

    printListWithStatus() {
        if (this.#parsedList.length == 0) {
            console.log(`Nincs mára tennivalód! :)`)
        } else {
            for (let listItem in this.#parsedList) {
                let x;
                if (this.#parsedList[listItem]["done"]) {
                    x = "x";
                } else {
                    x = " ";
                }
                console.log(
                    `${parseInt(listItem) + 1} - [${x}] ${this.#parsedList[listItem]["todo"]}`
                )
            }
        }
    }

    addTodo(newTodo) {
        let item = new Todo(newTodo);
        this.#parsedList.push(item);
        writeData(this.#parsedList);
    }

    markDone(doneIndex) {
        this.#parsedList[doneIndex - 1]["done"] = true;
        writeData(this.#parsedList);
    }

    remove(delIndex) {
        this.#parsedList.splice(delIndex - 1, 1)
        writeData(this.#parsedList);
    }

    run() {

        switch (this.#firstArg) {
            case "-l":
                this.printListWithStatus();
                break;
            case "-a":
                if (this.#secondArg == undefined) {
                    console.log(
                        "Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!"
                    )
                } else {
                    this.addTodo(this.#secondArg);
                }
                break;
            case "-c":
                if (this.#secondArg == undefined) {
                    console.log(
                        "Nem lehetséges a feladat végrehajtása: nem adtál meg indexet!"
                    )
                } else if (isNaN(this.#secondArg)) {
                    console.log(
                        "Nem lehetséges a feladat végrehajtása: a megadott index nem szám!"
                    )
                } else if (this.#secondArg > this.#parsedList.length) {
                    console.log(
                        "Nem lehetséges a feladat végrehajtása: túlindexelési probléma adódott!"
                    )
                } else {
                    this.markDone(this.#secondArg);
                }
                break;
            case "-r":
                if (this.#secondArg == undefined) {
                    console.log(
                        "Nem lehetséges az eltávolítás: nem adott meg indexet!"
                    )
                } else if (isNaN(this.#secondArg)) {
                    console.log(
                        "Nem lehetséges az eltávolítás: a megadott index nem szám!"
                    )
                } else if (this.#secondArg > this.#parsedList.length) {
                    console.log(
                        "Nem lehetséges az eltávolítás: túlindexelési probléma adódott!"
                    )
                } else {
                    this.remove(this.#secondArg);
                }
                break;
            case undefined:
                console.log(
                    fs.readFileSync("./intro.txt", "utf-8")
                );
                break;
            default:
                console.log("Nem támogatott argumentum!");
                console.log(
                    fs.readFileSync("./intro.txt", "utf-8")
                );
        }
    }
}

function writeData(input) {
    let list = JSON.stringify(input);
    fs.writeFileSync("./Data/todos.json", list);
}