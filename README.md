# Kevin Ghost Theme

This is the theme for Ghost using at [https://www.dungps.com](https://www.dungps.com)

![screenshot-desktop](assets/img/screenshot-desktop.png)

# Installation

- [Sharethis button](docs/sharethis.md)
- [Facebook comment](docs/comment.md)

# Development

These theme styles are compiled using Gulp/PostCSS to polyfill future CSS specs. You will need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com/) installed globally. After that, from the theme's folder:

```shell script
# install dependencies
yarn install

# run development server
yarn dev
```

Now you can using [TailwindCSS](https://tailwindcss.com/) class or edit `assets/css` files, which will be compiled to `assets/built` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```shell script
yarn zip
```

# PostCSS Features Used

-   Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
-   TailwindCSS - A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

# Copyright & License

Copyright (c) 2022 Kevin Pham - Released under the [MIT license](LICENSE).
