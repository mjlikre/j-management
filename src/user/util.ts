import * as bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)
  return hash
}
