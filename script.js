const itemContainer = document.getElementById("item-container");
const itemCounters = document.getElementById("item-counters");
const rarityIndex = document.getElementById("rarity-index");

async function sendWebhookMessage(webhookUrl, message) {
    const data = {
        content: message,
    };

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        console.error("Failed to send webhook message:", response.statusText);
    }
}

// you can mod this game if you want just give me credit k thx byee

const items = [
    { name: "germ", rarity: 0.3 },
    { name: "dust", rarity: 0.2 },
    { name: "dirt", rarity: 0.15 },
    { name: "pebbles", rarity: 0.1 },
    { name: "UGLY DOG", rarity: 0.101 },
    { name: "a bug", rarity: 0.05 },
    { name: "grass 😱", rarity: 0.01 },
    { name: "flower", rarity: 0.002 },
    { name: "Stick", rarity: 0.002 },
    { name: "UNWANTED WEED", rarity: 0.001 },
    { name: "ant hill", rarity: 0.0004 },
    { name: "a fruit (you probably dont want to eat this)", rarity: 0.0003 },
    { name: "a tree (SO COL)", rarity: 0.0002 },
    { name: "a bush (SUPER DUPER COL)", rarity: 0.000134 },
    { name: "Stone", rarity: 0.0001 },
    { name: "Slightly less ugly dog", rarity: 0.0001 },
    { name: "Coal", rarity: 0.0001 },
    { name: "the ULTIMATE leaf", rarity: 0.00008 },
    { name: "a measly ant (NOT col)", rarity: 0.00006 },
    { name: "a stinky fart (EWWW)", rarity: 0.00004 },
    { name: "Iron", rarity: 0.00004 },
    { name: "solid bar of dirt (kinda col?)", rarity: 0.000032 },
    { name: "magnetic dirt (epic!)", rarity: 0.000021 },
    { name: "Silver", rarity: 0.00002 },
    { name: "Metal", rarity: 0.0000133333 },
    { name: "Steel", rarity: 0.0000133333 },
    { name: "slightly rarer grass 😱 (tastes like salt)", rarity: 0.0000132 },
    { name: "what do i name this", rarity: 0.000012 },
    { name: "salt (tastes like slightly rarer grass)", rarity: 0.00001 },
    { name: "Pepper (Feels like Slightly rarer grass)", rarity: 0.00001 },
    { name: "Tinted slightly purple void (IT STINGS!!!)", rarity: 0.00001 },
    { name: "the skibidi toiliet or creepear", rarity: 0.0000067 },
    { name: "Avocado", rarity: 0.000005 },
    { name: "Fruity dog 0.01% power", rarity: 0.0000045 },
    { name: "mr. dust", rarity: 0.0000025 },
    { name: "WANTED WEED??? (why is it wanted?)", rarity: 0.000002 },
    { name: "Dirt V2", rarity: 0.000002 },
    { name: "I know what to name this", rarity: 0.0000012 },
    { name: "turtle v1", rarity: 0.000001000001 },
    { name: "Gold", rarity: 0.00000100000000000000001 },
    { name: "rare crystal v0.001", rarity: 0.000001 },
    { name: "Boulder ", rarity: 0.0000004 },
    { name: "kevin (kevin (kevin (kevin)))", rarity: 0.0000001 },
    { name: "Diamond", rarity: 0.0000001 },
    { name: "Green orb?? (I think it's a lore reference)", rarity: 0.0000001 },
    { name: "19$ Fortnite card", rarity: 0.00000005263158 },
    { name: "no more cardboard eating in general", rarity: 0.00000005 },
    { name: "Polychromatic Light", rarity: 0.00000003081689 },
    { name: "Non innocent oceanic creature 1/???", rarity: 0.0000000131925999 },
    { name: "EL GATO V0.001", rarity: 0.0000000100000001 },
    { name: "John (OMG JOHN PULSAR REFERENCE??!??!?!)", rarity: 0.00000001 },
    { name: "FRUITY DOG", rarity: 0.0000000045 },
    { name: "funny germ (he dont bite)", rarity: 0.000000002 },
    { name: "deciduous_germ", rarity: 0.000000001304811684 },
    { name: "STUPID BABY V0.000000001", rarity: 0.000000001000000001 },
    { name: "bacteria (he bites)", rarity: 0.000000001 },
    { name: "roundcat", rarity: 0.000000000747551768 },
    { name: "Ultimate stew (Yummers!)", rarity: 0.0000000005 },
    { name: "CHICKEN 0.00000001% POWER", rarity: 0.0000000001 },
    { name: "CAT", rarity: 0.000000000001000000000001 },
    
];

let itemCounts = {};

// Add a flag to indicate whether a rare item has been found
let rareItemFound = false;

items.forEach((item) => {
    itemCounts[item.name] = 0;
});

function getRandomItem() {
    const randomValue = Math.random();
    const cumulativeProbabilities = [];
    let cumulativeProbability = 0;

    for (const item of items) {
        cumulativeProbability += item.rarity;
        cumulativeProbabilities.push(cumulativeProbability);
    }

    for (let i = 0; i < cumulativeProbabilities.length; i++) {
        if (randomValue <= cumulativeProbabilities[i]) {
            return items[i];
        }
    }

    return items[0]; // Default to the first item if nothing is selected
}

// Add this code to update the game state and save it when collecting items
function collectItem() {
    const item = getRandomItem();
    itemCounts[item.name]++;

    updateItemDisplay();
    saveGameState(); // Save the game state after collecting items

    // Check if a rare item has been found
    if (item.rarity < 0.000005) {
        rareItemFound = true;
        const rarityValueFormatted = formatNumberWithCommas(Math.round(1 / item.rarity));
        
        // Create a message to send to Discord
        const webhookUrl = "https://discord.com/api/webhooks/1156031812636774482/COhSzDROD_iK3qIswEqD1F-G-ssFA5i7KpIt44hoJXZhfyNgsKT_vtY5oCleWAxaP6sU"; // Replace with your actual Discord webhook URL
        const message = `COOL THINGY FOUND 😱😱😱⁉️⁉️🙏🙏😹💯🙅‍♂️💯💯🔥🔥😱👍👍💀🙏🙏🙅‍♂️💯⁉️: ${item.name}: 1/${formatNumberWithCommas(rarityValueFormatted)}`;
    
        // Send the message to Discord
        sendWebhookMessage(webhookUrl, message);
    }
}

function saveGameState() {
    try {
        localStorage.setItem("itemCounts", JSON.stringify(itemCounts));
    } catch (error) {
    }
}

function loadGameState() {
    try {
        const savedItemCounts = localStorage.getItem("itemCounts");

        if (savedItemCounts) {
            itemCounts = JSON.parse(savedItemCounts); // Assign the parsed game state to itemCounts
            updateItemDisplay();
        } else {
        }
    } catch (error) {
    }
}

function updateItemDisplay() {
    itemCounters.innerHTML = "";

    items.forEach((item) => {
        if (itemCounts[item.name] > 0) {
            const itemCounter = document.createElement("p");
            itemCounter.textContent = `${item.name}: ${formatNumberWithCommas(itemCounts[item.name])}`;
            itemCounters.appendChild(itemCounter);
        }
    });
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateRarityIndex() {
    rarityIndex.innerHTML = "<h2>Rarity Index</h2>";

    items.forEach((item) => {
        const rarityEntry = document.createElement("p");
        const rarityValueFormatted = formatNumberWithCommas(Math.round(1 / item.rarity));
        rarityEntry.textContent = `${item.name}: 1/${rarityValueFormatted}`;
        rarityIndex.appendChild(rarityEntry);
    });
}

// Set up a timer to automatically collect items every half-second
setInterval(collectItem, 1);
setInterval(collectItem, 1);
setInterval(collectItem, 1);
setInterval(collectItem, 1);
setInterval(collectItem, 1);

// Initialize the rarity index
updateRarityIndex();

// Load the game state
loadGameState();

document.getElementById("addItemForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const itemName = document.getElementById("itemName").value;
    const itemRarity = document.getElementById("itemRarity").value; // Get rarity as a string

    if (itemName && itemRarity) {
        const newItem = { name: itemName, rarity: itemRarity }; // Rarity as a string
        items.push(newItem);
        sendToDiscordWebhook(newItem);
        document.getElementById("itemName").value = "";
        document.getElementById("itemRarity").value = "";
    } else {
        alert("Please enter a valid name and rarity for the item.");
    }
});