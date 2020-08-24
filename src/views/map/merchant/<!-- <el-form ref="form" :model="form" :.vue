<!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
            </el-col> -->
          <!--  <el-col span="8">
              <div @click="handleAdd1">弹出地图</div>
            </el-col> -->
          <!-- </el-row> -->
          <!-- <el-row>
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
          </el-row> -->

          <!-- <el-row>
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
          </el-row> -->

          <!-- <el-row>
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
          </el-row> -->

          <!-- <el-form-item label="经营范围" prop="operationRange">
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
          </el-form-item> -->
        <!-- </el-form> -->