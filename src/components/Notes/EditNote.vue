<template>
  <section class="edit-note" @click="$store.commit('closeMenus')">
    <h2>Edit Note:</h2>
    <form @submit.prevent.stop="editNote">
      <input
        v-model="note.title"
        type="text"
        placeholder="Note Title"
        name="title"
        class="edit-title"
      />
      <textarea
        v-model="note.content"
        placeholder="Note Content"
        name="content"
        class="edit-textBody"
      ></textarea>
      <button class="default save" type="submit">Save</button>
    </form>
  </section>
</template>

<script>
export default {
  beforeCreate() {
    if (this.$store.state.notesLoaded) {
      this.$store.commit("setSelectedNote", { routeId: this.$route.params.id });
    } else {
      this.$store.dispatch("loadNotes", { routeId: this.$route.params.id });
    }
  },
  methods: {
    editNote() {
      const token = this.$store.state.token;

      if (token) {
        this.$store
          .dispatch("editNoteOnServer", {
            note: this.note
          })
          .then(() => this.$router.push(`/note/${this.note.id}`));
      } else {
        this.$store.commit("editLocalNote", {
          updatedNote: this.note
        });
        this.$router.push(`/note/${this.$route.params.id}`);
      }
    }
  },
  computed: {
    note() {
      const selectedNote = this.$store.state.selectedNote;
      return selectedNote === null ? { title: "", content: "" } : selectedNote;
    }
  }
};
</script>

<style lang="scss">
@import "../../mixins.scss";

section form {
  width: 95%;
  margin-left: 2.5%;
  margin-right: 2.5%;

  input,
  textarea {
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 1rem;
    width: 100%;
    padding: 1%;

    &:focus {
      border: 2px solid $theme-button-color;
    }
  }

  textarea {
    height: 250px;
  }

  .save {
    @include button-styles;
    width: 185px;
    font-size: 1.2rem;
  }
}

@media (min-width: 575px) {
  section form {
    max-width: 75%;
    margin-left: 2.5%;
    margin-right: auto;

    input,
    textarea {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 1000px) {
  section form {
    max-width: 1000px;
    margin-left: 5%;

    input,
    textarea {
      width: 75%;
    }
  }
}
</style>
