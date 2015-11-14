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

In this case, 
