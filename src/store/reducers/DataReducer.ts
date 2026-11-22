import type { DataReducerInterface } from '../../types/DataReducerTypes'

const initialState: DataReducerInterface = {
    libraries: null,
    folders: null,
    pages: null,
    selectedLibrary: null,
    selectedNode: null,
    selectedNodeMove: null 
}
export const dataReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_LIBRARIES':
            return {...state, libraries: action.payload} 
        case 'SET_FOLDERS':
            return {...state, folders: action.payload}
        case 'SET_PAGES':
            return {...state, pages: action.payload}
        case 'SET_SELECTED_LIBRARY':
            return {...state, selectedLibrary: action.payload}
        case 'SET_SELECTED_NODE':
            return {...state, selectedNode: action.payload}
        case 'SET_SELECTED_NODE_DATA':
            return {...state, selectedNode: {...state.selectedNode, data: action.payload}}
        case 'SET_SELECTED_NODE_MOVE':
            return {...state, selectedNodeMove: action.payload}
        case 'CREATE_LIBRARY':
            return {...state, libraries: [...state.libraries!, action.payload]}
        case 'CREATE_FOLDER':
            return {...state, folders: [...state.folders!, action.payload]}
        case 'CREATE_PAGE':
            return {...state, pages: [...state.pages!, action.payload]}
        default:
            return state  
    }
}