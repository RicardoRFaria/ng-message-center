function getTemplate(param) {
    var template = '<ngmessagecenter-messages></ngmessagecenter-messages>';
    return template;
}

describe('NgMessageCenter', function () {

    var elm, scope, diretiva;

    beforeEach(module('federicot.ng-message-center'));

    var $rootScope, $compile, $controller, $ngMessageCenter;
    beforeEach(inject(function (_$rootScope_, _$compile_, _$controller_, _ngMessageCenter_) {
        $rootScope = _$rootScope_.$new();
        $compile = _$compile_;
        $controller = _$controller_;
        $ngMessageCenter = _ngMessageCenter_;
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
        diretiva = $(elm.children()[0]);
        scope = diretiva.isolateScope();

        //elm.appendTo(document.body);
    }

    function getFormElement() {
        return $(diretiva.children()[0]);
    }

    function getCardElement() {
        var childrenElement = elm.find('.sp-input-select__match')[0];
        return $(childrenElement);
    }

    function getSelectedItens() {
        var childrenElement = elm.find('.sp-input-select__match-items>li');
        return $(childrenElement);
    }

    describe('simple', function () {

        beforeEach(function () {
            initializeTest({});
        });

        /*afterEach(function () {
            elm.remove();
        });*/

        it('should initialize whithout itens', function () {
            expect(false).toBeFalsy();
        });

        /*describe('model', function () {
            it('should be changed after user selection', function (done) {
                selectOneUser();
                setTimeout(function () {
                    $rootScope.$apply();
                    expect($rootScope.usuario).toBeDefined();
                    expect($rootScope.usuario instanceof Array).toBeFalsy();
                    done();
                }, WAIT_TIME_OF_REQUEST);
            });
        });

        describe('inputs', function () {
            it('should start visible', function () {
                expect(getFormElement().hasClass('ng-show')).toBeTruthy();
                expect(getFormElement().hasClass('ng-hide')).toBeFalsy();
            });

            it('should be hidden when value is defined', function (done) {
                selectOneUser();
                setTimeout(function () {
                    $rootScope.$apply();
                    expect(getFormElement().hasClass('ng-hide')).toBeTruthy();
                    expect(getFormElement().hasClass('ng-show')).toBeFalsy();
                    done();
                }, WAIT_TIME_OF_REQUEST);
            });

            it('should clear inputs after select one user', function (done) {
                selectOneUser();
                setTimeout(function () {
                    $rootScope.$apply();
                    expect(angular.element(getIdInput()).val()).toBe('');
                    expect(angular.element(getDescInput()).val()).toBe('');
                    done();
                }, WAIT_TIME_OF_REQUEST);
            });
        });

        describe('card', function () {
            it('should start hidden', function () {
                expect(getCardElement().hasClass('ng-hide')).toBeTruthy();
                expect(getCardElement().hasClass('ng-show')).toBeFalsy();
            });

            it('should be visible when value is defined', function (done) {
                selectOneUser();
                setTimeout(function () {
                    $rootScope.$apply();
                    expect(getCardElement().hasClass('ng-show')).toBeTruthy();
                    expect(getCardElement().hasClass('ng-hide')).toBeFalsy();
                    done();
                }, WAIT_TIME_OF_REQUEST);
            });
        });*/

    });
});