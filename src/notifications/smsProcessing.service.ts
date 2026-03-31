import { Processor, WorkerHost, OnQueueEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { SmsService } from './sms.service';

@Processor('sms')
export class SmsProcessingService extends WorkerHost {
  constructor(private readonly smsService: SmsService) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case 'otp':
        await this.smsService.sendOTP(job.data);
        break;

      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  @OnQueueEvent('completed')
  onCompleted(job: Job) {
    console.log(`✅ Job ${job.id} of type ${job.name} has been completed.`);
  }
  @OnQueueEvent('failed')
  onFailed(job: Job, error: Error) {
    console.error(
      `❌ Job ${job.id} of type ${job.name} has failed with error: ${error.message}`,
    );
  }
}
