# Sass

Syntactically Awesome Style Sheets.  
A Cascading Style Sheet extension "language".  
A Pre-Processor: Work in a `*.scss` file, and the sass preprocessor tool will convert the syntax into browser-usable `*.css`.

- [Sass](#sass)
  - [Unique Features](#unique-features)
    - [Variable](#variable)
    - [Nesting](#nesting)
    - [Partials](#partials)
    - [Mixins](#mixins)
    - [Inheritance](#inheritance)

## Unique Features

### Variable

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

```scss
%tile-shared {
  text-align: left;
  border: 1px solid rgb(125, 125, 125);
  border-radius: 4px;
}

.card {
  @extend %tile-shared;
}

.widget {
  @extend %tile-shared;
  box-shadow: none;
}

.tile {
  @extend %tile-shared;
  border-radius: 0;
}
```

Inheritance has a few parts in order to work as expected:

- the `%tile-shared` above is the "root" content to be shared
  - the key detail is the leading `%`
  - NOTE: if this value does not get used later on in a stylesheet, the contents are not converted into css
- the `@extend` keyword uses the contents in the `%tile-shared` - each prop in the root is appended to the classes of `card`, `widget`, and `tile`
- **this reduces the need for repetitive classNames**
  - one way repetitive contents can be addressed is storing css attr/val pairs in classes && re-using classnames across items. Here, though, the _attributes and values_ of the `tile-shared` get added to the `card` class (_example_) so that only the `card` class is needed to be added to an element to include the "root" contents
