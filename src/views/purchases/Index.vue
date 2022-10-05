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
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          color="primary"
          :to="{ name: 'purchaseShow', params: { userId: item.user_id, purchaseId: item.id} } "
          >Show
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>

import axios from "@/axios";
import _ from "lodash";

export default {
  name: "purchaseIndex",
  data: () => ({
    selectedHeaders: [],
    collection: [],
    userId: null,
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
        .get(`/api/user/${this.userId}/purchases`, { params: { search: this.filter.search } })
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
        { text: 'Place', value: 'place' },
        { text: 'Amount', value: 'amount' },
        { text: 'Balance', value: 'balance' },
        { text: 'Buy at', value: 'buy_at' },
        { text: 'Action', value: 'action' },
      ];
    },
    storeFilter() {
      return this.$store.state.purchase.purchaseFilter;
    },
  },
  mounted() {
    this.selectedHeaders = this.headers;
    this.userId = this.$route.params.userId;
    this.filter = this.$store.state.purchase.purchaseFilter;

    Echo.channel('new-purchase').listen('NewPurchase', ({userPurchases}) => {
      this.collection = userPurchases.data;
    })
  }
}
</script>
