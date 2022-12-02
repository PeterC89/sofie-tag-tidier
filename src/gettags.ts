import {info} from '@actions/core'
import {exec, ExecOptions} from '@actions/exec'

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

  info(stdout.join())
  return []
}

interface GitTag {
  date: Date
  name: string
}
