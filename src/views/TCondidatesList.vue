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
import NotificationBar from "@/components/NotificationBar.vue";
import TCondidatesTable from "@/components/Tables/TCondidatesTable.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import formModule from "@/components/formModule.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import axios from "axios";

const isModalActive = ref(false);
const selectType = [
  // { id: 1, label: "SVS" },
  // { id: 2, label: "MSSI" },
  // { id: 3, label: "EDL" },
];

const participants = reactive([])
const modules = reactive([])
const form = reactive({
  code: "",
  note: null,
  module: ""
})

onBeforeMount(() => {
    axios.get('https://127.0.0.1:8000/participants')
    .then(res => {
      participants.value = res.data
      // console.log(participants)
    })
})

onBeforeMount(() => {
    axios.get('https://127.0.0.1:8000/modules')
    .then(res => {
      modules.value = res.data
      for (let module in modules.value) {
        // let type = {id: module._id, name: module.name};
        // console.log(type)
        // selectType.push(type);
        console.log(`${module} this is a module`);
      }
      console.log(selectType)
      // console.log(modules.value)
    })
})

const submit = () => {
  const teacherId = localStorage.getItem("id");
  console.log(form.module._id);
  console.log(form.code);
  console.log(form.note);
  axios.post(`https://127.0.0.1:8000/users/${teacherId}/notes`, {
        participantCode: form.code,
        moduleId: form.module._id,
        note: form.note
  })
}

</script>

<template>
    <CardBoxModal v-model="isModalActive" title="Add Notes">
      <FormField >
        <FormField label="Code">
            <FormControl  :icon="mdiAccount"
              v-model="form.code"
              placeholder=" Student Code" />
        </FormField>
        <FormField label="Note">
            <FormControl  
            v-model="form.note"
            :icon="mdiAccount"
            placeholder="/20" />
        </FormField>
    </FormField>
    
      <FormField label="Module">
        <formModule  
        v-model="form.module"
        :options="modules.value" />
      </FormField>

      <BaseButtons class="mt-4">
        <BaseButton type="submit" @click="submit" color="success" label="Submit" />
      </BaseButtons>
      </CardBoxModal>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Condidates List" main>
        <BaseButton
          
          target="_blank"
          @click=" isModalActive = true"
          :icon="mdiAccountMultiplePlusOutline"
          label="Add Note"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
     

      <CardBox class="mb-6" has-table>
        <TCondidatesTable  />
      </CardBox>

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
