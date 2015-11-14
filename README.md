font-css-creator
================

Generate css files suitable to load woff and woff2 fonts.

Background
----------

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
which lets you download the woof and woof2 files for the fonts you want.
But what about the css file? You can of course code
this by hand, but what if you would like to automate the process?

