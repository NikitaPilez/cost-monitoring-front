<template>
  <v-container fluid>
    <v-tabs>
      <v-tab>All</v-tab>
      <div class="ms-auto">
        <v-btn
            class="mr-5"
            elevation="0"
            color="primary"
            outlined
            @click="fetchData()"
        >Refresh</v-btn
        >
      </div>
    </v-tabs>
    <v-divider />
    <v-data-table
        class="elevation-0"
        :headers="selectedHeaders"
        :items="collection"
        :options.sync="options"
        :footer-props="{
        'items-per-page-options': [10, 25, 50, 100],
      }"
    >
    </v-data-table>
  </v-container>
</template>

<script>

import axios from "axios";

export default {
  name: "purchaseIndex",
  data: () => ({
    selectedHeaders: [],
    collection: [],
    options: {},
    id: null,
  }),
  methods: {
    async fetchData() {
      await axios
        // .get(`http://127.0.0.1:8000/api/purchases/${this.id}`)
        .get(`http://cost-monitoring.wiggaz.xyz/api/purchases/${this.id}`)
        .then((response) => {
          this.collection = response.data.data.purchases;
        })
        .catch((error) => {
          console.log(error);
          alert("Error: see in console");
        });
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Amount', value: 'amount' },
        { text: 'Balance', value: 'balance' },
        { text: 'Body', value: 'body' },
        { text: 'Buy at', value: 'buy_at' },
        { text: 'Place', value: 'place' },
        { text: 'Amount', value: 'sms_id' },
      ];
    },
  },
  mounted() {
    this.selectedHeaders = this.headers;
    this.id = this.$route.params.id;
  }
}
</script>
