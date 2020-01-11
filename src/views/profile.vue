<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHendler">
      <div class="input-field">
        <input
          id="Name"
          type="text"
          v-model.trim="newName"
          :class="{invalid:$v.newName.$dirty && !$v.newName.required}"
        />
        <label for="Name">{{name}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.newName.$dirty && !$v.newName.required"
        >Введите имя</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators"

export default {
  data() {
    return {
      newName: null
    };
  },
  validations: {
    newName: { required }
  },

  computed: {
    name() {
      return this.$store.getters.info.name;
    }
  },

  methods: {
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return;
      }

      const name = this.newName;

      await this.$store.dispatch("updateInfo", { name })
      this.$message("имя изменено");
      this.$v.$reset();
      this.newName = ""
    }
  }
};
</script>