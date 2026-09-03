import Home from "../pages/home.svelte";

export function unselectSidebarPage(): void {
  const
    currentPageList = document.querySelector(`input[name="page-view"]:checked`) as HTMLInputElement | null
  ;

  if (currentPageList) {
    currentPageList.checked = false;
  }
}

const homeData: PageData = {
  title: "Home",
  content: async () => Home,
  icon: "fa-solid fa-house",
}

export const currentPage: PageData = $state({
  ...homeData,
});

export function goToHome() {
  currentPage.title = homeData.title;
  currentPage.content = homeData.content;
  currentPage.icon = homeData.icon;
}

export function goToPage(page: PageData) {
  currentPage.title = page.title;
  currentPage.content = page.content;
  currentPage.componentData = page.componentData;
  currentPage.icon = page.icon;
  currentPage.attr = page.attr;
}
