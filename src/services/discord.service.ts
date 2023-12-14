import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService {
  private readonly discordWebhookUrl =
    'https://discord.com/api/webhooks/1184608376425021521/stqgrZK1rN2JiuRvcYGgkVtiI5qI4yhIOipfYjiRSXeU3j5E4U5WIr7ZMNZKEZtrivNJ';

  async notify(message: string) {
    const body = {
      content: message,
    };

    const resp = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;
  }
}
