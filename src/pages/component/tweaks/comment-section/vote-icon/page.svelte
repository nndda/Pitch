<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage } from "../../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    Add icons for upvotes and downvotes on comment posts.
  </p>

  <figure>
    <img src="./assets/tweaks/comment-votes-2.png" alt="" width="465"/>
    <figcaption>
      A comment block, before (top), and after (bottom) the tweak is applied.
    </figcaption>
  </figure>

  <blockquote class="custom-callout">
    <h4>Icon Color</h4>

    <p>
      The <q>Link</q> color from your project page's theme will be used to fill the icon. Overriding any color on it.
    </p>
  </blockquote>

  <figure>
    <img src="./assets/tweaks/comment-votes-up.png" alt="" width="465"/>
    <figcaption>
      A comment with 26 upvotes.
    </figcaption>
  </figure>

  <figure>
    <img src="./assets/tweaks/comment-votes-down.png" alt="" width="465"/>
    <figcaption>
      A comment with 5874 downvotes.
    </figcaption>
  </figure>

</ComponentPage>
