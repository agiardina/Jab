/**
 * Wraps an HTMLElement.
 * @see Element
 * @param {HTMLElement} element the HTMLElement to wrap
 * @return {Element}
 */
jab.dom = function(element) {
    if (element instanceof HTMLElement) {
        var el = new jab.html.Element();
        el.load(element);
        return el;
    } else {
        throw "jab.dom: element is not a valid HTMLElement";
    }
};

/**
 * Search for a css class inside an html element
 * @param {HTMLElement} el The target html element
 * @param {String} classname The classname to search
 * @return {Boolean} True if classname found
 */
jab.dom.hasClass = function(el,classname) {
    if (!el.hasAttribute('class')) {
        return false;
    } else {
        var classes = el.className.split(' ');
        if (classes.indexOf(classname) != -1) {
            return true;
        } else {
            return false;
        }
    }
};

/**
 * Add a class to dom element
 * @param {HTMLElement} el The target HTMLELement
 * @params {String} classname The css class to add to element
 * @return {Function} Return the jab.dom function to allow chaininig
 */
jab.dom.addClass = function(el,classname) {
    if (jab.dom.hasClass(el, classname)) {
        return jab.dom;
    }

    el.className = classname + ' ' + el.className;
    return jab.dom;
};


/**
 * Remove class from an HTMLElement
 * @param {HTMLElement} el The target HTMLElement
 * @param {String} classname The classname to remove
 * @return {Function} Return the jab.dom function to allow chaining
 */
jab.dom.removeClass = function(el,classname) {
    if (!jab.dom.hasClass(el, classname)) {
        return jab.dom;
    }

    el.className = el.className.replace(classname,"","gi");
    return jab.dom;
};

/**
 * Define the width of an HTMLElement
 * @param {HTMLElement} el The target HTMLElement
 * @param {Number} width The width in pixels to set
 * @return {Function} Return the jab.dom function to allow chaining
 */
jab.dom.width = function(el,width) {
    if (parseInt(width) == width) {
        width = width + "px";
    }
    el.style.width = width;
    return jab.dom;
};

/**
 * Define the height of an HTMLElement
 * @param {HTMLElement} el The target HTMLElement
 * @param {Number} height The height in pixels to set
 * @return {Function} Return the jab.dom function to allow chaining
 */
jab.dom.height = function(el,height) {
    if (parseInt(height) == height) {
        height = height + "px";
    }
    el.style.height = height;
    return jab.dom;
};