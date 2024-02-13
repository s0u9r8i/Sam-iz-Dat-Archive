const dataTitleTemplate = document.querySelector("[data-title-template]");
const dataTitleContainer = document.querySelector("[data-title-container]");
const searchInput = document.querySelector("[data-search]");

let titles = [];

// Assume titles are already loaded and rendered in the DOM
// and each has an 'element' reference as part of its object in the 'titles' array

// Simplified and direct search visibility toggle
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    // Directly toggle visibility without re-rendering elements
    titles.forEach(title => {
        // Check if the title matches the search term in any field
        const match = Object.values(title).some(val => 
            typeof val === 'string' && val.toLowerCase().includes(value)
        );

        // Assuming 'element' is a direct reference to the DOM element of the title
        // Toggle 'hide' class based on the match
        if (title.element) { // Ensure the element exists
            title.element.classList.toggle('hide', !match);
        }
    });
});


// Fetch data and populate titles
fetch("../Sam-iz-Dat-Archive/data.json")
  .then(res => res.json())
  .then(data => {
    titles = data.map(title => {
        const list = dataTitleTemplate.content.cloneNode(true).children[0];
        // Populate the template with data
        ['titleCN', 'titleEN', 'artist', 'introCN', 'introEN', 'infoCN', 'infoEN'].forEach(key => {
            const element = list.querySelector(`[data-${key}]`);
            if (element) {
                element.textContent = title[key];
            }
        });
        dataTitleContainer.append(list);
        return {...title, element: list};
    });
  })
  .catch(error => console.error('Error:', error));


// Get the button:
let toTopbutton = document.getElementById("toTop");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

