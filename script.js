document.addEventListener('DOMContentLoaded', function () {
    // Fetch the data from the API
    fetch('https://mocki.io/v1/7826bf57-d918-40ff-a75f-42585f274020')
        .then(response => response.json())
        .then(data => {
            // Once the data is fetched, you can work with it here
            console.log("food list request done");
            // Display food list
            displayFoodList(data.food_items);
            // Add event listener to the search box
            const searchBox = document.getElementById('searchBox');
            searchBox.addEventListener('input', function () {
                filterFoodList(data.food_items, searchBox.value.trim().toLowerCase());
            });
        })
        .catch(error => {
            // Handle errors here
            console.error('Error fetching data:', error);
        });
    function displayFoodList(foodItems) {
        const foodListContainer = document.getElementById('foodList');
        // Clear existing content
        foodListContainer.innerHTML = '';
        // Build HTML for food items and append to the list
        foodItems.forEach(foodItem => {
            const foodItemHTML = `
                <div>
                    <ol class="foodItem border" onclick="openModal('${foodItem.name}', ${foodItem.price})">
                        <span class='foodName'>${foodItem.name}</span>
                        <span class='foodPrice ml-auto'>₹${foodItem.price.toFixed(2)}</span>
                    </ol>
                </div>
            `;
            foodListContainer.innerHTML += foodItemHTML;
        });
    }
    function filterFoodList(foodItems, searchTerm) {
        const filteredFoodItems = foodItems.filter(foodItem =>
            foodItem.name.toLowerCase().includes(searchTerm)
        );
        displayFoodList(filteredFoodItems);
    }
});