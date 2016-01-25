/* jshint -W117, -W030 */
describe('Tests Create Controller', function () {

    var controller, scope;

    beforeEach(function () {
        bard.appModule('app.tests');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        var scope = {};
        controller = $controller('TestsCreateController', {$scope: scope});
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Tests Create Controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function () {
            it('should have title of Create Test Case', function () {
                expect(controller.title).to.equal('Create Test Case');
            });

            it('should have logged "Activated"', function () {
                expect($log.info.logs).to.match(/Activated/);
            });

            it('should add test step', function () {
                var steps = controller.steps.length;
                controller.addStep();
                var newSteps = controller.steps.length;
                expect(steps + 1).to.equal(newSteps);
            });

            it('should delete step', function () {
                controller.addStep();
                controller.addStep();
                var steps = controller.steps.length;
                controller.delStep();
                var newSteps = controller.steps.length;
                expect(steps - 1).to.equal(newSteps);
            });

            it('should check is steps are empty', function () {
                controller.addStep();
                expect(controller.stepsEmpty()).to.equal(true);
            });

            it('should submit adding case', function () {
                controller.submitAddCase();
                expect($log.info.logs).to.match(/New Case created/);
            });

        });
    });
});
