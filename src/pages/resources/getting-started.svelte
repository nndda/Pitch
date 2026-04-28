<style lang="scss">
  .steps-list {
    counter-reset: step;
    position: relative;

    & > li {
      position: relative;
      counter-increment: step;
      list-style: none;
      padding-bottom: 1em;

      &::before {
        position: absolute;
        top: -.2em;
        left: -1em;
        content: counter(step);
        font-size: 2.5em;
        font-family: Ubuntu;
      }
      /* &::marker {
      } */
    }
  }
</style>

<article>

  <p>This page contains step-by-step walkthrough on how to use the app, and apply the components to your page.</p>

  <br>

  <h2>Requirements</h2>

  <ul class="custom-ul">
    <li>Some CSS + HTML knowledge.</li>

    <li>
      Custom CSS access on your itch.io account.
      <ul>
        <li>Contact <a href="https://itch.io/docs/creators/design#the-itchio-theme-editor/custom-css" target="_blank" rel="nofollow noopener noreferrer" referrerpolicy="no-referrer">itch.io support</a> to request the CSS access.
          <br>
          Please read the <a href="https://itch.io/docs/creators/css-guide" target="_blank" rel="nofollow noopener noreferrer" referrerpolicy="no-referrer">CSS Customization Guide</a> first before proceeding. </li>
      </ul>
    </li>
  </ul>

  <br>

  <h2>Getting The Components</h2>

  <br>

  <ol class="steps-list">
    <li>
      <h3>Browse the components</h3>
      <p>
        On the right sidebar, click the component's name to see its preview and documentation page.
      </p>
      <p>
        Copy the HTML codes on one of the component preview, via the <button aria-label="Copy button"><i class="fa-solid fa-copy"></i></button> button.
      </p>
      <p>
        You can also edit and experiment around with the HTML directly in-app, via the <button aria-label="Edit HTML button"><i class="fa-solid fa-code"></i></button> button.
      </p>
    </li>

    <li>
      <h3>Paste the HTML to your page's description content</h3>
      <p>
        Go to your project's edit page, and switch to HTML mode before pasting the code.
      </p>
      <blockquote class="custom-callout">
        <h4>
          <i class="fa-solid fa-warning"></i>
          Note on pasting
        </h4>
          Paste using <kbd>Ctrl</kbd> + <kbd>V</kbd>.
          If you're using <kbd>Right click</kbd> > <kbd>Paste</kbd> instead, the changes to your page's content might not registered when you clicked the <kbd>Save</kbd> button.
      </blockquote>
    </li>

    <li>
      <h3>Pick your components</h3>
      <p>
        In the app, tick the checkboxes besides the component's names that you wish to add.
      </p>
      <p>
        After that, click the <button><i class="fa-solid fa-copy icon"></i>Copy</button> button at the bottom of the sidebar.
      </p>
      <blockquote class="custom-callout">
        <h4>
          <i class="fa-solid fa-question-circle"></i>
          Unable to copy?
        </h4>
          Click the <button><i class="fa-solid fa-eye icon"></i>View</button> button, and select and copy the CSS codes manually.
      </blockquote>
    </li>

    <li>
      <h3>Paste the CSS to your page's theme</h3>
      <p>
        Go to your project/profile/jam page, click the <kbd>Edit theme</kbd> button, and scroll down in the theme editor. Paste the CSS you copied to the <kbd>Custom CSS</kbd> field, and press <kbd>Save</kbd>.
      </p>
    </li>
  </ol>

  <br>

  <h2>Best Practices & Tips</h2>
  <ul class="custom-ul">
    <li> Always back up and save your HTML &amp; CSS codes to a file, everytime you make changes. </li>
    <li>Utilize your browser's developer tools.</li>
    <li> Use external code editor, like Neovim, Sublime Text, or Visual Studio Code to get the advantages like syntax highlighting, autocompletion, etc. </li>
    <li> Test your project's page against multiple screen sizes, and on multiple browsers, including the <a href="https://itch.io/app" target="_blank" rel="nofollow noopener noreferrer" referrerpolicy="no-referrer">itch app</a> before publishing it. </li>
  </ul>

</article>
