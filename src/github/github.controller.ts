import { Controller, Post, Headers, Body, UseGuards } from '@nestjs/common';
import { GithubService } from './github.service';
import { GitHubEvent, GitHubPayload } from 'src/interfaces/github.interface';
import { GithubGuard } from 'src/guards/github.guard';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post() //La mayoria de los wehooks son posts
  @UseGuards(GithubGuard)
  webHookHandler(
    @Headers('x-github-event') githubEvent: GitHubEvent,
    @Headers('x-Hub-Signature-256') signature: string,
    @Body() body: GitHubPayload,
  ) {
    console.log({ signature });
    this.githubService.handlePayload(githubEvent, body);
    return { githubEvent };
  }
}
