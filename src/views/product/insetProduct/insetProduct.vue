<template>
  <div class="product">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="产品名称">
              <el-input v-model="form.name" placeholder="请输入产品名称" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品通过率">
              <el-input v-model="form.approvalRate" placeholder="请输入贷款额度" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品利率">
              <el-input v-model="form.interestRate" placeholder="请输入利率" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="可分期数">
              <el-input v-model="form.installmentPeriods" placeholder="请输入产品名称" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="goole地址">
              <el-input v-model="form.googleUrl" placeholder="请输入APK路径" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="排序">
              <el-input v-model="form.sort" placeholder="请输入排序" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="icon图片">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request="uploadFile"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="'http://47.74.180.93:9511/'+imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="APk包上传">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="uploadApk"
                :on-remove="handleRemove"
                :before-upload="beforeApkUpload"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button :loading="apkLoading" size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传APK安装包</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="可贷时间">
              <div v-for="(item,index) in loanTime" :key="index" style="padding:5px 0">
                <el-input v-model="item.time" style="width:400px" />
                <el-button @click.prevent="removeTime(item,index)">删除</el-button>
              </div>
              <el-button @click.prevent="addTimeItem()">添加</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可贷金额">
              <div v-for="(item,index) in loanAmount" :key="index" style="padding:5px 0">
                <el-input v-model="item.price" style="width:400px" />
                <el-button @click.prevent="removePrice(item,index)">删除</el-button>
              </div>
              <el-button @click.prevent="addPrice">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品描述">
              <div
                v-for="(item,index) in applicationRequirements"
                :key="index"
                style="padding:5px 0"
              >
                <el-input v-model="item.text" style="width:400px" />
                <el-button @click.prevent="removeApplication(item,index)">删除</el-button>
              </div>
              <el-button @click.prevent="addApplication()">添加</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请条件">
              <div v-for="(item,index) in productDescription" :key="index" style="padding:5px 0">
                <el-input v-model="item.text" style="width:400px" />
                <el-button @click.prevent="removeDescription(index)">删除</el-button>
              </div>
              <el-button @click.prevent="addDescription()">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { uploadFile } from '@/api/user'
import { insetProduct } from '@/api/product'
export default {
  data() {
    return {
      apkLoading: false,
      disabled: true,
      formInline: {
        user: ''
      },
      imageUrl: '',
      apkUrl: '',
      dialogFormVisible: false,
      loanTime: [
        {
          time: ''
        }
      ], // 时间
      loanAmount: [
        {
          price: ''
        }
      ],
      applicationRequirements: [
        {
          text: ''
        }
      ], // 条件
      productDescription: [
        {
          text: ''
        }
      ], // 描述
      form: {
        name: '',
        loanTime: [], // 时间
        interestRate: '', // 利率
        loanAmount: [], // 金额
        applicationRequirements: [], // 条件
        productDescription: [], // 描述
        googleUrl: '', // 路径
        productIcon: '', // 图标
        approvalRate: '', // 通过率
        sort: '', // 排序
        installmentPeriods: '' // 可分期
      },
      fileList: []
    }
  },
  methods: {
    uploadFile(file) {
      uploadFile(file.file).then(res => {
        console.log(res)
        const {
          results: { fileUrl }
        } = res
        this.imageUrl = fileUrl
      })
    },
    uploadApk(file) {
      this.apkLoading = true
      uploadFile(file.file).then(res => {
        console.log(res)
        this.apkLoading = false
        const {
          results: { fileUrl },
          code
        } = res
        if (code === '200') {
          this.apkUrl = fileUrl
          this.$message.success('上传成功')
        } else {
          this.$message.error('上传失败')
          this.fileList = []
        }
      })
    },
    onSubmit() {
      if (this.form.name === '') {
        return this.$message.error('产品名称不可为空')
      }
      this.applicationRequirements.forEach(item => {
        this.form.applicationRequirements.push(item.text)
      })
      this.productDescription.forEach(item => {
        this.form.productDescription.push(item.text)
      })
      this.loanTime.forEach(item => {
        this.form.loanTime.push(item.time)
      })
      this.loanAmount.forEach(item => {
        this.form.loanAmount.push(item.price)
      })
      this.form = Object.assign(this.form, {
        applicationRequirements: this.form.applicationRequirements.join(','),
        productDescription: this.form.productDescription.join(','),
        loanTime: this.form.loanTime.join(','),
        loanAmount: this.form.loanAmount.join(','),
        productIcon: this.imageUrl,
        url: this.apkUrl
      })
      insetProduct(this.form).then(res => {
        console.log(res)
        const { code } = res
        if (code === '200') {
          this.loanTime = [
            {
              time: ''
            }
          ] // 时间
          this.loanAmount = [
            {
              price: ''
            }
          ]
          this.productDescription = [
            {
              text: ''
            }
          ] // 描述
          this.applicationRequirements = [
            {
              text: ''
            }
          ] // 条件
          this.fileList = []
          this.apkUrl = ''
          this.imageUrl = ''
          this.form = {
            name: '',
            loanTime: [], // 时间
            interestRate: '', // 利率
            loanAmount: [], // 金额
            applicationRequirements: [], // 条件
            productDescription: [], // 描述
            googleUrl: '', // 路径
            productIcon: '', // 图标
            approvalRate: '', // 通过率
            sort: '', // 排序
            installmentPeriods: '' // 可分期
          }
          this.$message.success('添加成功')
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    handelShowModal() {
      this.dialogFormVisible = true
    },
    addPrice() {
      this.loanAmount.push({
        price: ''
      })
    },
    removePrice(item, index) {
      this.loanAmount.splice(index, 1)
    },
    addTimeItem() {
      this.loanTime.push({
        price: ''
      })
    },
    removeTime(item, index) {
      this.loanTime.splice(index, 1)
    },
    addApplication() {
      this.applicationRequirements.push({ text: '' })
    },
    removeApplication(item, index) {
      this.applicationRequirements.splice(index, 1)
    },
    addDescription() {
      this.productDescription.push({ text: '' })
    },
    removeDescription(index) {
      this.productDescription.splice(index, 1)
    },
    beforeAvatarUpload(file) {
      const isFileType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isFileType) {
        this.$message.error('图片只能是 JPG PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isFileType && isLt2M
    },
    beforeApkUpload(file) {
      console.log(file)
      const isFileType = file.type === 'application/vnd.android.package-archive'
      const isLt30M = file.size / 1024 / 1024 < 30

      if (!isFileType) {
        this.$message.error('请上车APK')
      }
      if (!isLt30M) {
        this.$message.error('上传头像图片大小不能超过 30MB!')
      }
      return isFileType && isLt30M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style  lang="scss">
.product {
  padding: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
