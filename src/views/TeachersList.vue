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
import axios from "axios";

const isModalActive = ref(false);

const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
});

const modules = reactive([])

const form = reactive({
  teacherId : '',
  modules : []
})

onBeforeMount(() => {
    axios.get('https://127.0.0.1:8000/modules')
    .then(res => {
      modules.value = res.data
      console.log(modules.value)
    })
})

const teacherModules = reactive([])



const submit = () => {
  console.log(form)
  for(let i=0 ; i < form.modules.length;i++){

    axios.put('https://127.0.0.1:8000/modules/' + form.modules[i] + '/teachers', {
      teacherId : form.teacherId
    })

    }
      window.location.reload()}



</script>

<template>
    <LayoutAuthenticated>
      <CardBoxModal v-model="isModalActive" title="Assign Module">
      <FormField label="ID">
              <FormControl  :icon="mdiAccount"
              v-model="form.teacherId"
                placeholder="Teacher Id" />
      </FormField>
      
      <FormField label="Modules">
        <FormCheckRadioGroup
          v-model="form.modules"
          name="sample-checkbox"
          :options="modules.value"
        />
      </FormField>
  
        <BaseButtons class="mt-4">
          <BaseButton type="submit" @click="submit"  color="success" label="Submit" />
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
