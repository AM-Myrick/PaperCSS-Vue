import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
axios.defaults.baseURL = "https://nameless-cliffs-24621.herokuapp.com";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    notes: [],
    notesLoaded: false,
    token: localStorage.getItem("access_token"),
    showModalType: null,
    modalMessage: null,
    selectedNote: null
  },
  actions: {
    handleLogin({ state }, { creds }) {
      axios
        .post(`/api/login`, { creds, notes: state.notes })
        .then(res => {
          if (res.status === 200 && res.data) {
            localStorage.removeItem("paper_notes");
            localStorage.setItem("access_token", res.data.token);
            axios.defaults.headers.common["Authorization"] = res.data.token;
            state.token = res.data.token;
            state.modalMessage = "Login successful";
            state.notes = res.data.notes;
            if (window.location.pathname !== "/") {
              window.location.replace(window.location.origin);
            } else {
              window.location.reload();
            }
          } else {
            throw new Error();
          }
        })
        .catch(err => (state.modalMessage = "Login failed"));
    },
    handleRegistration(context, { creds }) {
      axios
        .post(`/api/register`, { creds })
        .then(res => {
          context.state.modalMessage = "Registration successful, please wait";
          context.commit("setModalType", { modalType: null });
          context.dispatch("handleLogin", { creds });
        })
        .catch(err => {
          context.state.modalMessage = "Registration failed";
        });
    },
    loadNotes(context, { routeId }) {
      context.commit("createAuthHeader");
      const notes = localStorage.getItem("paper_notes");
      const token = context.state.token;

      if (!token && !notes) {
        context.commit("createLocalNotes");
        context.commit("setSelectedNote", { routeId });
      } else if (token) {
        context.dispatch("getServerNotes").then(() => {
          context.commit("setSelectedNote", { routeId });
        });
      } else {
        context.commit("parseLocalNotes", { notes });
        context.commit("setSelectedNote", { routeId });
      }
    },
    getUserNotes(context) {
      context.commit("createAuthHeader");
      const notes = localStorage.getItem("paper_notes");
      const token = context.state.token;

      if (!token && !notes) {
        context.commit("createLocalNotes");
      } else if (token) {
        context.dispatch("getServerNotes");
      } else {
        context.commit("parseLocalNotes", { notes });
      }
    },
    getServerNotes({ state }) {
      return axios
        .get(`/api/notes`)
        .then(res => {
          state.notes = res.data;
          state.notesLoaded = true;
          return;
        })
        .catch(error => {
          if (error["name"] === "TokenExpiredError") {
            // TODO: add logout logic
          }
          console.log(error);
        });
    },
    editNoteOnServer(context, { note }) {
      return axios
        .put(`/api/notes/${note.id}`, note)
        .then(() => null)
        .catch(error => console.log(error));
    },
    addNoteToServer(context, { note }) {
      return axios
        .post("/api/notes/", note)
        .then(() => null)
        .catch(error => console.log(error));
    },
    deleteServerNote({ state }) {
      return axios
        .delete(`/api/notes/${state.selectedNote.id}`)
        .then(() => (state.selectedNote = null))
        .catch(err => console.log(err));
    }
  },
  mutations: {
    editLocalNote(state, { updatedNote }) {
      state.notes = state.notes.map(note => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      });
      localStorage.setItem("paper_notes", JSON.stringify(state.notes));
    },
    addLocalNote(state, { title, content }) {
      const newNote = { id: `note-${state.notes.length + 1}`, title, content };
      state.notes = [...state.notes, newNote];
      localStorage.setItem("paper_notes", JSON.stringify(state.notes));
    },
    deleteLocalNote(state) {
      state.notes = state.notes.filter(
        note => note.id !== state.selectedNote.id
      );
      state.selectedNote = null;
      if (state.notes.length) {
        localStorage.setItem("paper_notes", JSON.stringify(state.notes));
      } else {
        localStorage.removeItem("paper_notes");
      }
    },
    setModalType(state, { modalType }) {
      state.showModalType = modalType;
      if (modalType === "Delete") {
        state.modalMessage = "Are you sure you want to delete this note?";
      } else {
        state.modalMessage = modalType;
      }
    },
    setSelectedNote(state, { routeId }) {
      const id = isNaN(parseInt(routeId)) ? routeId : parseInt(routeId);

      if (state.notes) {
        state.selectedNote = state.notes.find(note => note.id === id);
      } else {
        // redirect to 404
      }
    },
    clearSelectedNote(state) {
      state.selectedNote = null;
    },
    closeMenus(state) {
      const hamburgerMenu = document.querySelector("#collapsible1");
      if (hamburgerMenu && hamburgerMenu.checked) {
        hamburgerMenu.checked = false;
      } else if (state.showModalType) {
        state.showModalType = null;
      }
    },
    createAuthHeader(state) {
      if (state.token) {
        axios.defaults.headers.common["Authorization"] = state.token;
      } else if (localStorage.getItem("access_token")) {
        state.token = localStorage.getItem("access_token");
        axios.defaults.headers.common["Authorization"] = state.token;
      }
    },
    createLocalNotes(state) {
      state.notes = [
        {
          id: "note-1",
          title: "Welcome to Paper Notes!",
          content: `
              How to use this site:
  
              If you create notes without being logged in, they'll be saved to local storage.
  
              If you create an account while you have notes in local storage, they'll be saved to your new account and removed from local storage.
  
              Thanks for checking out my project! 
  
              If you're interested in seeing more or contacting me, go to https://youwontregrethiring.me.`.trim()
        }
      ];
      state.notesLoaded = true;
      localStorage.setItem("paper_notes", JSON.stringify(state.notes));
    },
    parseLocalNotes(state, payload) {
      let notes = JSON.parse(payload.notes);
      const counter = {};

      for (const note of notes) {
        if (counter[note.id]) {
          counter[note.id]++;
          continue;
        }
        counter[note.id] = 1;
      }

      state.notes = notes.map(note => {
        while (counter[note.id] > 1) {
          const noteId = note.id;
          const newNoteId = parseInt(noteId[noteId.length - 1]);
          counter[note.id]--;
          note.id = `note-${newNoteId + 1}`;
          if (counter[note.id]) {
            counter[note.id]++;
            continue;
          }
          counter[note.id] = 1;
        }
        return note;
      });
      state.notesLoaded = true;

      localStorage.setItem("paper_notes", JSON.stringify(state.notes));
    },
    logout(state) {
      state.notes = [
        {
          id: "note-1",
          title: "Thanks for using Paper Notes!",
          content: "Come back soon!"
        }
      ];
      localStorage.setItem("paper_notes", JSON.stringify(state.notes));
      localStorage.removeItem("access_token");
      window.location.replace(window.location.origin);
    }
  }
});

export default store;
