<template>
  <div class="product">
    <el-card class="box-card">
      <el-button type="primary" @click="handleShowPopup">添加一个</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="排序" width="200"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品ID" width="120"></el-table-column>
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
    <!-- Form -->
    <el-dialog title="轮播图" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" :style="{'width':'200px'}" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.id" :style="{'width':'200px'}" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
      dialogFormVisible: false,
      form: {
        id: ''
      },
      formLabelWidth: '100px',
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
    handleCurrentChange() {},
    handleShowPopup() {
      this.dialogFormVisible = true
    },
    handlePictureCardPreview() {},
    handleRemove() {}
  }
}
</script>

<style  lang="scss">
.footer {
  padding: 20px;
  text-align: center;
}
</style>
