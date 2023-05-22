import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import qs from 'qs';
import userService from '../users-service';
import { invalidCredentialsError } from './errors';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';
import generateRandomString from '@/utils/randomString';
import { unauthorizedError } from '@/errors';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function signInWithOAuthGithub(code: string): Promise<SignInOAuthGithubResult> {
  const { GITHUB_OAUTH_TOKEN_URL, GITHUB_SECRET_KEY, GITHUB_CLIENT_ID } = process.env;

  const params = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_SECRET_KEY,
    code: code,
  };
  const response = await axios.post(GITHUB_OAUTH_TOKEN_URL, params);
  const token: any = qs.parse(response.data);
  if (token.error) throw unauthorizedError();

  const { data: userData } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: 'Bearer ' + token.access_token,
    },
  });

  let user = await userRepository.findByEmail(userData.id + '@git');
  if (!user) {
    user = await userService.createUser({ email: userData.id + '@git', password: generateRandomString(255) });
  }

  const accessToken = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token: accessToken,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, 'email' | 'password'>;
export type SignInOAuthGithubParams = { code: string };

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type SignInOAuthGithubResult = {
  user: Omit<User, 'password'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  signInWithOAuthGithub,
};

export default authenticationService;
export * from './errors';
