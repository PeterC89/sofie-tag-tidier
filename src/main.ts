import * as core from '@actions/core'
import {getTags} from './gettags'

async function run(): Promise<void> {
  try {
    core.debug(new Date().toTimeString())
    await getTags()
    core.debug(new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
