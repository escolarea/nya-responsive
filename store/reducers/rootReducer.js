import { combineReducers } from "redux"
import commonValues from '../commonValues/reducer'
import notSupportedRoutes from '../notSupportedRoutes/reducer'
import sidebar from '../sidebar/reducer'
import userData from '../userData/reducer'
import contactUs from '../contactUs/reducer';
import userToken from '../token/reducer'
import newsNavbar from '../newsNavbar/reducer';

const rootReducer = combineReducers({
    commonValues:commonValues,
    notSupportedRoutes:notSupportedRoutes,
    sidebar:sidebar,
    userData:userData,
    contactUs: contactUs,
    userToken:userToken,
    newsNavbar: newsNavbar
})

export default rootReducer;