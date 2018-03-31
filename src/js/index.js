import LazyLoad from 'vanilla-lazyload'
import LoadPageScript from './loadPageScript'
import NavMenu from './navmenu'

const currentPage = document.location.pathname.split('.')[0]
const initLL = (selectors = '.featured-article__image, img') => new LazyLoad({ elements_selector: selectors })

initLL()

document.addEventListener('DOMContentLoaded', () => {
  LoadPageScript(currentPage).then(({ default: InitView }) => InitView())
  NavMenu({
    navSelector: '#MainNav',
    navActiveClass: 'nav--active',
    navTogglers: '.js--nav-toggler'
  })
})
