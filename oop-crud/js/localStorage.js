export class LocalStorage {
    productsApi = {
        result: [],
        lastId: 0
    }
    id

    constructor() {
        if (!this.getData())
            localStorage.setItem('productsApi', JSON.stringify(this.productsApi))
    }

    get setProductsApi() {
        return this.productsApi = (JSON.parse(localStorage.getItem("productsApi")))
    }

    getData() {
        if (localStorage.getItem("productsApi") != null)
            return this.productsApi = (JSON.parse(localStorage.getItem("productsApi")))
        return false
    }

    add(newProduct = {}) {
        newProduct.id = this.productsApi.lastId
        this.productsApi.result.push(newProduct)
        this.productsApi.lastId += 1
        localStorage.setItem("productsApi", JSON.stringify(this.productsApi))
        this.setProductsApi
    }

    Update(newProduct, id) {
        let index = this.productsApi.result.findIndex(product =>  product.id == id )
        newProduct.id = id
        this.productsApi.result[index] = newProduct
        localStorage.setItem("productsApi", JSON.stringify(this.productsApi))
        this.setProductsApi
    }

    delete(id) {
        let index = this.productsApi.result.findIndex(product =>  product.id == id )
        this.productsApi.result.splice(index, 1)
        localStorage.setItem("productsApi", JSON.stringify(this.productsApi))
        this.setProductsApi
    }

}
