import { Controller, Post, Headers, Body } from '@nestjs/common';
import { GithubService } from './github.service';
import { GitHubEvent, GitHubPayload } from 'src/interfaces/github.interface';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post() //La mayoria de los wehooks son posts
  webHookHandler(
    @Headers('x-github-event') githubEvent: GitHubEvent,
    @Body() body: GitHubPayload,
  ) {
    this.githubService.handlePayload(githubEvent, body);
    return { githubEvent };
  }
}
