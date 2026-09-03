<script lang="ts">


</script>
<!-- TODO: EVERYTHING -->
<style lang="scss">
  @use "../../../styles/variables" as *;

  article {
    // & > iframe {
    //   width: 100% !important;
    // }

    & > h3 {
      color: unset !important;
    }
  }

  ul {
    padding-left: 0;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 1em;
  }

  li.item {
    padding-block: .75em;
    list-style: none;

    background: $background;
    padding: .75em 1em;

    & > a {
      color: $primary-light;
      font-weight: bold;
      font-size: 1.25em;
      text-decoration: none;
      // margin-left: -1.5em;
    }

    & > .author {
      display: inline-block;
      opacity: .8;
      // margin-left: -1.75em;
      margin-top: .3em;

      & > a {
        color: lightgray;
      }
    }

    & > p {
      padding-left: 1em;
    }
  }
</style>

{#snippet Item(
  name: string,
  url: string,
  authorName: string,
  authorUrl: string,
  desc: string = "",
)}
  {@const onItch = url.includes(".itch.io/")}

	<li
	  class="item"
		class:on-itch={onItch}
	>
	  <a href="https://{url}" target="_blank" rel="nofollow noopener">
     	<span class="icon">
        {#if onItch}
         	<i class="fa-brands fa-itch-io"></i>
        {:else}
          <i class="fa-solid fa-up-right-from-square"></i>
        {/if}
     	</span>

	    {name}
	  </a>
			<br>
			<span class="author">
	      <i class="fa-solid fa-user"></i>
     	  <a href="https://{authorUrl}" target="_blank" rel="nofollow noopener">
     	    {authorName}
     	  </a>
			</span>


		{#if desc}
  		<p>
  		  {desc}
  		</p>
		{/if}
	</li>
{/snippet}

<article>

  <p>
    Below are some collections of more CSS-related resources.
  </p>

  <h1>More Resources</h1>

  <br/>

  <h2>Articles</h2>
  <hr/>

  <ul>
    {@render Item(
      "itch.io's HTML basement",
      "speakthesky.itch.io/itchios-html-basement",
      "Speak the Sky",
      "speakthesky.itch.io",
      `Comprehensive documentation of the HTML elements usage on itch.io pages. It goes to the specifics, and the nitty-gritty of it too.`
    )}
    {@render Item(
      "Better creator pages at itch.io",
      "comigo.itch.io/better-creator-pages",
      "Cosmo Myzrail Gorynych",
      "comigo.itch.io",
      `Layouting tutorials and guides to tidy ups your projects and collections on your profile page.`
    )}
  </ul>

  <br/>

  <h2>Themes &amp; Templates</h2>
  <hr/>

  <p>
    Pre-made, opinionated components, templates, &amp; even full-on themes.
  </p>

  <h3>
    Themes
  </h3>

  <ul>
    {@render Item(
      "Profile Themes",
      "gamesprinter.itch.io/profile-themes",
      "DutraBR98",
      "gamesprinter.itch.io",
      `Various premade profile page themes.`
    )}
  </ul>

  <h3>
    Components
  </h3>

  <ul>
    {@render Item(
      "Mascot Testimonial CSS for itch.io",
      "makevisualnovels.itch.io/mascot-testimonial-css-for-itchio",
      "Stella @ MakeVisualNovels",
      "makevisualnovels.itch.io",
      `Have your OC yap about your project right on your profile page..`
    )}

    {@render Item(
      "Content Warning Generator for itch.io",
      "npckc.itch.io/content-warning-generator",
      "npckc",
      "npckc.itch.io",
      `Smol tool to generate custom content warning for your project page.`
    )}
  </ul>

  <br/>

  <h2>Supporting Assets</h2>
  <hr/>

  <p>
    CSS alone sometimes isn't enough for your page.
    Below are some neat non-CSS assets and tools (to create non-CSS assets), for your CSS-enhanced page.
  </p>

  <h3>
    Icons
  </h3>

  <ul>
    {@render Item(
      "Human Made Icon Pack",
      "hinokodo.itch.io/human-made",
      "HINOKODO",
      "hinokodo.itch.io",
      `For human by human.`
    )}
  </ul>

  <h3>Others</h3>

  <ul>
    {@render Item(
      "Fantasy UI Borders",
      "kenney-assets.itch.io/fantasy-ui-borders",
      "Kenney",
      "kenney-assets.itch.io",
    )}
  </ul>

</article>
