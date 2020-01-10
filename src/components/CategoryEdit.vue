<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHendler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name2"
            type="text"
            v-model="title"
            :class="{invalid:$v.title.$dirty && !$v.title.required}"
          />
          <label for="name2">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="limit2"
            type="number"
            v-model.number="limit"
            :class="{invalid:$v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit2">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальная значение {{ $v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      title: "",
      limit: 100,
      select: null,
      current: null
    };
  },

  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },

  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },

  methods: {
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      };

      try {
        const category = await this.$store.dispatch(
          "updateCategory",
          categoryData
        );
        this.$message("категория была изменина");
        this.$emit("updated", categoryData);
      } catch (e) {}
    }
  },

  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.current = catId;
      this.title = title;
      this.limit = limit;
    }
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>