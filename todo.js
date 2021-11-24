import fs from 'fs';

const args = process.argv.slice(2);


if (args.includes("-l")) {

    let list = fs.readFileSync("./Data/todos.json", "utf-8");
    let parsedList = JSON.parse(list);
    for (let k in parsedList) {
        console.log(
            `${parseInt(k)+1} - ${parsedList[k]}`
        )
    }
} else {
    console.log(
        fs.readFileSync("./intro.txt", "utf-8")
    );
}

