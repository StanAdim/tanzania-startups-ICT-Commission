<script setup lang="ts">
const categories = [
  {title: 'ICT Grassroot Programmes', key : 'grassroot-programs',  description: 'A grassroots program is all about empowering local communities to take charge of their own\n' +
        'challenges and opportunities. It fosters change from the ground up, directly involving the people\n' +
        'who are most affected. These programs create sustainable solutions by leveraging local\n' +
        'knowledge, skills, and resources. Examples of grassroots initiatives include:'
  ,props: [
      {subTitle : 'Basic Computer Training', desc: 'This involves teaching individuals’ essential skills like using\n' +
            'a keyboard, navigating the internet, sending emails, and understanding basic online\n' +
            'safety. The goal is to ensure everyone, regardless of their background, can take advantage\n' +
            'of digital tools.'},
      {subTitle : 'Community Tech Centers', desc: 'These are local hubs equipped with computers and internet\n' +
            'access. They serve various purposes, such as providing a place for online education,\n' +
            'helping people apply for jobs, or accessing government services online. Think of them as\n' +
            'community libraries focused on technology.'},
      {subTitle : 'Tech Awareness Campaigns', desc: 'These campaigns inform people how technology can\n' +
            'enhance their lives. For example, educating farmers on how to use apps to track weather\n' +
            'conditions or market prices, or showing small business owners how to sell products\n' +
            'online.'},
      {subTitle : 'Teacher and Staff Training', desc: 'This involves equipping teachers, healthcare workers, and\n' +
            'other community leaders with technology skills. For teachers, this might include\n' +
            'integrating digital tools into their teaching methods. For healthcare workers, it could be\n' +
            'using electronic health records or telemedicine.'},
    ]
  },
  {title: 'ICT Startup', key : 'ict-startups',  description: 'An ICT (Information and Communication Technology) startup is a new company that innovates\n' +
        'in the digital tech field. These startups are known for their fresh ideas and potential for quick\n' +
        'growth. Activities involved in the startup journey include:'
  ,props: [
      {subTitle : 'Innovation', desc: 'ICT startups often bring unique solutions to the market. This can be\n' +
            'anything from ground breaking software to advanced AI (Artificial Intelligence)\n' +
            'applications. For instance, creating a new mobile app that solves a specific problem or a\n' +
            'cybersecurity solution that protects companies from online threats.'},
      {subTitle : 'Growth Potential', desc: 'These startups aim to scale rapidly, meaning they want to expand\n' +
            'their reach and operations quickly. They design their products or services to handle\n' +
            'growth without needing a proportionate increase in resources.'},
      {subTitle : 'Flexibility', desc: 'ICT startups must adapt quickly to new technologies and market changes. If a\n' +
            'new tech trend emerges, they’re usually among the first to pivot and incorporate it into\n' +
            'their strategies.'},
      {subTitle : 'Funding', desc: 'Early-stage ICT startups often rely on outside funding to get started. This can\n' +
            'come from venture capitalists, angel investors, or government grants. These funds help\n' +
            'them develop their products and enter the market.'},
    ]
  },
  {title: 'ICT Innovation Hub', key : 'innovation-hubs',  description: 'An incubation hub is like a nurturing greenhouse for startups. It provides the environment and\n' +
        'support needed for new businesses to grow and thrive. Activities under incubation programs\n' +
        'include:'
  ,props: [
      {subTitle : 'Mentorship and Funding Assistance', desc: 'One of the key offerings of an incubation hub is access to mentors.\n' +
            'These mentors are typically industry experts who provide guidance on various aspects\n' +
            'of running a business, such as marketing strategies, financial planning, and product\n' +
            'development. Incubation hubs help startups identify and apply for funding\n' +
            'opportunities, whether through grants, loans, or venture capital.'},
      {subTitle : 'Workspace', desc: 'Incubation hubs often provide office space at low or no cost. This\n' +
            'includes desks, high-speed internet, meeting rooms, and sometimes even legal and\n' +
            'accounting services. This kind of infrastructure support is crucial for startups that\n' +
            'might otherwise struggle to afford it.'},
      {subTitle : 'Networking', desc: 'Startups in an incubation hub get opportunities to meet potential\n' +
            'investors, partners, and customers through organized networking events. These\n' +
            'connections can be invaluable in gaining funding and building a customer base.'},
      {subTitle : 'Training', desc: 'Hubs offer regular workshops and training sessions on essential business\n' +
            'skills. Topics might include business planning, marketing, finance, and legal\n' +
            'compliance, all aimed at helping startups build a strong foundation.'},
    ]
  },
  {title: 'Digital Accelerators', key : 'digital-accelerators',  description: 'A digital accelerator is designed to fast-track startups that are ready to scale. It&#39;s like giving a\n' +
        'turbo boost to companies with high growth potential. Activities implemented by digital\n' +
        'accelerators include:'
  ,props: [
      {subTitle : 'Structured Programs', desc: 'Digital accelerators have intensive programs that include\n' +
            'workshops, boot camps, and one-on-one coaching. These programs usually last for a few\n' +
            'months and are designed to accelerate the startup’s growth.'},
      {subTitle : 'Tech Access', desc: 'Startups in an accelerator get access to advanced technology like\n' +
            'development tools, platforms, and software. This helps them build and test their products\n' +
            'more efficiently.'},
      {subTitle : 'Market Validation', desc: 'Accelerators help startups refine their products by getting feedback\n' +
            'from experienced mentors and potential customers. This process ensures the product\n' +
            'meets market needs before a large-scale launch.'},
      {subTitle : 'Investor Pitches and Global reaches', desc: 'One of the key goals of an accelerator is to prepare startups for\n' +
            'investment rounds. This involves coaching them on how to pitch their business to\n' +
            'investors and setting up meetings with venture capitalists and angel investors. Accelerators often have connections to international markets, helping\n' +
            'startups expand their reach beyond local boundaries'},
    ]
  },
]
</script>
<template>
<div class="">
  <p class="mt-3 text-xl sm:mt-4">The following are the systems registration stakeholders</p>
  <div class="mt-2" v-for="category in categories" :id="category?.key" :key="category?.title">
    <h3 class="text-3xl font-extrabold text-sky-900  mt-4">{{category?.title}}</h3>
    <p class="mt-3 sm:mt-4 text-lg"> {{ category?.description }}</p>
    <ul class="mt-3 text-lg grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-6">
      <li class="rounded-lg  p-2 bg-sky-200" v-for="subItem in category?.props" :key="subItem?.subTitle" data-aos="zoom-in">
        <b class="px-2 text-sky-900 ">{{subItem?.subTitle}}: </b> <br /> <span class="">{{ subItem?.desc}}</span>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped>

</style>