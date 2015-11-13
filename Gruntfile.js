module.exports = function(grunt) {
	grunt.loadNpmTasks('jasmine');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});
}