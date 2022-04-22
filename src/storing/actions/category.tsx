import {CATEGORIES, BOOKS} from './actionType'
import http from "../../core/http";

export const getCategories = () =>  {
    return {
        type: CATEGORIES,
        payload: http.get('fee-assessment-categories')
    }
}

export const getBooks = (payload: any) => {
    return {
        type: BOOKS,
        payload: http.get(`fee-assessment-books?categoryId=${payload.catId}&page=${payload.page}&size=${payload.size}`)
    }
}