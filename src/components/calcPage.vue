<template>
  <div id="abc">
    <el-button type="primary" @click="showForm">
      <i class="el-icon-plus"></i>
      新增
    </el-button>
    <div class="company" v-if="company">
      <div class="msg">
        <p>
          <span>资金总量:</span>
          {{ money }}W
        </p>
        <p>
          <span>合约品种:</span>
          {{ name }}
        </p>
        <p>
          <span>ATR:</span>
          {{ atr }}
        </p>
        <p>
          <span>头寸单位:</span>
          {{ company }}手
        </p>
      </div>
      <div class="btns">
        <el-button type="danger" @click="showBuy">Buy</el-button>
        <el-button type="success" @click="showSell">Sell</el-button>
      </div>
    </div>
    <p v-if="nowFlag">{{ nowFlag }} {{ nowN }}</p>
    <el-table v-if="dataList.length" :data="dataList">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="open" label="Add"></el-table-column>
      <el-table-column prop="sell" label="Sell"></el-table-column>
    </el-table>
    <el-dialog
      title="头寸单位计算"
      :visible.sync="dialogVisible"
      width="350px"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="资金总量" prop="money">
          <el-input-number
            v-model="ruleForm.money"
            controls-position="right"
            :min="1"
          ></el-input-number>
          <span class="append">W</span>
        </el-form-item>
        <el-form-item label="合约品种" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="ATR" prop="atr">
          <el-input-number
            v-model="ruleForm.atr"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="单位交易量" prop="ton">
          <el-input-number
            v-model="ruleForm.ton"
            controls-position="right"
            :min="1"
          ></el-input-number>
          <span class="append">吨</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="calculate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="flag == 'buy' ? 'Buy' : 'Sell'"
      :visible.sync="buyDialog"
      width="350px"
      :before-close="buyClose"
    >
      <el-form :model="buyForm" :rules="buyrules" ref="buyForm" label-width="100px">
        <el-form-item label="现价" prop="money">
          <el-input-number
            v-model="buyForm.money"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="止损度" prop="n">
          <el-radio-group v-model="buyForm.n">
            <el-radio :label="1">2N</el-radio>
            <el-radio :label="0.5">1/2N</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="buyClose">取 消</el-button>
        <el-button type="primary" @click="buy">开 仓</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    index: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      dialogVisible: false,
      buyDialog: false,
      company: '',
      money: '',
      name: '',
      atr: '',
      dataList: [],
      flag: 'buy',
      nowFlag: '',
      nowN: '1/2N',
      buyForm: {
        money: '',
        n: 0.5,
      },
      ruleForm: {
        money: '',
        name: '',
        atr: '',
        ton: '',
      },
      buyrules: {
        money: [{ required: true, message: '请输入现价', trigger: 'blur' }],
      },
      rules: {
        name: [{ required: true, message: '请输入合约品种', trigger: 'blur' }],
        atr: [{ required: true, message: '请输入ATR', trigger: 'blur' }],
        money: [{ required: true, message: '请输入资金总量', trigger: 'blur' }],
        ton: [{ required: true, message: '请输入单位交易量', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.company = localStorage.getItem(`${this.index}company`) ? localStorage.getItem(`${this.index}company`) : ''
    this.money = localStorage.getItem(`${this.index}money`) ? localStorage.getItem(`${this.index}money`) : ''
    this.name = localStorage.getItem(`${this.index}name`) ? localStorage.getItem(`${this.index}name`) : ''
    this.atr = localStorage.getItem(`${this.index}atr`) ? localStorage.getItem(`${this.index}atr`) : ''
    this.dataList = localStorage.getItem(`${this.index}dataList`)
      ? JSON.parse(localStorage.getItem(`${this.index}dataList`))
      : ''
    this.flag = localStorage.getItem(`${this.index}flag`) ? localStorage.getItem(`${this.index}flag`) : ''
    this.nowFlag = localStorage.getItem(`${this.index}nowFlag`) ? localStorage.getItem(`${this.index}nowFlag`) : ''
    this.nowN = localStorage.getItem(`${this.index}nowN`) ? localStorage.getItem(`${this.index}nowN`) : '1/2N'
  },
  methods: {
    showForm() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
      this.$refs.ruleForm.resetFields()
    },
    buyClose() {
      this.buyDialog = false
      this.$refs.buyForm.resetFields()
    },
    calculate() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.dataList = []
          this.flag = ''
          this.nowFlag = ''
          this.nowN = '1/2N'
          this.company = (
            (this.ruleForm.money * 100) /
            (this.ruleForm.atr * this.ruleForm.ton)
          ).toFixed(1)
          this.money = this.ruleForm.money
          this.name = this.ruleForm.name
          this.atr = this.ruleForm.atr
          localStorage.setItem(`${this.index}company`, this.company)
          localStorage.setItem(`${this.index}money`, this.money)
          localStorage.setItem(`${this.index}name`, this.name)
          localStorage.setItem(`${this.index}atr`, this.atr)
          this.$refs.ruleForm.resetFields()
          this.dialogVisible = false
        }
      })
    },
    showBuy() {
      this.flag = 'buy'
      this.buyDialog = true
    },
    showSell() {
      this.flag = 'sell'
      this.buyDialog = true
    },
    buy() {
      this.$refs.buyForm.validate(valid => {
        if (valid) {
          let n = this.atr * this.buyForm.n
          let no1 = {
            open: this.buyForm.money,
            sell: this.buyForm.money - n * this.buyForm.n * 2,
          }
          this.dataList = []
          this.nowN = this.buyForm.n == 1 ? '2N' : '1/2N'
          if (this.flag == 'buy') {
            this.nowFlag = 'Buy'
            this.dataList.push(no1)
            for (let i = 0; i < 3; i++) {
              let open = this.dataList[i].open * 1 + this.atr * 0.5
              let sell = open - n * this.buyForm.n * 2
              this.dataList.push({
                open: open.toFixed(1),
                sell: sell.toFixed(1),
              })
            }
          } else {
            this.nowFlag = 'Sell'
            no1 = {
              open: this.buyForm.money,
              sell: this.buyForm.money * 1 + n * this.buyForm.n * 2,
            }
            this.dataList.push(no1)
            for (let i = 0; i < 3; i++) {
              let open = this.dataList[i].open * 1 - this.atr * 0.5
              let sell = open + n * this.buyForm.n * 2
              this.dataList.push({
                open: open.toFixed(1),
                sell: sell.toFixed(1),
              })
            }
          }
          this.$refs.buyForm.resetFields()
          this.buyDialog = false
          localStorage.setItem(`${this.index}flag`, this.flag)
          localStorage.setItem(`${this.index}nowFlag`, this.nowFlag)
          localStorage.setItem(`${this.index}nowN`, this.nowN)
          localStorage.setItem(`${this.index}dataList`, JSON.stringify(this.dataList))
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#abc {
  .company {
    .msg {
      display: flex;
      align-items: center;
      margin: 24px 0;
      p {
        margin: 10px;
      }
    }
  }
  .btns {
    margin-bottom: 24px;
  }
  .append {
    margin-left: 10px;
  }
  ::v-deep .el-input {
    width: 180px;
  }
}
</style>
