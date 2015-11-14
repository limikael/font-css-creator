var FontCssCreator = require("../src/FontCssCreator");

module.exports = function(grunt) {
	grunt.registerMultiTask("fontcss", "Generate css for web fonts", function() {
		var done = this.async();

		var options = this.options({
			css: "out.css"
		});

		var fontFiles = [];

		if (this.files) {
			this.files.forEach(function(file) {
				fontFiles = fontFiles.concat(file.src);
			});
		}

		cssCreator = new FontCssCreator();
		cssCreator.parseFontFiles(fontFiles).then(
			function() {
				cssCreator.saveCss(options.css);

				if (options.custom)
					cssCreator.saveInfo(options.custom);

				grunt.log.ok(
					"Parsed " + cssCreator.getFontDatas().length +
					" font file(s), found " + cssCreator.getFontFamilies().length +
					" font(s), created " + options.css);
				done();
			},
			function(err) {
				grunt.fail.fatal(err);
			}
		);
	});
}