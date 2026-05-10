<script>
  const props = $props();
  import { ComponentRef } from "../component/_template/components";
</script>

<div class="comp-cont {props.class ?? ""}">
  <div class="preview">
    <ComponentRef comp="Accordion"/>
  </div>

  <div class="custom-accrd">
    <p>
      This [PROJECT NAME] is licensed under
      <a href="#">
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
        <code>[username].itch.io</code>
      </p>
    </details>

    <p class="text-right">
      For more info, <a href="#">click here</a>.
    </p>
  </div>

</div>
