let initial = {
    login: '',
    password: '',
    signIn: false,
    menu: 'Movies app',
    favorites: []
}

const reducer = (state=initial, action) => {
    switch (action.type) {
        case 'SIGN':
            return {
                ...state,
                signIn: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                login: action.payload
            }
        case 'PASSWORD':
            return {
                ...state,
                password: action.payload
            }
        case 'MENU':
            return {
                ...state,
                menu: action.payload
            }
        case 'FAVORITE':
            return {
                ...state,
                favorites: [...action.payload]
            }
        default: 
            return state;
    }
}

export default reducer;