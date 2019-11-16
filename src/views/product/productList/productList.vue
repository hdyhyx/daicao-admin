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
          <el-col :span="3">
            <el-form-item label="排序">
              <el-input v-model="form.sort" placeholder="请输入排序" />
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
        <el-table-column fixed prop="id" label="产品ID" width="200"></el-table-column>
        <el-table-column prop="name" label="产品名称" width="120"></el-table-column>
        <el-table-column prop="interestRate" label="商品利率" width="120"></el-table-column>
        <el-table-column prop="approvalRate" label="产品通过率" width="120"></el-table-column>
        <el-table-column prop="productIcon" label="图标Icon" width="120"></el-table-column>
        <el-table-column prop="url" label="产品下载地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
      form: {
        id: '',
        name: '',
        interestRate: '', // 利率
        installmentPeriods: '', // 可分期
        url: '', // 路径
        productIcon: '', // 图标
        approvalRate: '', // 通过率
        sort: '' // 排序
      },
      tableData: [
        {
          id: '',
          name: '',
          interestRate: '', // 利率
          installmentPeriods: '', // 可分期
          url: '', // 路径
          productIcon: '', // 图标
          approvalRate: '', // 通过率
          sort: '' // 排序
        },
        {
          id: '',
          name: '',
          interestRate: '', // 利率
          installmentPeriods: '', // 可分期
          url: '', // 路径
          productIcon: '', // 图标
          approvalRate: '', // 通过率
          sort: '' // 排序
        },
        {
          id: '',
          name: '',
          interestRate: '', // 利率
          installmentPeriods: '', // 可分期
          url: '', // 路径
          productIcon: '', // 图标
          approvalRate: '', // 通过率
          sort: '' // 排序
        },
        {
          id: '',
          name: '',
          interestRate: '', // 利率
          installmentPeriods: '', // 可分期
          url: '', // 路径
          productIcon: '', // 图标
          approvalRate: '', // 通过率
          sort: '' // 排序
        }
      ]
    }
  },
  methods: {
    onSubmit() {},
    handleClick(row) {
      console.log(row)
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style  lang="scss">
.footer {
  padding: 20px;
  text-align: center;
}
</style>
