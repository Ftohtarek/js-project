import { Validation } from "./validation.js";
export class CrudDesign {
    inputs = document.querySelectorAll(".form-container input")
    addBtn = document.getElementById("addBtn");
    clearBtn = document.getElementById('clear')
    validationObj = new Validation(this.inputs)
    constructor() {
        /* init events */
        this.intialFocusBlurEvent()
        this.initValidation()
        this.addBtn.addEventListener('click', () => {
            if (!this.validationObj.isAllValid()) {
                this.showInvalidField()
            }
        })

        this.clearBtn.addEventListener('click', this.clearField)
    }

    intialFocusBlurEvent() {
        this.inputs.forEach(input => {
            input.addEventListener('focus', () => { this.focus(input) })
            input.addEventListener('blur', () => { this.blur(input) })
        })
    }

    focus(input) {
        input.classList.add("input-focus")
        input.nextElementSibling.classList.add("label-focus")
    }

    blur(input) {
        if (!input.value) {
            input.classList.remove("input-focus")
            input.nextElementSibling.classList.remove("label-focus")
        }
    }

    initValidation = () => {
        this.validationObj.realTimeValidation((input, isValid) => {
            this.setValidationStyle(input, isValid)
        })
    }

    showInvalidField() {
        this.validationObj.InvalidField((input, isValid) => {
            this.setValidationStyle(input, isValid)
        })
    }

    setValidationStyle(input, isValid) {
        let alertElement = input.parentElement.nextElementSibling
        let labelElement = input.nextElementSibling
        if (isValid) {
            this.validStyle(alertElement, labelElement)
        } else {
            this.InvalidStyle(alertElement, labelElement)
        }
    }

    validStyle = (errorDiv, label) => {
        label.classList.remove("label-invalid")
        errorDiv.classList.remove("d-block")

    }

    InvalidStyle = (errorDiv, label) => {
        label.classList.add("label-invalid")
        errorDiv.classList.add("d-block")

        // document.querySelector(".check-false").classList.add("d-block")
        // document.querySelector(".check-true").classList.remove("d-block")
    }

    clearField = () => {
        this.inputs.forEach(input => {
            input.value = ''
            this.blur(input)
            this.validStyle(input.parentElement.nextElementSibling, input.nextElementSibling)
        })

    }

}

