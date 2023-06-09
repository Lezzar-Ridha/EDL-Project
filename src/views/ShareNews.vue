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
import TableSampleClients from "@/components/Tables/UsersTable.vue";
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
import axios from 'axios'

const styleStore = useStyleStore();
const isModalActive = ref(false);
const selectType = [
  { id: 1, label: "GL" },
  { id: 2, label: "STIW" },
  { id: 3, label: "STIC" },
  { id: 4, label: "RSD" },
  // { id: 5, label: "ALL" },
  
];

const form = reactive({
  // image: '',
  link: '',
  title: '',
  description: '',
  speciality: '',
})

const submit = () => { 
  axios.post('https://localhost:8000/announces' , 
  {
    // image : form.image,
    link: form.link,
    title: form.title,
    description: form.description,
    speciality: form.speciality.label

  }
  )
    .then((response) => {
        console.log(response);
        window.location.reload();
    }, (error) => {
        console.log(error);
    });
  }

  const announces = reactive([])
  
  onBeforeMount(() => {
    
    axios.get('https://localhost:8000/announces').then(res => {
      announces.value = res.data
      console.log(announces.value)
    }).catch(err => { console.log(err)})
  })

</script>

<template>

  


  <LayoutAuthenticated>
    <CardBoxModal v-model="isModalActive" title="Share News" >
        <div :class="
        styleStore.darkMode
          ? 'aside-scrollbars-[slate]'
          : styleStore.asideScrollbarsStyle
      "
      class="flex-1 overflow-y-auto overflow-x-hidden">
             
          
        <!-- <FormField label="Image">
            <FormFilePicker small  label="Upload Image" v-model="form.image"
            />
        </FormField> -->

        <FormField label="Title" >
            <FormControl
                type="text"
                placeholder="Title"
                v-model="form.title"
            />
        </FormField>

        <FormField label="Link" >
          <FormControl
              type="text"
              placeholder="Link"
              v-model="form.link"
          />
      </FormField>
   
        <FormField label="Speciality">
             <FormControl  :options="selectType"
             v-model="form.speciality"
             />
        </FormField>
                
        <FormField label="Description" >
              <FormControl
                  type="textarea"
                  placeholder="Description"
                  v-model="form.description"
                />
        </FormField>
                
            <BaseDivider />
    
            <!-- <template #footer> -->
              <BaseButtons class="my-4">
                <BaseButton type="submit" @click="submit" color="success" label="Submit" />
                <BaseButton type="cancel" @click="isModalActive = false"   color="danger"  label="Cancel" />
              </BaseButtons>
            <!-- </template> -->
          </div>
      </CardBoxModal>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Announces" main>
        <BaseButton
          
          target="_blank"
          @click=" isModalActive = true"
          :icon="mdiAccountMultiplePlusOutline"
          label="Share News"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
        <div v-for="client in announces.value" :key="client.id" class=" lg:flex flex-initial lg:flex-wrap justify-center">
          <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-xs dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src="../../public/photo_2023-06-09_18-06-18.jpg" alt="">
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">{{ client.title}}</h5>
                </a>
                <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">{{ client.description}}</p>
                <a :href="client.link" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div>
        
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
