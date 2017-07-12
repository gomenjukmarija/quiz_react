
export default function auth(nextState, replace) {
	// console.log('сессия',localStorage.getItem('myUser'));
  if (localStorage.getItem('myUser') === 'guest') {
    replace({
      pathname: '/login'
    })
  }
}