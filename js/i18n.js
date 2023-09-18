'use strict'

const gTrans = {
  title: {
    en: 'my BookShop',
    he: 'חנות הספרים שלי',
  },
  'add-button': {
    en: 'Add new book',
    he: 'הוסף ספר חדש',
  },
  'bookname-placeholder': {
    en: 'Book name',
    he: 'שם ספר',
  },
  'maxprice-placeholder': {
    en: 'Maximum price',
    he: 'מחיר מקסימלי',
  },
  'minrate-placeholder': {
    en: 'Minimum rate',
    he: 'דירוג מינימלי',
  },
  'pricemodal': {
    en: 'Price: ',
    he: 'מחיר: ',
  },
  'ratemodal': {
    en: 'Rate: ',
    he: 'דירוג: ',
  },
  col1: {
    en: 'Id',
    he: 'מ"ז',
  },
  col2: {
    en: 'Title',
    he: ' שם ספר',
  },
  col3: {
    en: 'Price',
    he: 'מחיר',
  },
  col4: {
    en: 'Actions',
    he: 'פעולות',
    },
  'prompt-book': {
    en: 'Book name?',
    he: 'שם ספר?',
  },
  'prompt-price': {
    en: 'Price?',
    he: 'מחיר?',
  },
  'prompt-updatPrice': {
    en: 'Update price',
    he: 'עדכן מחיר',
  },
  'button-read': {
    en: 'Read',
    he: 'קריאה',
  },
  'button-update': {
    en: 'Update',
    he: 'עידכון',
  },
  'remove-button': {
    en: 'Delete',
    he: 'מחיקה',
  },
  'prevPage': {
    en: 'Prev page',
    he: 'עמוד קודם',
  },
  'nextPage': {
    en: 'Next page',
    he: 'עמוד הבא',
  }
  

}


var gCurrLang = 'en'

function getTrans(transKey) {
  var transMap = gTrans[transKey]
  if (!transMap) return 'UNKNOWN'
  var transTxt = transMap[gCurrLang]
  if (!transTxt) transTxt = transMap.en
  return transTxt
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
      const transKey = el.dataset.trans
      const transTxt = getTrans(transKey)
      if (el.placeholder) el.placeholder = transTxt
      else el.innerText = transTxt
    })
  }
  
  function setLang(lang) {
    gCurrLang = lang
  }
