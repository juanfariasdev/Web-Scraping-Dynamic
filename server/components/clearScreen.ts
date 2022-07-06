import rl from 'readline';

function ClearScreen() {
    rl.cursorTo(process.stdout, 0, 0);
    rl.clearScreenDown(process.stdout);
}


export { ClearScreen }