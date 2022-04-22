// import { createSlice } from "@reduxjs/toolkit";

// export const categoryReducer = createSlice({
//     name: "category",
//     initialState: [],
//     reducers: {
//         getCategory: (state, action) => {
//             state = {...action.payload};
//             return state;
//         }
//     }
// });

// const {reducer, actions} = categoryReducer;
// export const {getCategory} = actions;
// export default reducer;

import { CATEGORIES, BOOKS } from "../actions/actionType";

const initialState = {
    isLoadingCat: false,
    isErrorCat: false,
    isCat: false,
    cats: [],
    isLoadingBook: false,
    isErrorBook: false,
    isBook: false,
    books: [],
    size: 10,
    page: 0
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CATEGORIES + "_PENDING": {
            return {
                ...state,
                isLoadingCat: true
            }
        }
        case CATEGORIES + "_REJECTED": {
            return {
                ...state,
                isLoadingCat: false,
                isErrorCat: true,
                isCat: false
            }
        }
        case CATEGORIES + "_FULFILLED": {
            return {
                ...state,
                isLoadingCat: false,
                isErrorCat: false,
                isCat: true,
                cats: action.payload.data
            }
        }
        case BOOKS + "_PENDING": {
            return {
                ...state,
                isLoadingBook: true
            }
        }
        case BOOKS + "_REJECTED": {
            return {
                ...state,
                isLoadingBook: false,
                isErrorBook: true,
                isBook: false
            }
        }
        case BOOKS + "_FULFILLED": {
            return {
                ...state,
                isLoadingBook: false,
                isErrorBook: false,
                isBook: true,
                books: action.payload.data
            }
        }
        default:
            return state
    }  
}

export default reducer;