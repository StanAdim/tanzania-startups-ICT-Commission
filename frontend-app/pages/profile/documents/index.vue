<script setup lang="ts">
definePageMeta({
  title: 'Documents',
  layout: 'default',
  middleware:'auth',
})

const globalData = useGlobalDataStore()
const docStore = useDocumentStore()
const generalStore = useGeneralStore()

const currentPage = ref <number>(1)
const per_page = ref <number>(10)
const searchQuery = ref('')
const pageSwitchValue = ref(1)
const movePage = async (type:number) => {
  if (type === 1){
    currentPage.value = currentPage.value + pageSwitchValue.value
  }else {
    currentPage.value = currentPage.value - pageSwitchValue.value
  }
  await docStore.retrieveDocuments(per_page.value,currentPage.value)
}
// change page number
const  isEditing = ref(false)
const toggleEditing =  () => isEditing.value = !isEditing.value
const  updateData = async () => {
  await docStore.retrieveDocuments(per_page.value,currentPage.value)
}
const  searchUserData = async () => {
  await docStore.retrieveDocuments(per_page.value,currentPage.value, searchQuery.value)
}
const headers = ref(['Sn', 'Type', "Name" , 'Approved', 'Uploaded Date', 'Actions'])
const OpenConfirmDialog = async (uid) => {
  await ElMessageBox.confirm(
      'This document will be permanently deleted. Continue?',
      'Warning',

      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        distinguishCancelAndClose:true
      }
  )
  await docStore.deleteDoc( uid, 'product')
      .then(() => {
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
        console.log("Deleted")
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
}
const handleAction = async  (type, item) => {
  switch (type){
    case 1: {
      // navigateTo(`/profile/products/product/${item}`)
      console.log(item?.uid)
      await generalStore.previewFile(item)
      break;
    }
    case 2: {
      await docStore.retrieveSingleDoc(item?.uid)
      navigateTo(`/profile/products/create`)
      break;
    }
    case 3: {
      await  OpenConfirmDialog(item?.uid)
      break;
    }
  }

}
// initialize
const init = async () =>  {
  globalData.assignPageTitle('Documents Uploaded')
  await docStore.retrieveDocuments(per_page.value,currentPage.value, searchQuery.value)
}
onNuxtReady(()=> {
  init()
})

</script>

<template>
  <div class="mt-2">
    <UsableDocPreviewerModal :mode="docStore.getPreviewModalState" />

    <div class="flex justify-end items-center gap-2 mb-2 mx-4">
      <UsableNewFeatureBtn @click.prevent="navigateTo('/profile/documents/create')" :is-normal="true" name="Add New" iconClass="fa-solid fa-plus" />
      <div class="">
        <input
            v-model="searchQuery"
            @keyup.enter="searchUserData"
            type="text"
            placeholder="Search..."
            class="search-input"
        />
      </div>
    </div>
    <div class="w-full  py-2">
      <!-- Scrollable Table -->
      <div class="overflow-auto rounded-lg shadow-lg">
        <table class="w-full bg-white rounded-lg overflow-x-auto">
          <thead class="bg-sky-600 ">
          <tr>
            <th
                v-for="header in headers"
                :key="header"
                class="px-2 py-3 text-left font-bold text-xs text-white uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="docStore.getDocumentList?.length != 0"
              v-for="(item, index) in docStore.getDocumentList"
              :key="item.uid"
              class="hover:bg-sky-100">
            <td class="table-data">{{ index + 1 }}</td>
            <td class="table-data">{{ item?.type }}</td>
            <td class="table-data">{{ item?.name }}</td>
            <td class="table-data">
              <span class="mx-2 text-lg">
              <i v-if="item?.status" class="fa-solid fa-circle-check text-green-500"></i>
              <i v-else class="fa-regular fa-circle-xmark text-red-500"></i>
            </span>
            </td>
            <td class="table-data">{{ item?.registration_date }}</td>
            <td class="table-data">
              <el-dropdown size="default" type="primary" placement="bottom-start">
                <el-button><i class="fa-solid fa-prescription-bottle mr-1"></i> Action </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item  @click.prevent="handleAction(1, item)" ><i class="fa-solid fa-eye"></i> View</el-dropdown-item>
<!--                    <el-dropdown-item @click.prevent="handleAction(2, item.uid)"  ><i class="fa-regular fa-pen-to-square"></i> Edit</el-dropdown-item>-->
                    <el-dropdown-item  @click.prevent="handleAction(3, item)" ><i class="fa-solid fa-trash-can"></i> Delete</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </td>
          </tr>
          <tr v-else class="text-center font-bold">No Data Found</tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-4">
        <nav aria-label="Page navigation">
          <ul class="inline-flex space-x-2">
            <li>
              <button
                  @click="movePage(2)"
                  class="action-btn"
              >
                Previous <UsableTheBtnLoader />
              </button>
            </li>
            <li>
              <div class="flex justify-center flex-row gap-2">
                <div class="">Per page</div>
                <div class="">
                  <input
                      v-model="per_page"
                      @blur="toggleEditing"
                      @keyup.enter="updateData"
                      class="text-sky-800 w-12 h-8 text-center border rounded-lg border-sky-400 px-0.5 py-0 outline-none"
                  />
                </div>
              </div>

            </li>
            <li>
              <button
                  @click="movePage(1)"
                  class="action-btn"
              >
                Next <TheBtnLoader />
              </button>
            </li>
          </ul>
        </nav>
      </div>    </div>
  </div>
</template>

<style scoped>
.table-data {
  @apply px-4 py-1.5 whitespace-nowrap text-sm text-gray-700
}

.search-input{
  @apply border border-gray-300 rounded-md px-4 h-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.action-btn {
  @apply px-3 py-2 border border-sky-300 rounded-md text-sm font-medium text-gray-500 hover:bg-sky-100
}
</style>