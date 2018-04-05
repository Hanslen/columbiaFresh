import * as actionTypes from './actionTypes';
import Axios from '../../axios-config';
export const addIngredients = () => {
    return {
        type: actionTypes.ADD_INGREDIENT
    }
}
export const updateType = (id, value) => {
    return {
        type: actionTypes.UPDATE_TYPE,
        id: id,
        value: value
    }
}
export const updateNum = (id, value) => {
    return {
        type: actionTypes.UPDATE_NUM,
        id: id,
        value: value
    }
}
export const updateUnit = (id, value) => {
    return {
        type: actionTypes.UPDATE_UNIT,
        id: id,
        value: value
    }
}
export const deleteIngredients = (id) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        id: id
    }
}
export const addDirection = () => {
    return {
        type: actionTypes.ADD_DIRECTION
    }
};

export const updateDirection = (id, value) => {
    return {
        type: actionTypes.UPDATE_DIRECTION,
        id: id,
        value: value
    }
};
export const deleteDirection = (id) => {
    return {
        type: actionTypes.DELETE_DIRERCTION,
        id: id
    }
}
export const updateSuggestionIng = (ingre) => {
    return {
        type: actionTypes.LOAD_SUGGESTIONS_INGREDIENTS,
        loadsuggestionIngredient: ingre
    } 
}
export const loadsuggestionIng = () => {
    return dispatch => {
        console.log("loading suggestion ing....");
        Axios.get('/getIngredients').then(res => {
            console.log(res);
            dispatch(updateSuggestionIng(res.data.ingredients));
        }).catch(err => {
            console.log(err);
        });
    }
};
export const uploadIng = (token, title, img, tag, authorId, description, ingredients, directions, notes) => {
    const postData = {
        token: token,
        title: title,
        img: img,
        tag: tag,
        authorId: authorId,
        description: description,
        ingredients: ingredients,
        directions: directions,
        notes: notes
    };
    Axios.post("/createRecipe", postData).then(res => {
        console.log(res);
        if(res.data.success){
            alert("Upload recipe successfully!");
        }
        else{
            alert("Upload recipe failed...");
        }
    }).catch(err => {
        console.log(err);
    });
    return {
        type: actionTypes.UPLOAD_RECIPE
    }
}