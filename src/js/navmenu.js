// @flow

import TabTrap from './tabtrap'

interface NavMenuConfig {
  navSelector: string;
  navActiveClass: string;
  navTogglers: string;
}

interface NavMenuInstance {
  NavElement: Element;
  TogglerElements: Element[];
  destroy: () => void[];
}

const ToggleActiveClass = (el: Element, activeClass: string) => el.classList.toggle(activeClass)

const NavMenu = ({ navSelector, navActiveClass, navTogglers }: NavMenuConfig): NavMenuInstance => {
  const NavElement = document.querySelector(navSelector)
  if (NavElement) {
    const ToggleNavActiveClass = () => ToggleActiveClass(NavElement, navActiveClass)
    const tabTrap = TabTrap({ trappedSelector: navSelector, onEscPressed: ToggleNavActiveClass, closeOnEsc: true })
    const onNavToggled = () => {
      ToggleNavActiveClass()
      tabTrap.toggle()
    }

    const TogglerElements = [...document.querySelectorAll(navTogglers)]
    TogglerElements.forEach(el => el.addEventListener('click', onNavToggled))

    const destroy = () => TogglerElements.map(el => el.removeEventListener('click', onNavToggled))

    return {
      NavElement,
      TogglerElements,
      destroy
    }
  }
  throw new Error('navSelector should be a valid CSS Selector and the element should be on the current page.')
}

export default NavMenu
