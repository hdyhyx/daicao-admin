<template>
  <div class="product">
    <el-card class="box-card">
      <el-button type="primary" @click="handleShowPopup">添加一个</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="isValid" label="是否显示" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.isValid==='1'?'是':'否' }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img
                v-if="scope.row.address"
                width="80px"
                height="80px"
                :src="'http://47.74.180.93:9511/'+scope.row.address"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="商品ID" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑/查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
    <!-- Form -->
    <el-dialog title="轮播图" :visible.sync="dialogFormVisible" @close="closeSlider">
      <el-form :model="form">
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="uploadFile"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.address" :src="'http://47.74.180.93:9511/'+form.address" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品ID" :label-width="formLabelWidth">
          <el-input v-model="form.url" :style="{'width':'300px'}" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" :label-width="formLabelWidth">
          <el-switch
            v-model="form.isValid"
            active-value="1"
            inactive-value="0"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelSaveBanner">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFile, insetBanner, getBannerList } from '@/api/user'
export default {
  data() {
    return {
      currentPage4: 1,
      pageSize: 10,
      count: 0,
      dialogFormVisible: false,
      form: {
        url: '',
        address: '',
        isValid: '1'
      },
      formLabelWidth: '100px',
      tableData: []
    }
  },
  created() {
    this.getBannerList(this.currentPage4, this.pageSize)
  },
  methods: {
    closeSlider() {
      this.form = {
        url: '',
        address: '',
        isValid: '1'
      }
    },
    handelSaveBanner() {
      if (this.form.url === '' && this.form.address === '') {
        return this.$message.error('图片与商品ID不可为空')
      }
      console.log(this.form)
      insetBanner(this.form).then(res => {
        console.log(res)
        const { code } = res
        this.dialogFormVisible = false
        if (code === '200') {
          this.$message.success('添加成功')
          this.currentPage4 = 1
          this.pageSize = 10
          this.getBannerList(this.currentPage4, this.pageSize)
        } else {
          this.$message.error('添加失败')
        }
      })
    },

    uploadFile(file) {
      uploadFile(file.file).then(res => {
        const {
          results: { fileUrl }
        } = res
        this.form.address = fileUrl
      })
    },
    beforeAvatarUpload(file) {
      const isFileType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isFileType) {
        this.$message.error('图片只能是 JPG PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isFileType && isLt2M
    },
    onSubmit() {},
    handleClick(row) {
      console.log(row)
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage4 = 1
      this.getBannerList(this.currentPage4, this.pageSize)
    },
    handleCurrentChange(current) {
      this.currentPage4 = current
      this.getBannerList(this.currentPage4, this.pageSize)
    },
    handleShowPopup() {
      this.dialogFormVisible = true
    },
    handleRemove() {},
    getBannerList(pageNum, pageSize) {
      const formData = Object.assign(
        {},
        {
          pageNum,
          size: pageSize
        }
      )
      getBannerList(formData).then(res => {
        console.log(res)
        const { shufflingArrayList, count } = res
        this.tableData = shufflingArrayList
        this.count = count
      })
    }
  }
}
</script>

<style  lang="scss">
.footer {
  padding: 20px;
  text-align: center;
}
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
