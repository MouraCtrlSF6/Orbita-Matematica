export function validateQuestionForm(form: HTMLFormElement): boolean {
  Array.from(form.elements).forEach(validateRequiredText);
  if (form.checkValidity()) return true;
  const invalid = form.querySelector<HTMLElement>(':invalid:not(fieldset)');

  // Allow invalid handlers to reopen collapsed sections before moving focus.
  requestAnimationFrame(() => requestAnimationFrame(() => focusInvalidControl(invalid)));
  return false;
}

function focusInvalidControl(invalid: HTMLElement | null) {
  const target = invalid?.dataset.focusId
    ? document.getElementById(invalid.dataset.focusId)
    : invalid;

  target?.focus();
}

function validateRequiredText(element: Element) {
  if (!isTextControl(element)) return;
  if (!element.required || element.dataset.focusId) return;
  element.setCustomValidity(element.value.trim() ? '' : 'Preencha este campo.');
}

function isTextControl(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
}
