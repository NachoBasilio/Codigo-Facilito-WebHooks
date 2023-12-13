import { Controller, Post, Headers, Body } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post() //La mayoria de los wehooks son posts
  webHookHandler(
    @Headers('x-github-event') githubEvent: string,
    @Body() body: any,
  ) {
    console.log({ githubEvent });
    return { githubEvent };
  }
}
