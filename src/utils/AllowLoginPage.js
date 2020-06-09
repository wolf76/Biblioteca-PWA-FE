export default (to, from, next) => {
  if (localStorage.getItem('uid') != null && localStorage.getItem('uid').length > 0) {
    // verify with firebase or jwt
    next('/home')
  } else {
    next()
  }
}
