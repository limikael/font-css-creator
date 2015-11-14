#!/usr/bin/env node

var FontCssCreator = require("../src/FontCssCreator");
var minimist = require("minimist");

function usage() {
	console.log("createfontcss - Create css file suitable to load web fonts.");
	console.log("");
	console.log("Usage:");
	console.log("  createfontcss [options] <font files [...]>");
	console.log("");
	console.log("Options:");
	console.log("  --css=<filename.css>      - File to wirte css to.");
	console.log("                              Default is standard out.");
	console.log("  --custom=<filename.json>  - Create a json file containing");
	console.log("                              custom info for WebFontLoader.");
	console.log("");
	process.exit(1);
}

var args = minimist(process.argv.slice(2));

if (!args._.length)
	usage();

knownAgrs = ["css","custom"];

for (arg in args) {
	if (arg != "_" && knownAgrs.indexOf(arg) < 0) {
		console.log("Unknown argument: " + arg);
		process.exit(1);
	}
}

cssCreator = new FontCssCreator();

cssCreator.parseFontFiles(args._).then(
	function() {
		if (args.css) {
			cssCreator.saveCss(args.css);

			if (args.custom)
				cssCreator.saveInfo(args.custom);

			console.log("Wrote " + args.css);
		} else
			console.log(cssCreator.getCss());
	},
	function(err) {
		console.log(err);
		process.exit(1);
	}
)