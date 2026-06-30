<script lang="ts">
  import { LabelScopes } from "../";

  const
    {
      componentData,
    }: {
      componentData: ComponentData,
    } = $props()

  , compName = componentData.nameDisplay ?? componentData.name
  ;
</script>

<h2>AMP incompatible label</h2>

<LabelScopes componentData={{
  scopeAMPincompatible: true,
}}/>

<blockquote class="custom-callout">
  <h3>Note</h3>
  <p>
    This only applies when you're using the component in devlog pages, and its only targetting mobile users.
  </p>
</blockquote>

<p>
  <b>{compName}</b> is incompatible with <a referrerpolicy="no-referrer" rel="nofollower noopener" href="https://en.wikipedia.org/wiki/Accelerated_Mobile_Pages" target="_blank">AMP</a> version of the devlog pages.
</p>

<p>
  More on this <a referrerpolicy="no-referrer" rel="nofollower noopener" href="https://nnda.itch.io/pitch/devlog/1565390/rewrite-release-2-long-overdue-devlog" target="_blank">here</a>.
</p>
