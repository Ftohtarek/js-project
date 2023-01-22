import { LocalStorage } from "./localStorage.js";

export class Pagination {
    storage = new LocalStorage()
    pagination = document.querySelector(".pagination")
    target = 0
    prevActivate
    products = []
    constructor() { }
    fire = (data) => {
        this.products = data
        this.bulidPaginationHtml()
        this.emit(this.renderData)
    }
    /* observable pattern */
    observes = []
    subscripe(fn) {
        this.observes.push(fn)
    }
    emit(event) {
        this.observes.forEach(observe => {
            observe.call(this, event)
        })
    }
    /*end observable  */
    bulidPaginationHtml() {
        let fragment = document.createDocumentFragment();
        let pageNo = this.products.length / 5;
        this.pagination.innerHTML = ''
        for (var i = 0; i < pageNo; i++) {
            fragment.appendChild(this.createPaginationList(i))
        }
        this.pagination.appendChild(fragment)
    }

    createPaginationList = (pageNumber) => {
        let list = document.createElement('li')
        let listBtn = document.createElement('button')
        listBtn.classList.add('pagination-btn')
        listBtn.innerHTML = pageNumber + 1
        list.appendChild(listBtn)
        listBtn.addEventListener('click', (e) => {
            this.target = pageNumber
            this.Active(list)
            this.emit(this.renderData)
        })
        return list
    }

    get renderData() {
        this.target * 5 == this.products.length ? this.target -= 1 : null
        return this.products.slice(this.target * 5, (this.target + 1) * 5)
    }

    Active = (currentAcive) => {
        currentAcive.classList.add('page-item-active')
        this.prevActivate ? this.prevActivate.classList.remove('page-item-active') : null
        this.prevActivate = currentAcive
    }

} 