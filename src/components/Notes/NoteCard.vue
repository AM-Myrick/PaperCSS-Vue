<template>
  <router-link class="card" :to="`/note/${note.id}`">
    <div class="card-body">
      <h4 class="card-title">{{ title }}</h4>
      <p class="card-text">{{ content }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    note: Object
  },
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    setupNoteContent() {
      const cardTextSlice = window.innerWidth <= 768 ? 37 : 75;
      this.title =
        this.note.title.length > 33
          ? this.note.title.substring(0, 33) + "..."
          : this.note.title;
      this.content =
        this.note.content.length > cardTextSlice
          ? this.note.content.substring(0, cardTextSlice) + "..."
          : this.note.content;
    }
  },
  mounted() {
    this.setupNoteContent();
  }
};
</script>

<style lang="scss" scoped>
h4 {
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 5px;
  margin-block-end: 0.5em;
}

p {
  margin-block-start: 0.5em;
}
</style>
