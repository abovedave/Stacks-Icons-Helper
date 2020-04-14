# Stacks Icon Helper

This package provides a front-end JavaScript file which will let you use [Stacks Icons](https://stackoverflow.design/product/resources/icons/) from [Stack Overflow's design system](https://stackoverflow.design).

N.B. This is not intented to be used in production.

## Usage

```html
<svg class="svg-icon iconUnorderedList"></svg>
```

This package looks out for `svg-icon` and `icon*`. If the icon doesn't exist in Stacks, nothing happens. Any other classes will be passed to the included SVG e.g., `native`

## Replacing with `@Svg` helper

Find
```<svg class="svg-icon icon(.+?) (.+?)"></svg>```

Replace
```@Svg.$1.With("$2")```

## Building

If there is a new version of Stacks, first update (after navigating to the project, of course):

1. `npm update`
2. `npm run build`

You should get an output similar to:

> Successfuly built with 227 icons