export const hasSeenNewsletterPreference = () => {
    let seen = !!localStorage.getItem('newsletter-pref-seen')
    return seen
  }

  export const getPath = () => {
    return localStorage.getItem('path')
  }