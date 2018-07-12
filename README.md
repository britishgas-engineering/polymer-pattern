# Polymer-pattern

## Installation

```
npm i -g polymer-pattern
```

## About

 This is a project that allows you to easily create pattern libraries, with pure webcomponents using polymer (or lit). It bundles
 all of your components together with the needed polyfills so that you only need one js file (`dist/components.min.js`).

### Example structure

If we create a `hello-world` pattern library with a `primary-button` web component:

```
├─┬ hello-world
  ├─┬ src
  | └─┬ primary-button
  |   ├── component.js
  |   ├── story.js
  |   └── styles.less
  ├─┬ test
  | ├─┬ primary-button
  | | ├── primary-button_test.js
  | | └── primary-button_test.html
  | └── index.html
  └─┬ dist
    └─ components.min.js
```

To create this example:

```sh
 npm i -g polymer-pattern
 pattern new hello-world
 cd hello-world && npm i
 pattern g primary-button
 pattern build
```

## How to

### Create a new pattern library

```
  pattern new [name]
```

#### Options

 - type: polymer, lit (default: polymer)

 ```
  pattern new [name] --type lit
 ```

 After creating a new pattern you can:

 ```
  cd [name] && npm i
 ```

### Create a new component

 Inside your pattern repo

 ```
  pattern g [component-name]
 ```

 This will create a polymer or lit component (based on your `.pattern` type).
 It will also generate the `story.js`, `styles.less` and the test files.

### Delete a component

Inside your pattern repo

 ```
  pattern d [component-name]
 ```

### Build your library

Inside your pattern repo

```
 pattern build
```

In your `dist` folder will find the `components.min.js`

### Serve a component

 Inside your pattern repo

 ```
  pattern serve
 ```

 This will generate a storybook of all your component stories at `localhost:9001`

### Test your components

 Inside your pattern repo

 ```
  pattern test
 ```

### Create sketch files of components

Inside your pattern repo

```
 pattern sketch
```

This will output a `stories.asketch.json` file. You will need to install this sketch plugin [`asketch2sketch.sketchplugin`](https://github.com/brainly/html-sketchapp/releases/download/v3.3.1/asketch2sketch-3-3-1.sketchplugin.zip)

## Dependencies

 This uses a variety of other resources:

 - Polymer
 - Lit Element
 - Storybook
 - Story2sketch
 - Html-sketchapp