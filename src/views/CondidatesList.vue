<script setup>
import { computed, reactive, ref } from "vue";
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountMultiplePlusOutline,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import AdminCondidatesVdTable from "@/components/Tables/AdminCondidatesVdTable.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import axios from "axios";

const isModalActive = ref(false);
const form = reactive({
  csv : ''
})
const submit = () =>{
  axios.post('https://localhost:8000/participants', form,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then(res => {
    console.log(res);
  })
  

}
</script>

<template>
    <CardBoxModal v-model="isModalActive" title="Add Condidant">

      
        <FormField class="my-4 mb-4">
          <FormFilePicker v-model="form.csv"  label="Upload CSV File" qccept=".csv" />
        </FormField>

        <BaseButtons class="mt-4 mb-2">
          <BaseButton type="submit"  @click="submit" color="success" label="Submit" class="mr-2" />
          <BaseButton type="cancel" @click="isModalActive = false"  small color="danger"  label="Cancel" />
        </BaseButtons>

      
      </CardBoxModal>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Condidates List" main>
        <BaseButton
          
          target="_blank"
          @click=" isModalActive = true"
          :icon="mdiAccountMultiplePlusOutline"
          label="Add Condidants"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
     

      <CardBox class="mb-6" has-table>
        <AdminCondidatesVdTable checkable />
      </CardBox>

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
