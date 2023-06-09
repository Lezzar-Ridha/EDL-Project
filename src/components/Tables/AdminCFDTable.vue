<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import axios from "axios";

const teacherslist = reactive([]) 
const cfd = reactive([])

onBeforeMount(() => {
    axios.get('https://127.0.0.1:8000/users/type/cfd').then(res => {
      cfd.value = res.data
      console.log(teachers.value)
    })
})



// onBeforeMount(() => {
//     axios.get('http://127.0.0.1:8080/')
//     .then(res => {
//         teacherslist.value = res.data
//     })
// })
defineProps({
  checkable: Boolean,
});

const mainStore = useMainStore();

const items =  cfd;

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(1);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.length / perPage.value));

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
    email: ''

})

const update = (id) => { 
  
  axios.put('https://localhost:8000/users/' + id, 
  {firstName : form.firstName,
  lastName : form.lastName,
  email : form.email,
  password : form.password,
  type : form.type
  }
  )
    .then((response) => {
        console.log(response);
        window.location.reload();
    }, (error) => {
        console.log(error);
    });
};

const reset = (id) => {
  axios.delete('https://localhost:8000/users/' + id)
    .then((response) => {
        console.log(response);
        window.location.reload();
    }, (error) => {
        console.log(error);
    });
}

function checked(cfd){
    form.id = cfd._id,
    form.firstName = cfd.firstName
    form.lastName = cfd.lastName
    form.email = cfd.email
    isModalActive.value = true
  
};
</script>

<template>
  <CardBoxModal v-model="isModalActive" :title="form.firstName +  form.lastName">
    <FormField >
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

        
        <BaseDivider />

          <BaseButtons>
            <BaseButton @click="update(form.id)" color="info" label="Submit" />
            <BaseButton @click="reset(form.id)" color="danger" outline label="delete" />
          </BaseButtons>

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
        
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in cfd.value" :key="client.id">
        
        <td data-label="Name">
          {{ client.firstName }}
        </td>
        <td data-label="Company">
          {{ client.lastName }}
        </td>
        <td data-label="Company">
          {{ client.email }}
        </td>
        

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="checked(client)"
            />
            
          </BaseButtons>
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
