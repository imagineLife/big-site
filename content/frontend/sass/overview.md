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

### Mixins

### Inheritance
