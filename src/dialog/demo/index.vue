<template>
  <demo-section>
    <demo-block :title="$t('alert1')">
      <van-button type="primary" @click="onClickAlert">{{ $t('alert1') }}</van-button>
      <van-button type="primary" @click="onClickAlert2">{{ $t('alert2') }}</van-button>
    </demo-block>

    <demo-block :title="$t('confirm')">
      <van-button type="primary" @click="onClickConfirm">{{ $t('confirm') }}</van-button>
    </demo-block>

    <demo-block :title="$t('asyncClose')">
      <van-button type="primary" @click="onClickAsyncClose">{{ $t('asyncClose') }}</van-button>
    </demo-block>

    <demo-block :title="$t('componentCall')">
      <van-button type="primary" @click="show = true">{{ $t('componentCall') }}</van-button>
      <van-dialog v-model="show" :title="$t('title')" show-cancel-button :lazy-render="false">
        <img :src="image">
      </van-dialog>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      alert1: '提示弹窗',
      alert2: '提示弹窗（无标题）',
      confirm: '确认弹窗',
      asyncClose: '异步关闭',
      componentCall: '组件调用',
      content: '代码是写出来给人看的，附带能在机器上运行'
    },
    'en-US': {
      alert1: 'Alert',
      alert2: 'Alert without title',
      confirm: 'Confirm dialog',
      asyncClose: 'Async Close',
      componentCall: 'Component Call'
    }
  },

  data() {
    return {
      show: false,
      currentRate: 0,
      image: 'https://img.yzcdn.cn/vant/apple-3.jpg'
    };
  },

  methods: {
    onClickAlert() {
      this.$Dialog.alert({
        title: this.$t('title'),
        message: this.$t('content')
      });
    },

    onClickAlert2() {
      this.$Dialog.alert({
        message: this.$t('content')
      });
    },

    onClickConfirm() {
      this.$Dialog.confirm({
        title: this.$t('title'),
        message: this.$t('content')
      });
    },

    onClickAsyncClose() {
      function beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }

      this.$Dialog.confirm({
        title: this.$t('title'),
        message: this.$t('content'),
        beforeClose
      });
    }
  }
};
</script>

<style lang="less">
@import '../../style/var';

.demo-dialog {
  background-color: @white;

  .van-doc-demo-block > .van-button {
    margin-left: @padding-md;
  }

  img {
    box-sizing: border-box;
    width: 100%;
    padding: 25px 20px 0;
  }
}
</style>
