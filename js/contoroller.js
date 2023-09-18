'use strict'
const SIZE_COLUMN = 4
var elModal = document.querySelector('.modal')
var gHammerContainer = new Hammer(elModal)




function onInit(){
    renderBooks()
    renderModalByQueryParams()
}

function renderModalByQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)
    const bookId = queryParams.get('id') || ''

    if (!bookId) return
    onRead(bookId)
}

function renderColumn() {
    var strHTML = `<tr>
    <th data-trans="col1">Id</th>
    <th data-trans="col2">Title</th>
    <th data-trans=col3>Price</th>
    <th data-trans="col4">Actions</th>
</tr>`
    var elColumn = document.querySelector('thead')
    elColumn.innerHTML = strHTML
}


function renderBooks(books = _getBooks()) {
    renderColumn()
    var elTbody = document.querySelector('tbody')
    var strHTML = books.map(book => `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td><button data-trans="button-read" class="read" onclick="onRead('${book.id}')">Read</button><button data-trans="button-update" 
         class="update" onclick="onUpdateBook('${book.id}')">Update</button><button data-trans="remove-button" class="remove"onclick="onRemoveBook('${book.id}')">Delete</button></td>
    </tr>`).join('')
    elTbody.innerHTML = strHTML
}


function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
    doTrans()
}
function onUpdateBook(bookId) {
    var bookPrice = +prompt(getTrans('prompt-updatPrice'))
    _updateBook(bookId, bookPrice)
    renderBooks()
    doTrans()
}

function onAddBook() {
    var name = prompt((getTrans('prompt-book')))
    var price = +prompt(getTrans('prompt-price'))
    _addBook(name, price)
    renderBooks()
    doTrans()
}
function onRead(bookId) {
    var elModal = document.querySelector('.modal').classList.remove("hidden")
    var book = _returnBookById(bookId)
    document.querySelector('h3 .title').innerHTML = ' ' + book.name
    document.querySelector('.price').innerHTML = ' ' + book.price
    document.querySelector('.rate').innerHTML = ' ' + book.rate
    document.querySelector('h3 .id').innerHTML = ' ' + book.id
    console.log('book.nextId', book.nextId)
    console.log('book.prevId', book.prevId)
    var url = new URL(window.location.href)
    url.searchParams.set('id', book.id)

    history.pushState({}, '', url)

    // gHammerContainer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL })
    gHammerContainer.on('swipeleft swiperight', ev => {
        if (ev.type === 'swipeleft' && book.prevId) {
            console.log('hi')
            onRead(book.prevId)
        }
        if (ev.type === 'swiperight' && book.nextId) {
            console.log('bye')
            onRead(book.nextId)
        }
    })

}
function onCloseModal() {
    var elModal = document.querySelector('.modal').classList.add("hidden")

}
function onChangeRate(elInput, change) {
    var inputField = document.querySelector(elInput)
    var currentValue = parseInt(inputField.value)
    var newValue = currentValue + change
    if (newValue < 0) {
        newValue = 0
    } else if (newValue > 10) {
        newValue = 10
    }
    var bookId = document.querySelector('h3 .id').innerText.trim()
    inputField.value = newValue
    changeRate(bookId, newValue)
    onRead(bookId)
}
function onEdit(event) {
    var elbookname = document.querySelector('input[name="bookname"]')
    var elprice = document.querySelector('input[name="price"]')
    var elrate = document.querySelector('input[name="rate"]')
    console.log('elbookname', document.querySelector('input[name="book"]'))
    var bookName = elbookname ? elbookname.value : null
    var price = elprice ? +elprice.value : null
    var rate = elrate ? +elrate.value : null
    var books = filterBooks(bookName, price, rate)
    console.log('books', books)
    renderBooks(books)
    var url = new URL(window.location.href)
    url.searchParams.set('maxPrice', price)
    url.searchParams.set('rate', rate)
    url.searchParams.set('bookName', bookName)
    history.pushState({}, '', url)
    doTrans()
}


function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderBooks()
    doTrans()
}
function onChangePage(change){
    changePage(change)
    renderBooks()
    doTrans()
}


//onInit -  render => getBooksForDisplay
 
// CRUD
// onAddBook => addBook => cretaBook
// onSelect => getBookById
// onupdate => update 
// onRemove => remove 

// onfilter => setFilter
// onSort => setSort

// renderBooks
// saveToStorage






