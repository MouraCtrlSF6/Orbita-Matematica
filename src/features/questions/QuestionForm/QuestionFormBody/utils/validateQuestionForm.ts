export function validateQuestionForm(form: HTMLFormElement): boolean {
  Array.from(form.elements).forEach(validateRequiredText);
  if (form.checkValidity()) return true;
  const invalid = form.querySelector<HTMLElement>(':invalid:not(fieldset)');

  requestAnimationFrame(() => {
    const target = invalid?.dataset.focusId
      ? document.getElementById(invalid.dataset.focusId)
      : invalid;

    target?.focus();
  });
  return false;
}

function validateRequiredText(element: Element) {
  if (!isTextControl(element)) return;
  if (!element.required || element.dataset.focusId) return;
  element.setCustomValidity(element.value.trim() ? '' : 'Preencha este campo.');
}

function isTextControl(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
}
