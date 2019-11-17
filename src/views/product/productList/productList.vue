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
              <el-select v-model="form.isSort" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="已排序" value="1"></el-option>
                <el-option label="未排序" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="可分期数">
              <el-input v-model="form.installmentPeriods" placeholder="请输入产品名称" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="排序">
              <el-input v-model="form.sort" placeholder="请输入排序" />
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="产品ID" width="300"></el-table-column>
        <el-table-column prop="name" label="产品名称" width="120"></el-table-column>
        <el-table-column prop="sort" label="排序" width="120"></el-table-column>
        <el-table-column prop="interestRate" label="商品利率" width="120"></el-table-column>
        <el-table-column prop="approvalRate" label="产品通过率" width="120"></el-table-column>
        <el-table-column label="产品图片" width="180">
          <template slot-scope="scope">
            <img
              v-if="scope.row.productIcon"
              width="80px"
              height="80px"
              :src="'http://192.168.1.103'+scope.row.productIcon"
            />
          </template>
        </el-table-column>
        <el-table-column prop="url" label="产品下载地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看/编辑</el-button>
          </template>
        </el-table-column>
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
import { getProductList } from '@/api/product'
export default {
  data() {
    return {
      currentPage4: 1,
      pageSize: 10,
      count: 0,
      form: {
        name: '',
        isSort: ''
      },
      tableData: []
    }
  },
  created() {
    this.getProductList(this.currentPage4, this.pageSize)
  },
  methods: {
    onSubmit() {
      this.pageSize = 10
      this.currentPage4 = 1
      this.getProductList(this.currentPage4, this.pageSize)
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
      this.getProductList(this.currentPage4, this.pageSize)
    },
    handleCurrentChange(current) {
      this.currentPage4 = current
      this.getProductList(this.currentPage4, this.pageSize)
    },
    getProductList(pageNum, pageSize) {
      const formData = Object.assign(
        {},
        {
          name: this.form.name,
          isSort: this.form.isSort,
          pageNum,
          size: pageSize
        }
      )
      getProductList(formData).then(res => {
        const { result, count } = res
        this.count = count
        this.tableData = result
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
