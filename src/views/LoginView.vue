<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import axios from "axios";
import { useMainStore } from "@/stores/main.js";
const mainStore = useMainStore


const form = reactive({
  email: "example@gmail.com",
  password: "John",
});

const router = useRouter();

const submit = () => {
  axios.post('https://localhost:8000/auth/login', {
    email: form.email,
    password: form.password
  }).then(res => {
    mainStore.type = res.data.type
    localStorage.setItem("type",mainStore.type);
    localStorage.setItem("id", res.data._id);
    localStorage.setItem("firstName", res.data.firstName);
    localStorage.setItem("lastName", res.data.lastName);
    const isAuth = true
    sessionStorage.setItem("isAuth" ,isAuth )
    switch(res.data.type) {
      case "participant":
        router.push("/news");
        break;
      case "teacher":
        router.push("/tcondidateslist")
        break;
      case "cfd":
        router.push("/teacherslist")
        break;
      case "viceDean":
        router.push("/createCode");
        break;
      case "admin":
        router.push("/condidateslist");
        break;
    }
    // router.push("/dashboard");
  }).catch(err => {

    console.log(err);
  }) 
};


</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" @click="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
