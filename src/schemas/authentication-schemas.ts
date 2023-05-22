import Joi from 'joi';
import { SignInOAuthGithubParams, SignInParams } from '@/services';

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signInOAuthGithubSchema = Joi.object<SignInOAuthGithubParams>({
  code: Joi.string().required(),
});
