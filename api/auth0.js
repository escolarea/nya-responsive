import Lock from 'auth0-lock'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import _ from 'lodash'
// import icon from '../../images/auth0/user.svg'
import { setAuth, setUserInfo} from '../services/localstorage' 
import getConfig from 'next/config';


const fallbackErrorMessage = 'Sorry! Something just went wrong.\nTry again or contact help@mail.neilyoungarchives.com'
const languageDictionary = {
    title: ' ',
    usernameInputPlaceholder: 'Enter Firstname',
    emailInputPlaceholder: 'Enter Email',
    passwordInputPlaceholder: 'Password',
    error: {
        login: {
            'lock.fallback': fallbackErrorMessage
        },
        signup: {
            'lock.fallback': fallbackErrorMessage
        }
    }
}

const additionalSignUpFields = [
    {
        name: 'customFirstname',
        placeholder: 'Firstname',
        // icon,
        validator: customFirstname => {
            const noSpaces = customFirstname.indexOf(' ') === -1
            const latinAlphabetOnly = /^[a-zA-Z ]+$/.test(customFirstname)
            const valid = noSpaces && latinAlphabetOnly
            const hint = noSpaces === false ? 'Provide only your Firstname with no spaces' : 'Please use latin characters only'
            return {
                valid,
                hint
            }
        }
    }
]

const theme = {
    logo: '',
    primaryColor: '#967a5c',
    languageDictionary
}


class Auth {
    constructor() {
        this.emit = 60 * 60 * 0.5 // 30 minutes

        this.ensureLock = this.ensureLock.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.setProfile = this.setProfile.bind(this)
        this.setSession = this.setSession.bind(this)
        this.getExpiryTime = this.getExpiryTime.bind(this)
        this.scheduleRenewal = this.scheduleRenewal.bind(this)
        this.renewSession = this.renewSession.bind(this)
        this.retrieveSession = this.retrieveSession.bind(this)
    }


    ensureLock() {
        const {publicRuntimeConfig:{AUTH0_CLIENT_ID,AUTH0_DOMAIN} } = getConfig() || { }
        if (this.lock) return
        this.lock = new Lock(
            AUTH0_CLIENT_ID,
            AUTH0_DOMAIN,
            {
                auth: {
                    redirect: false,
                    redirectUrl: process.env.AUTH0_CALLBACK_URL || window.location.origin,
                    responseType: 'id_token token',
                    params: {
                        state: window.location.pathname,
                        scope: 'openid idToken',
                    }
                },
                theme,
                languageDictionary,
                additionalSignUpFields,
                configurationBaseUrl: 'https://cdn.auth0.com',
                rememberLastLogin: false,
                closable: false,
                autoclose: true,
                autofocus: true,
                oidcConformant: true,
                usernameStyle: 'email'
            }
        )
    } 

    login(resolve, reject) {
        this.ensureLock()
        const { lock, setSession, setProfile } = this
        lock.on("authenticated", function (authResult) {  
            setSession(authResult)
            lock.getUserInfo(authResult.accessToken, function (error, profile) {
                               
                let isSocialConnection = profile.user_metadata && profile.user_metadata.socialProvider !== 'auth0' 
                                       ? true
                                       : false
                if (error) {
                    reject(error)
                    return;
                }
                setProfile(profile)  
                // setEmailModal({email:profile['email'], type:'search_user', connection:isSocialConnection, endpoint: `/api/account/search_user`}).then(()=>{
                    resolve()
                // })
            })
            lock.hide() 
        })
        lock.show()
    }

    logout(redirect) {
        // setShowModal({modalType:null,showModal:false })
        this.ensureLock()
        this.lock.logout()
        localStorage.removeItem('ade:id-token')
        localStorage.removeItem('ade:user-info')
        localStorage.removeItem('ade:welcome-message-seen')
        localStorage.removeItem('ade:newsletter-pref-seen')
        localStorage.removeItem('ade:user-email')
        document.location.href =  _.isString(redirect) ? redirect : '/'
        // document.location.reload()
    }
    show() {
        this.ensureLock()
        this.lock.show()
    }

    hide() {
        this.ensureLock()
        this.lock.hide()
    }

    setProfile(userInfo) {  
        setUserInfo(userInfo)  
    }



    setSession(auth) {
        setAuth(auth.idToken)
    }

    getExpiryTime() {
        // try { 
        //     const token = getAuth()
        //     const { exp } = jwtDecode(token)

        //     return exp - moment().unix()
        // } catch (err) {
        //     return 0
        // }
    }

    scheduleRenewal() {
        // Clear timeout in case Auth.retrieveSession triggers more than once
        clearTimeout(this.tokenRenewalTimeout)
        this.tokenRenewalTimeout = setTimeout(() => {
            this.renewSession()
        }, this.emit * 1000) // to milliseconds
    }

    renewSession() {
        this.ensureLock()

        const { lock, logout, setSession, scheduleRenewal } = this

        // Renew session
        return new Promise(function (resolve) {
            lock.checkSession({}, (err, authResult) => {
                if (err ||
                    !_.has(authResult, 'accessToken') ||
                    !_.has(authResult, 'idToken')
                ) {
                    return logout()
                }

                setSession(authResult)
                resolve(authResult)
                scheduleRenewal()
            })
        })
    }

    retrieveSession() {
        const expiresInSeconds = this.getExpiryTime()

        // Token is already expired
        if (expiresInSeconds < 0) {
            return this.logout()
        }

        /**
         * Token will expire before next schedule renew time
         * Let's renew session before get subscription status triggers
         * @see src/js/services/fetch.js @fetchExclusiveEntries
         */
        if (expiresInSeconds < this.emit) {
            return this.renewSession()
        }

        this.scheduleRenewal()
    }
}
export async function getServerSideProps(req, res) {
    console.log("process.env", process.env)
     return {}
   }
export default new Auth()
