module.exports = function(grunt) {
	grunt.loadNpmTasks("jasmine");
	grunt.loadTasks("tasks")

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		fontcss: {
			test: {
				options: {
					css: "spec/output.css"
				},
				files: [{
					expand: true,
					src: [
						"spec/testfonts/*.woff",
						"spec/testfonts/*.woff2"
					]
				}]
			}
		}
	});
}