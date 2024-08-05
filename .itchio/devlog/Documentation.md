# Getting started

Requirement:
  - Custom CSS access
  - Some HTML and CSS know-how

## Getting your custom CSS access

Contact [itch.io support](https://itch.io/docs/creators/design#the-itchio-theme-editor/custom-css) to request the CSS access. Please read the [CSS Customization Guide](https://itch.io/docs/creators/css-guide) first before proceeding.

## Applying the CSS

Pick components of your choice in the [main page](https://nnda.itch.io/pitch). After that, click `'Copy CSS'` button. And paste it in your page's custom CSS. Its located at the bottom of the theme editor sidebar.

Go to your project's edit page. Edit the content/description in HTML mode. And follow the guides for each components below. Copy-paste the sample codes provided for a quick start.

<blockquote class="custom-adm">
  <h3>
    <img src="https://s2.svgbox.net/materialui.svg?ic=warning&color=fc3a78"> Important Note
  </h3>
  Once you edit your page's content in HTML mode, Its best to keep using HTML mode onward to avoid messing up the layout.
</blockquote>

<blockquote class="custom-adm">
  <h3>
    <img src="https://s2.svgbox.net/materialui.svg?ic=warning&color=fc3a78">
    Limitations
  </h3>
  You can use these in any project pages, and devlogs. But for now, these components <mark><strong>can't be used in jam and profile pages.</strong></mark>
</blockquote>

<blockquote class="custom-adm">
  <h3>
    <img src="https://s2.svgbox.net/materialui.svg?ic=info&color=fc3a78">
    Best practices &amp; tips
  </h3>
  <ul>
    <li>
      Always back up and save your html codes to a file, everytime you make a change.
    </li>
    <li>
      Use external code editor, like Sublime Text or Visual Studio Code for convenience like syntax highlighting, autocomplete, etc.
    </li>
    <li>
      Test your project's pages against multiple screen sizes, and in multiple browsers, including the <a target="_blank" href="https://itch.io/app">itch app</a> before publishing it.
    </li>
  </ul>
</blockquote>

<br>

## Accordion

Turn walls of texts into list of collapsable contents. It's basically just a styled list of `<details>` elements. Check the [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) page for more... *details*.

Add class `custom-accrd` to a `<div>` element, containing a number of `<details>` with `<summary>`.

Accordions are center-aligned by default. To align it to left or right, add another class `custom-left` or `custom-right`. Or you can add `custom-full-w` class instead to make it takes up the entire width of the page.

```html
<div class="custom-accrd">

  <details>
    <summary>
      Accordion Item 1
    </summary>
    Accordion content 1
  </details>
  
  <details>
    <summary>
      Accordion Item 2
    </summary>
    Accordion content 2
  </details>
  
  <details>
    <summary>
      Accordion Item 3
    </summary>
    Accordion content 3
  </details>
  
</div>
```
Result:
<div class="custom-accrd">

  <details>
    <summary>
      Accordion Item 1
    </summary>
    Accordion content 2
  </details>

  <details>
    <summary>
      Accordion Item 2
    </summary>
    Accordion content 2
  </details>

  <details>
    <summary>
      Accordion Item 3
    </summary>
    Accordion content 3
  </details>

</div>

<br>

## Callout

Tell the visitors about a content warning, or about a technical issues like the one used above in this documentation.

Add `custom-call` class to a `<blockquote>`, then add any heading (`<h1>` to `<h6>`) inside the `<blockquote>`.

```
<blockquote class="custom-adm">

  <h3>&#9888; Callout Title</h3>
  Callout contents/descriptions

</blockquote>
```
Result:
<blockquote class="custom-adm">

  <h3>&#9888; Alert Box Title</h3>
  Callout contents/descriptions

</blockquote>

In that example above, I also added a ['Warning Sign'](https://symbl.cc/en/26A0) unicode symbol &#9888; (`&#9888;`) in the heading. You can use any emoji/unicode that suits your needs.

Or, you can use your own image/icon by adding `<img>` tag inside the heading:

```
<blockquote class="custom-adm">

  <h3>
    <img src="https://s2.svgbox.net/files.svg?ic=sass&color=000000">
    Written in Sass
  </h3>
  All of the CSS components is written in Sass.

</blockquote>
```

<blockquote class="custom-adm">

  <h3>
    <img src="https://s2.svgbox.net/files.svg?ic=sass&color=000000">
    Written in Sass
  </h3>
  All of the CSS components is written in Sass.

</blockquote>

<br>

## Description List

Inform a game's input map, or credit attributions more clearly in your page. Do you have some more extra informations that the built-in `'more information'` section cant fit in? then this component is for you.

This component is a tweaks to the description list HTML element, that use 2 column layout. Read more about this element on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) or [W3School](https://www.w3schools.com/tags/tag_dl.asp).

Add a `<dl>` element, then add `<dt>` and `<dd>` for each row/category. `<dt>` is the title, and `<dd>` is the content/description.

```
<dl>

  <dt>Arts and Visuals</dt>
  <dd>
    <a href="#">Amazing artist</a>
  </dd>

  <dt>Story</dt>
  <dd>
    <a href="#">Wonderful writer</a>
  </dd>

  <dt>Codes</dt>
  <dd>
    <a href="#">Creative coder</a>
    <a href="#">Proficient programmer</a>
  </dd>

</dl>
```
Result:
<dl>

  <dt>Arts and Visuals</dt>
  <dd>
    <a href="#">Amazing artist</a>
  </dd>

  <dt>Story</dt>
  <dd>
    <a href="#">Wonderful writer</a>
  </dd>

  <dt>Codes</dt>
  <dd>
    <a href="#">Creative coder</a>
    <a href="#">Proficient programmer</a>
  </dd>

</dl>

<br>

## Input

Represent the keyboard inputs, controls, or any buttons.

Wrap the keyboard's input text with `<kbd>` tags.

```
<kbd>Z</kbd>
<kbd>X</kbd>,
<kbd>Ctrl</kbd> + <kbd>C</kbd>
```
Result: <kbd>Z</kbd> <kbd>X</kbd>, <kbd>Ctrl</kbd> + <kbd>C</kbd>

<br>

## Label

Highlight genres, tags, tools, or jam. Can be applied to hyperlinks or plain text. You can use emoji or unicode symbols too. Available in 2 variants.

This component is a custom class that can be added to any inline HTML elements. Add `custom-lb` class on any inline elements, such as `<a>`, `<b>`, `<i>`, or `<span>`.

```
<a class="custom-lb" href="#">Some link</a>
<i class="custom-lb">Pixel Art</i>
<b class="custom-lb">Free</b>
```
Result: 
<a class="custom-lb" href="https://itch.io">Some link</a>
<i class="custom-lb">Pixel Art</i>
<b class="custom-lb">Free</b>

Since its an inline element, you can also put Label <i class="custom-lb">inbetween</i> lines of text or paragraph. If you used it inbetween lines of text, wrap the text body inside `<p>` first.

If you used multiple Label, its best practice to wrap them inside a `div`. To align them, and add itch.io's built-in class for aligning text: `text-center` or `text-right` in their `div` container.

```
<div class="text-center">
  <b class="custom-lb">Some Game Jam 2024</b>
  <b class="custom-lb">#spooky</b>
</div>
```
Result:
<div class="text-center">
  <b class="custom-lb">Some Game Jam 2024</b>
  <b class="custom-lb">#spooky</b>
</div>

<br>

## Spoiler
Hide any lines of text. Hover over it, to show the content. Just like Label, Spoiler is just a custom class that can be applied to any inline element.

Wrap part of the text you want to hide with `<span>` (or any inline elements) and add `custom-hd` class to it.

```
Fully visible text and
<span class="custom-hd">not so visible text</span>
(unless you hover over it).
```
Result:

Fully visible text and
<span class="custom-hd">not so visible text</span>
(unless you hover over it).

<br>

# Table

<br>

<hr>

Found a bug in the app? typo in this documentation? want to request a new feature or component? open issue at the [GitHub repository](https://github.com/nndda/pitch-css/issues).