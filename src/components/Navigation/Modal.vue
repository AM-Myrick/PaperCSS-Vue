<template>
  <div v-if="modalType" class="card card-modal">
    <div class="card-body">
      <h3 class="card-title">{{ modalMessage }}</h3>
      <template v-if="formModal">
        <form @submit.prevent.stop="submitHandler">
          <label for="username">Username:</label>
          <input
            v-model="creds.username"
            type="text"
            id="username"
            name="username"
            class="input"
          />
          <label for="password">Password:</label>
          <input
            v-model="creds.password"
            type="password"
            id="password"
            name="password"
            class="input"
          />
          <button type="submit">{{ modalType }}</button>
        </form>
      </template>
      <template v-else-if="deleteModal">
        <button @click="closeModal">Cancel</button>
        <button @click="confirmDelete">Delete</button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creds: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    closeModal() {
      this.$store.commit("setModalType", { modalType: null });
    },
    confirmDelete() {
      if (this.$store.state.token) {
        this.$store.dispatch("deleteServerNote").then(() => {
          this.closeModal();
          this.$router.push("/");
        });
      } else {
        this.$store.commit("deleteLocalNote");
        this.closeModal();
        this.$router.push("/");
      }
    },
    submitHandler() {
      this.modalType === "login"
        ? this.$store.dispatch("handleLogin", { creds: this.creds })
        : this.$store.dispatch("handleRegistration", { creds: this.creds });
    }
  },
  computed: {
    formModal() {
      return (
        this.$store.state.showModalType === "Register" ||
        this.$store.state.showModalType === "Login"
      );
    },
    deleteModal() {
      return this.$store.state.showModalType === "Delete";
    },
    modalMessage() {
      return this.$store.state.modalMessage;
    },
    modalType() {
      return this.$store.state.showModalType;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../mixins.scss";

.card-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $theme-button-color;

  &:hover {
    transform: translate(-50%, -50%);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .card-title {
      color: #fff;
    }

    form {
      color: #fff;

      input {
        border: 2px solid #fff;
        margin-bottom: 0.5rem;
      }

      button {
        width: 100%;
        color: #fff;
        border: 2px solid #fff;
      }
    }
  }
}
</style>
