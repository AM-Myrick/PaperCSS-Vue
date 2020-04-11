import Vue from "vue";
import VueRouter from "vue-router";
import AllNotes from "./components/Notes/AllNotes.vue";
import NewNote from "./components/Notes/NewNote.vue";
import EditNote from "./components/Notes/EditNote.vue";
import SingleNoteView from "./components/Notes/SingleNoteView.vue";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: AllNotes },
    { path: "/add-note", component: NewNote },
    { path: "/edit/:id", component: EditNote },
    { path: "/note/:id", component: SingleNoteView }
  ]
});

export default router;
