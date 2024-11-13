export default function getConsoleLoader(message: string) {
    const P = ['\\', '|', '/', '-'];
    let x = 0;
    return setInterval(() => {
        process.stdout.write(`\r${P[x++]} ${message}`);
        x %= P.length;
    }, 100);
};