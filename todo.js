import fs from 'fs';

import { Todo } from "./TodoClass.js";

console.log(
 `Parancssori Todo applikáció
=============================

Parancssori argumentumok:
    -l   Kilistázza a feladatokat
    -a   Új feladatot ad hozzá
    -r   Eltávolít egy feladatot
    -c   Teljesít egy feladatot`
);

if (process.argv.slice(2).includes("-l")) {

    let parsedList = JSON.parse(fs.readFileSync("./list.json", "utf-8"));

    console.log(parsedList);
}

