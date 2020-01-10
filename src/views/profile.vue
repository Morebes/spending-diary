<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHendler">
      <div class="input-field">
        <input id="description" type="text" v-model="newName" />
        <label for="description">{{name}}</label>
        <span class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newName: null
    };
  },

  computed: {
    name() {
      return this.$store.getters.info.name;
    }
  },

  methods: {
    submitHendler() {}
  }
};
</script>