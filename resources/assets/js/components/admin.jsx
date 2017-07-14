
export default function admin(nextState, replace) {
	console.log('сессия',localStorage.getItem('role'));
  if (localStorage.getItem('role') === 'client') {
    replace({
      pathname: '/'
    })
  }
} 