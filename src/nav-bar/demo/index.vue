<template>
  <demo-section>
    <demo-block :title="$t('basicUsage')">
      <van-nav-bar
        :title="$t('title')"
        :left-text="$t('back')"
        :right-text="$t('button')"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </demo-block>

    <demo-block :title="$t('advancedUsage')">
      <van-nav-bar
        :title="$t('title')"
        :left-text="$t('back')"
        left-arrow
      >
        <template #right>
          <van-icon name="search" />
        </template>
      </van-nav-bar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$Toast(this.$t('back'));
    },
    onClickRight() {
      this.$Toast(this.$t('button'));
    }
  }
};
</script>
