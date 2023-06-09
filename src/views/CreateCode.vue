<script setup>
import { computed, onMounted, ref } from "vue";
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountMultiplePlusOutline,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import AdminCondidatesVdTable from "@/components/Tables/GenerateCodeTable.vue";
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
import { useMainStore} from "@/stores/main";


const isModalActive = ref(false);
const usersStore = useMainStore();

onMounted(() => {
    usersStore.generate = sessionStorage.getItem('generate');
});
function generateCode () {
    usersStore.generate = sessionStorage.getItem('generate');
    sessionStorage.setItem("generate", true);
    window.location.reload();
}
</script>

<template>
    
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Generate Code" main>
        
      </SectionTitleLineWithButton>
      

      <CardBox class="mb-6" has-table>
        <AdminCondidatesVdTable checkable />
      </CardBox>

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
