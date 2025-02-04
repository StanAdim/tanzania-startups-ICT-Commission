<script setup lang="ts">
const categories = [
  {title: 'Grassroot Programmes',
    icon: 'grassroot.png',
    target: 'grassroot-programmes',
    description : 'Designed to stimulate ICT innovations at lower ages such as in Primary\n' +
        ' school level and secondary school level. Aim to stimulate the students\n' +
        ' mindset to see potential in science and technology and developing solutions that tap daily life community problems.' ,
    style: 'bg-yellow-400 text-black'},
  {title: 'ICT Startups',
    icon: 'startups.png',
    target: 'ict-startups',
    description : 'An Information and Communication Technology company in the first stages of operations,\n' +
        ' founded by one or more entrepreneurs who want to develop a product or service for which \n' +
        ' they believe there is demand.' ,
    style: 'bg-blue-400 text-white'},

  // { title: 'ICT Small / Medium Companies',
  //   icon: 'corporate-culture.png',
  //   target: '',
  //   description : 'Registered businesses or enterprises which use ICT innovations in offering their services. The nature of SMEs are normally registered Sole proprietor businesses, or partnership firms.' ,
  //   style: 'bg-yellow-400 text-black'},
  { title: 'ICT Incubation Hubs',
    icon: 'Innovation-hubs.png',
    target: 'innovation-hubs',
    description : 'A cutting-edge digital technology individuals who solve society business problems and\n' +
        ' normally have working prototypes or Minimum viable products or full functioning products developed ready for use.' ,
    style: 'bg-green-400 text-black'
  },
  // {
  //   title: 'Grant Programs',
  //   icon: 'charity.png',
  //   target: '',
  //   description : 'Different ways the government funds innovation ideas and projects to provide public services and\n' +
  //       ' stimulate the economy. Grants normally are provided to support critical recovery initiatives, innovative research.' ,
  //   style: 'bg-green-500 text-white' },
  {title: 'ICT Digital Accelerators',
    icon: 'accelerators.png',
    target: 'digital-accelerators',
    description : 'Institution that nurtures entrepreneurs to create successful ICT start ups\n' +
        ' and provide a set of designed services to foster their growth for a specific period of time.\n' +
        ' Encouraging those whose career is beginning to realize their innovative ideas in a quicker and easier way.' ,
    style: 'bg-black text-white'},
]
</script>

<template>
  <div class="container mx-auto md:mt-4">
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <GuestCardCategory
          v-for="item in categories"
          :key="item.title" :title="item.title"
          :style="item.style" :icon="item.icon"
          :description="item.description" :target="item.target"
      />

    </div>
  </div>
</template>

<style scoped>

</style>