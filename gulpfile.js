const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);
task('build:schemas', copySchemas);

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}

function copySchemas() {
	const schemaSource = path.resolve('nodes', '**', '*.schema.json');
	const schemaDestination = path.resolve('dist', 'nodes');

	return src(schemaSource).pipe(dest(schemaDestination));
}
