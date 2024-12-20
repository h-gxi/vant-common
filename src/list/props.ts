import { type PropType } from 'vue';
import { Numeric } from '../utils/index';

export const listProps = {
  /** 滚动条与底部距离小于 offset 时触发load事件 */
  offset: { type: Number, default: 250 },
  /** 下拉过程提示文案 */
  pullingText: { type: String, default: '下拉即可刷新...' },
  /** 释放过程提示文案 */
  loosingText: { type: String, default: '释放即可刷新...' },
  /** 加载过程提示文案 */
  loadingText: { type: String, default: '加载中...' },
  /** 刷新成功提示文案 */
  successText: { type: String, default: '刷新成功' },
  /** 刷新成功提示展示时长(ms) */
  successDuration: { type: Number, default: 1000 },
  /** 暂无数据的提示文案 */
  emptyText: { type: String, default: '暂无数据' },
  /** 没有更多了的提示文案 */
  nomoreText: { type: String, default: '没有更多了' },
  /** 滚动触发加载的方向，可选值为up */
  direction: { type: String, default: 'down' },
  /** 暂无数据时显示图片 */
  image: { type: String, default: '' },
  /** 图片大小 */
  imageSize: [Number, String, Array] as PropType<Numeric | [Numeric, Numeric]>,
  /** 默认分页大小 */
  pageSize: { type: Number, default: 10 },
  /** 查询方法 */
  queryMethod: { type: Function, default: null },
  /** 查询参数模型 */
  queryModel: { type: Object, default: null },
  /** 格式化数据 */
  formatter: { type: Function, default: null },
  /** 过滤显示数据 */
  filter: { type: Function, default: null },
  /** 分组字段 */
  groupBy: { type: [String, Function], default: '' },
  /** 是否禁用下拉刷新 */
  disabled: { type: Boolean, default: false },
};
