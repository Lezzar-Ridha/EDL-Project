<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountMultiplePlusOutline,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import { useMainStore } from "@/stores/main";
import NotificationBar from "@/components/NotificationBar.vue";
import TableSampleClients from "@/components/Tables/UsersTable.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import { useStyleStore } from "@/stores/style.js";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import AdminCFDTable from "@/components/Tables/AdminCFDTable.vue";
import axios from 'axios'

const styleStore = useStyleStore();
const isModalActive = ref(false);

const mainStore = useMainStore();
const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const form = reactive({
    id: '',
    content: ''
});

const submit = () => { 
  axios.post('https://localhost:8000/claims', {
    content: form.content,
    participantId: form.id
  })
    .then((response) => {
        console.log(response);
        window.location.reload();
    })
    .catch((error) => {
        console.log(error);
    });
};

const claims = reactive([]);
const participants = reactive([]);
const claimsInformation = reactive([]);

onBeforeMount(async () => {
  try {
    const claimsResponse = await axios.get('https://localhost:8000/claims/pending');
    claims.push(...claimsResponse.data);
    console.log(claims);

    for (let claim of claims) {
      const participantResponse = await axios.get(`https://localhost:8000/participants/${claim.participantId}`);
      participants.push(participantResponse.data);
    }

    claimsInformation.push(...claims.map((claim, index) => ({
      claim,
      participant: participants[index]
    })));

    console.log(claimsInformation);
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="claims" main>
      </SectionTitleLineWithButton>
      <div v-for="item in claimsInformation" :key="item.claim._id">
        {{ item.participant?.firstName }}
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
