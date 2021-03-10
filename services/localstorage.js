export const setAuth = token => localStorage.setItem('ade:id-token', token);
export const getAuth = () => localStorage.getItem('ade:id-token')
export const hasAuth = () => !!getAuth();

export const setUserInfo = info => {
    let userInfo;
    try {
      userInfo = JSON.stringify(info)
    } catch (err) {
      userInfo = {}
    }
    localStorage.setItem('ade:user-info', userInfo)
  }

  export const getUserInfo = () => {
    const userInfo = localStorage.getItem('ade:user-info') || unauthenticatedUserInfo
    try {
      return JSON.parse(userInfo)
    } catch (err) {
      return {}
    }
  }