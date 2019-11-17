<template>
  <div class="product">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input v-model="form.userPhone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择时间">
              <el-date-picker
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                @change="selectTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产品名称">
              <el-input v-model="form.productName" placeholder="请输入产品名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column prop="userPhone" label="手机号"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="createDate" label="下载时间"></el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUploadDataList } from '@/api/user'
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: '',
      value2: '',
      currentPage4: 1,
      pageSize: 10,
      count: 0,
      form: {
        userPhone: '',
        startTime: '',
        endTime: '',
        productName: ''
      },
      tableData: []
    }
  },
  created() {
    this.getUploadDataList(this.currentPage4, this.pageSize)
  },
  methods: {
    selectTime(date) {
      console.log(date)
      if (date === null) {
        this.form.startTime = ''
        this.form.endTime = ''
      } else {
        this.form.startTime = date[0]
        this.form.endTime = date[1]
      }
    },
    onSubmit() {
      this.pageSize = 10
      this.currentPage4 = 1
      this.getUploadDataList(this.currentPage4, this.pageSize)
    },
    handleClick(row) {
      console.log(row)
      this.$router.push({
        path: '/update'
      })
      this.$store.commit('product/SET_PRODUCT', row)
    },
    handleSizeChange(size) {
      this.currentPage4 = 1
      this.pageSize = size
      this.getUploadDataList(this.currentPage4, this.pageSize)
    },
    handleCurrentChange(current) {
      this.currentPage4 = current
      this.getUploadDataList(this.currentPage4, this.pageSize)
    },
    getUploadDataList(pageNum, pageSize) {
      const formData = Object.assign(
        {},
        {
          userPhone: this.form.userPhone,
          startTime: this.form.startTime,
          endTime: this.form.endTime,
          productName: this.form.productName,
          pageNum,
          size: pageSize
        }
      )
      getUploadDataList(formData).then(res => {
        const {
          results: { list, count }
        } = res
        this.count = count
        this.tableData = list
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
</style>
