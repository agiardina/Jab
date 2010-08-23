var testDom = {
    name: "Dom Testcase",

    setUp : function () {
        this._test = document.createElement('div');
        this._test.id = 'test';

        this._main = document.getElementById('main');
        this._main.appendChild(this._test);

    },

    tearDown : function () {
        this._main.removeChild(this._test);
    },

    testHasClassFalse: function() {
        Y.Assert.isFalse(jab.dom.hasClass(this._test,'test'));
    },

    testHasClassTrue: function() {
        this._test.setAttribute('class','test');
        Y.Assert.isTrue(jab.dom.hasClass(this._test,'test'));
    },

    testHasClassMany: function() {
        this._test.setAttribute('class','test test2');
        Y.Assert.isTrue(jab.dom.hasClass(this._test,'test'));
        Y.Assert.isTrue(jab.dom.hasClass(this._test,'test2'));
        Y.Assert.isFalse(jab.dom.hasClass(this._test,'test3'));
    },

    testaddClass: function() {
        jab.dom.addClass(this._test,'test');
        Y.Assert.areEqual(this._test.getAttribute('class'),"test");
    },

    testaddClassMany: function() {
        jab.dom.addClass(this._test,'test');
        jab.dom.addClass(this._test,'test2');
        Y.Assert.areEqual("test test2",this._test.getAttribute('class'));

    },

    testRemoveClass: function() {
        this._test.setAttribute('class','test test2');
        jab.dom.removeClass(this._test,'test');
        Y.Assert.areEqual("test2",this._test.getAttribute('class').trim());
    },

    testRemoveClassMany: function() {
        this._test.setAttribute('class','test test2');
        jab.dom.removeClass(this._test,'test');
        jab.dom.removeClass(this._test,'test2');
        Y.Assert.areEqual("",this._test.getAttribute('class').trim());
    },

    testId: function() {
        Y.Assert.isTrue(false);
    },

    getBody: function() {
        Y.Assert.isTrue(false);
    },

    attr: function() {
      Y.Assert.isTrue(false);
    },

    style: function() {
      Y.Assert.isTrue(false);
    },

}


