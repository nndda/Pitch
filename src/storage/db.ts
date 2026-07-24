import {
  Dexie,
  liveQuery,
} from "dexie";

import type {
  EntityTable,
  UpdateSpec,
  InsertType,
  IndexableType,
} from "dexie";

import { currentProject } from "../states/storage.svelte";

// Projects/workspaces schema
export interface ProjectsDB {
  name: string,
  desc: string,

  scope: Scope,

  // Favourited components
  faves: RecordBoolean,
  // Selected components
  components: Record<string, RecordBoolean>,

  theme: {
    text_col: string,
    link_col: string,

    background: string,

    font_family: string,
  },

  inputs: Record<string, string>,

  app: {
    uiState: RecordBoolean,

    settings: {
      css: {
        minify: boolean,
        isolateCommentSection: boolean,
      },

      app: {
        autoCopy: boolean,
        showHomeTips: boolean,

        sidebar: {
          showScopeColor: boolean,
          showPlzzz: boolean,
          showSelectedCount: boolean,
          showFavedBadge: boolean,
          showWipComps: boolean,
          showWipPages: boolean,
          categoryActionOnHover: boolean,
        },
      },
    },
  },
}

export const
  projectDefault: ProjectsDB = Object.freeze({
    name: "New Project",
    desc: "My epic project",

    scope: "project",

    faves: {},
    components: [
      "Components",
      "Decorations",
      "Tweaks",
    ].reduce((prev, current) => {
      prev[current] = {};

      return prev;
    }, {} as Record<string, RecordBoolean>),

    theme: {
      text_col: "#eaeaea",
      link_col: "#fc3a78",
      background: "#171620",
      font_family: "Lato",
    },

    inputs: {},

    app: {
      uiState: {},

      settings: {
        css: {
          minify: true,
          isolateCommentSection: true,
        },

        app: {
          autoCopy: false,
          showHomeTips: true,

          sidebar: {
            showScopeColor: false,
            showPlzzz: true,
            showSelectedCount: true,
            showFavedBadge: false,
            showWipComps: false,
            showWipPages: false,
            categoryActionOnHover: false,
          },
        },
      },
    },
  })

,  db = new Dexie("PitchProjects") as Dexie & {
    projects: EntityTable<
      ProjectsDB,
      "name"
    >
  }
;

db
  .version(1)
  .stores({
    projects: Object.keys(projectDefault).join(", "),
  })
;

export const
  projectArr = liveQuery(() => db.projects.toArray())
, projectCount = liveQuery(() => db.projects.count());
;

export async function getProject() {
  return await db.projects.get(currentProject.get());
}

export const project = liveQuery(() => db.projects.get(currentProject.get()));
export async function projectUpdate(
  update: (
    UpdateSpec<InsertType<ProjectsDB, "name">>
      |
    ((obj: ProjectsDB, ctx: {
       value: any;
       primKey: IndexableType;
    }) => void | boolean)
    //   | // o boi...
    // any
  )
) {
  return await db.projects.update(currentProject.get(), update);
}

export async function init(): Promise<void> {
  // Set default project if there's none
  if ((await db.projects.count()) === 0) {
    try {
      const id = await db.projects.add({...projectDefault});
    } catch(err) {

      // TODO: more proper err handling
      console.error(err);
    }
  }
}
