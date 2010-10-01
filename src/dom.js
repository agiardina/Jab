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
 * @param {HTMLElement} el The target html element
 * @param {String} id The id to set
 * @return {String} the id
 */
jab.dom.id = function(el,id) {
    if (typeof id != 'undefined') {
        el.id = id
    }
    return el.id;
};

/**
 * Add a class to dom element
 * @param {HTMLElement} el The target HTMLELement
 * @param {String} classname The css class to add to element
 * @return {Function} Return the jab.dom function to allow chaininig
 */
jab.dom.addClass = function(el,classname) {
    if (classname) {
        if (jab.dom.hasClass(el, classname)) {
            return jab.dom;
        }

        if (el.className.length) {
            el.className = el.className + ' ' + classname ;
        } else {
            el.className = classname;
        }
    }
    
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
 * Set a style property
 * @param {HTMLElement} el The target HTMLElement
 * @param {String} prop The property to set
 * @param {String} val The value of the property
 * @return {Function} the jab.dom function to allow chaining
 */
jab.dom.style = function(el,prop,val) {
    el.style[prop] = val;
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
 * Set/Get an attribute of an element
 * @param {HTMLElement} el The target HTMLElement
 * @param {String} attr The attribute to set
 * @param {String} val The value of the attribute
 * @return {String|Function) 
 */
jab.dom.attr = function(el,attr,val) {
    if (typeof val == 'undefined') {
        return el.getAttribute(attr);
    } else {
        el.setAttribute(attr,val)
        return jab.dom;
    }

};

/**
 * Define the height of an HTMLElement
 * @param {HTMLElement} el The target HTMLElement
 * @param {Number} height The height in pixels to set
 * @return {Function|Number} Return the jab.dom function to allow chaining
 * or the client
 */
jab.dom.height = function(el,height) {
    if (typeof height != 'undefined') {
        if (parseInt(height) == height) {
            height = height + "px";
        }

        el.style.height = height;
        return jab.dom;
    } else {
        return el.offsetHeight;
    }
};


/**
 * Hide an element
 * @param {HTMLElement} el The target HTMLElement
 * @return {Function} The jab.dom function to allow chaining
 */
jab.dom.hide = function(el) {
    return jab.dom.addClass(el,'hide');
};


/**
 * Show an element
 * @param {HTMLElement} el The target HTMLElement
 * @return {Function} The jab.dom function to allow chaining
 */
jab.dom.show = function(el) {
    return jab.dom.removeClass(el,'hide');
};

/**
 * @param {HTMLElement} el The target HTMLElement
 * @return {Function} The jab.dom function to allow chaining
 */
jab.dom.focus = function(el) {
    el.focus();
    return jab.dom;
};

/**
 * Return the body element wrapped in the jab.html.Element type
 * @see Element
 * @return {Element}
 */
jab.dom.getBody = function() {
    var el = new jab.html.Element();
    return el.load(document.getElementsByTagName('body')[0]);
};

/**
 * Return the element with selected id wrapped in a jab.html.Element
 * @see jab.html.Element
 * @param {String} id
 * @return {jab.html.Element}
 */
jab.dom.getById = function(id) {
    var el = new jab.html.Element(),
        domEl = document.getElementById(id);

    if (domEl) {
        return el.load(document.getElementById(domEl));
    } else{
        return null;
    }
};