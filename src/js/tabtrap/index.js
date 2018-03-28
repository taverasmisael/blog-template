// @flow
import { handleKeyDown, onBackwardTab, onForwardTab } from './eventhandlers'

interface TabTrapConfig {
  trappedSelector: string;
  closeOnEsc: boolean;
  onEscPressed?: Function;
  onClosed?: Function;
  onOpened?: Function;
}

interface TabTrap {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export default ({ trappedSelector, onClosed, onOpened, closeOnEsc, onEscPressed }: TabTrapConfig): TabTrap => {
  const TrappedElement = document.querySelector(trappedSelector)
  let focusedBeforeOpen
  let isOpen
  let TrapListener: KeyboardEvent => void

  if (TrappedElement) {
    const focusableElements = TrappedElement.querySelectorAll('a,button,[tabindex="-1"]')
      ? [...TrappedElement.querySelectorAll('a,button,[tabindex="-1"]')]
      : []
    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement = focusableElements[focusableElements.length - 1]
    const handleBackwardTab = onBackwardTab({ firstFocusableElement, lastFocusableElement })
    const handleForwardTab = onForwardTab({ firstFocusableElement, lastFocusableElement })

    const open = () => {
      focusedBeforeOpen = document.activeElement
      isOpen = true
      firstFocusableElement.focus()
      if (TrapListener) TrappedElement.addEventListener('keydown', TrapListener)
      if (onOpened) onOpened()
    }

    const close = ({ method } = {}) => {
      if (focusedBeforeOpen) focusedBeforeOpen.focus()
      isOpen = false
      if (TrapListener) TrappedElement.removeEventListener('keydown', TrapListener)
      if (onClosed) onClosed()
      if (onEscPressed && method === 'Esc') onEscPressed()
    }

    const toggle = () => {
      if (isOpen) {
        close()
      } else {
        open()
      }
    }

    // Init
    TrapListener = handleKeyDown({
      focusableElements,
      handleBackwardTab,
      handleForwardTab,
      closeOnEsc,
      onClose: close
    })

    return { open, close, toggle }
  }
  throw new Error('trappedSelector should point to an existent element in the page')
}
