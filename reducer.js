import {add_favorite,delete_favorite} from './actions'
import Database from './Database'


const initialState = { //GLOBAL STATE
    FavoritesRedux: [],
}

export const mergesqliteandredux = async () =>{
    var db = await Database.shared.initReduxFromDb()
    initialState.FavoritesRedux = [...db]
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case add_favorite:
            return {
                ...state,
                FavoritesRedux: [...state.FavoritesRedux, action.NewItem],
            }
        case delete_favorite:
            return {
                ...state,
                FavoritesRedux: [...state.FavoritesRedux.filter(item => item != state.FavoritesRedux[action.deleteIndex])],
            }
    }
    return state
}
