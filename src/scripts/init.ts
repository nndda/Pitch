// import { switchContext } from "../states/storage.svelte";
// import { toast } from "../scripts/toast";
// import { settings } from "../states/storage.svelte";

// const
//   params = new URLSearchParams(window.location.search)
// , projectContext = params.get("context.project")
// , resetRequest = params.get("reset")
// , newRequest = params.get("new")
// ;

// if (newRequest) {
//   const
//     name = params.get("name") ?? ""
//   , url = params.get("url") ?? ""
//   ;
//   if (projects.state[name]) {
//     toast("Failed to create project!", {
//       duration: 7500,
//     });
//   } else {
//     toast(`Project "${name}" created!`, {
//       duration: 7500,
//     });
//   }
// }

// if (projectContext) {
//   switchContext(projectContext);
//   // contextProjects
//   // window.location.href = window.location.href;
// }
