<template>
  <div class="m-list--item" @click="onClick">
    <slot :item="item" :index="index" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useParent } from '@vant/use'
import { LIST_KEY } from './list.vue'

const name = 'm-list-cell'

export default defineComponent({
  name,
  props: {
  },
  setup(props, { emit, slots }) {
    const { parent, index } = useParent(LIST_KEY)
    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <m-list> must be a child component of <m-list>.')
      }
      return
    }
    const item = computed(() => parent.getCellItem(index.value))

    const onClick = () => parent.onClick(item.value)

    return {
      index,
      item,
      onClick
    }
  }
})
</script>

