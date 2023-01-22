import { LocalStorage } from "./localStorage.js";
import { Pagination } from "./pagination.js";
import { Validation } from "./validation.js";

export class ViewResult {
    products = []
    storage = new LocalStorage()
    pagination = new Pagination()
    validation = new Validation()
    searchInput = document.getElementById('search')
    constructor() {

        this.pagination.subscripe(products => {
            this.products = products
            this.display()
        })

        this.refreshStorage(this.storageData)
        this.searchInput.addEventListener('keyup', this.search)
    }

    refreshStorage = (storageData) => {
        this.pagination.fire(storageData)
        this.display()
    }
    get storageData() { return this.storage.getData().result }
    // name,category,price,description,id 
    display = (updataProductId) => {
        let fragment = document.createDocumentFragment();
        let tableBody = document.getElementById("tableBody")
        let rowColor = ''
        let row;
        // clear node content
        tableBody.innerHTML = ''
        this.products.forEach((product, index) => {
            //to color the bg for each cell
            index % 2 != 0 ? rowColor = "bg-lightgary" : rowColor = "bg-white";
            /* bulid row node with it's content*/
            row = this.createRow(rowColor, product)
            /* add event to button */
            this.addRowEvent(row, product, index)
            /* append row to fragment shadow dom*/
            fragment.appendChild(row)
            //for display data in update row after the selected element
            updataProductId == index ? fragment.appendChild(this.openUpdataForm(product)) : null;
            tableBody.appendChild(fragment);
        })
    }

    createRow = (rowColor, product) => {
        let row = document.createElement('div')
        row.classList.add('row')
        row.innerHTML = `    
            <div class="col-1 ${rowColor}">${product.id}</div>
            <div class="col-2 ${rowColor}">${product.name}</div>
            <div class="col-2 ${rowColor}">${product.category} </div>
            <div class="col-2 price-width ${rowColor}">${product.price}</div>
            <div class="col-4  ${rowColor}"><p>${product.description}</p></div>
            <div class="col-1  ${rowColor} d-flex flex-column  flex-md-row justify-content-md-around ">
                <button class='updatebtn' > <i class="far fa-edit d"></i> </button >
                <button class='delbtn' ><i class="fas fa-times"></i> </button>
                `
        return row
    }

    addRowEvent = (row, product, index) => {
        row.querySelector('.updatebtn').addEventListener('click', () => { this.display(index) })
        row.querySelector('.delbtn').addEventListener('click', () => { this.deleteProduct(product.id) })
    }

    openUpdataForm = (product) => {
        let row = document.createElement('div')
        row.classList.add('row')
        row.innerHTML =
            `
                    <div class="col-md-1" id="sameid">${product.id}</div>
                    <div class="col-md-2 d-flex">
                    <label for="newname" class="updatelabel d-md-none">Name</label>
                    <input type="text" name="name" class="w-100 updatefield" value="${product.name}">
                    </div>
                    <div class="col-md-2 d-flex">
                    <label class="updatelabel d-md-none">Category</label>
                    <input type="text" name="category" class="w-100 updatefield" value="${product.category}">
                    </div>
                    <div class="col-md-2 d-flex">
                    <label class="updatelabel d-md-none">Price</label>
                    <input type="text" name="price" class="w-100 updatefield" value="${product.price}">
                    </div>
                    <div class="col-md-3 d-flex">
                    <label class="updatelabel d-md-none">Description</label>
                    <input type="text" name="description" class="w-100 updatefield" value="${product.description}">
                    </div>
                    <div class="col-md-2 d-flex px-0">
                    <button id="save" type="button" class="savebtn" >Save</button>
                    <button id="cansal" type="button" class="cansalbtn" >Cansal</button>  
                    </div>
                 `
        this.addUpdataFormEvent(row, product)
        return row;
    }

    addUpdataFormEvent = (row, product) => {
        row.querySelector('.savebtn').addEventListener('click', () => { this.updateProduct(row, product.id) })
        row.querySelector('.cansalbtn').addEventListener('click', () => { this.display() })
    }

    deleteProduct = (id) => {
        this.storage.delete(id)
        this.search()
    }

    updateProduct(row, id) {
        this.validation.inputs = row.querySelectorAll('input')
        this.validationStyle()

        if (this.validation.isAllValid()) {
            this.storage.Update(this.getUpdateProductValue, id)
            this.search()
        }

    }

    validationStyle() {
        this.validation.InvalidField((input, isValid) => {
            if (isValid)
                input.classList.remove('form-alert')
            else
                input.classList.add('form-alert')
        })
    }

    get getUpdateProductValue() {
        let updateProduct = {}
        this.validation.inputs.forEach(input => {
            updateProduct[input.name] = input.value
        })
        return updateProduct
    }

    search = () => {
        let searchProducts = [];
        this.storageData.forEach(product => {
            if (product.name.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                searchProducts.push(product)
            }
        })
        this.pagination.target = 0
        this.refreshStorage(searchProducts)
    }
}

