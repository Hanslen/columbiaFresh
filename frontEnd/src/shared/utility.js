export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if(rules.exactLengh){
        isValid = value.length == rules.exactLengh && isValid;
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        // const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const pattern = /^[A-Za-z0-9+_.-]+@(.+)$/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }
    if(rules.isNumber){
        const pattern = /^\d*\.?\d*$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
}

export const checkFormValidity = (inputs) => {
    let isValid = true;
    var keys = Object.keys(inputs);
    for(var i=0; i<keys.length; i++){
        isValid = isValid && inputs[keys[i]].valid;
    }
    return isValid;
}


export const removeArray = (arr, id) => {
    let index = 0;
    for(var i = 0; i < arr.length; i++){
      if(arr[i].id === id){
        index = i;
        break;
      }
    }
    const deleteArray = arr;
    deleteArray.splice(index, 1);
    return deleteArray;
}
