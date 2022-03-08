# Sass

Syntactically Awesome Style Sheets.  
A Cascading Style Sheet extension "language".  
A Pre-Processor: Work in a `*.scss` file, and the sass preprocessor tool will convert the syntax into browser-usable `*.css`.

## Unique Features

## Variable

```scss
// declaring the var
$border-color: rgb(100, 100, 100); // using the var

.custom-box {
  border: 1px solid $border-color;
}
```

This gets converted by the sass processor into

```css
.custom-box {
  border: 1px solid rgb(100, 100, 100);
}
```

### Nesting

```scss
// a wrapper component
.card {
  // a "child" header
  h3 {
    text-align: left;
    font-weight: bold;
  }
}
```

This gets converted by the sass processor into

```css
/* a wrapper component && its child header*/
.card h3 {
  text-align: left;
  font-weight: bold;
}
```

### Partials

```scss
// filename: _helpers.scss
$base-dark: rgb(25, 25, 25);
$base-mid: rgb(50, 50, 50);
$base: rgb(75, 75, 75);
```

A file like the above snippit _has & does_ a few things:

- leading `_`: this signals to the scss pre-processor that the file is indeed a "partial"
- partials don't get loaded as full css files by the processor
- the file can be used in other scss files

```scss
@use 'helpers';
.base {
  border: 1px solid $base;

  &-dark {
    border: 1px solid $base-dark;
  }
  &-mid {
    border: 1px solid $base-mid;
  }
}
```

### Mixins

```scss
@mixin theme($theme: White) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: white;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

Above, the "theme" mixin...

- looks and acts like a function in js
- applies 3 styles to an element: background, box-shadow, and color
- applies the theme prop to the background and the box-shadow values
- can take values in the fn param
- gets used in 3 classes
  - info (default)
  - alert (passes darkred as the theme color)
  - success (passes dark green as the theme color)

### Inheritance
