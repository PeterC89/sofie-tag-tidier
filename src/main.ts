import {info, setFailed} from '@actions/core'
import {getTags} from './gettags'

async function run(): Promise<void> {
  try {
    const result = await getTags()
    const olderThanDate = new Date()
    olderThanDate.setMonth(olderThanDate.getMonth() - 6)
    const tagsToDelete = result.filter(t => t.date < olderThanDate.valueOf())
    for (const tag of tagsToDelete) info(`Going to delete: ${tag.name}`)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
