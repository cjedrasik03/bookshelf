const books = [];

document.querySelector('.search').addEventListener('click', function () {
  
  const search = document.querySelector('#search-query').value;

  fetchBooks(search);

  document.querySelector('#search-query').value = '';
 
});

const fetchBooks = (query) => {
  const url = 'https://www.googleapis.com/books/v1/volumes?q=' + query;
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(data => data.json())
    .then(data => addBooks(data));
}

const addBooks = (data) => {
  for (let i = 0; i < data.items.length; i++) {
    const book = data.items[i];

    // In the solution it shows these declared variables unecessary, couldve just used data.volumeInfo.title, and so on.
    const bookTitle = book.volumeInfo.title;
    const bookAuthor = book.volumeInfo.authors[0];
    const bookPageCount = book.volumeInfo.pageCount;
    const bookISBN = book.volumeInfo.industryIdentifiers?
    book.volumeInfo.industryIdentifiers[0].identifier : null;
    const imageURL = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null;
  
    let bookEntry = {
      title: bookTitle,
      author: bookAuthor,
      pageCount: bookPageCount,
      ISBN: bookISBN,
      imgURL: imageURL
    }
    console.log(bookEntry);
    books.push(bookEntry);   
  } 
  renderBooks();
};


const renderBooks = () => {
  document.querySelector('.books').replaceChildren();

  for (let i = 0; i < books.length; i++) {
    // create HTML and append to .books
    let book = books[i];

    // template is saved proper html that is used as an argument later
    let template = `
    <div class="book col-md-6">
      <h4>${book.title}</h4>
      <div>Author: <strong>${book.author}</strong></div>
      <div>Pages: <strong>${book.pageCount}</strong></div>
      <div>ISBN: <strong>${book.ISBN}</strong></div>
      <img src="${book.imgURL}" alt="">
    </div>`;

    // beforeend pit its <div class="books">${here before the closing tag}</div>
    document.querySelector('.books').insertAdjacentHTML('beforeend', template);
  }

    
};
