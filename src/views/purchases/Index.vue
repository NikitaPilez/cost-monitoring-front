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
    <v-card>
      <v-card-text>
        <v-row class="align-center">
          <v-col cols="12" lg="4" class="d-flex flex-wrap flex-lg-nowrap">
            <v-text-field
                class="me-lg-3"
                label="Filter monitoring items"
                v-model="filter.search"
                clearable
                dense
                solo-inverted
            />
          </v-col>
          <v-col
              cols="12"
              lg="2"
              class="d-flex align-center justify-lg-end mb-5"
          >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-data-table
        class="elevation-0"
        :headers="selectedHeaders"
        :items="collection"
        :footer-props="{
        'items-per-page-options': [10, 25, 50, 100],
      }"
    >
    </v-data-table>
  </v-container>
</template>

<script>

import axios from "axios";
import _ from "lodash";

const isDev = !!window.location.hostname.match(/^(localhost|127\.|192\.)/);

export const endpoint = isDev ? 'http://localhost:8000' : 'https://cost-monitoring.wiggaz.xyz';

export default {
  name: "purchaseIndex",
  data: () => ({
    selectedHeaders: [],
    collection: [],
    id: null,
    filter: {},
  }),
  watch: {
    "filter.search": {
      handler() {
        this.changeData();
      }
    }
  },
  methods: {
    changeData() {
      if (this.storeFilter !== this.filter) {
        this.$store.dispatch("purchaseFilter", this.filter);
      }

      this.callFetchData();
    },
    callFetchData: _.debounce(function () {
      this.fetchData();
    }, 100),
    async fetchData() {
      await axios
        .get(endpoint + `/api/purchases/${this.id}`, { params: { search: this.filter.search } })
        .then((response) => {
          this.collection = response.data.data;
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
    storeFilter() {
      return this.$store.state.purchase.purchaseFilter;
    },
  },
  mounted() {
    this.selectedHeaders = this.headers;
    this.id = this.$route.params.id;
    this.filter = this.$store.state.purchase.purchaseFilter;
  }
}
</script>
