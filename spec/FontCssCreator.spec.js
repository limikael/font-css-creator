var FontCssCreator = require("../src/FontCssCreator");

describe("FontCssCreator", function() {
	it("can parse a font file", function(done) {
		var fontFile = __dirname + "/testfonts/open-sans-v13-latin-regular.woff";

		cssCreator = new FontCssCreator();
		cssCreator.parseFontFile(fontFile).then(function() {
			var fontFile = __dirname + "/testfonts/open-sans-v13-latin-regular.woff2";
			cssCreator.parseFontFile(fontFile).then(function() {
				expect(cssCreator.getFontFamilies()).toEqual(['Open Sans']);
				expect(cssCreator.getFontDatasForFamily("Open Sans").length).toEqual(2);

				done();
			});
		});
	});

	it("can parse several font files", function(done) {
		var fontFiles = [
			__dirname + "/testfonts/open-sans-v13-latin-300.woff",
			__dirname + "/testfonts/open-sans-v13-latin-300.woff2",
			__dirname + "/testfonts/open-sans-v13-latin-800.woff",
			__dirname + "/testfonts/open-sans-v13-latin-800.woff2",
			__dirname + "/testfonts/open-sans-v13-latin-regular.woff",
			__dirname + "/testfonts/open-sans-v13-latin-regular.woff2"
		];

		cssCreator = new FontCssCreator();
		cssCreator.parseFontFiles(fontFiles).then(function() {
			expect(cssCreator.fontDatas.length).toEqual(6);
			expect(cssCreator.getFontFamilies().length).toEqual(3);

			//console.log(cssCreator.fontDatas);
			//console.log(cssCreator.getCssForFamily("Open Sans"));

			console.log(cssCreator.getCss());
			done();
		});
	});
})