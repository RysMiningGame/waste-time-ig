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
    { name: "stone frfr", rarity: 0.3 },
    { name: "grafell", rarity: 0.1 },
    { name: "a slice of orange", rarity: 0.6 },
    { name: "foot(pappy)", rarity: 0.01 },
    { name: "play rys mining game on roblox", rarity: 0.001 },
    { name: "STINKY FEET (pappy's brother)", rarity: 0.00010001 },
    { name: "wytttgrss promotion", rarity: 0.0001 },
    { name: "rumdiddlydumdum", rarity: 0.0000074 },
    { name: "Blazing Bolts", rarity: 0.000002 },
    { name: "gnarp gnarp", rarity: 0.0000015 },
    { name: "Ambatakum 0.001%", rarity: 0.00000144927 },
    { name: "how did yo get this", rarity: 0.000001 },
    { name: "roundcat pulsar", rarity: 0.000001 },
    { name: "Cat (original name COPS HERE I GOT ARRESTED SOMEONE PLEASE DONT DEPORT ME)", rarity: 2e-7 },
    { name: "coffee", rarity: 0.00000015 },
    { name: "ash", rarity: 0.0000001 },
    { name: "Protogen mask(lore)", rarity: 0.0000001 },
    { name: "Skibidi dibidi toilat", rarity: 0.0000001 },
    { name: "pan's minarion", rarity: 0.000000087 },
    { name: "Jade(John's Sister(OMG JOHN PULSAR REFRENCE))", rarity: 0.00000001 },
    { name: "The almighty god pappy", rarity: 0.000000001 },
    { name: "The almighty god ry", rarity: 0.000000001 },


    
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
    if (item.rarity < 0.1) {
        rareItemFound = true;
        const rarityValueFormatted = formatNumberWithCommas(Math.round(1 / item.rarity));
        
        // Create a message to send to Discord
        const webhookUrl = "https://discord.com/api/webhooks/1156049577015791636/iL7LFF61fT6ws8_6oGpF84EjXi5LhegfjTBGJMnx4ywsveEmAp39lM61yi-vmWQrDrz-"; // Replace with your actual Discord webhook URL
        const message = `something spawned!!!!: ${item.name}: 1/${formatNumberWithCommas(rarityValueFormatted)}`;
    
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
