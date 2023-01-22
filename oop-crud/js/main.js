import { CrudDesign } from "./crudDesign.js";
import { LocalStorage } from "./localStorage.js";
import { ViewResult } from "./viewResultDesign.js";
class Main {
    crud = new CrudDesign()
    storage = new LocalStorage()
    viewResult = new ViewResult()
    product = {}
    constructor() {
        // view result 
        // add data 
        this.crud.addBtn.addEventListener("click", () => {
            if (this.crud.validationObj.isAllValid()) {
                this.getFieldsValue()
                this.storage.add(this.product)
                this.crud.clearField()
            }
            this.viewResult.refreshStorage(this.viewResult.storageData)
        })
    }

    getFieldsValue = () => {
        this.product = {}
        this.crud.inputs.forEach(input => {
            this.product[input.name] = input.value
        })
    }

}
new Main()