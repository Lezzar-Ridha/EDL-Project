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
import BaseButtons from "@/components/BaseButtons.vue";
import AdminCFDTable from "@/components/Tables/AdminCFDTable.vue";
import axios from 'axios'

const styleStore = useStyleStore();
const isModalActive = ref(false);
const selectType = [
  { id: 1, label: "GL" },
  { id: 2, label: "STIW" },
  { id: 3, label: "STIC" },
  { id: 4, label: "RSD" },
  { id: 5, label: "ALL" },
  
];

const mainStore = useMainStore();
const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const form = reactive({
    id: '',
    content: ''

})

const submit = (id) => { 
  
  axios.post('https://localhost:8000/claims' , 
  {
    content : form.content,
    participantId:"646d43b5c14bfc7c9c896e10",
    

  }
  )
    .then((response) => {
        console.log(response);
        window.location.reload();
    }, (error) => {
        console.log(error);
    });

    
    
  };
  const claims = reactive([])
  const teacherMail = reactive({})
  
  // onBeforeMount(() => {
    
  //   axios.get('https://localhost:8000/claims').then(res => {
  //     claims.value = res.data
  //     console.log(claims.value)
  //   }).catch(err => { console.log(err)})
  // })
  
</script>

<template>
    
    


  <LayoutAuthenticated>
    <CardBoxModal v-model="isModalActive" title="Make A claim" >
        <div :class="
        styleStore.darkMode
          ? 'aside-scrollbars-[slate]'
          : styleStore.asideScrollbarsStyle
      "
      class="flex-1 overflow-y-auto overflow-x-hidden">
             
        <FormField label="Student ID" >
            <FormControl
                type="text"
                v-model="form.participantId"
                placeholder="ID"
            />
        </FormField>
    
        <FormField label="Content" >
            <FormControl
                type="textarea"
                v-model="form.content"
                placeholder="Content"
            />
        </FormField>
                
            <BaseDivider />
    
            <!-- <template #footer> -->
              <BaseButtons class="my-4">
                <BaseButton type="submit" @click="submit(form.id)"  color="success" label="Submit" />
                <BaseButton type="cancel" @click="isModalActive = false"   color="danger"  label="Cancel" />
              </BaseButtons>
            <!-- </template> -->
          </div>
      </CardBoxModal>
    <SectionMain>

      <CardBox>
        <div :class="
        styleStore.darkMode
          ? 'aside-scrollbars-[slate]'
          : styleStore.asideScrollbarsStyle
      "
      class="flex-1 overflow-y-auto overflow-x-hidden">
             
        <FormField label="Student ID" >
            <FormControl
                type="text"
                v-model="form.participantId"
                placeholder="ID"
            />
        </FormField>
    
        <FormField label="Content" >
            <FormControl
                type="textarea"
                v-model="form.content"
                placeholder="Content"
            />
        </FormField>
                
            <BaseDivider />
    
            <!-- <template #footer> -->
              <BaseButtons class="my-4">
                <BaseButton type="submit" @click="submit(form.id)"  color="success" label="Submit" />
                <BaseButton type="cancel" @click="isModalActive = false"   color="danger"  label="Cancel" />
              </BaseButtons>
            <!-- </template> -->
          </div>
      </CardBox>
      
    <!-- /> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
