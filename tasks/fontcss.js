var FontCssCreator = require("../src/FontCssCreator");

module.exports = function(grunt) {
	grunt.registerMultiTask("fontcss", "Generate css for web fonts", function() {
		var done = this.async();

		var options = this.options({
			css: "out.css"
		});

		var fontFiles = [];

		this.files.forEach(function(file) {
			fontFiles = fontFiles.concat(file.src);
		});

		cssCreator = new FontCssCreator();
		cssCreator.parseFontFiles(fontFiles).then(
			function() {
				cssCreator.saveCss(options.css);
				grunt.log.ok("Created " + options.css);
				done();
			},
			function(err) {
				grunt.fail.fatal(err);
			}
		);
	});
}