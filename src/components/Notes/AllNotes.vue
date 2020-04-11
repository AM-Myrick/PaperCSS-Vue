<template>
  <!-- <section @click="closeMenu"> -->
  <section @click="$store.commit('closeMenus')">
    <div class="btn-container">
      <!-- <CSVLink download="mynotes.csv" data="{notes}" headers="{headers}">
        Download your notes!
      </CSVLink>-->
      <div class="dropdown">
        <div class="dropbtn">Sort Options</div>
        <div class="dropdown-content">
          <!-- <div @click="sortNotes">A-Z</div>
          <div @click="sortNotes">Z-A</div>-->
          <div>A-Z</div>
          <div>Z-A</div>
        </div>
      </div>
    </div>
    <h2>Your Notes:</h2>
    <div class="notes">
      <app-note-card
        v-for="note of notes"
        :key="note.id"
        :note="note"
      ></app-note-card>
    </div>
  </section>
</template>

<script>
import NoteCard from "./NoteCard.vue";

export default {
  components: {
    appNoteCard: NoteCard
  },
  mounted() {
    this.$store.dispatch("getUserNotes");
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../mixins.scss";

section {
  background-color: #f2f1f2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  margin-top: 75px;

  .dropdown {
    border-bottom-left-radius: 15px 3px;
    border-bottom-right-radius: 15px 5px;

    .dropbtn {
      @include button-styles;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: $theme-button-color;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;

      div {
        color: white;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        cursor: pointer;

        &:hover {
          background-color: $theme-button-hover-color;
        }
      }
    }
    &:hover .dropdown-content {
      display: block;
    }

    &:hover .dropbtn {
      background-color: $theme-button-hover-color;
    }
  }

  h2 {
    margin-left: 2.5%;
    font-size: 1.6rem;
    color: #474747;
  }

  .notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    a.card {
      min-width: 284px;
      max-width: 284px;
      border: 2px solid #eaeaea;
      background-color: #ffffff;
      margin-bottom: 8px;
      text-align: left;
      font-size: 1.2rem;
      padding: 0 2.5%;
      text-decoration: none;
      color: black;
      height: auto;
      overflow: hidden;
    }
  }

  .btn-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;

    a {
      @include button-styles;
    }
  }
}

@media (min-width: 575px) {
  a.card {
    margin-right: 8px;
  }
}

@media (min-width: 769px) {
  section {
    margin-top: 125px;
  }
}

@media (min-width: 900px) {
  a.card {
    margin-right: 1%;
    margin-bottom: 8px;

    &:nth-child(3n + 1) {
      margin-left: 1%;
    }
  }
}

@media (min-width: 1000px) {
  section {
    width: 80%;
    margin-left: 20%;
    margin-top: 0;

    .btn-container,
    h2,
    .notes {
      max-width: 1000px;
      margin-left: 5%;
      margin-right: auto;
    }

    .notes {
      justify-content: flex-start;
      margin-left: calc(5% - 16px);

      a.card {
        min-width: 240px;
        max-width: 240px;
        height: auto;
      }
    }
  }
}

@media (min-width: 1100px) {
  a.card {
    min-width: 30%;
    max-width: 30%;
    height: auto;
  }
}
</style>
