const DEFAULT_CONST = [
    {
        real: 0.34,
        imag: -0.51,
    },
    {
        real: 0.28,
        imag: 0,
    },
    {
        real: -0.83,
        imag: -0.22,
    },
    {
        real: -1.4,
        imag: 0,
    },
    {
        real: 0.4,
        imag: -0.22,
    },
    {
        real: 0.46,
        imag: -0.35,
    },
    {
        real: 0.23,
        imag: 0,
    }
];

const DEFAULT_COLORS = [
    {
        start: "#6135ff",
        end: "#130b0b"
    },
    {
        start: "#000000",
        end: "#FFFFFF"
    },
    {
        start: "#000000",
        end: "#5eff00"
    },
    {
        start: "#FFFFFF",
        end: "#000000"
    }
]

function getRandomConfigIdx(len) {
    return Math.floor(Math.random() * len);
}

function getRandomConfig() {
    let idx = getRandomConfigIdx(DEFAULT_CONST.length);
    let constCfg = DEFAULT_CONST[idx];

    idx = getRandomConfigIdx(DEFAULT_COLORS.length);
    let colorCfg = DEFAULT_COLORS[idx];
    return {
        real: constCfg.real,
        imag: constCfg.imag,
        colorStart: colorCfg.start,
        colorEnd: colorCfg.end,
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
