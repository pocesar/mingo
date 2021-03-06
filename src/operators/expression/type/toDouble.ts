/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */

import { computeValue, Options } from '../../../core'
import { TypeConvertError } from './_internal'
import { isNil, isNumber } from '../../../util'

/**
 * Converts a value to a double. If the value cannot be converted to an double, $toDouble errors. If the value is null or missing, $toDouble returns null.
 *
 * @param obj
 * @param expr
 */
export function $toDouble(obj: object, expr: any, options: Options): number | null {
  let val = computeValue(obj, expr, null, options)

  if (isNil(val)) return null
  if (val instanceof Date) return val.getTime()
  if (val === true) return 1
  if (val === false) return 0

  let n = Number(val)

  if (isNumber(n)) return n

  throw new TypeConvertError(`cannot convert '${val}' to double/decimal`)
}
