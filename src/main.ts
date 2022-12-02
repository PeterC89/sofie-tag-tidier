import {info, setFailed} from '@actions/core'
import {getTags} from './gettags'

async function run(): Promise<void> {
  try {
    const result = await getTags()
    info(JSON.stringify(result))
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
