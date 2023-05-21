import { Router } from 'express';
import { signInOAuthGithubPost, singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema, signInOAuthGithubSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.post('/sign-in/oauth/github', validateBody(signInOAuthGithubSchema), signInOAuthGithubPost);

export { authenticationRouter };
