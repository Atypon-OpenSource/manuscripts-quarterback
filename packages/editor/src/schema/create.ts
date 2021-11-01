import { schema } from './schema'

export function createDefaultDoc() {
  const created = schema.nodes.doc.createAndFill()
  if (!created) throw Error('doc.createAndFill() returned undefined')
  return created.toJSON()
}
