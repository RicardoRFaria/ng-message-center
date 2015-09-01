function getTemplate(param) {
    var template = '<ngmessagecenter-messages';
    if (param.name) {
        template += ' name="' + param.name + '"';
    }
    if (param.growl) {
        template += ' growl';
        if (param.growlposition) {
            template += '="' + param.growlposition + '"';
        }
    }
    template += '></ngmessagecenter-messages>';
    return template;
};

describe('NgMessageCenter', function () {

    var elm, scope;

    beforeEach(module('federicot.ng-message-center'));

    var $rootScope, $compile, $controller, ngMessageCenter, $timeout;
    beforeEach(inject(function (_$rootScope_, _$compile_, _$controller_, _ngMessageCenter_, _$timeout_) {
        $rootScope = _$rootScope_.$new();
        $compile = _$compile_;
        $controller = _$controller_;
        ngMessageCenter = _ngMessageCenter_;
        $timeout = _$timeout_;
    }));
    
    /**
     * Função responsável por compilar a diretiva e inicializar os scopos para os testes
     */
    function initializeTest(templateParam) {
        if (templateParam === undefined) {
            templateParam = {};
        }

        elm = $compile(getTemplate(templateParam))($rootScope);
        $rootScope.$apply();
        scope = elm.isolateScope();
    }

    function getRowElement() {
        return $(elm.children()[0]);
    }

    function getMessagesElements() {
        return getRowElement().children();
    }

    function getFirstMessageElement() {
        if (getMessagesElements().length > 0) {
            return $(getMessagesElements()[0]);
        } else {
            throw "No messages!";
        }
    }

    function getCloseButtonOfElement(message) {
        return $(message.find('button')[0]);
    }

    describe('simple', function () {

        beforeEach(function () {
            initializeTest({});
        });

        it('should initialize whithout itens', function () {
            expect(getMessagesElements().length).toBe(0);
        });

        describe('messages', function () {

            it('should show message after add', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again' });
                $rootScope.$apply();
                expect(getMessagesElements().length).toBe(1);
            });

            it('should remove message after click at \'x\'', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again' });
                $rootScope.$apply();
                expect(getMessagesElements().length).toBe(1);

                angular.element(getCloseButtonOfElement(getFirstMessageElement())).trigger('click');
                expect(getMessagesElements().length).toBe(0);
            });

            it('should hide messages after timeout', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again', timeout: 300 });
                $rootScope.$apply();
                expect(getMessagesElements().length).toBe(1);
                // Test click and timeout after this
                $timeout.flush();
                expect(getMessagesElements().length).toBe(0);
            });

            it('can\'t stack messages if stack is false', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again' });
                ngMessageCenter.error({ title: 'Oh snap2!', text: 'Something went wrong, try submitting again2' });
                $rootScope.$apply();
                expect(getMessagesElements().length).toBe(1);
            });

            it('should stack messages if stack is true', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again' });
                ngMessageCenter.error({ title: 'Oh snap2!', text: 'Something went wrong, try submitting again2', stack: true });
                $rootScope.$apply();
                expect(getMessagesElements().length).toBe(2);
            });

            it('can\'t be removed if timeout is false', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again', timeout: false });
                $rootScope.$apply();
                expect(getMessagesElements().length).toBe(1);

                var errorCatched = false;
                try {
                    $timeout.flush();
                } catch (err) {
                    errorCatched = true;
                } finally {
                    expect(errorCatched).toBeTruthy();
                }
                expect(getMessagesElements().length).toBe(1);
            });

        });

    });

    describe('growl', function () {
        describe('default', function () {
            beforeEach(function () {
                initializeTest({ growl: true });
            });

            it('should initialize with growl right top', function () {
                expect(elm.hasClass('message-center-growl')).toBeTruthy();
                expect(elm.hasClass('top')).toBeTruthy();
                expect(elm.hasClass('right')).toBeTruthy();
            });
        });

        describe('right', function () {
            beforeEach(function () {
                initializeTest({ growl: true, growlposition: 'rigth' });
            });

            it('should initialize with growl right top', function () {
                expect(elm.hasClass('message-center-growl')).toBeTruthy();
                expect(elm.hasClass('top')).toBeTruthy();
                expect(elm.hasClass('right')).toBeTruthy();
            });
        });

        describe('left', function () {
            beforeEach(function () {
                initializeTest({ growl: true, growlposition: 'left' });
            });

            it('should initialize with growl left top', function () {
                expect(elm.hasClass('message-center-growl')).toBeTruthy();
                expect(elm.hasClass('top')).toBeTruthy();
                expect(elm.hasClass('left')).toBeTruthy();
            });
        });

        describe('bottom right', function () {
            beforeEach(function () {
                initializeTest({ growl: true, growlposition: 'bottom rigth' });
            });

            it('should initialize with growl right bottom', function () {
                expect(elm.hasClass('message-center-growl')).toBeTruthy();
                expect(elm.hasClass('bottom')).toBeTruthy();
                expect(elm.hasClass('right')).toBeTruthy();
            });
        });

        describe('bottom left', function () {
            beforeEach(function () {
                initializeTest({ growl: true, growlposition: 'bottom left' });
            });

            it('should initialize with growl left bottom', function () {
                expect(elm.hasClass('message-center-growl')).toBeTruthy();
                expect(elm.hasClass('bottom')).toBeTruthy();
                expect(elm.hasClass('left')).toBeTruthy();
            });
        });
    });
});