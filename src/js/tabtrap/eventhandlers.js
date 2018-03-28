// @flow

interface TabHandlerOptions {
  firstFocusableElement: HTMLElement;
  lastFocusableElement: HTMLElement;
}

interface KeyDownHandlerOptions {
  focusableElements: any[];
  handleBackwardTab: Event => void;
  handleForwardTab: Event => void;
  closeOnEsc?: boolean;
  onClose?: Function;
}
export const handleKeyDown = ({
  focusableElements,
  handleBackwardTab,
  handleForwardTab,
  onClose,
  closeOnEsc
}: KeyDownHandlerOptions) => (event: KeyboardEvent) => {
  const { keyCode, shiftKey } = event
  if (keyCode === 27 && closeOnEsc && onClose) onClose({ method: 'Esc' })
  if (keyCode === 9) {
    if (focusableElements.length === 1) {
      event.preventDefault()
    }
    if (shiftKey) {
      handleBackwardTab(event)
    } else {
      handleForwardTab(event)
    }
  }
}

export const onBackwardTab = ({ firstFocusableElement, lastFocusableElement }: TabHandlerOptions) => (event: Event) => {
  if (document.activeElement === firstFocusableElement) {
    event.preventDefault()
    lastFocusableElement.focus()
  }
}
export const onForwardTab = ({ firstFocusableElement, lastFocusableElement }: TabHandlerOptions) => (event: Event) => {
  if (document.activeElement === lastFocusableElement) {
    event.preventDefault()
    firstFocusableElement.focus()
  }
}
