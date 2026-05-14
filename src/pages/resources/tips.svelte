<script lang="ts">
  import { tips } from "./tips";

  const
    tipsArr: {
      cat: string,
      icon: string,
      item: string,
    }[] = Object.entries(tips).flatMap(
      ([cat, { icon, items }]) =>
        items.map((item) => ({
          cat,
          icon,
          item,
        }))
    )
  , len = tipsArr.length
  ;

  let currentId = $state(Math.floor(Math.random() * len));
</script>

<style lang="scss">
  @use "../../styles/variables" as *;

  @use "sass:color";

  .tips {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 300px;
    min-height: 200px;

    border-radius: 6px;

    padding: 1.1em;

    background: $background-dark;

    & > small {
      margin: 0;
      margin-bottom: .5em;
      color: rgba($accent, .5);
      font-size: .9em;
    }

    & > p {
      margin-top: .5em;
    }
  }
  .tips-desc {
    flex-grow: 1;
  }
  .control {
    text-align: right;
  }
</style>

<div class="tips">
    <small>
      <i class="fa-solid fa-circle-info"></i>
      Tips
    </small>

    <h3>
      <i class="{tipsArr[currentId].icon}"></i>
      {tipsArr[currentId].cat}
    </h3>

    <p class="tips-desc">
      {@html tipsArr[currentId].item}
    </p>

    <div class="control">
      <button
        class="icon-only"
        aria-label="Previous"
        onclick={() => {
           currentId = (((currentId - 1) % len) + len) % len
        }}
      >
        <i class="fa-solid fa-circle-arrow-left"></i>
      </button>

      <span>
        {currentId + 1} of {len}
      </span>

      <button
        class="icon-only"
        aria-label="Next"
        onclick={() => {
           currentId = (((currentId + 1) % len) + len) % len
        }}
      >
        <i class="fa-solid fa-circle-arrow-right"></i>
      </button>
    </div>
</div>
