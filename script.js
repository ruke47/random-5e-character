/*jslint es6:true*/

const elem = document.getElementById.bind(document);

elem("do-button").onclick = generateStats;

function generateStats() {
    const myScores = shuffleArray(baseScores.slice());
    model.str = myScores[0];
    model.dex = myScores[1];
    model.con = myScores[2];
    model.int = myScores[3];
    model.wis = myScores[4];
    model.cha = myScores[5];

    const myRace = randomElem(races);
    const mySubrace = randomElem(myRace.subtypes);
    model.race = mySubrace;

    model.class = randomElem(classes);

    drawCharacter();
}

function drawCharacter() {
    ["str", "dex", "con", "int", "wis", "cha"].forEach(stat => {
        const base = model[stat];
        let racial = model.race.stats[stat] || 0;
        if (model.race.extra) {
            racial += model.race.extra()[stat] || 0;
        }
        const sum = base + racial;
        const bonus = Math.floor((sum - 10) / 2);

        elem(stat + "-base").textContent = base;
        elem(stat + "-race").textContent = racial || "";
        elem(stat + "-sum").textContent = sum;
        elem(stat + "-bonus").innerHTML = displayBonus(bonus);
    });

    elem("race-and-class").textContent = ", the " + model.race.name + " " + model.class;
}

function displayBonus(bonus) {
    if (bonus === 0) {
        return "&mdash;"
    } else {
        const absBonus = Math.abs(bonus);
        const sign = bonus > 0 ? "+" : "&ndash;";
        return sign + absBonus;
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function randomElem(array) {
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
}

const baseScores = [15, 14, 13, 12, 10, 8];
const classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
const races = [
    {
        name: "Dragonborn",
        subtypes: [
            {
                name: "Dragonborn",
                stats: {
                    str: 2,
                    cha: 1
                }
            }
        ]
    },
    {
        name: "Dwarf",
        subtypes: [
            {
                name: "Hill Dwarf",
                stats: {
                    con: 2,
                    wis: 1
                }
            },
            {
                name: "Mountain Dwarf",
                stats: {
                    con: 2,
                    str: 2
                }
            }
        ]
    },
    {
        name: "Elf",
        subtypes: [
            {
                name: "High Elf",
                stats: {
                    dex: 2,
                    int: 1
                }
            },
            {
                name: "Wood Elf",
                stats: {
                    dex: 2,
                    wis: 1
                }
            },
            {
                name: "Drow",
                stats: {
                    dex: 2,
                    cha: 1
                }
            }
        ]
    },
    {
        name: "Gnome",
        subtypes: [
            {
                name: "Rock Gnome",
                stats: {
                    int: 2,
                    con: 1
                }
            },
            {
                name: "Forest Gnome",
                stats: {
                    int: 2,
                    dex: 1
                }
            }
        ]
    },
    {
        name: "Halfling",
        subtypes: [
            {
                name: "Lightfoot Halfling",
                stats: {
                    dex: 2,
                    cha: 1
                }
            },
            {
                name: "Stout Halfling",
                stats: {
                    dex: 2,
                    con: 1
                }
            }
        ]
    },
    {
        name: "Half-Elf",
        subtypes: [
            {
                name: "Half-Elf",
                stats: {
                    cha: 2
                },
                extra: () => {
                    // half-elves get +1 to two non-cha stats of ~their~ my choice
                    const extraStats = shuffleArray(["str", "dex", "con", "int", "wis"]).slice(0, 2);
                    const ret = {};
                    ret[extraStats[0]] = 1;
                    ret[extraStats[1]] = 1;
                    return ret;
                }
            }
        ]
    },
    {
        name: "Half-Orc",
        subtypes: [
            {
                name: "Half-Orc",
                stats: {
                    str: 2,
                    con: 1
                }
            }
        ]
    },
    {
        name: "Human",
        subtypes: [
            {
                name: "Human",
                stats: {
                    str: 1,
                    dex: 1,
                    con: 1,
                    int: 1,
                    wis: 1,
                    cha: 1
                }
            }
        ]
    },
    {
        name: "Tiefling",
        subtypes: [
            {
                name: "Tiefling",
                stats: {
                    cha: 2,
                    int: 1
                }
            }
        ]
    }
];