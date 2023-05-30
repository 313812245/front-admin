import type { TableColumnCtx } from 'element-plus'
import type { ProSchemaValueEnumType, ProFieldValueEnumType } from '@/utils'
export {}

type ProSchemaValueEnumObj = ''
type ProSchemaValueEnumMap = ''
type ProFieldValueType = 'select' | 'input' | 'calendar' | 'radio' | 'checkbox'
type ValueEnum = ProSchemaValueEnumObj | ProSchemaValueEnumMap

declare global {
  namespace Table {
    interface Column<T = any> extends Partial<TableColumnCtx<T>> {
      type?: 'default' | 'index' | 'selection' | 'expand' | 'checkbox'
      name?: string
      clickEvent?: string | ((item) => void)
      valueEnum?: any
      valueType?: ProFieldValueType
      hideInSearch?: boolean
      hideInTable?: boolean
      options?: {label: string, value: string | number}[]
    }
    type Option = Partial<ProSchemaValueEnumType>
    type EnumMap = ProFieldValueEnumType | undefined | null
  }
}
