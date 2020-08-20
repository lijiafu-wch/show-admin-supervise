<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="商圈id" prop="businessRoundId">
        <el-input
          v-model="queryParams.businessRoundId"
          placeholder="请输入商圈id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入企业名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="成立日期" prop="merchantDate">
        <el-date-picker
          v-model="queryParams.merchantDate"
          clearable
          size="small"
          style="width: 200px"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择成立日期"
        />
      </el-form-item>
      <el-form-item label="区县code" prop="countyCode">
        <el-input
          v-model="queryParams.countyCode"
          placeholder="请输入区县code"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="街道code" prop="streetCode">
        <el-input
          v-model="queryParams.streetCode"
          placeholder="请输入街道code"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="社区code" prop="communityCode">
        <el-input
          v-model="queryParams.communityCode"
          placeholder="请输入社区code"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="行业分类一级" prop="firstBusinessCategory">
        <el-input
          v-model="queryParams.firstBusinessCategory"
          placeholder="请输入行业分类一级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行业分类二级" prop="secondBusinessCategory">
        <el-input
          v-model="queryParams.secondBusinessCategory"
          placeholder="请输入行业分类二级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行业分类三级" prop="threeBusinessCategory">
        <el-input
          v-model="queryParams.threeBusinessCategory"
          placeholder="请输入行业分类三级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营状态" prop="operationStatus">
        <el-select v-model="queryParams.operationStatus" placeholder="请选择经营状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="特殊状态" prop="specialStatus">
        <el-select v-model="queryParams.specialStatus" placeholder="请选择特殊状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>

      <el-form-item label="是否在平台公开" prop="publicStatus">
        <el-select v-model="queryParams.publicStatus" placeholder="请选择是否在平台公开" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['map:merchant:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['map:merchant:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['map:merchant:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['map:merchant:export']"
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="merchantList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商圈id" align="center" prop="businessRoundId" />
      <el-table-column label="企业名称" align="center" prop="name" />
      <el-table-column label="法人代表" align="center" prop="legalPerson" />
      <el-table-column label="成立日期" align="center" prop="merchantDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.merchantDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区县code" align="center" prop="countyCode" />
      <el-table-column label="街道code" align="center" prop="streetCode" />
      <el-table-column label="社区code" align="center" prop="communityCode" />
      <el-table-column label="行业分类一级" align="center" prop="firstBusinessCategory" />
      <el-table-column label="行业分类二级" align="center" prop="secondBusinessCategory" />
      <el-table-column label="行业分类三级" align="center" prop="threeBusinessCategory" />
      <el-table-column label="经营状态" align="center" prop="operationStatus" />
      <el-table-column label="特殊状态" align="center" prop="specialStatus" />
      <el-table-column label="是否在平台公开" align="center" prop="publicStatus" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['map:merchant:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['map:merchant:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改商家信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col span="16">
            <el-form-item label="企业名称" prop="name" />
              <el-input v-model="form.name" placeholder="请输入企业名称" />
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="商圈id" prop="businessRoundId">
              <el-input v-model="form.businessRoundId" placeholder="请输入商圈id" />
            </el-form-item>
          </el-col>
        <!--  <el-col span="8">
            <div @click="handleAdd1">弹出地图</div>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col span="16">
            <el-form-item label="统一社会信用代码" prop="creditCode">
              <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="法人代表" prop="legalPerson">
              <el-input v-model="form.legalPerson" placeholder="请输入法人代表" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="联系电话(对内)" prop="inPhone">
              <el-input v-model="form.inPhone" placeholder="请输入联系电话(对内)" />
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="联系电话(对外)" prop="outPhone">
              <el-input v-model="form.outPhone" placeholder="请输入联系电话(对外)" />
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="成立日期" prop="merchantDate">
              <el-date-picker
                v-model="form.merchantDate"
                clearable
                size="small"
                style="width: 200px"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择成立日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="8">
            <el-form-item label="区县code" prop="countyCode">
              <el-input v-model="form.countyCode" placeholder="请输入区县code" />
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="街道code" prop="streetCode">
              <el-input v-model="form.streetCode" placeholder="请输入街道code" />
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="社区code" prop="communityCode">
              <el-input v-model="form.communityCode" placeholder="请输入社区code" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="form.address" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="form.longitude" placeholder="请输入经度" />
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="form.latitude" placeholder="请输入纬度" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="">
            <el-form-item label="行业分类一级" prop="firstBusinessCategory">
              <el-input v-model="form.firstBusinessCategory" placeholder="请输入行业分类一级" />
            </el-form-item>
          </el-col>
          <el-col span="">
            <el-form-item label="行业分类二级" prop="secondBusinessCategory">
              <el-input v-model="form.secondBusinessCategory" placeholder="请输入行业分类二级" />
            </el-form-item>
          </el-col>
          <el-col span="">
            <el-form-item label="行业分类三级" prop="threeBusinessCategory">
              <el-input v-model="form.threeBusinessCategory" placeholder="请输入行业分类三级" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="">
            <el-form-item label="经营状态">
              <el-radio-group v-model="form.operationStatus">
                <el-radio label="1">请选择字典生成</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col span="">
            <el-form-item label="特殊状态">
              <el-radio-group v-model="form.specialStatus">
                <el-radio label="1">请选择字典生成</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col span="">
            <el-form-item label="用工人数" prop="workerNum">
              <el-input v-model="form.workerNum" placeholder="请输入用工人数" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="经营范围" prop="operationRange">
          <el-input v-model="form.operationRange" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否在平台公开 1-公开   2-未公开">
          <el-radio-group v-model="form.publicStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="企业产品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入企业产品名称" />
        </el-form-item>
        <el-form-item label="执行标准编号" prop="standardNo">
          <el-input v-model="form.standardNo" placeholder="请输入执行标准编号" />
        </el-form-item>
        <el-form-item label="企业简介" prop="detail">
          <el-input v-model="form.detail" placeholder="请输入企业简介" />
        </el-form-item>
        <el-form-item label="图片1" prop="pictureOne">
          <el-input v-model="form.pictureOne" placeholder="请输入图片1" />
        </el-form-item>
        <el-form-item label="图片2" prop="pictureTwo">
          <el-input v-model="form.pictureTwo" placeholder="请输入图片2" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="showMap" width="80%" append-to-body>
      <!-- <div v-if="showMap"> -->
      <iframe
        src="/html/tc.html"
        frameborder="0"
        style="position: fixed;
      top: 25%;
      width: 80%;
      height: 80%;
      z-index: 25;
      margin-top: 0px;
      margin-right: 10px;
      margin-left: 10px;
      margin-bottom: 10px;"
      />
      <!-- </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listMerchant, getMerchant, delMerchant, addMerchant, updateMerchant, exportMerchant } from '@/api/map/merchant'

export default {
  name: 'Merchant',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 商家信息表格数据
      merchantList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否显示地图弹出层
      showMap: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        businessRoundId: undefined,
        name: undefined,
        creditCode: undefined,
        legalPerson: undefined,
        inPhone: undefined,
        outPhone: undefined,
        merchantDate: undefined,
        countyCode: undefined,
        streetCode: undefined,
        communityCode: undefined,
        address: undefined,
        longitude: undefined,
        latitude: undefined,
        firstBusinessCategory: undefined,
        secondBusinessCategory: undefined,
        threeBusinessCategory: undefined,
        operationStatus: undefined,
        specialStatus: undefined,
        workerNum: undefined,
        operationRange: undefined,
        publicStatus: undefined,
        productName: undefined,
        standardNo: undefined,
        detail: undefined,
        pictureOne: undefined,
        pictureTwo: undefined,
        excelNo: undefined,
        deleted: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    window.addEventListener('message', this.hendMessage)
  },
  methods: {
    hendMessage(event) {
      const data = event.data
      console.log('接收到参数：' + data.result)
    },
    /** 查询商家信息列表 */
    getList() {
      this.loading = true
      listMerchant(this.queryParams).then(response => {
        this.merchantList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        businessRoundId: undefined,
        name: undefined,
        creditCode: undefined,
        legalPerson: undefined,
        inPhone: undefined,
        outPhone: undefined,
        merchantDate: undefined,
        countyCode: undefined,
        streetCode: undefined,
        communityCode: undefined,
        address: undefined,
        longitude: undefined,
        latitude: undefined,
        firstBusinessCategory: undefined,
        secondBusinessCategory: undefined,
        threeBusinessCategory: undefined,
        operationStatus: '0',
        specialStatus: '0',
        workerNum: undefined,
        operationRange: undefined,
        publicStatus: '0',
        productName: undefined,
        standardNo: undefined,
        detail: undefined,
        pictureOne: undefined,
        pictureTwo: undefined,
        excelNo: undefined,
        createTime: undefined,
        updateTime: undefined,
        updateBy: undefined,
        createBy: undefined,
        deleted: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加商家信息'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMerchant(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改商家信息'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateMerchant(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addMerchant(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除商家信息编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMerchant(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有商家信息数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMerchant(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function() {})
    },
    /** 地图操作 */
    handleAdd1() {
      this.showMap = true
    }
  }
}
</script>
