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

const teachers = reactive([])
const teachersModules = reactive([])

onBeforeMount(() => {
    axios.get('https://127.0.0.1:8000/users/type/teacher')
    .then(async (res) => {
      teachers.value = res.data
      for (let teacher of teachers.value) {
        await getModulesByTeacherId(teacher._id, teacher);
      }
    })
})

function getModulesByTeacherId(id, teacher) {
  axios.get('https://127.0.0.1:8000/users/teacher/' + id + '/modules')
  .then(async (res) => {
    teachersModules.value = res.data
    const teacherAndModuleObject = Object.assign(teacher, teachersModules.value);
    // teachersModules.value = [...teacherAndModuleObject];
    teachersModules.push(teacherAndModuleObject);
    console.log(teachersModules);
  })
}

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

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Module</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in teachersModules" :key="client.id">
        
        <td data-label="Name">
          {{ client._id }}
        </td>
        <td data-label="Name">
          {{ client.firstName }}
        </td>
        <td data-label="Company">
          {{ client.lastName }}
        </td>
        <td data-label="Company">
          {{ client.email }}
        </td>
        <td data-label="Company">
            <div v-if="!client" class="flex">
                No modules
            </div>
            <div v-else class='flex'>
                <div v-for="module of client" :key="module" class="flex mx-2">
                {{ module.name }}
              </div>
            </div>
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
  <!-- <div>
    {{ 
      teachersModules[0][0].name
      for (let t of teachersModules[0]) {
        t.name
      }
     }}
  </div> -->
</template>
