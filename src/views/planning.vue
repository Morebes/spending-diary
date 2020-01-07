<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>12 212</h4>
    </div>

    <section>
      <div>
        <p>
          <strong>Девушка:</strong>
          {{ this.goal.now }} из {{ this.goal.goal }} ({{ style }}%)
        </p>
        <div class="progress">
          <div class="determinate green" :style="`width:${style}%`"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goal: { now: 16226, goal: 14000 }
    };
  },

  computed: {
    style() {
      let a = Math.round(this.goal.now / (this.goal.goal / 100));

      if (a >= 100) {
        return 100;
      }
      return a;
    }
  }
};
</script>
