import { isString }               from 'lodash';
import Auth                       from '../api/auth0'

const Login = redirect => {
  Auth.login(() => {
    console.log('got auth token!')
    handleRemoveAuth0Listener()
    if (isString(redirect)){
      document.location.href = redirect
    }
    window.location.reload()
  }, error => {
    console.log('got auth error!', error)
    handleRemoveAuth0Listener()
    Auth.hide()
  })

  const auth0Lock = document.querySelector('.auth0-lock');
  if (auth0Lock) {
    if (!window.location.href.includes('screen=plans&view=select')){
      auth0Lock.addEventListener('click', handleHideAuth0)
    }
  }
}

const handleRemoveAuth0Listener = () => {
  const auth0Lock = document.querySelector('.auth0-lock')
  if (auth0Lock) auth0Lock.removeEventListener('click', handleHideAuth0)
}

const handleHideAuth0 = e => {
  if (e && e.target.classList.contains('auth0-lock-overlay')){
    e.stopPropagation()
    handleRemoveAuth0Listener()
    Auth.hide()
  }
}

export default Login
