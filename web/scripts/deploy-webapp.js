const shell = require('shelljs');
const path = require('path');
const srcRoot = path.resolve(__dirname, '../../');

// The source of the webapp
const src = path.resolve(srcRoot, 'web', 'public');

// The build destination for the deployable repo
const build = path.resolve(srcRoot, '../', 'dlg-webapp');

// Make a production build of the application
shell.exec('npm run web:build');


if (shell.test('-d', build)) { 
	// switch to build directory
	shell.echo('Log: switching to build directory');
	shell.cd(build)

	// clean the public build directory
	shell.exec('rm -rf ' + path.resolve(build, 'public'));
	shell.echo('Log: cleaning build directory');

	// Copy production build of application to the deploy directory 
	shell.echo('Log: copying web-app build to dlg-webapp deploy repo');
	shell.cp('-R', src, build);

	// Commit latest build of application
	shell.exec('git add -A');
	shell.echo('Log: adding new application version');
	shell.exec('git commit -m "commiting application version"');
	shell.echo('Log: committing latest application version');

	// Deploy application
	shell.echo('Log: deploying application');
	shell.exec('git push');

} else {
	shell.echo('Error: dlg-webapp does not exist.  Please clone dlg-webapp project repo');
  	shell.exit(1);
};



