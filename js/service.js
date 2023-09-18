'use strict'
const STORAGE_KEY = 'bookDB'
var gBookNames = [
    "To Kill a Mockingbird",
    "1984",
    "Pride and Prejudice",
    "The Great Gatsby",
    "Moby-Dick",
    "The Catcher in the Rye",
    "The Lord of the Rings",
    "The Hobbit",
    "Harry Potter and the Sorcerer's Stone",
    "Jane Eyre",
    "The Chronicles of Narnia",
    "Wuthering Heights",
    "Brave New World",
    "Gone with the Wind",
    "The Odyssey",
    "The Adventures of Huckleberry Finn",
    "The Grapes of Wrath",
    "The Scarlet Letter",
    "The Hobbit",
    "Crime and Punishment",
    "The Picture of Dorian Gray",
    "The Divine Comedy",
    "Don Quixote",
    "The Alchemist",
    "The Kite Runner",
    "To the Lighthouse",
    "One Hundred Years of Solitude",
    "Anna Karenina",
    "The Sun Also Rises",
    "The Count of Monte Cristo",
    "A Tale of Two Cities",
    "The Shining",
    "The Lord of the Flies",
    "Frankenstein",
    "The Sound and the Fury",
    "The Little Prince",
    "Les Misérables",
    "Catch-22",
    "War and Peace",
    "The Hitchhiker's Guide to the Galaxy",
    "The Handmaid's Tale",
    "A Clockwork Orange",
    "The Canterbury Tales",
    "The Iliad",
    "Beloved",
    "The Hunger Games",
    "Slaughterhouse-Five",
    "Fahrenheit 451",
    "The Old Man and the Sea",
    "The Book Thief"
  ]
  
  

var gBooks = []

_createBooks()
console.log('gBooks', gBooks)

function _createBook(name) {
    return {
        id: makeId(3),
        name,
        price: 5,
        imgUrl: `<img src="1.jpg">`,
        rate: 0
    }
}



function _createName() {
    var index = Math.floor(Math.random() * gBookNames.length)
    var bookName = gBookNames[index]
    gBookNames.splice(index, 1)
    return bookName
}
const PAGE_SIZE = 8
var gPageIdx = 0


function changePage(change) {
    gPageIdx+=change
    if(gPageIdx < 0)
    gPageIdx = parseInt((gBooks.length - 1) / PAGE_SIZE)
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}
function _getBooks(){
    var startIdx = gPageIdx * PAGE_SIZE
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}
function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            var name = _createName()
            books.push(_createBook(name))
        }
    }
    gBooks = books
    putIdToNextAndPrev(gBooks)
    console.log('gBooks', gBooks)
    _saveBooksToStorage()
}
function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
function removeBook(bookId) {
    var indexBook = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(indexBook, 1)
    _saveBooksToStorage()
}
function _addBook(name, price) {
    var book = _createBook(name)
    book.price = price
    gBooks.unshift(book)
    _saveBooksToStorage()
}
function _updateBook(bookId, bookPrice) {
    var indexBook = gBooks.findIndex(book => book.id === bookId)
    gBooks[indexBook].price = bookPrice
    _saveBooksToStorage()
}
function _returnBookById(bookId) {
    var book = gBooks.find(book => book.id === bookId)
    return book
}
function changeRate(bookId, newValue) {

    console.log('gBooks[0].id', gBooks[0].id)
    console.log('bookId', bookId)
    // var book = gBooks.find(book => {
    //     console.log(typeof book.id);
    //     console.log(typeof bookId);
    //     console.log(book.id, book.id === bookId);
    //     return book.id === bookId
    // })
    var book = _returnBookById(bookId)
    console.log(book)
    book.rate = newValue
    _saveBooksToStorage()
}
function filterBooks(name, price, rate) {
    var books = gBooks
    if (name) {
        const bookName = name.toLowerCase()
        books = books.filter(book =>
            book.name.toLowerCase().includes(bookName)
        )
    }
    console.log('books', books)
    if (price) {
        books = books.filter(book => book.price <= price)
    }
    console.log('books', books)

    if (rate) {
        books = books.filter(book => book.rate >= rate)
    }
    console.log('books', books)



    return putIdToNextAndPrev(books)
}
function putIdToNextAndPrev(books) {
    if (!books.length) return books
    books.forEach((book, bookIdx, books) => {
        if (bookIdx === 0 && books.length !== 1) {
            books[bookIdx]['nextId'] = books[bookIdx + 1].id
        }
        else if (bookIdx === books.length - 1 && books.length !== 1) {
            books[bookIdx]['prevId'] = books[bookIdx - 1].id
        }
        else if (books.length !== 1) {
            books[bookIdx]['prevId'] = books[bookIdx - 1].id
            books[bookIdx]['nextId'] = books[bookIdx + 1].id

        }
        console.log('book', book)

    })
    console.log('books', books)
    return books
}






