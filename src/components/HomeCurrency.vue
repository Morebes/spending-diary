<template>
  <div class="col s12 m8 offset-m2 l8">
    <div class="card orange darken-3 medium">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur] }}</td>
              <td>{{date | date('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates", "date"],
  data() {
    return {
      currencies: ["RUB", "EUR", "USD", "JPY"]
    };
  }
};
</script>