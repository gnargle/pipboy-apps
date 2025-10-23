let pbkb = require("pbkb").initKeyboard();

try{
    pbkb.assembledString = fs.readFileSync("USER/note.txt");
}catch{}

pbkb.textEntryLoop();

let intervalId = setInterval(() => {
        if (pbkb.finished) {
            fs.writeFileSync("USER/note.txt", pbkb.assembledString);
            clearInterval(intervalId);
            delete pbkb;
            showMainMenu();
        }
    }, 50);