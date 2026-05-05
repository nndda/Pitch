<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeHTML } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Turn walls of texts into list of collapsible contents. It’s basically just a styled list of <code>&lt;details&gt;</code> elements.
  </p>

  <CodeHTML html={`

    <div class="custom-accrd">
      <details>
        <summary>How do I get access to custom CSS in my game page?</summary>
        <p>
          You can contact itch.io support to enable the custom CSS feature.
        </p>
      </details>

      <details>
        <summary>Can I use this in a commercial project?</summary>
        <p>
          Absolutely! The generated CSS codes is licensed under <em>Creative Commons Zero v1.0 Universal</em>.
        </p>
      </details>

      <details>
        <summary>Why can't I use some of the components on profile or jam pages?</summary>
        <p>
          Some components make use of the page's theme. Unlike project page, profile page and jam page didn't have some of the required color variables needed for the components to be displayed correctly (e.g. button color).
        </p>
        <p>
          Though, for some components that offers customizations, you can set said customizations manually, and it'll be compatible for any itch.io pages!
        </p>
      </details>
    </div>

  `}/>

  <p>
    You can also add elements other than <code>&lt;details&gt;</code> directly inside <code>.custom-accrd</code>. Like a header or footer:
  </p>

  <CodeHTML html={`

    <div class="custom-accrd">
      <h2>Frequently Asked Questions</h2>

      <details>
        <summary>How do I get access to custom CSS in my game page?</summary>
        <p>
          You can contact itch.io support to enable the custom CSS feature.
        </p>
      </details>

      <details>
        <summary>Can I use this in a commercial project?</summary>
        <p>
          Absolutely! The generated CSS codes is licensed under <em>Creative Commons Zero v1.0 Universal</em>.
        </p>
      </details>

      <details>
        <summary>Why can't I use some of the components on profile or jam pages?</summary>
        <p>
          Some components make use of the page's theme. Unlike project page, profile page and jam page didn't have some of the required color variables needed for the components to be displayed correctly (e.g. button color).
        </p>
        <p>
          Though, for some components that offers customizations, you can set said customizations manually, and it'll be compatible for any itch.io pages!
        </p>
      </details>
    </div>

  `}/>

  <CodeHTML html={`

    <div class="custom-accrd">
      <p>
        This [PROJECT NAME] is licensed under
        <a href="">
          CC BY 4.0
        </a>
        <img alt="" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" width="20">
        <img alt="" src="https://mirrors.creativecommons.org/presskit/icons/by.svg" width="20">
      </p>

      <details>
        <summary>What you can and can't do</summary>

        <ul>
          <li>
            Use in commercial or non-commercial projects
          </li>
          <li>
            Modify, or adapt to your needs
          </li>
          <li>
            Redistribute and share
            <ul>
              <li>though, plz redistribute them as a part of a project, and not as an asset pack by itself</li>
            </ul>
          </li>
          <li>
            No AI or NFTs
          </li>
        </ul>
      </details>

      <details>
        <summary>How to give attribution</summary>

        <p>
          Provide link to my itch.io page:
          <code>&lt;username&gt;.itch.io</code>
        </p>
      </details>

      <p class="text-right">
        For more info, <a href="#">click here</a>.
      </p>
    </div>

  `}/>

  <h2>Aligning</h2>

  <p>
    Accordions are center-aligned by default. To align it to left or right, add another class <code>custom-left</code> or <code>custom-right</code>.
  </p>

  <CodeHTML html={`

    <div class="custom-accrd custom-left">
      <details>
        <summary>Left-aligned accordion</summary>
        <p>
          This accordion is aligned to the left.
        </p>
      </details>
    </div>

    <div class="custom-accrd custom-right">
      <details>
        <summary>Right-aligned accordion</summary>
        <p>
          This accordion is aligned to the right.
        </p>
      </details>
    </div>

  `}/>

  <h2>Sizing</h2>
  <p>
    Accordion has a default maximum width of 553px.
    <br>
    Add <code>custom-full-w</code> class to make it takes up the entire width of the page.
  </p>

  <CodeHTML html={`

    <div class="custom-accrd custom-full-w">
      <details>
        <summary>Full width accordion</summary>
        <p>
          This accordion takes full width of the page.
        </p>
      </details>
    </div>

  `}/>

  <p>
    Or adjust the width manually by overriding its <code>max-width</code> property.
  </p>

  <CodeHTML html={`

    <div class="custom-accrd" style="max-width: 500px;">
      <details>
        <summary>500px Accordion</summary>
        <p>
          This accordion has a maximum width of 500px.
        </p>
      </details>
    </div>

    <div class="custom-accrd" style="max-width: 400px;">
      <details>
        <summary>400px Accordion</summary>
        <p>
          This accordion has a maximum width of 400px.
        </p>
      </details>
    </div>

    <div class="custom-accrd" style="max-width: 300px;">
      <details>
        <summary>300px Accordion</summary>
        <p>
          This accordion has a maximum width of 300px.
        </p>
      </details>
    </div>

  `}/>

</ComponentPage>
