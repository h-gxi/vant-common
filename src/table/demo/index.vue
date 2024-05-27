<template>
  <demo-block title="基础用法">
    <m-table :data="tableData">
      <m-table-column prop="date" label="Date" :min-width="100" :fixed="true" :sortable="true" />
      <m-table-column prop="name" label="Name" :min-width="100" :fixed="true" :sortable="true" />
      <m-table-column prop="address" label="Address" :min-width="200" />
    </m-table>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue'
import MTable from '../index';
import MTableColumn from '../../table-column/index';

const tableData = ref([
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
])

</script>

