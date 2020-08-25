<template>
  <div class="app-container">
    <el-tree class="treelist" :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    <div class="treeline"></div>
    <div class="treeGrid">
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="110px">
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
        <el-form-item label="行业分类">
          <el-cascader
          v-model="businessCategoryContent"
          placeholder="行业分类"
          clearable
          @change="businessCategoryChange"
          :options="optionsBusinessCategory"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="经营状态" prop="operationStatus">
          <el-select v-model="queryParams.operationStatus" placeholder="请选择经营状态" clearable size="small">
            <el-option
              v-for="item in operationList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="特殊状态" prop="specialStatus">
          <el-select v-model="queryParams.specialStatus" placeholder="请选择特殊状态" clearable size="small">
             <el-option
              v-for="item2 in specialList"
              :key="item2.dictValue"
              :label="item2.dictLabel"
              :value="item2.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="是否在平台公开" prop="publicStatus">
          <el-select v-model="queryParams.publicStatus" placeholder="请选择是否在平台公开" clearable size="small">
             <el-option
              v-for="item3 in publicList"
              :key="item3.dictValue"
              :label="item3.dictLabel"
              :value="item3.dictValue"
            />
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
              type="info"
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
              v-hasPermi="['system:user:import']"
            >导入</el-button>
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
      <el-tabs v-model="activeName" style="margin-top: 24px" @tab-click="handleClick">
        <el-tab-pane label="证书管理" name="first">证书管理</el-tab-pane>
        <el-tab-pane label="量具表" name="second">量具表</el-tab-pane>
      </el-tabs>
      <!-- 添加或修改商家信息对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
        <div class="infoBox">
          <div class="info_title info_th">市场主体信息表</div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r"><span class="must">*</span> 企业名称</div>
            <el-input style="width: 33.3%" v-model="form.name" class="ib info_border_r" placeholder="请输入内容"></el-input>
            <div style="width: 16.6%" class="info_th ib info_border_r">商圈</div>
            <el-select
              v-model="form.businessRoundId"
              placeholder="商圈"
              clearable
              size="small"
              style="width: 32.6%"
              >
                <el-option
                  v-for="dict in businessRoundIdList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
            </el-select>
            <!-- <el-input style="width: 16.6%" v-model="form.businessRoundId" class="ib" placeholder="请输入内容"></el-input> -->
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r"><span class="must">*</span>统一社会信用代码</div>
            <el-input style="width: 33.3%" v-model="form.creditCode" class="ib info_border_r" placeholder="请输入内容"></el-input>
            <div style="width: 16.6%" class="info_th ib info_border_r"><span class="must">*</span>法定代表人</div>
            <el-input style="width: 16.6%" v-model="form.legalPerson" class="ib" placeholder="请输入内容"></el-input>
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r">联系电话(对外)</div>
            <el-input style="width: 16.7%" v-model="form.outPhone" class="ib info_border_r" placeholder="请输入内容"></el-input>
            <div style="width: 16.6%" class="info_th ib info_border_r">联系电话(对内)</div>
            <el-input style="width: 16.6%" v-model="form.inPhone" class="ib info_border_r" placeholder="请输入内容"></el-input>
            <div style="width: 16.6%" class="info_th ib info_border_r">成立日期</div>
            <el-date-picker
              v-model="form.merchantDate"
              clearable
              size="small"
              style="width: 200px"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择成立日期"
            />
            <!-- <el-input style="width: 16.6%" v-model="form.merchantDate" class="ib" placeholder="请输入内容"></el-input> -->
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r"><span class="must">*</span>选择区县、街道、社区</div>
            <el-input style="width: 83.4%" v-model="form.countyCode"  placeholder="请输入内容"></el-input>
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r"><span class="must">*</span>详细地址</div>
            <el-input style="width: 33.3%" v-model="form.address" class="ib info_border_r" placeholder="请输入内容"></el-input>
            <div style="width: 12.5%" class="info_th ib info_border_r">经度</div>
            <el-input style="width: 12.5%" class="info_border_r" v-model="form.longitude"  placeholder="请输入内容"></el-input>
            <div style="width: 12.5%" class="info_th ib info_border_r">纬度</div>
            <el-input style="width: 12.5%" v-model="form.latitude"  placeholder="请输入内容"></el-input>
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r">行业分类</div>
            <el-input style="width: 83.4%" v-model="form.firstBusinessCategory" placeholder="请输入内容"></el-input>
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r"><span class="must">*</span>经营状态</div>
            <el-input style="width: 16.6%; border: 0" v-model="form.operationStatus" class="ib info_border_r" placeholder="请输入内容"></el-input>
            <div style="width: 16.6%" class="info_th ib info_border_r"><span class="must">*</span>特殊状态</div>
            <el-input style="width: 16.6%" v-model="form.specialStatus" class="ib info_border_r" placeholder="请输入内容"></el-input>
            <div style="width: 16.6%" class="info_th ib info_border_r">用工人数</div>
            <el-input style="width: 16.6%" v-model="form.workerNum" class="ib" placeholder="请输入内容"></el-input>
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r">经营范围</div>
            <el-input style="width: 33.2%;" v-model="form.operationRange" class="ib info_border_r" placeholder="请输入内容"></el-input>
            <div style="width: 16.6%" class="info_th ib info_border_r">是否在平台公开</div>
            <el-input style="width: 33.4%" v-model="form.publicStatus" class="ib" placeholder="请输入内容"></el-input>
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_border_r biaozhun">标准化相关服务</div>
            <div class="ib" style="width: 83.4%">
              <div style="width: 100%">
                <div style="width: 20%" class="info_th ib info_border_r info_border_b">企业成产产品名称</div>
                <el-input style="width: 79%" v-model="form.productName" class="ib info_border_b" placeholder="请输入内容"></el-input>
              </div>
              <div style="width: 100%">
                <div style="width: 20%" class="info_th ib info_border_r">执行标准编号</div>
                <el-input style="width: 79%" v-model="form.standardNo" class="ib" placeholder="请输入内容"></el-input>
              </div>
            </div>
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib info_border_r">图片</div>
            <div style="width: 83.4%" class="info_th ib">
             <el-upload
                action="/dev-api/common/upload"
                :headers="headers"
                :before-upload="beforeAvatarUpload"
                list-type="picture-card"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
          <div class="info_flex info_border_b info_border_l info_border_r">
            <div style="width: 16.6%" class="info_th ib">企业简介</div>
          </div>
          <div>
            <Editor v-model="form.detail" />
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 用户导入对话框 -->
      <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
        <el-upload
          ref="upload"
          :limit="1"
          accept=".xlsx, .xls"
          :headers="upload.headers"
          :action="upload.url + '?updateSupport=' + upload.updateSupport"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false"
          drag
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
            <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
          </div>
          <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">确 定</el-button>
          <el-button @click="upload.open = false">取 消</el-button>
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
  </div>
</template>

<script>
import { listMerchant, getMerchant, delMerchant, addMerchant, updateMerchant, exportMerchant, merchantimportTemplate } from '@/api/map/merchant'
import { allDistrict } from '@/api/map/district'
import { listBusinessCategory } from '@/api/map/businessCategory'
import { getToken } from '@/utils/auth'
import Editor from '@/components/Editor';

listBusinessCategory
export default {
  name: 'Merchant',
  components: {
    Editor
  },
  data() {
    return {
      activeName: 'first',
      businessCategoryContent: [], // 分类
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/map/merchant/importData"
      },
      businessRoundIdList: [],// 商圈下拉
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      headers: {
				Authorization: 'Bearer ' + getToken()
      },
      imageUrl: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      optionsBusinessCategory: [],
      // 遮罩层
      loading: false,
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
      },
      operationList: [],
      specialList: [],
      publicList: []
    }
  },
  created() {
    this.getAllDistrict()
    this.getListBusinessCategory()
    // 字典 经营状态
    this.getDicts("map_operation_status").then(response => {
      this.operationList = response.data;
    });
    // 特殊状态
    this.getDicts("map_special_status").then(response => {
      this.specialList = response.data;
    });
    // 是否公开
    this.getDicts("map_public_status").then(response => {
      this.publicList = response.data;
    });
    // this.getList()
  },
  mounted() {
    window.addEventListener('message', this.hendMessage)
  },
  methods: {
    // 分类选择查询赋值
    businessCategoryChange (val) {
      if (!val) return
      this.queryParams.firstBusinessCategory = val[0]
      this.queryParams.secondBusinessCategory = val[1]
      this.queryParams.threeBusinessCategory = val[2]
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    beforeAvatarUpload(file) {
      if (this.imageUrl.length > 2) {
        this.$message.error('2zahng!');
        return false
      }
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file, fileList) {
      this.imageUrl = fileList
      console.log(this.imageUrl);
    },
    handleRemove(file, fileList) {
      this.imageUrl = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 树节点点击
    handleNodeClick(data) {
        console.log(data);
        switch (data.level) {
          case 1:
            // 区县
            this.queryParams.countyCode = data.code
            this.queryParams.streetCode = undefined
            this.queryParams.communityCode = undefined
            break;
          case 2:
            // 街道
            this.queryParams.countyCode = undefined
            this.queryParams.communityCode = undefined
            this.queryParams.streetCode = data.code
          break;
          case 3:
            // 社区
            this.queryParams.countyCode = undefined
            this.queryParams.streetCode = undefined
            this.queryParams.communityCode = data.code
          break;
          default:
            this.queryParams.countyCode = undefined
            this.queryParams.streetCode = undefined
            this.queryParams.communityCode = undefined
            break;
        }
        this.getList()
    },
    // 处理当前街道社区的lable
    getTree (data) {
      for(var i = 0; i < data.length; i++) {
        data[i].label = data[i].name
        delete data[i].name
        if(data[i].children) {
          this.getTree(data[i].children)
        }
      }
    },
    // 处理行业分类
    getBusinessCategory (data) {
      for(var i = 0; i < data.length; i++) {
        data[i].label = data[i].name
        data[i].value = data[i].code
        delete data[i].name
        delete data[i].code
        if(data[i].children) {
          this.getBusinessCategory(data[i].children)
        }
      }
    },
    // 行业分类
    getListBusinessCategory () {
      listBusinessCategory()
      .then(response => {
       console.log(response);
       this.getBusinessCategory(response.data.root)
        this.optionsBusinessCategory = response.data.root
      })
      .catch((response) => {
          console.log('失败', response);
      })
    },
    getAllDistrict () {
      allDistrict()
      .then(response => {
        this.getTree(response.data.root)
        // this.treeData = response.data.root
        this.treeData = [{
          label: '七台河市',
          children: response.data.root
          }]
      })
      .catch((response) => {
          console.log('失败', response);
      })
    },
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
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      merchantimportTemplate().then(response => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
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
      this.queryParams.countyCode = undefined
      this.queryParams.streetCode = undefined
      this.queryParams.communityCode = undefined
      this.queryParams.firstBusinessCategory = undefined
      this.queryParams.secondBusinessCategory = undefined
      this.queryParams.threeBusinessCategory = undefined
      this.businessCategoryContent = undefined
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
<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-dialog__body {
    overflow: scroll;
    max-height: 700px;
  }
  .infoBox {
    width: 100%;
  }
  .biaozhun {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .infoBox  input {
      border: 0 !important;
  }
  .info_border_l {
    border-left: 1px solid #eee;
  }
  .info_border_r {
    border-right: 1px solid #eee;
  }
  .info_border_b {
    border-bottom: 1px solid #eee;
  }
  .must {
    color: rgb(219, 35, 35);
  }
  .info_title {
    border: 1px solid #eee;
  }
  .info_flex {
    display: flex;
  }
  .info_th {
    padding: 10px 0;
    text-align: center;
  }
  .ib {
    display: inline-block !important;
  }
  .app-container {
    display: flex;
  }
  .treeGrid {
    width: 90%;
    margin-left: 24px;
  }
  .treelist {
    width: 10%;
  }
  .treeline {
    width: 1px;
    background: #eee;
  }
</style>
<style>
.el-message-box__message p {
    margin: 0;
    line-height: 24px;
    max-height: 800px;
    overflow: scroll;
}
</style>
