<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{bill |currency}}</h4>
    </div>

    <Loader v-if="loaging" />

    <p v-else-if="!categories.length" class="center">
      категорий пока что нет
      <router-link to="categories">создайте категорию</router-link>
    </p>

    <section v-else >
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}: </strong>
          {{cat.spend | currency}} из {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip='cat.tooltip'>
          <div class="determinate" :class='cat.progressColor' :style="`width:${cat.progressProcent}%`"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader"
import currencyFilter from '@/filter/currency.filter'

export default {
  name: "Planing",
  components: { Loader },
  data() {
    return {
      categories: [],
      records: null,
      loaging: true
    };
  },

  async mounted() {
    const record = await this.$store.dispatch("fetchRecord")
    const categories = await this.$store.dispatch("fetchCategories")

    this.categories = categories.map(cat => {
      const spend = record
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0);

      const precent = (100 * spend) / cat.limit
      const progressProcent = precent > 100 ? 100 : precent
      const progressColor = precent < 60 ? 'green' : precent < 100 ? 'yellow' : 'red'

      const tooltilValue = cat.limit - spend
      const tooltip = `${tooltilValue < 0 ? 'превышение на ': 'осталось' } ${currencyFilter(Math.abs(tooltilValue))}`

      return{
        ...cat,
        progressProcent,
        progressColor,
        spend,
        tooltip
      }
    });

    this.loaging = false
  },

  computed: {
    bill() {
      return this.$store.getters.info.bill
    }
  }
};
</script>
