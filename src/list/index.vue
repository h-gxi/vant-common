<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list class="m-list" v-model:loading="loading" :finished="finished" :offset="offset" :finished-text="finishedText" :loading-text="loadingText" @load="onLoad">
      <template v-for="(item, index) in formatList" :key="index">
        <slot />
      </template>
      <van-empty v-if="showImage" :image="image" :image-size="imageSize" />
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts">
import { ref, reactive, toRefs, computed, watch, defineComponent, type ExtractPropTypes } from 'vue'
import { useChildren } from '@vant/use'
import { listProps } from './props'
const name = 'm-list'
export const LIST_KEY = Symbol(name)

export type ListProps = ExtractPropTypes<typeof listProps>;

export type State = {
  finished: boolean
  refreshing: boolean
  pageIndex: number
  list: {[prop:string]:any}[]
}

export default defineComponent({
  name,
  props: listProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { linkChildren } = useChildren(LIST_KEY)
    const loading = ref(false)

    const state: State = reactive({
      finished: false,
      refreshing: false,
      pageIndex: 1,
      list: []
    })

    const finishedText = computed(() => {
      if (formatList.value.length === 0 && state.finished) {
        return '暂无数据'
      }
      return '没有更多了'
    })
    const showImage = computed(() => {
      if (props.image && finishedText.value === '暂无数据') {
        return true
      }
      return false
    })

    const formatList = computed(() => {
      let _list = state.list
      if (props.filter) {
        _list = props.filter(_list)
      }
      if (props.formatter) {
        _list = props.formatter(_list)
      }
      if (props.groupBy) {
        const groupArr = _list.reduce((result, currentItem) => {
          const groupKey = typeof props.groupBy === 'function' ? props.groupBy(currentItem) : currentItem[props.groupBy]
          // 初始化分组数组（如果尚未创建）
          if (!result[groupKey]) {
            result[groupKey] = []
            currentItem['group'] = groupKey
          }
          // 将当前项添加到对应分组
          result[groupKey].push(currentItem)
          return result
        }, {})
        _list = Object.values(groupArr).reduce((acc, curr) => {
          return acc.concat(curr)
        }, [])
      }
      return _list
    })

    const onLoad = () => {
      if (props.queryMethod) {
        const queryParams = Object.assign({}, props.queryModel)
        queryParams['pageIndex'] = state.pageIndex
        queryParams['pageSize'] = props.pageSize

        props.queryMethod(queryParams)
          .then((res: any) => {
            console.log('res :>> ', res)
            state.pageIndex++
            if (res.total === 0) { // 返回总条数0
              state.finished = true
            }
            if (res.item) {
              if (res.item.length < props.pageSize) { // 返回条数小于页大小
                state.finished = true
              }
              state.list.push(...res.item)
            }
            if (state.refreshing) {
              state.refreshing = false
            }
          })
          .catch(() => {
            if (state.refreshing) {
              state.refreshing = false
            }
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    const onRefresh = () => {
      state.list = []
      state.pageIndex = 1
      state.finished = false
      loading.value = true
      onLoad()
    }

    watch(() => props.queryModel, () => {
      onRefresh()
    })

    const onClick = (item: any) => emit('click', item)
    const getCellItem = (index: number) => {
      return formatList.value[index]
    }

    linkChildren({
      props,
      onClick,
      getCellItem
    } as any)

    return {
      loading,
      finishedText,
      showImage,
      formatList,
      ...toRefs(state),
      onRefresh,
      onLoad
    }
  }
})
</script>
