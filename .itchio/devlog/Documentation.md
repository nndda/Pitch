# Getting started

Make sure you have the components' CSS applied to your page. Download it from the [main page](https://nnda.itch.io/page-components), or directly copy it from [here](https://github.com/nndda/itchio-css/tree/main/components).

You can use one of the CSS files:
- `components.min.css`
  - Compressed, non-readable but smallest in file size. Use this if you want to use all of the components.
- `components.alt.css`
  - Semi-compressed, non-readable, but you still can exclude each components. Use this if you only want to use some of the components.
- `components.css`
  - Uncompressed, and commented. Use this if you want to customize the CSS further, or make your own version.

Copy the file's content, and paste it in your page's custom CSS. Its located at the bottom of the theme editor sidebar.

Go to your project's edit page. Edit the content/description in HTML mode. And follow the guides for each components below. or copy-paste the sample codes for a quick start.

> `Important note:` once you edit your page's content in HTML mode, Its best to keep using HTML mode in the future to avoid messing up the layout.

> `Limitation:` You can use these in any project pages, jam pages, and devlogs. But for now, these components **can't be used in profile pages**, due to some color variables that does not exist in profile pages. e.g 'Button color'

<br>
<hr>

# Accordion

Turns walls of texts into list of collapsable contents. It's basically just a prettified list of `<details>` elements. [Click here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) for more *details*.

Add class `custom-accrd` to a `<div>` element, containing a number of `<details>` with `<summary>`.

Accordions are center-aligned by default. To align it to the left or right, add another class `custom-left` or `custom-right`

You can also add `custom-full_w` class to make it takes up the entire width of the page.

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
<hr>

# Credits

Give attribution or credits with a nice layout (can be repurposed to any other 2 column layout too). Designed to be consistent with itch.io's 'More information' panel.

Add class `custom-crdt` to a `<div>`

And add a pair of `<div>` for each row/category

```html
<div class="custom-crdt">

  <div>Arts and Visuals</div>
  <div>
    <a href="https://itch.io/">Amazing artist</a>
  </div>

  <div>Story</div>
  <div>
    <a href="https://itch.io/">Wonderful writer</a>
  </div>

  <div>Codes</div>
  <div>
    <a href="https://itch.io/">Creative coder</a>
    <a href="https://itch.io/">Proficient programmer</a>
  </div>

</div>
```
Result:
<div class="custom-crdt">

  <div>Arts and Visuals</div>
  <div>
    <a href="https://itch.io/">Amazing artist</a>
  </div>

  <div>Story</div>
  <div>
    <a href="https://itch.io/">Wonderful writer</a>
  </div>

  <div>Codes</div>
  <div>
    <a href="https://itch.io/">Creative coder</a>
    <a href="https://itch.io/">Proficient programmer</a>
  </div>

</div>

<br>
<hr>

# Inputs

Represent the keyboard inputs, controls, or any buttons. Unlike other components, Inputs don't make use of custom classes, instead it styles the `<kbd>` html tags directly.

Wrap the keyboard's input text with `<kbd>` tags

```html
<kbd>Z</kbd> <kbd>X</kbd>, <kbd>Ctrl</kbd> + <kbd>C</kbd>
```
Result: <kbd>Z</kbd> <kbd>X</kbd>, <kbd>Ctrl</kbd> + <kbd>C</kbd>

<br>
<hr>

# Labels

Highlight genres, tags, tools, or jam. Can be applied to hyperlinks or plain text. You can use emoji or unicode symbols too. Available in 2 variants: default and tags.

Add `custom-lb` or `custom-tag` class on any inline elements, such as `<a>`, `<b>`, `<i>`, or `<span>`.

```html
<a class="custom-lb" href="https://example.com">Some link</a>
<b class="custom-lb">Pixel Art</b>
<b class="custom-tag">Free</b>
```
Result: 
<a class="custom-lb" href="https://example.com">Some link</a>
<b class="custom-lb">Pixel Art</b>
<b class="custom-tag">Free</b>

Since its an inline element, you can also put Labels <i class="custom-lb">inbetween</i> lines of text or paragraph. If you used it inbetween lines of text, its best to wrap the text body inside `<p>`.

<br>
<hr>

# Spoiler
Hide any lines of text. Hover over it, to show the content. Can be applied to any inline element. Its also the only one component that only used 1 CSS rule.

Wrap the text you want to hide with `<span>` (or any inline elements) and add `custom-hd` class to it.

```html
Fully visible text and
<span class="custom-hd">not so visible text</span>
(unless you hover over it).
```
Result:

Fully visible text and
<span class="custom-hd">not so visible text</span>
(unless you hover over it).

<br>
<hr>

### Excluding/including components

Each components is contained within a block of comments. You can delete or copy the CSS codes starting from

`/***** COMPONENT NAME - START *****/`

to

`/***** COMPONENT NAME - END *****/`

Example with `components.alt.css`
![](https://img.itch.zone/aW1nLzEzMTc1Mzk4LnBuZw==/original/rKrhxM.png)

> Not applicable if you used `components.min.css`

<br>
<hr>

For bugs and feature request, you can open issue at the [GitHub repository](https://github.com/nndda/itchio-css/issues).