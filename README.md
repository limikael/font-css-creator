font-css-creator
================

Generate css files suitable to load woff and woff2 fonts.

The problem
-----------

The tool [WebFontLoader](https://github.com/typekit/webfontloader) is great! It is very easy to get it to use fonts loaded from e.g. Google Fonts,  you just need to do something like this:

```
WebFont.load({
    google: {
        families: ['Open Sans', 'Another Family']
    }
});
```

It is also possible to use it for loading self-hosted fonts, but this is slightly trickier. What you do is something like this:

```
WebFont.load({
    custom: { 
        families: ['Open Sans', 'Another Family'],
        urls: [ 'http://yourwebsite.com/styles.css' ]
    }
};
```

In this case, the urls given should point to css files looking something like this:

```
/* Open Sans */
@font-face {
  font-family: 'Open Sans';
  font-style: 'normal';
  font-weight: 400;
  src:
    url('open-sans-v13-latin-regular.woff') format('woff'),
    url('open-sans-v13-latin-regular.woff2') format('woff2');
}
```

These css files should then point out the actual font files you want to use.

There is an excellent tool called [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts)
which lets you download the woff and woff2 files for the fonts you want.

But what about the css file?
You can of course code it by hand, but what if you would like to automate the process?

Solution
--------

Given a number of woff or woff2, font-css-creator generates the .css files required to load them. It is available
both as command line tool and as a grunt task

Installation and usage
----------------------

You can install it globally using:

```
npm install -g font-css-creator
```

Then run `createfontcss` without any arguments to see its usage.

In order to use the grunt task, install it in your project with:

```
npm install --save-dev font-css-creator
```

And then configure a grunt task like this:

```
fontcss: {
	myfonts: {
		options: {
			css: "fonts.css",
			custom: "fonts.json"
		},
		files: [{
			expand: true,
			src: [
				"fontdir/*.woff",
				"fontdir/*.woff2"
			]
		}]
	}
}
```

This is self-explanatory (I hope) with the exception of the `custom` key under options. If this key is used,
then information will be saved in the specified file about which font families were found. You can
use this information to pass to WebFontLoader when loading your fonts.

Enjoy!
