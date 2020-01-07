<template>
  <div class="col s12 m8 offset-m2 l4">
    <div class="card light-blue medium">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line" v-for="cur of currencies" :key="cur">
          <span>{{ getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data() {
    return {
      currencies: ["RUB", "EUR", "USD", "JPY"]
    };
  },

  computed: {
    base() {
      return this.$store.getters.info.bill / this.rates["RUB"];
    }
  },

  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    }
  }
};
</script>