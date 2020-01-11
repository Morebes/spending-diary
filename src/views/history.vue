<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      записей пока что нет
      <router-link to="/record"> добавьте запись</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin"
import HistoryTable from "@/components/HistoryTable"
import Loader from "@/components/app/Loader"
import { Pie } from "vue-chartjs"

export default {
  name: "history",
  extends: Pie,
  components: { HistoryTable },
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      records: []
    }
  },

  async mounted() {
    this.records = await this.$store.dispatch("fetchRecord")
    const categories = await this.$store.dispatch("fetchCategories")

    this.setupe(categories)

    this.loading = false
  },

  methods: {
    setupe(categories) {
      this.setupPaginatoin(
        this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход"
          }
        })
      )

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [
          {
            label: "Расходы",
            backgroundColor: [
              "#f87979",
              "#d4d4ff",
              "#ccff00",
              "#088da5",
              "#bec5ca",
              "#FF00FF",
              "#0000CD",
              "#FFE4B5",
              "#708090",
              "#DC143C"
            ],
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  total += +r.amount
                }

                return total
              }, 0)
            })
          }
        ]
      })
    }
  }
}
</script>
