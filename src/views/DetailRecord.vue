<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="!record.length">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent="" class="breadcrumb">{{ record.recordType }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.recordColor]">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency }}</p>
              <p>Категория: {{ record.CategoryName }}</p>

              <small>{{ record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="center">Такой записи нет</p>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader"
export default {
  name: "detail",
  data() {
    return {
      record: null,
      loading: true
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch("fetchRecordById", id)
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    )

    this.record = {
      ...record,
      CategoryName: category.title,
      recordType: record.type === "income" ? "Доход" : "Расход",
      recordColor: record.type === "income" ? "green" : "red"
    }

    this.loading = false
  }
}
</script>
