export const log = (login) => {
    return {
        type: 'LOGIN',
        payload: login
    }
}

export const pass = (password) => {
    return {
        type: 'PASSWORD',
        payload: password
    }
}

export const sign = (s) => {
    return {
        type: 'SIGN',
        payload: s
    }
}

export const menuName = (name) => {
    return {
        type: 'MENU',
        payload: name
    }
}

export const AllFavorites = (data) => {
    return {
        type: 'FAVORITE',
        payload: data
    }
}

export const addToFavorite = (data) => {
    return {
        type: 'ADD_FAVORITE',
        payload: data
    }
}