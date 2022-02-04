/**
 * This file contains code to run the game "Clancrest".
 * @author: DigitalCreativeApkDev
 * */

// Creating static variables to be used throughout the game.

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const ELEMENT_CHART = [
    ["ATTACKING\nELEMENT", "TERRA", "FLAME", "SEA", "NATURE", "ELECTRIC", "ICE", "METAL", "DARK", "LIGHT", "WAR",
        "PURE",
        "LEGEND", "PRIMAL", "WIND"],
    ["DOUBLE\nDAMAGE", "ELECTRIC\nDARK", "NATURE\nICE", "FLAME\nWAR", "SEA\nLIGHT", "SEA\nMETAL", "NATURE\nWAR",
        "TERRA\nICE", "METAL\nLIGHT", "ELECTRIC\nDARK", "TERRA\nFLAME", "LEGEND", "PRIMAL", "PURE", "WIND"],
    ["HALF\nDAMAGE", "METAL\nWAR", "SEA\nWAR", "NATURE\nELECTRIC", "FLAME\nICE", "TERRA\nLIGHT", "FLAME\nMETAL",
        "ELECTRIC\nDARK", "TERRA", "NATURE", "SEA\nICE", "PRIMAL", "PURE", "LEGEND", "N/A"],
    ["NORMAL\nDAMAGE", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER",
        "OTHER",
        "OTHER", "OTHER", "OTHER"]
];

// Creating static functions to be used throughout the game.

function isNumber(string) {
    try {
        let a = Decimal(string);
        return true;
    }
    catch (error) {
        return false;
    }
}

function tabulateElementChart() {
    let result = "<table>";
    for (let i = 0; i < ELEMENT_CHART.length; i++) {
        result += "<tr>";
        for(let j=0; j < ELEMENT_CHART[i].length; j++){
            result += "<td>" + ELEMENT_CHART[i][j] + "</td>";
        }
        result += "</tr>";
    }
    return result + "</table>";
}

function generateRandomName() {
    let result = "";
    let nameLength = 5 + Math.floor(Math.random() * 21); // between 5 and 25 inclusive
    for (let i = 0; i < nameLength; i++) {
        result += LETTERS[Math.floor(Math.random() * LETTERS.length)];
    }

    return result.charAt(0).toUpperCase() + result.slice(1);
}

function generateRandomLegendaryCreature(element) {

}

function triangular(n) {
    return Math.floor(n * (n - 1) / 2);
}

function decimalSumOfList(aList) {
    return aList.reduce((a, b) =>
        !isNumber(a) && !isNumber(b) ? 0 :
            !isNumber(a) && isNumber(b) ? new Decimal(b) :
                isNumber(a) && !isNumber(b) ? new Decimal(a) :
                    new Decimal(a).add(new Decimal(b))
    )
}

function decimalProductOfList(aList) {
    return aList.reduce((a, b) =>
        !isNumber(a) && !isNumber(b) ? 1 :
            !isNumber(a) && isNumber(b) ? new Decimal(b) :
                isNumber(a) && !isNumber(b) ? new Decimal(a) :
                    new Decimal(a).multiply(new Decimal(b))
    )
}

function getElementalDamageMultiplier(element1, element2) {
    if (element1 === "TERRA") {
        return ["ELECTRIC", "DARK"].includes(element2) ? new Decimal("2") :
            ["METAL", "WAR"].includes(element2) ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "FLAME") {
        return ["NATURE", "ICE"].includes(element2) ? new Decimal("2") :
            ["SEA", "WAR"].includes(element2) ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "SEA") {
        return ["FLAME", "WAR"].includes(element2) ? new Decimal("2") :
            ["NATURE", "ELECTRIC"].includes(element2) ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "NATURE") {
        return ["SEA", "LIGHT"].includes(element2) ? new Decimal("2") :
            ["FLAME", "ICE"].includes(element2) ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "ELECTRIC") {
        return ["SEA", "METAL"].includes(element2) ? new Decimal("2") :
            ["TERRA", "LIGHT"].includes(element2) ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "ICE") {
        return ["NATURE", "WAR"].includes(element2) ? new Decimal("2") :
            ["FLAME", "METAL"].includes(element2) ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "METAL") {
        return ["TERRA", "ICE"].includes(element2) ? new Decimal("2") :
            ["ELECTRIC", "DARK"].includes(element2) ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "DARK") {
        return ["METAL", "LIGHT"].includes(element2) ? new Decimal("2") :
            element2 === "TERRA" ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "LIGHT") {
        return ["ELECTRIC", "DARK"].includes(element2) ? new Decimal("2") :
            element2 === "NATURE" ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "WAR") {
        return ["TERRA", "FLAME"].includes(element2) ? new Decimal("2") :
            ["SEA", "ICE"].includes(element2) ? new Decimal("0.5") : new Decimal("1");
    }
    else if (element1 === "PURE") {
        return element2 === "LEGEND" ? new Decimal("2") : element2 === "PRIMAL" ? new Decimal("0.5") :
            new Decimal("1");
    }
    else if (element1 === "LEGEND") {
        return element2 === "PRIMAL" ? new Decimal("2") : element2 === "PURE" ? new Decimal("0.5") :
            new Decimal("1");
    }
    else if (element1 === "PRIMAL") {
        return element2 === "PURE" ? new Decimal("2") : element2 === "LEGEND" ? new Decimal("0.5") :
            new Decimal("1");
    }
    else if (element1 === "WIND") {
        return element2 === "WIND" ? new Decimal("2") : new Decimal("1");
    }
    else {
        return new Decimal("1");
    }
}

function resistanceAccuracyRule(accuracy, resistance) {
    if (new Decimal(resistance).subtract(new Decimal(accuracy)).compare(new Decimal("0.15")) <= 0) {
        return new Decimal("0.15");
    }
    return new Decimal(resistance).subtract(new Decimal(accuracy));
}

function getIndexOfElement(aList, element) {
    for (let i = 0; i < aList.length; i++) {
        if (aList[i] === element) {
            return i;
        }
    }
    return -1;
}

function loadGameData() {
    // TODO: load saved game data
}

function saveGameData() {
    // TODO: save game data
}

// Creating static variables to be used throughout the game.

// 1. The item shop
let itemShop;

// 2. The building shop
let buildingShop;

// 3. Potential CPU controlled players the player can face.
let potentialCPUPlayers;

// 4. The battle arena to battle against CPU controlled players.
let battleArena;

// 5. The battle arena to battle against human controlled players.
let globalArena;

// 6. Minigames the player can play in
let minigames;
