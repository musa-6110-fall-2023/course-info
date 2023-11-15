/* ====================
The following two functions take a string of HTML and create DOM element objects
representing the tags, using the `template` feature of HTML. See the following
for more information: https://stackoverflow.com/a/35385518/123776
==================== */

/**
 * @param {String} html HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  const template = document.createElement('template');
  const trimmedHtml = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = trimmedHtml;
  return template.content.firstChild;
}

/**
 * @param {String} html HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}

export {
  htmlToElement,
  htmlToElements,
};
