<script lang="ts">
  import { PreviewBlock } from "@elements";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Link Decoration — Socials"
  html={`
    <style>

      p.custom-social-links {
        display: flex;
        flex-wrap: wrap;
        place-content: center;
        gap: 1em;
        min-height: 110px;

        & span {
          flex-basis: 100%;
        }
      }

    </style>

    <p class="custom-social-links">
      <a href="https://bsky.app/profile/did:plc:iwluqzosr2cjuzldtanzewke" target="_blank">Bluesky</a>
      |
      <a href="https://twitter.com/nnda_dev" target="_blank">Twitter</a>
      |
      <a href="https://www.youtube.com/@nnda_dev/" target="_blank">YouTube</a>

      <span></span>

      <a href="https://ko-fi.com/nnda" target="_blank">Ko-fi</a>
      |
      <a href="https://www.patreon.com/nnda" target="_blank">Patreon</a>

    </p>
  `}
/>
