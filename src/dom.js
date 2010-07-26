jab.dom = function(element) {
    if (element instanceof HTMLElement) {
        var el = new jab.html.Element();
        el.load(element);
        return el;
    }
}


jab.dom.addClass = function(el,classname) {
    if (jab.dom.hasClass(el, classname)) {
        return jab.dom;
    }

    el.className = classname + ' ' + el.className;
    return jab.dom;
}

jab.dom.removeClass = function(el,classname) {
    if (!jab.dom.hasClass(el, classname)) {
        return jab.dom;
    }

    el.className = el.className.replace(classname,"","gi");
    return jab.dom;
}

jab.dom.width = function(el,width) {
    if (parseInt(width) == width) {
        width = width + "px";
    }
    el.style.width = width;
    return jab.dom;
}

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
}
