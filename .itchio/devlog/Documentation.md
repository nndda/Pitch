# Getting started

Requirement:
  - Custom CSS access
  - Some HTML and CSS know-how

## Getting your custom CSS access

Contact [itch.io support](https://itch.io/docs/creators/design#the-itchio-theme-editor/custom-css) to request the CSS access. Please read the [CSS Customization Guide](https://itch.io/docs/creators/css-guide) first before proceeding.

## Applying the CSS

Download the file from the [main page](https://nnda.itch.io/pitch).

Use one of the CSS files provided:
- `components.min.css`
  - Compressed, non-readable. but smallest in size. Use this if you want to use all of the components.
- `components.alt.css`
  - Semi-compressed, non-readable. Use this if you only want to use some of the components.
- `components.css`
  - Uncompressed, and commented. Use this if you want to customize the CSS further, or make your own version.

Make sure you have the CSS applied to your page. Copy the file's content, and paste it in your page's custom CSS. Its located at the bottom of the theme editor sidebar.

Go to your project's edit page. Edit the content/description in HTML mode. And follow the guides for each components below. Copy-paste the sample codes provided for a quick start.

<blockquote class="custom-warn">
  <h3>&#9888; Important Note:</h3>
  <p>Once you edit your page's content in HTML mode, Its best to keep using HTML mode onward to avoid messing up the layout.</p>
</blockquote>

<blockquote class="custom-warn">
  <h3>&#9888; Limitations:</h3>
  <p>You can use these in any project pages, and devlogs. But for now, these components <mark><strong>can't be used in jam and profile pages,</strong></mark> due to some color variables limitations.</p>
</blockquote>

<blockquote class="custom-warn">
  <h3>&#128712; Best practice:</h3>
  <p>Always back up and save your html codes to a file, everytime you make a change.<br> Test your project's pages against multiple screen sizes, and in multiple browsers, including the <a target="_blank" href="https://itch.io/app">itch app</a> before publishing it.</p>
</blockquote>

<br>

## Accordion

Turn walls of texts into list of collapsable contents. It's basically just a styled list of `<details>` elements. [Click here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) for more *details*.

Add class `custom-accrd` to a `<div>` element, containing a number of `<details>` with `<summary>`.

Accordions are center-aligned by default. To align it to left or right, add another class `custom-left` or `custom-right`. Or you can add `custom-full-w` class instead to make it takes up the entire width of the page.

```
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

## Alert Box

Inform the visitors about a content warning, or about a technical issues like the one used above in this documentation.

Add `custom-warn` class to a `<blockquote>`, then add any heading (`<h1>` to `<h6>`) and a `<p>` inside the `<blockquote>`.

```
<blockquote class="custom-warn">

  <h3>&#9888; Alert Box Title</h3>
  <p>Alert Box contents/descriptions</p>

</blockquote>
```
Result:
<blockquote class="custom-warn">

  <h3>&#9888; Alert Box Title</h3>
  <p>Alert Box contents/descriptions</p>

</blockquote>

In that example above, I also added a ['Warning Sign'](https://symbl.cc/en/26A0) unicode symbol &#9888; (`&#9888;`) in the heading. You can use any emoji/unicode that suits your needs.

<br>

## Info List

Previously known as 'Credit' section, designed for.. well crediting and listing the people/assets used in your projects. But since its just a 2 column table, it can be repurposed to anything that make use of that layout.

Add class `custom-info-ls` to a `<div>`. And add a pair of `<div>` for each row/category. The second `<div>` can be filled with hyperlinks `<a>`, plain text, or even Label or Input.

```
<div class="custom-info-ls">

  <div>Arts and Visuals</div>
  <div>
    <a href="#">Amazing artist</a>
  </div>

  <div>Story</div>
  <div>
    <a href="#">Wonderful writer</a>
  </div>

  <div>Codes</div>
  <div>
    <a href="#">Creative coder</a>
    <a href="#">Proficient programmer</a>
  </div>

</div>
```
Result:
<div class="custom-info-ls">

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

## Input

Represent the keyboard inputs, controls, or any buttons. Unlike other components, Inputs don't make use of custom classes, instead it styles the `<kbd>` html tags directly.

Wrap the keyboard's input text with `<kbd>` tags

```
<kbd>Z</kbd>
<kbd>X</kbd>,
<kbd>Ctrl</kbd> + <kbd>C</kbd>
```
Result: <kbd>Z</kbd> <kbd>X</kbd>, <kbd>Ctrl</kbd> + <kbd>C</kbd>

<br>

## Label

Highlight genres, tags, tools, or jam. Can be applied to hyperlinks or plain text. You can use emoji or unicode symbols too. Available in 2 variants.

Add `custom-lb` or `custom-tag` class on any inline elements, such as `<a>`, `<b>`, `<i>`, or `<span>`.

```
<a class="custom-lb" href="#">Some link</a>
<i class="custom-lb">Pixel Art</i>
<b class="custom-tag">Free</b>
```
Result: 
<a class="custom-lb" href="https://itch.io">Some link</a>
<i class="custom-lb">Pixel Art</i>
<b class="custom-tag">Free</b>

Since its an inline element, you can also put Label <i class="custom-lb">inbetween</i> lines of text or paragraph. If you used it inbetween lines of text, wrap the text body inside `<p>` first.

If you used multiple Label, its best practice to wrap them inside a `div`. To align them, and add itch.io's built-in class for aligning text: `text-center` or `text-right` in their `div` container.

The 'tag' variant use itch's default font 'Lato' and has a constant `font-size` of 16px to avoid messing up the style. It may still display a bit of offset.

<br>

## Spoiler
Hide any lines of text. Hover over it, to show the content. Can be applied to any inline element. Its also the only component that only used 1 CSS rule.

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

# Excluding/including components

Each components is contained within a block of comments. You can delete or copy the CSS codes starting with the comment `/***** COMPONENT NAME - START *****/` to `/***** COMPONENT NAME - END *****/`

Example with `components.alt.css`:

![](https://img.itch.zone/aW1nLzEzMTc1Mzk4LnBuZw==/original/rKrhxM.png)

<blockquote class="custom-warn">
  <h3>&#9888; Important Note:</h3>
  <p>Since <code>components.min.css</code> removed all of the comments. You can't exclude the components with the method above. Use <code>components.css</code> or <code>components.alt.css</code> if you want to pick and choose your own components.</p>
</blockquote>

<br>
<hr>

Found a bug or typo in this documentation? want to request a new feature or component? open issue at the [GitHub repository](https://github.com/nndda/pitch-css/issues).