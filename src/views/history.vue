<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      записей пока что нет
      <router-link to="/record"> добавьте запись</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable"
import Loader from "@/components/app/Loader"

export default {
  name: "history",
  components: { HistoryTable },
  data() {
    return {
      loading: true,
      records: [],
      categories: []
    }
  },

  async mounted() {
    const record = await this.$store.dispatch("fetchRecord")

    this.categories = await this.$store.dispatch("fetchCategories")
    this.records = record.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход"
      }
    })

    this.loading = false
  }
}
</script>
