module.exports.getCities = function getCities(value) {

    value = convert(value);

    let result = [], i = 0;

    do {
        if (convert(cities[i]).startsWith(value)) result.push(cities[i]);
        i++;
    } while (result.length < 5 && cities.length > i);

    return result;
};

function loadCities() {
    let xHttp = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.responseText);
            }
        };
        xHttp.open("GET", "cities.json", true);
        xHttp.send();
    });
}

let cities = (function () {
    loadCities()
        .then((jsonStr) => {
            let parsedJson = JSON.parse(jsonStr),
                temp = {};

            for (const area in parsedJson) {
                if (parsedJson.hasOwnProperty(area)) {
                    for (const cityWeight in parsedJson[area]) {
                        if (!temp.hasOwnProperty(cityWeight)) temp[cityWeight] = [];

                        if (parsedJson[area].hasOwnProperty(cityWeight)) {
                            parsedJson[area][cityWeight].forEach(function (city) {
                                temp[cityWeight].push(city + (city !== area ? ', ' + area : ''));
                            });
                        }
                    }
                }
            }

            let result = [];

            ((Object.keys(temp)).sort().reverse()).forEach(function (cityWeight) {
                result = result.concat(temp[cityWeight]);
            });

            cities = result;
        });
})();

const transliterate = {
    "q": "й",
    "w": "ц",
    "e": "у",
    "r": "к",
    "t": "е",
    "y": "н",
    "u": "г",
    "i": "ш",
    "o": "щ",
    "p": "з",
    "[": "х",
    "{": "Х",
    "]": "ъ",
    "}": "Ъ",
    "|": "/",
    "`": "ё",
    "~": "Ё",
    "a": "ф",
    "s": "ы",
    "d": "в",
    "f": "а",
    "g": "п",
    "h": "р",
    "j": "о",
    "k": "л",
    "l": "д",
    ";": "ж",
    ":": "Ж",
    "'": "э",
    "\"": "Э",
    "z": "я",
    "x": "ч",
    "c": "с",
    "v": "м",
    "b": "и",
    "n": "т",
    "m": "ь",
    ",": "б",
    "<": "Б",
    ".": "ю",
    ">": "Ю",
    "/": ".",
    "?": ",",
    "@": "\"",
    "#": "№",
    "$": ";",
    "^": ":",
    "&": "?"
};

const ruTransliterate = {
    "ё": "е",
    "ъ": "ь"
};

const convert = value => value.toLowerCase().replace(/./g, function (ch) {
    return transliterate[ch] || ruTransliterate[ch] || ch;
});