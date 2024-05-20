<template>
  <div>
    <m-table :data="tableData">
      <m-table-column prop="date" label="Date" :min-width="120" fixed />
      <m-table-column prop="name" label="Name" :min-width="120" />
      <m-table-column prop="address" label="Address" :min-width="180" />
    </m-table>

    <m-nav-bar title="标题" />
  </div>
</template>

<script setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style lang="scss" scoped>

</style>
