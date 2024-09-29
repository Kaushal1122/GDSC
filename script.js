let items = [];
let overconsumptionItems = [];
let categoryCount = {
    shirt: 0,
    jeans: 0,
    jacket: 0,
    accessories: 0
};
let timesWornData = {
    shirt: 0,
    jeans: 0,
    jacket: 0,
    accessories: 0
};

let wardrobeUsageChart, timesWornChart;

function addItem() {
    const category = document.getElementById('category').value;
    const brand = document.getElementById('brand').value;
    const color = document.getElementById('color').value;
    const material = document.getElementById('material').value;
    const season = document.getElementById('season').value;
    const daysWorn = parseInt(document.getElementById('days-worn').value);
    const imageInput = document.getElementById('image');
    const sustainability = document.getElementById('sustainability').checked;

    if (imageInput.files.length === 0) {
        alert('Please upload an image.');
        return;
    }

    if (isNaN(daysWorn) || daysWorn < 0) {
        alert('Please enter the number of days worn.');
        return;
    }

    const imageUrl = URL.createObjectURL(imageInput.files[0]);

    const item = {
        category,
        brand,
        color,
        material,
        season,
        daysWorn,
        sustainability,
        imageUrl
    };

    items.push(item);
    addItemToUI(item);
    checkOverconsumption(item);
    updateUsageStatistics();
    updateCharts(); // Update charts with new data
    document.getElementById('item-form').reset();
}

function addItemToUI(item) {
    const itemsContainer = document.getElementById('items-container');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('wardrobe-item');

    itemDiv.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.category}" width="100">
        <p>Category: ${item.category}</p>
        <p>Brand: ${item.brand}</p>
        <p>Color: ${item.color}</p>
        <p>Material: ${item.material}</p>
        <p>Season: ${item.season}</p>
        <p>Days Worn: ${item.daysWorn}</p>
        <p>Sustainable: ${item.sustainability ? 'Yes' : 'No'}</p>
        <button onclick="removeItem(this)">Remove</button>
        <button onclick="lendItem(this)">Lend</button>
        <button onclick="donateItem(this)">Donate</button>
        <button onclick="tradeItem(this)">Trade</button>
    `;
    itemsContainer.appendChild(itemDiv);
}

function checkOverconsumption(item) {
    if (item.daysWorn > 10) {
        overconsumptionItems.push(item);
        const overconsumptionStats = document.getElementById('overconsumption-stats');
        overconsumptionStats.innerHTML += `<p>${item.brand} ${item.category} has been worn ${item.daysWorn} times.</p>`;
    }
}

function updateUsageStatistics() {
    // Reset category and times worn data
    categoryCount = { shirt: 0, jeans: 0, jacket: 0, accessories: 0 };
    timesWornData = { shirt: 0, jeans: 0, jacket: 0, accessories: 0 };

    // Iterate over all items to calculate category count and times worn
    items.forEach(item => {
        categoryCount[item.category]++;
        timesWornData[item.category] += item.daysWorn;
    });

    // Populate usage table
    const usageTableBody = document.getElementById('usage-table-body');
    usageTableBody.innerHTML = '';
    for (const category in timesWornData) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${category.charAt(0).toUpperCase() + category.slice(1)}</td>
                         <td>${timesWornData[category]}</td>`;
        usageTableBody.appendChild(row);
    }
}

function updateCharts() {
    // Update the pie chart (wardrobe category distribution)
    wardrobeUsageChart.data.datasets[0].data = [
        categoryCount.shirt,
        categoryCount.jeans,
        categoryCount.jacket,
        categoryCount.accessories
    ];
    wardrobeUsageChart.update();

    // Update the bar chart (times worn per category)
    timesWornChart.data.datasets[0].data = [
        timesWornData.shirt,
        timesWornData.jeans,
        timesWornData.jacket,
        timesWornData.accessories
    ];
    timesWornChart.update();
}

function initializeCharts() {
    const wardrobeUsageCtx = document.getElementById('wardrobeUsageChart').getContext('2d');
    wardrobeUsageChart = new Chart(wardrobeUsageCtx, {
        type: 'pie',
        data: {
            labels: ['Shirt', 'Jeans', 'Jacket', 'Accessories'],
            datasets: [{
                label: 'Wardrobe Category Distribution',
                data: [
                    categoryCount.shirt,
                    categoryCount.jeans,
                    categoryCount.jacket,
                    categoryCount.accessories
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });

    const timesWornCtx = document.getElementById('timesWornChart').getContext('2d');
    timesWornChart = new Chart(timesWornCtx, {
        type: 'bar',
        data: {
            labels: ['Shirt', 'Jeans', 'Jacket', 'Accessories'],
            datasets: [{
                label: 'Times Worn',
                data: [
                    timesWornData.shirt,
                    timesWornData.jeans,
                    timesWornData.jacket,
                    timesWornData.accessories
                ],
                backgroundColor: '#36A2EB',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Call this function when the page is loaded to initialize the charts
window.onload = function () {
    initializeCharts();
};

function getOutfitSuggestions() {
    // Implement your logic for generating outfit suggestions here.
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    // Example logic for generating random suggestions
    const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 3);
    randomItems.forEach(item => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.innerHTML = `
            <h4>Suggested Outfit:</h4>
            <img src="${item.imageUrl}" alt="${item.category}" width="100%">
            <p><strong>Category:</strong> ${item.category}</p>
        `;
        suggestionsContainer.appendChild(suggestionDiv);
    });
}
