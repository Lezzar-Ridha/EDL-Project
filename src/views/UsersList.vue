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
import TableSampleClients from "@/components/Tables/UsersTable.vue";
import AdminTecherTable from "@/components/Tables/AdminTecherTable.vue";
import AdminCFDTable from "@/components/Tables/AdminCFDTable.vue";
import AdminVdTable from "@/components/Tables/AdminVdTable.vue";
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
import { useStyleStore } from "@/stores/style.js";
import BaseButtons from "@/components/BaseButtons.vue";
import axios from "axios";

const styleStore = useStyleStore();
const isModalActive = ref(false);
const selectType = [
  { id: 1, label: "viceDean" },
  { id: 2, label: "teacher" },
  { id: 3, label: "cfd" },
];

const form = reactive({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: '123456789',
  type: "cfd",
  
});

const submit = () => {
  form.type = form.type.label;  
  
  axios.post('https://localhost:8000/users/', form)
    .then((response) => {
        console.log(response);
        window.location.reload();
    }, (error) => {
        console.log(error);
    });
};



</script>

<template>
  <LayoutAuthenticated>
    <CardBoxModal v-model="isModalActive" title="Add User" >
        <div :class="
        styleStore.darkMode
          ? 'aside-scrollbars-[slate]'
          : styleStore.asideScrollbarsStyle
      "
      class="flex-1 overflow-y-auto overflow-x-hidden">
          
        <FormField>
          <FormField label="First Name">
            <FormControl v-model="form.firstName"  />
          </FormField>
          <FormField label="Last Name">
            <FormControl v-model="form.lastName" />
          </FormField>
        </FormField>
        <FormField label="Email">
          <FormControl v-model="form.email" />
        </FormField>
        <FormField label="Password">
          <FormControl v-model="form.password" />
        </FormField>

            
    
        
      <FormField label="Type">
              <FormControl
                  type="type"
                  v-model="form.type"
                  :options="selectType" 
                  placeholder="Type"
              />
      </FormField>

    
            <BaseDivider />
    
            
              <BaseButtons class="my-4">
                <BaseButton @click="submit" small color="success" label="Submit" />
                <BaseButton type="cancel" @click="isModalActive = false"  small color="danger"  label="Cancel" />
              </BaseButtons>
            
          </div>
      </CardBoxModal>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Teachers List" main>
        <BaseButton
          
          target="_blank"
          @click=" isModalActive = true"
          :icon="mdiAccountMultiplePlusOutline"
          label="Add User"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
     

      <CardBox class="mb-6" has-table>
        <AdminTecherTable  />
      </CardBox>

      
    </SectionMain>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Vice Dean List" main>
        <BaseButton
          
          target="_blank"
          @click=" isModalActive = true"
          :icon="mdiAccountMultiplePlusOutline"
          label="Add User"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
     

      <CardBox class="mb-6" has-table>
        <AdminVdTable  />
      </CardBox>

      
    </SectionMain>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="CFD " main>
        <BaseButton
          
          target="_blank"
          @click=" isModalActive = true"
          :icon="mdiAccountMultiplePlusOutline"
          label="Add User"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
     

      <CardBox class="mb-6" has-table>
        <AdminCFDTable  />
      </CardBox>

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
