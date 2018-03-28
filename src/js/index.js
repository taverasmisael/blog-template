import LoadPageScript from './loadPageScript'
import NavMenu from './navmenu'

const currentPage = document.location.pathname.split('.')[0]
document.addEventListener('DOMContentLoaded', () => {
  LoadPageScript(currentPage).then(({ default: InitView }) => InitView())
  NavMenu({
    navSelector: '#MainNav',
    navActiveClass: 'nav--active',
    navTogglers: '.js--nav-toggler'
  })
})
