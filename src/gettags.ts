import {debug} from '@actions/core'
import {exec, ExecOptions} from '@actions/exec'
import {EOL} from 'os'

export async function getTags(): Promise<GitTag[]> {
  const stdout: string[] = []

  const options: ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => {
        stdout.push(data.toString())
      }
    }
  }

  await exec(
    'git',
    [
      'tag',
      '-l',
      '--sort=-creatordate',
      "--format='%(creatordate:short):%(refname:short)'"
    ],
    options
  )

  debug(`stdout: ${EOL}${stdout.join()}`)

  return stdout.map(l => {
    const d = l.split(':')
    return {
      date: Date.parse(d[0]),
      name: d[1]
    }
  })
}

interface GitTag {
  date: number
  name: string
}
