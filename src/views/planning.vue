<template>
  <Loader v-if="loaging" />

  <div v-else>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>12 212</h4>
    </div>

    <section v-for="category in categories" :key="category['title']">
      <div>
        <p>
          <strong>{{category['title']}}:</strong>
          из {{category['limit']}}
        </p>
        <div class="progress">
          <div class="determinate green" :style="`width:10%`"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
export default {
  name: "Planing",
  components: { Loader },
  data() {
    return {
      category: null,
      loaging: true
    };
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loaging = false;
  }
};
</script>
