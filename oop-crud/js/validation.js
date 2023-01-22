export class Validation {
    validation = {
        name: /^[a-zA-Z _]{3,20}$/,
        category: /^[a-zA-Z _]{3,20}$/,
        price: /^[1-9][0-9]{0,5}$/,
        description: /^([a-zA-Z -(),.]{1,50})?$/
    }
    inputs

    constructor(inputs) {
        this.inputs = inputs
    }

    realTimeValidation(callBackFunction = (input = new HTMLInputElement(), isValid = Boolean) => { }) {
        this.inputs.forEach(input => {
            input.addEventListener('keyup', (e) => {
                if (this.validation[input.name].test(input.value)) {
                    callBackFunction(input, true)
                } else {
                    callBackFunction(input, false)
                }
            })
        })
    }

    InvalidField = (callBackFunction = (input = new HTMLInputElement(), isValid = Boolean) )=> {
        this.inputs.forEach(input => {
            if (this.validation[input.name].test(input.value)) {
                callBackFunction(input, true)
            } else {
                callBackFunction(input, false)
            }
        })
    }
    
    isAllValid = () => {
        let validationState = true
        this.inputs.forEach(input => {
            if (!this.validation[input.name].test(input.value))
                validationState = false
        })
        return validationState
    }

}