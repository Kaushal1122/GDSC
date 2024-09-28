function addItem() {
    const category = document.getElementById('category').value;
    const color = document.getElementById('color').value;
    const material = document.getElementById('material').value;
    const season = document.getElementById('season').value;
    const imageInput = document.getElementById('image');

    if (category && color && material && season && imageInput.files.length > 0) {
        const imageUrl = URL.createObjectURL(imageInput.files[0]);
        const item = {
            category,
            color,
            material,
            season,
            imageUrl
        };

        addItemToUI(item);
    } else {
        alert('Please fill out all fields and upload an image.');
    }
}

function addItemToUI(item) {
    const itemsContainer = document.getElementById('items-container');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('wardrobe-item');

    itemDiv.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.category}" width="100%">
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Color:</strong> ${item.color}</p>
        <p><strong>Material:</strong> ${item.material}</p>
        <p><strong>Season:</strong> ${item.season}</p>
    `;

    itemsContainer.appendChild(itemDiv);
}

function getOutfitSuggestions() {
    // Placeholder logic for generating outfit suggestions
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';

    const suggestion = document.createElement('div');
    suggestion.classList.add('outfit-suggestion');
    suggestion.innerHTML = `
        <p>Try wearing your blue jeans with the white cotton shirt!</p>
    `;

    suggestionsContainer.appendChild(suggestion);
}
function setSeasonalBackground() {
    const body = document.body;
    const currentMonth = new Date().getMonth(); // 0 = January, 11 = December

    let backgroundUrl;

    if (currentMonth >= 2 && currentMonth < 5) { // March to May (Spring)
        backgroundUrl = 'https://example.com/spring-background.jpg';
    } else if (currentMonth >= 5 && currentMonth < 8) { // June to August (Summer)
        backgroundUrl = 'https://example.com/summer-background.jpg';
    } else if (currentMonth >= 8 && currentMonth < 11) { // September to November (Fall)
        backgroundUrl = 'https://example.com/fall-background.jpg';
    } else { // December to February (Winter)
        backgroundUrl = 'https://example.com/winter-background.jpg';
    }

    body.style.backgroundImage = url('${backgroundUrl}');
    body.style.backgroundSize = 'cover'; // Ensure the image covers the entire background
    body.style.backgroundPosition = 'center'; // Center the image
    body.style.backgroundRepeat = 'no-repeat'; // Prevent repeating
}

// Call the function to set the background on page load
setSeasonalBackground();