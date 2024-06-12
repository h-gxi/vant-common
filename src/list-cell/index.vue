<template>
  <div class="m-list--item" @click="onClick">
    <slot :item="item" :index="index" :group="item.group" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useParent } from '@vant/use'
import { LIST_KEY } from '../list/index'

const name = 'm-list-cell'

export default defineComponent({
  name,
  props: {
  },
  setup() {
    const { parent, index } = useParent(LIST_KEY)
    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <m-list> must be a child component of <m-list>.')
      }
      return
    }
    const item = computed(() => (parent as any).getCellItem(index.value))

    const onClick = () => (parent as any).onClick(item.value)

    return {
      index,
      item,
      onClick
    } as any
  }
})
</script>

