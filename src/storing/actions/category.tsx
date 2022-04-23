import {CATEGORIES, BOOKS, BOOKMARK, SEARCHING, CLEARBOOKS} from './actionType'
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

export const addBookmarks = (object: any) => {
    return {
        type: BOOKMARK,
        payload: object
    }
}

export const searchBooks = (value: string) => {
    return {
        type: SEARCHING,
        payload: value
    }
}

export const clearBooks = () => {
    return {
        type: CLEARBOOKS,
    }
}