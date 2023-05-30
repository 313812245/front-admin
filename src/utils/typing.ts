/**
 * 用于配置 ValueEnum 的通用配置
 */
export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  label: string;
  value?: string | number | boolean
  /** @name 是否禁用 */
  disabled?: boolean;
};

/**
 * 支持 Map 和 Object
 */
export type ProSchemaValueEnumObj = Record<
  string,
  ProSchemaValueEnumType
>;

export type ProSchemaValueEnumMap = Map<
  string | number | boolean,
  ProSchemaValueEnumType
>;

export type ProFieldValueEnumType =
  | ProSchemaValueEnumMap
  | ProSchemaValueEnumObj;
