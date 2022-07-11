import bcrypt from 'bcryptjs';

export const createEncryptedPassword = async (password: string) => bcrypt.hash(password, 8);

export const checkPassword = (user: any, password: string) => bcrypt.compare(password, user.password);