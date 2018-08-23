import test from 'ava';
import path from 'path';
import sinon from 'sinon';
import shell from 'shelljs';

import * as util from '../bin/lib/util';

/*
 Due to the way ava works,
 I am currently restoring
 sinon after each test
 */

 test.before((t) => {
	 t.context.cliPath = path.join(path.dirname(__filename), '..');
 });

test('exists', (t) => {
	t.truthy(shell.config.silent, true);
});

test('check `CONSTANTS`', (t) => {
	t.is(util.CONSTANTS.wct, 'node_modules/.bin/wct');
	t.is(util.CONSTANTS.storybookBuild, 'node_modules/.bin/build-storybook');
	t.is(util.CONSTANTS.storybookStart, 'node_modules/.bin/start-storybook');
});

test('check `types` commands', (t) => {
	t.is(util.types.test, 'test');
	t.is(util.types.new, 'newRepo');
	t.is(util.types.build, 'build');
	t.is(util.types.sketch, 'sketch');
	t.is(util.types.serve, 'serve');
	t.is(util.types.delete, 'd');
	t.is(util.types.d, 'd');
	t.is(util.types.generate, 'generate');
	t.is(util.types.g, 'generate');
});

test('check `successMessage`', (t) => {
	const message = 'successful';
	const echo = sinon.stub(shell, 'echo');
	const exit = sinon.stub(shell, 'exit');

	util.successMessage(message);

	t.truthy(echo.called);
	t.deepEqual(echo.args[0], [message], 'Message is passed to echo');
	t.truthy(exit.called);
	t.deepEqual(exit.args[0], [0], 'Exits with `0`');
	sinon.restore();
});

test('check `errorMessage`', (t) => {
	const message = 'you done something wrong :(';
	const echo = sinon.stub(shell, 'echo');
	const exit = sinon.stub(shell, 'exit');

	util.errorMessage(message);

	t.truthy(echo.called);
	t.deepEqual(echo.args[0], [message], 'Message is passed to echo');
	t.truthy(exit.called);
	t.deepEqual(exit.args[0], [1], 'Exits with `1`');
	sinon.restore();
});

test('check `missingArg` no type', (t) => {
	const message = 'you done something wrong :(';
	const echo = sinon.stub(shell, 'echo');
	const exit = sinon.stub(shell, 'exit');

	util.missingArg(null ,message);

	t.truthy(echo.called);
	t.deepEqual(echo.args[0], [message], 'Message is passed to echo');
	t.truthy(exit.called);
	t.deepEqual(exit.args[0], [1], 'Exits with `1`');
	sinon.restore();
});

test('check `missingArg` has type', (t) => {
	const message = 'you done something wrong :(';
	const echo = sinon.stub(shell, 'echo');
	const exit = sinon.stub(shell, 'exit');

	util.missingArg('test' ,message);

	t.truthy(echo.notCalled);
	t.truthy(exit.notCalled);
	sinon.restore();
});

test('check `buildFiles`', (t) => {
	const config = 'rollup.config.js';
	const echo = sinon.stub(shell, 'echo');
	const rm = sinon.stub(shell, 'rm');
	const exec = sinon.stub(shell, 'exec');
	const rollup = path.join(t.context.cliPath, 'node_modules/.bin/rollup');

	util.buildFiles(config, true);

	t.truthy(echo.called);
	t.truthy(exec.called);
	t.truthy(rm.called);
	t.deepEqual(echo.args[0], ['Cleaning cache...']);
	t.deepEqual(echo.args[1], ['Building files...']);
	t.deepEqual(exec.args[0][0], `${rollup} -c ${config} --silent`);
	sinon.restore();
});

test('check `buildStorybook`', (t) => {
	const config = 'rollup.config.js';
	const echo = sinon.stub(shell, 'echo');
	const exec = sinon.stub(shell, 'exec');
	const storybookBuild = 'node_modules/.bin/build-storybook';

	util.buildStorybook(config);

	t.truthy(echo.called);
	t.truthy(exec.called);
	t.deepEqual(echo.args[0], ['Building storybook...']);
	t.deepEqual(exec.args[0][0], `${storybookBuild} -c ${config} -o dist/demo`);
	sinon.restore();
});

test('check `serveFiles`', (t) => {
	const config = 'rollup.config.js';
	const echo = sinon.stub(shell, 'echo');
	const exec = sinon.stub(shell, 'exec');
	const concurrently = path.join(t.context.cliPath, 'node_modules/.bin/concurrently');
	const rollup = path.join(t.context.cliPath, 'node_modules/.bin/rollup');

	util.serveFiles(config, 9000);

	t.truthy(echo.called);
	t.truthy(exec.called);
	t.deepEqual(echo.args[0], ['Serving app...']);
	t.deepEqual(echo.args[1], ['http://localhost:9000']);
	t.deepEqual(exec.args[0][0], `${concurrently} -p -n -r --kill-others "node_modules/.bin/start-storybook -p 9000 -c .storybook --quiet" "${rollup} -c ${config} -w"`);
	sinon.restore();
});