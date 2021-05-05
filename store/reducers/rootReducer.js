import { combineReducers } from "redux"
import commonValues from '../commonValues/reducer'
import notSupportedRoutes from '../notSupportedRoutes/reducer'
import sidebar from '../sidebar/reducer'
import userData from '../userData/reducer'
import contactUs from '../contactUs/reducer';

const rootReducer = combineReducers({
    commonValues:commonValues,
    notSupportedRoutes:notSupportedRoutes,
    sidebar:sidebar,
    userData:userData,
    contactUs: contactUs
})

export default rootReducer;