<template>
  <section class="new-note" @click="$store.commit('closeMenus')">
    <h2>Create New Note:</h2>
    <form @submit.prevent.stop="addNote">
      <input
        v-model="note.title"
        type="text"
        placeholder="Note Title"
        name="title"
        class="new-title"
      />
      <textarea
        v-model="note.content"
        placeholder="Note Content"
        name="content"
        class="new-textBody"
      ></textarea>
      <button class="default save" type="submit">Save</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      note: {
        title: "",
        content: ""
      }
    };
  },
  beforeCreate() {
    this.$store.commit("createAuthHeader");
  },
  methods: {
    addNote() {
      const token = this.$store.state.token;

      if (token) {
        this.$store
          .dispatch("addNoteToServer", {
            note: this.note
          })
          .then(() => this.$router.push("/"));
      } else {
        this.$store.commit("addLocalNote", {
          title: this.note.title,
          content: this.note.content
        });
        this.$router.push("/");
      }
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
