import { CATEGORIES, BOOKS, BOOKMARK, SEARCHING, CLEARBOOKS } from "../actions/actionType";

const initialState = {
    isLoadingCat: false,
    isErrorCat: false,
    isCat: false,
    cats: [],
    isLoadingBook: false,
    isErrorBook: false,
    isBook: false,
    books: [],
    bookmarkAdd: [],
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
        case SEARCHING: {
            const emptydata: any = [];
            state.books.forEach((item: any) => {
                if(item.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    emptydata.push(item);
                } else {
                    item.authors.forEach((a: string) => {
                        if(a.toLowerCase().includes(action.payload.toLowerCase())) {
                            emptydata.push(item);
                        }
                    })
                }
                
            })
            return {
                ...state,
                books: emptydata
            }
        }
        case BOOKMARK: {
            return {
                ...state,
                bookmarkAdd: [...state.bookmarkAdd, action.payload]
            }
        }
        case CLEARBOOKS: {
            return {
                ...state,
                isLoadingBook: false,
                isErrorBook: false,
                isBook: false,
                books: []
            }
        }
        default:
            return state
    }  
}

export default reducer;