
export default function admin(nextState, replace) {

  if (localStorage.getItem('myUser') === 'guest') {
    replace({
      pathname: '/login'
    })
  }
}