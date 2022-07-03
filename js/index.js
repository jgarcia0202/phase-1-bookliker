const booksURL = 'http://localhost:3000/books'
const bookList = document.querySelector('#list')
const bookInfo = document.querySelector('#show-panel')

//console.log(bookList)

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
});

function fetchBooks() {
    fetch(booksURL)
    .then(response => response.json())
    .then(books => books.forEach(book => postBooks(book)))
}
function postBooks(book) {
    //console.log(book)
    let card = document.createElement('li')
    card.innerHTML = ` ${book.title} `
    bookList.appendChild(card)
    card.addEventListener('click', e => {
        const likeButton = document.createElement('button')
        likeButton.textContent = 'LIKE'
        bookInfo.innerHTML = `
        <img src = ${book.img_url}>

        <h1> ${book.title} </h1>
        
        <h2> ${book.subtitle} </h2>

        <p> ${book.description} </p>

        
        `
        book.users.forEach(user => {
            let card = document.createElement('li')
            card.innerHTML = `${user.username}`
            console.log(user)
            bookInfo.appendChild(card)
        })
        bookInfo.appendChild(likeButton)
        likeButton.addEventListener('click', e => {
            fetch(booksURL+`/${book.id}/users`,{
                method: 'PATCH',
                headers: {
                    'Content-type': ' application/JSON'
                },
                body: JSON.stringify({
                    id: '1',
                    username: 'pouros'
                })
                //.then(response => response.json())
                //.then(books => console.log(books))
            })
        })

        //console.log(`${book.users}`)
    })
}