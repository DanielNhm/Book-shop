'use strict'

var nums = createNums()
function createNums(){
    var nums = []
    for(var i = 0;i<500;i++){
        nums.push(i + 1)
    }
    shuffle(nums)
    return nums
}
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function shuffle(nums) {
    for (let i = nums.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
}

function drawNumId() {
    var books = _getBooks()
    var numId = nums.pop()
    while(books.some(book=>book.id === numId)){
        if(nums.length === 0)
        return
        numId = nums.pop
    }
    return numId
}

function makeId(length){
    var txt = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < length; i++)
    {
     txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}