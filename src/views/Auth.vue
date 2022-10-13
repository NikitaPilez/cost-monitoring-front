<template>
  <div id="app">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
          <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab v-for="item in tabs" :key="item.id">
              <v-icon large>{{ item.icon }}</v-icon>
              <div class="caption py-1">{{ item.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12">
                      <v-alert v-if="loginErrorMessage" type="error">
                        {{ loginErrorMessage }}
                      </v-alert>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="registerName" :rules="[rules.required]" label="Name" maxlength="20" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="registerEmail" :rules="registerEmailRules" label="E-mail" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="registerPassword" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="12">
                        <v-alert v-if="registerErrorMessage" type="error">
                          {{ registerErrorMessage }}
                        </v-alert>
                      </v-col>
                      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn x-large block color="success" @click="validateRegister">Register</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>

import axios from "@/axios";

export default {
  data: () => ({
    show1: false,
    dialog: true,
    valid: true,
    tabs: [
      { id: 'login', name:"Login", icon:"mdi-account"},
      { id: 'register', name:"Register", icon:"mdi-account-outline"}
    ],
    tab: 0,
    loginErrorMessage: '',
    registerErrorMessage: '',
    loginEmail: "",
    loginPassword: "",
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    },
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    registerEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
  }),
  methods: {
    async login() {
      await axios
          .post(`/api/login`, { email: this.loginEmail, password: this.loginPassword } )
          .then((response) => {
            localStorage.token = response.data.token;
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            this.loginErrorMessage = error.response.data.message;
          });
    },
    async register() {
      await axios
          .post(`/api/register`, { name: this.registerName, email: this.registerEmail, password: this.registerPassword } )
          .then((response) => {
              localStorage.token = response.data.token;
              this.$router.push({ name: "home" });
          })
          .catch((error) => {
            this.registerErrorMessage = error.response.data.message;
          });
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        this.login();
      }
    },
    validateRegister() {
      if (this.$refs.registerForm.validate()) {
        this.register();
      }
    },
  }
}
</script>
