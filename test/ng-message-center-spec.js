function getTemplate(param) {
    var template = '<ngmessagecenter-messages id="simple"></ngmessagecenter-messages>';
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
        elm.appendTo(document.body);
    }

    function getRowElement() {
        return $(elm.children()[0]);
    }

    function getMessagesElements() {
        return getRowElement().children();
    }

    describe('simple', function () {

        beforeEach(function () {
            initializeTest({});
        });

        it('should initialize whithout itens', function () {
            expect(getMessagesElements().length).toBe(0);
        });

        describe('messages', function () {
            afterEach(function () {
                elm.remove();
            });

            it('should show message after add', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again' });
                $rootScope.$apply();
                expect(getMessagesElements().length).toBe(1);
            });

            it('should hide messages after timeout', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again', timeout: 300 });
                $rootScope.$apply();
                expect(getMessagesElements().length).toBe(1);
                // Test click and timeout after this
                $timeout.flush();
                expect(getMessagesElements().length).toBe(0);
            });
            
            it('can\'t be removed if timeout is false', function () {
                ngMessageCenter.error({ title: 'Oh snap!', text: 'Something went wrong, try submitting again', timeout: false});
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
});