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
            <el-form-item label="APK路径">
              <el-input v-model="form.url" placeholder="请输入APK路径" />
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
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :auto-upload="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="APk包上传">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传APK安装包</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="可贷时间">
              <div v-for="(item,index) in form.loanTime" :key="index" style="padding:5px 0">
                <el-input v-model="item.time" style="width:400px" />
                <el-button @click.prevent="removeTime(item,index)">删除</el-button>
              </div>
              <el-button @click.prevent="addTimeItem()">添加</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可贷金额">
              <div v-for="(item,index) in form.loanAmount" :key="index" style="padding:5px 0">
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
                v-for="(item,index) in form.applicationRequirements"
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
              <div
                v-for="(item,index) in form.productDescription"
                :key="index"
                style="padding:5px 0"
              >
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
export default {
  data() {
    return {
      disabled: true,
      formInline: {
        user: ''
      },
      imageUrl: '',
      dialogFormVisible: false,
      form: {
        name: '',
        loanTime: [
          {
            time: ''
          }
        ], // 时间
        interestRate: '', // 利率
        loanAmount: [
          {
            price: ''
          }
        ], // 金额
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
        url: '', // 路径
        productIcon: '', // 图标
        approvalRate: '', // 通过率
        sort: '', // 排序
        installmentPeriods: '' // 可分期
      },
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      console.log(this.form)
    },
    handelShowModal() {
      this.dialogFormVisible = true
    },
    addPrice() {
      this.form.loanAmount.push({
        price: ''
      })
    },
    removePrice(item, index) {
      this.form.loanAmount.splice(index, 1)
    },
    addTimeItem() {
      this.form.loanTime.push({
        price: ''
      })
    },
    removeTime(item, index) {
      this.form.loanTime.splice(index, 1)
    },
    addApplication() {
      this.form.applicationRequirements.push({ text: '' })
    },
    removeApplication(item, index) {
      this.form.applicationRequirements.splice(index, 1)
    },
    addDescription() {
      this.form.productDescription.push({ text: '' })
    },
    removeDescription(index) {
      this.form.productDescription.splice(index, 1)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
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
