import { Injectable } from '@nestjs/common';
import { GitHubEvent, GitHubPayload } from 'src/interfaces/github.interface';
import { DiscordService } from '../services/discord.service';

@Injectable()
export class GithubService {
  constructor(private readonly discordService: DiscordService) {}

  public async handlePayload(event: GitHubEvent, payload: GitHubPayload) {
    let message = '';

    switch (event) {
      case 'star':
        message = this.handleStar(payload);
        break;
      case 'issues':
        message = this.handleIssue(payload);
        break;
      default:
        message = `unknown event ${event}`;
    }

    await this.discordService.notify(message);
  }

  private handleStar(payload: GitHubPayload): string {
    const { action, sender, repository } = payload;
    return `User ${sender.login} ${action} star on ${repository.full_name}`;
  }

  private handleIssue(payload: GitHubPayload): string {
    if ('issue' in payload) {
      const { action, issue, sender } = payload;

      if (action === 'opened') {
        return `An issue was opened with this title ${issue.title} by ${sender.login}`;
      }
      if (action === 'closed') {
        return `An issue was closed by ${sender.login}`;
      }
      if (action === 'reopened') {
        return `An issue was reopened ${sender.login}`;
      }

      return `Unhandled action from the issue event ${action}`;
    }

    // Handle case when payload is GitHubStar
    return 'Payload is not an issue event';
  }
}
