<!--
 * @Author: your name
 * @Date: 2020-08-25 14:23:37
 * @LastEditTime: 2020-08-25 14:55:35
 * @LastEditors: Please set LastEditors
 * @Description: 证书info
 * @FilePath: /show-admin-supervise/src/views/map/merchant/table_modules/certificateList.vue
-->
<template>
  <div>
      <el-table v-loading="loading" :data="data">
        <el-table-column label="证书名称" align="center" prop="merchantName" />
        <el-table-column label="有效期" align="center" prop="streetCode" />
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
  </div>
</template>

<script>

import { listMeasureAappliance } from '@/api/map/measureAappliance'

export default {
    data () {
        return {
            data: [],
            total: 0,
            loading: false,
            queryParams: {
                pageNum: 1,
                pageSize: 5
            }
        }
    },
    methods: {
        getList (val) {
            this.loading = true
            listMeasureAappliance(this.queryParams).then(response => {
                this.data = response.rows
                this.total = response.total
                this.loading = false
            })
            .catch((response) => {
                console.log('失败', response);
            })
        }
    }
}
</script>

<style>

</style>