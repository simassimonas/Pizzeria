function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// Deletes a 2nd level node with all its children
function deleteGrandparentNode(el) {
  el.parentNode.parentNode.remove();
}

// Helper function to set attributes
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
