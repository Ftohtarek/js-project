// require variable
const addButton = document.getElementById("addButton")
const webName = document.getElementById("name")
const url = document.getElementById("url")

/* localStorage Operatore */
const localStorageOp =
{
    get: () => { return JSON.parse(localStorage.getItem('website')) },
    set: (websiteInfo) => { localStorage.setItem('website', JSON.stringify(websiteInfo)) },
    upgrade: () => { localStorageOp.set(crud.list) }
}
// Crud Operator
const crud = {
    list: [],
    retive: () => {
        const localList = localStorageOp.get()
        if (localList != null) crud.list = localList
    },
    add: (data = { name: '', url: '' }) => { crud.list.push(data) },
    delete: (ele) => {
        let index = crud.list.findIndex(ele)
        console.log(index);
        crud.list.splice(index, 1)
    }

};
// run
(function () {
    if (localStorageOp.get()) {
        crud.list = localStorageOp.get()
        render()
    }
})();

addButton.addEventListener('click', () => {
    if (checkValiditation()) {
        crud.add({ name: webName.value, url: url.value })
        localStorageOp.upgrade()
        resetForm()
        render()
    }
})

function checkValiditation() {
    let crossState = false;
    let fields = [webName, url]
    fields.forEach(ele => {
        if (ele.checkValidity()) {
            ele.nextElementSibling.classList.add('d-none')
            crossState = true
        } else {
            ele.nextElementSibling.classList.remove('d-none')
            crossState = false
            console.log('hello');
        }
    })
    return crossState
}
function resetForm() {
    url.value = "";
    webName.value = "";
}
function deleteWeb(index) {
    crud.list.splice(index, 1)
    localStorageOp.upgrade()
    render()
}

function render() {
    var cartona = "";

    crud.list.forEach((ele,index) => {
        cartona += `
        <div class="row align-items-center justify-content-around bg-white my-1">
            <div class="col-3">
                ${ele.name}
            </div>
            <div class="col-3 ">
                <a href="${ele.url}" target="_blank">Visit</a>
            </div>
            <div class="col-3 ">
                <button class="btn btn-danger" onclick="deleteWeb(${index})">Delete</button>
            </div>
        </div>
       `
    })
    document.getElementById("result").innerHTML = cartona;
}
