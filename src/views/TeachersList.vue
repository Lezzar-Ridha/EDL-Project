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
import TeachersTable from "@/components/Tables/TeachersTable.vue";
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

const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
});

</script>

<template>
    <LayoutAuthenticated>
      <CardBoxModal v-model="isModalActive" title="Assign Module">
      <FormField label="ID">
              <FormControl  :icon="mdiAccount"
                placeholder="Teacher Id" />
      </FormField>
      
      <FormField label="Modules">
        <FormCheckRadioGroup
          v-model="customElementsForm.checkbox"
          name="sample-checkbox"
          :options="{ lorem: 'SVS', ipsum: 'EDL', dolore: 'ASD' }"
        />
      </FormField>
  
        <BaseButtons class="mt-4">
          <BaseButton type="submit"  color="success" label="Submit" />
        </BaseButtons>
        </CardBoxModal>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Teacher List" main>
        <BaseButton
          
          target="_blank"
          @click=" isModalActive = true"
          :icon="mdiAccountMultiplePlusOutline"
          label="Assign Module"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
     

      <CardBox class="mb-6" has-table>
        <TeachersTable  />
      </CardBox>

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
