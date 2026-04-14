import slugify from "slugify";

// export interface ToCData {
//   level: string,
//   id: string,
// }

// TODO: find if there's a more Svelte-y approach to this

function createLi(hEl: HTMLHeadingElement, idPref: string): HTMLLIElement {
  const
    li = document.createElement("li")
  , liLink = document.createElement("a")
  , id = slugify( `${idPref}-${hEl.textContent}`, { lower: true, strict: true, }, )
  ;

  // hEl.id = id;
  hEl.setAttribute("toc-id", id);

  liLink.href = "#" + id;
  liLink.classList.add("button");
  liLink.textContent = hEl.textContent;
  liLink.addEventListener("click", (): void => {

    hEl.scrollIntoView({
      behavior: "smooth",
    });

  });

  li.classList.add(hEl.tagName);
  li.appendChild(liLink);

  return li;
}

export function generateToC(tocContentContainer: HTMLUListElement, pageTitle: string): void {

  // Not very sure which one's better
  tocContentContainer.textContent = "";
  // tocContentContainer.innerHTML = "";

  // tocContentContainer.appendChild()

  // const ToCDataArr: ToCData[] = [];

  (
    document
      .querySelectorAll(":is(#wrapper, #wrapper > article) > :is(h1, h2, h3, h4, h5, h6)") as NodeListOf<HTMLHeadingElement>
  ).forEach((hEl: HTMLHeadingElement): void => {
    tocContentContainer.appendChild(createLi(hEl, pageTitle));
  });


  // return ToCDataArr;
}
