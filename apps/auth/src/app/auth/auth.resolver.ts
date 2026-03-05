import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import type { LoginInput } from './dto/login.input';
import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';
import type { GqlContext } from '@jobber/graphql';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}
    
  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GqlContext,
  ) {
    return this.authService.login(loginInput, context.res)
  }
}
