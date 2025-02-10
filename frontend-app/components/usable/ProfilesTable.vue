<script setup lang="ts">
const props = defineProps({
  headers: {
    default: [],
    type: Array
  },
  data: {
    default: [],
    type: Array
  },
})

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
  // await progStore.retrieveAllProgrammes(per_page.value,currentPage.value)
}
// change page number
const genStore = useGeneralStore()
const  isEditing = ref(false)
const toggleEditing =  () => isEditing.value = !isEditing.value
const  updateData = async () => {
  // await progStore.retrieveAllProgrammes(per_page.value,currentPage.value)
}
const  searchUserData = async () => {
  await genStore.retrieveApprovedProfiles('startups', searchQuery.value , per_page.value)
}
</script>

<template>
  <div class="" data-aos="zoom-in" data-aos-duration="1000">
    <div class="mt-2 bg-sky-100 p-2">
      <div class="flex justify-end items-center gap-2 mb-2 mx-4">
        <div class="">
          <input
              data-aos="slide-right" data-aos-duration="2000"
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
                  v-for="headerItem in props?.headers"
                  :key="headerItem"
                  class="px-2 py-3 text-left font-bold text-xs text-white uppercase tracking-wider"
              >
                {{ headerItem }}
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="props.data?.length != 0"
                v-for="(item, index) in props.data"
                :key="item.uid"
                class="hover:bg-sky-100">
              <td class="table-data">{{ index + 1 }}</td>
              <td class="table-data">{{ item?.name }}</td>
              <td class="table-data">{{ item?.industry }}</td>
              <td class="table-data">{{ item?.location }}</td>
            </tr>
            <tr v-else class="text-center font-bold">
              <td class="py-2">... <span class="text-red-400 text-sm">Empty data</span></td>
            </tr>
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
                  Next <UsableTheBtnLoader />
                </button>
              </li>
            </ul>
          </nav>
        </div>    </div>
    </div>
  </div>
</template>

<style scoped>

</style>