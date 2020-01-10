<template>
  <Loader v-if="loading" />
  <p v-else-if="!categories" class="center">
    категорий пока что нет
    <router-link to="categories">создайте категорию</router-link>
  </p>
  <div v-else>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" @submit.prevent="submitHendler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid:$v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Минимальная значение {{$v.amount.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.number="description"
          :class="{invalid:$v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "record",

  data() {
    return {
      loading: true,
      select: null,
      categories: [],
      type: "outcome",
      description: "",
      amount: 1,
      category: null
    };
  },

  validations: {
    description: { required },
    amount: { minValue: minValue(1) }
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },

  computed: {
    canCreaterecord() {
      if (this.type === "income") {
        return true;
      }

      return this.$store.getters.info.bill >= this.amount;
    }
  },

  methods: {
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreaterecord) {
        const recordData = {
          categoryId: this.category,
          type: this.type,
          description: this.description,
          amount: this.amount,
          date: new Date().toJSON()
        };

        try {
          const category = await this.$store.dispatch(
            "createRecord",
            recordData
          );

          const bill =
            this.type === "income"
              ? this.$store.getters.info.bill + this.amount
              : this.$store.getters.info.bill - this.amount;

          await this.$store.dispatch("updateInfo", { bill });
          this.$message("запись создана");
          this.$v.$reset();
          this.description = "";
          this.amount = 1;
        } catch (e) {
          throw e;
        }
      } else {
        this.$message(
          `на счету ${this.$store.getters.info.bill} не хватает ${this.amount -
            this.$store.getters.info.bill}`
        );
      }
    }
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>