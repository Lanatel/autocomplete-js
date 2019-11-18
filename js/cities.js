const getCities = value => {

    let result = [], i = 0;

    value = convert(value);

    do {
        if (convert(cities[i]).startsWith(value)) result.push(cities[i]);
        i++;
    } while (result.length < 5 && cities.length > i);

    return result;
};

const loadCities = () => {
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
};

const getCitiesInProperFormat = jsonString => {
    let parsedJson = JSON.parse(jsonString),
        citiesGroupedByWeight = {};

    for (const area in parsedJson) {
        for (const cityWeight in parsedJson[area]) {
            if (!citiesGroupedByWeight.hasOwnProperty(cityWeight)) citiesGroupedByWeight[cityWeight] = [];

            parsedJson[area][cityWeight]
                .forEach((city) => citiesGroupedByWeight[cityWeight].push(city + (city !== area ? ', ' + area : '')));
        }
    }

    let result = [];

    ((Object.keys(citiesGroupedByWeight))
            .sort()
            .reverse()
    ).forEach((cityWeight) => result = result.concat(citiesGroupedByWeight[cityWeight]));

    return result;
};

let cities;

loadCities()
    .then((jsonString) => getCitiesInProperFormat(jsonString))
    .then(result => cities = result);

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

const ruTransliterate = {"ё": "е", "ъ": "ь", "-": " ", "—" : ""};

const convert = value => {
    return value
        .trim()
        .toLowerCase()
        .replace(/ +/g, ' ')
        .replace(/./g, (ch) => transliterate[ch] || ruTransliterate[ch] || ch);
};

module.exports = {
    getCities,
    convert
};