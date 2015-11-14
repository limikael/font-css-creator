var WoffParser = require("woff-parser");
var Woff2Parser = require("woff2-parser");
var Thenable = require("tinp");
var path = require("path");
var fs = require("fs");

/**
 * Create css definitions for loading woff and woff2 fonts.
 * @class FontCssCreator
 */
function FontCssCreator() {
	this.fontDatas = [];
}

module.exports = FontCssCreator;

/**
 * Get font datas.
 * @method getFontDatas
 */
FontCssCreator.prototype.getFontDatas = function() {
	return this.fontDatas;
}

/**
 * Get loaded font families.
 * @method getFontFamilies
 */
FontCssCreator.prototype.getFontFamilies = function() {
	var families = [];

	for (var i = 0; i < this.fontDatas.length; i++) {
		var family = this.fontDatas[i].fontFamily;
		if (families.indexOf(family) < 0)
			families.push(family);
	}

	return families;
}

/**
 * Get css definition related to a family.
 * @method getCssForFamily
 */
FontCssCreator.prototype.getCssForFamily = function(family) {
	var datas = this.getFontDatasForFamily(family);
	var css = "";

	css += "/* " + family + " */\n";
	css += "@font-face {\n";
	css += "  font-family: '" + family + "';\n";
	css += "  font-style: 'normal';\n";
	css += "  font-weight: " + datas[0].weight + ";\n";
	css += "  src:\n";

	for (var i = 0; i < datas.length; i++) {
		var basename = path.basename(datas[i].fileName);
		var format = path.extname(datas[i].fileName).replace(".", "");

		css += "    url('" + basename + "') format('" + format + "')";

		if (i == datas.length - 1)
			css += ";\n";

		else
			css += ",\n";
	}

	css += "}\n";

	return css;
}

/**
 * Get relevant font data for a given family.
 * @method getFontDatasForFamily
 */
FontCssCreator.prototype.getFontDatasForFamily = function(family) {
	var datas = [];

	for (var i = 0; i < this.fontDatas.length; i++) {
		if (family == this.fontDatas[i].fontFamily)
			datas.push(this.fontDatas[i]);
	}

	return datas;
}

/**
 * Parse a font file and add data to the definition.
 * @method parseFontFile
 */
FontCssCreator.prototype.parseFontFile = function(fontFile) {
	var thenable = new Thenable();
	var parser;

	if (path.extname(fontFile) == ".woff")
		parser = WoffParser;

	else if (path.extname(fontFile) == ".woff2")
		parser = Woff2Parser;

	else {
		thenable.reject("Unknown font format: " + path.extname(fontFile))
		return thenable;
	}

	var fontFileContents = fs.readFileSync(fontFile);
	parser(fontFileContents).then(
		function(res) {
			var spec = res.name.nameRecords.English;

			//console.log(res);
			//console.log(spec);

			var fontData = {
				fontFamily: spec.fontFamily,
				fontSubFamily: spec.fontSubFamily,
				fileName: fontFile,
				weight: res["OS/2"].weight.value
			}

			this.fontDatas.push(fontData);

			thenable.resolve();
		}.bind(this),
		function(err) {
			thenable.reject(err);
		}
	);

	return thenable;
}

/**
 * Parse multiple font files.
 * @method parseFontFiles
 */
FontCssCreator.prototype.parseFontFiles = function(fontFiles) {
	this.loadingThenable = new Thenable();
	this.loadingFiles = fontFiles;
	this.loadingIndex = 0;

	var t = this.loadingThenable;

	this.loadNextFontFile();

	return t;
}

/**
 * Load next font file.
 * @method loadNextFontFile
 * @private
 */
FontCssCreator.prototype.loadNextFontFile = function() {
	if (this.loadingIndex >= this.loadingFiles.length) {
		var t = this.loadingThenable;
		this.loadingThenable = null
		t.resolve();
		return;
	}

	this.parseFontFile(this.loadingFiles[this.loadingIndex]).then(
		function() {
			this.loadingIndex++;
			this.loadNextFontFile();
		}.bind(this),
		function(e) {
			this.loadingThenable.reject(e);
		}.bind(this)
	);
}

/**
 * Get css.
 * @method getCss
 */
FontCssCreator.prototype.getCss = function() {
	var families = this.getFontFamilies();
	var css = "";

	for (var i = 0; i < families.length; i++) {
		if (i)
			css += "\n";

		css += this.getCssForFamily(families[i]);
	}

	return css;
}

/**
 * Get info.
 * @method getInfo
 */
FontCssCreator.prototype.getInfo = function() {
	return {
		"families": this.getFontFamilies(),
		"url": this.cssFileName
	};
}

/**
 * Save info.
 * @method saveInfo
 */
FontCssCreator.prototype.saveInfo = function(infoJsonFileName) {
	var json = JSON.stringify(this.getInfo(), null, 2);
	fs.writeFileSync(infoJsonFileName, json);
}

/**
 * Save css.
 * @method saveCss
 */
FontCssCreator.prototype.saveCss = function(cssFileName) {
	this.cssFileName = path.basename(cssFileName);
	fs.writeFileSync(cssFileName, this.getCss());
}