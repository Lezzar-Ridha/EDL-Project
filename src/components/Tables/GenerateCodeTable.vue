<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import axios from "axios";


const teacherslist = reactive([]) 
const usersStore = useMainStore();
const condidates = reactive([])

onBeforeMount(() => {
    axios.get('https://127.0.0.1:8000/participants').then(res => {
      condidates.value = res.data
      console.log(condidates.value)
    })

})

defineProps({
  checkable: Boolean,
});

const mainStore = useMainStore();

const items = computed(() => mainStore.clients);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(9);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const form = reactive({
    firstName: '',
    lastName: '' ,
    module: ''

})

function checked(teacher){
    form.firstName = teacher.name
    form.lastName = teacher.name
    form.module = teacher.name
    isModalActive.value = true
  
};
const generateCode = () => { 
  axios.get('https://localhost:8000/participants/code')
  .then(res => {
    condidates.value = res.data
    console.log(condidates.value)
    window.location.reload()
})


}
</script>

<template>
  <CardBoxModal v-model="isModalActive" :title="form.firstName">
    <input type="text" v-model="form.firstName">
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <BaseButton
          
          target="_blank"
          @click="generateCode()"
          :icon="mdiAccountMultiplePlusOutline"
          label="Generate Code"
          color="info"
          class="w-full"
        />

  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>الاسم</th>
        <th>اللقب</th>
        <th>email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in condidates.value" :key="client.id">
        <td  data-label="ID">
          <div >
            {{ client.code  }}
          </div>
        </td>
        <td data-label="Name">
          {{ client.firstName }}
        </td>
        <td data-label="Company">
          {{ client.lastName }}
        </td>
        <td data-label="Name">
            {{ client.firstNameArabic }}
          </td>
          <td data-label="Company">
            {{ client.lastNameArabic }}
          </td>

            <td data-label="Name">
              {{ client.email }}
            </td>

      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
