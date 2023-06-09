<script setup>
import { computed, ref } from "vue";
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
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";

const isModalActive = ref(false);
const selectType = [
  { id: 1, label: "SVS" },
  { id: 2, label: "MSSI" },
  { id: 3, label: "EDL" },
];
</script>

<template>
    <CardBoxModal v-model="isModalActive" title="Add Notes">
      <FormField >
        <FormField label="Code">
            <FormControl  :icon="mdiAccount"
              placeholder=" Student Code" />
        </FormField>
        <FormField label="Note">
            <FormControl  :icon="mdiAccount"
            placeholder="/20" />
        </FormField>
    </FormField>
    
      <FormField label="Module">
        <FormControl  :options="selectType" />
      </FormField>

      <BaseButtons class="mt-4">
        <BaseButton type="submit"  color="success" label="Submit" />
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
