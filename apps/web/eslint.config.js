import {config as base} from "@repo/eslint-config/base.js"
import {config as reactInternals} from "@repo/eslint-config/react-internal.js"

export default {
  ...base,
  ...reactInternals
}