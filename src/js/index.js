import LazyLoad from 'vanilla-lazyload'
import LoadPageScript from './loadPageScript'
import NavMenu from './navmenu'

const currentPage = document.location.pathname.split('.')[0]
const lazyLoad = new LazyLoad({
  callback_load: console.log.bind(console, 'Loading...')
})

document.addEventListener('DOMContentLoaded', () => {
  LoadPageScript(currentPage).then(({ default: InitView }) => InitView())
  NavMenu({
    navSelector: '#MainNav',
    navActiveClass: 'nav--active',
    navTogglers: '.js--nav-toggler'
  })
  console.log(lazyLoad)
})
