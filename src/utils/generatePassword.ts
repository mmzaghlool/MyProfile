export default function (size: number = 6) {
    const result: string[] = [];
    const hexRef: string[] = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];

    for (let n = 0; n < size; n++) {
        result.push(hexRef[Math.floor(Math.random() * hexRef.length)]);
    }
    return result.join('');
}
