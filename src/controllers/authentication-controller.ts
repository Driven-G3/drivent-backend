import { Request, Response } from 'express';
import httpStatus from 'http-status';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import authenticationService, { SignInParams } from '@/services/authentication-service';
import userService from '@/services/users-service';
import generateRandomString from '@/utils/randomString';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function signInOAuthGithubPost(req: Request, res: Response) {
  const { code } = req.body;

  try {
    const session = await authenticationService.signInWithOAuthGithub(code);
    return res.send(session);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(500).send(error.message);
  }
}
