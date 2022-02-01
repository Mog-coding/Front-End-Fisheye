let x = 1;

for (let i = 0; i < 5; i++) {
    if (x === 1) {
        x = 0;
        console.log(x)
        const y = 0;
    } else {
        x = 1;
        console.log(x)
        const y = 1;
    }
}