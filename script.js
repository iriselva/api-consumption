// variables
// api key
const API_KEY = config.API_KEY;
const fetchBooks = document.getElementById('fetchBooks');
const randomBookContainer = document.getElementById('random-book-container');

// fetch calls return promises
// current best seller list
const bookPromise = fetch (
    "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" + API_KEY
);

// variable for getting random list
const getRandomItemFromList = (list => list[Math.floor(Math.random() * list.length)]) 


// when the promise gets resolved 
bookPromise
    .then(function (result) {
        // transforming the result string into data
        return result.json();
    })
    .then(function (data) {
        console.log(data);
        // received best seller data
        const results = data.results;
        renderBooks(results);
    });


// Rendering books into the html
function renderBooks(results) {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = "";

    for (let book of results.books) {
        bookContainer.innerHTML += `
        <div class="book">
            <div class="book-cover">
                <a href="${book.amazon_product_url} title="Find book on Amazon"><img src="${book.book_image}" alt=""></a>
            </div>
            <div class="book-info">
                <span class="rank">${book.rank}</span>
                <h3>${book.title}</h3>
                <h4>By ${book.author}</h4>
            </div>
        </div>
        `;
    }
}

// getting random book from a random list
const getRandomBook = async () => {
    let url = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key= ${API_KEY}`;
    const response = await fetch(url);
    try {
        const json = await response.json();
        const lists = json.results.lists.filter(list => list.books && list.books.length > 0)
        const randomList = getRandomItemFromList(lists);
        const randomBook = getRandomItemFromList(randomList.books);
        return randomBook;
    } catch(error) {
        console.log('Failed to fetch the books!', error.message)
    }
}


// event listening for click on random book button
fetchBooks.addEventListener('click', async () => {
    const randomBook = await getRandomBook();
    // rendering random book in html
    randomBookContainer.innerHTML = `
    <div class="new-book">
        <div class="book-cover">
            <a href="${randomBook.amazon_product_url} title="Find book on Amazon"><img src="${randomBook.book_image}" alt=""></a>
        </div>
        <div class="book-info">
            <h3>${randomBook.title}</h3>
            <h4>By ${randomBook.author}</h4>
            <p>${randomBook.description}</p>
        </div>
    </div>
    `;
});

// nwaObQEiEsipUkDIbF9BA7b6bjxNdUlQ
