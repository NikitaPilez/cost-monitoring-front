<template>
  <v-container fluid>
    <v-card v-if="loading" class="mb-5">
      <v-card-title>Purchase</v-card-title>
      <v-card-text>
        <v-form>
          <v-row class="px-4">
            <v-col cols="12" lg="12">
              <v-card-subtitle class="pt-0 pl-0">Content</v-card-subtitle>
              <tiptap-vuetify
                  class="mb-5"
                  v-model="collection.body"
                  :extensions="extensions"
              />
            </v-col>
          </v-row>
          <v-row class="px-4">
            <v-col cols="12" lg="4">
              <v-text-field v-model="collection.amount" label="Amount" outlined />
            </v-col>
            <v-col cols="12" lg="4">
              <v-text-field v-model="collection.balance" label="Balance" outlined />
            </v-col>
            <v-col cols="12" lg="4">
              <v-text-field v-model="collection.place" label="Place" outlined />
            </v-col>

          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-3" color="success" @click="updateData()">Save</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-alert v-if="alert.message" type="info">
          {{ alert.message }}
        </v-alert>
        <v-alert v-if="alert.error" type="error">
          {{ alert.error }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "@/axios"
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  name: "purchaseShow",
  components: { TiptapVuetify },
  data: () => ({
    loading: false,
    userId: null,
    purchaseId: null,
    alert: {
      "message" : "",
      "error" : ""
    },
    collection: [],
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [2, 3, 4, 5],
          },
        },
      ],
      Bold,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),
  methods: {
    async fetchData() {
      await axios.get(`/api/user/purchases/${this.purchaseId}`)
        .then((response) => {
          this.loading = true;
          this.collection = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          alert("Error: see in console");
        });
    },
    async updateData() {
      await axios.post(`/api/user/purchases/${this.purchaseId}`, this.collection, {
        headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.alert.message = 'Success';
          this.alert.error = null;
        })
        .catch((error) => {
          this.alert.message = null;
          this.alert.error = error.response.data.message;
        });
      }
  },
  mounted() {
    this.loading = true;
    this.userId = this.$route.params.userId;
    this.purchaseId = this.$route.params.purchaseId;
    this.fetchData();
  },
}
</script>
