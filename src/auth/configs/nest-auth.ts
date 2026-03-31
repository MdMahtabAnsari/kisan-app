import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailQueueService } from 'src/notifications/emailQueue.service';
import { SmsQueueService } from 'src/notifications/smsQueue.service';
import {
  twoFactor,
  username,
  magicLink,
  admin as adminPlugin,
  lastLoginMethod,
  openAPI,
  multiSession,
  emailOTP,
  bearer,
  phoneNumber,
} from 'better-auth/plugins';
import { username as usernameSchema } from './common';
import { admin, user, ac as adminAc } from './permissions/admin.permission';
import { expo } from '@better-auth/expo';
import { dash } from '@better-auth/infra';

export const nestAuth = (
  prisma: PrismaService,
  emailQueue: EmailQueueService,
  smsQueue: SmsQueueService,
) => {
  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    user: {
      additionalFields: {
        aadhaarNumber: {
          required: true,
          type: 'string',
          input: true,
          unique: true,
        },
      },
      changeEmail: {
        enabled: true,
        sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
          await emailQueue.changeEmail({ user, url, email: newEmail });
        },
      },
    },
    emailAndPassword: {
      // requireEmailVerification: true,
      enabled: true,
      sendResetPassword: async ({ user, url }) => {
        await emailQueue.resetPassword({ user, url });
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await emailQueue.verificationEmail({ user, url });
      },
      // sendOnSignUp: true,
      // autoSignInAfterVerification: true,
      afterEmailVerification: async (user) => {
        await emailQueue.welcomeEmail({ user });
      },
    },
    account: {
      accountLinking: {
        enabled: true,
      },
    },
    plugins: [
      dash(),
      phoneNumber({
        sendOTP: async ({ phoneNumber, code }) => {
          await smsQueue.sendOTP({ phoneNumber, code });
        },
        signUpOnVerification: {
          getTempEmail: (phoneNumber) => {
            return `${phoneNumber}@my-site.com`;
          },
          //optionally, you can also pass `getTempName` function to generate a temporary name for the user
          getTempName: (phoneNumber) => {
            return phoneNumber; //by default, it will use the phone number as the name
          },
        },
      }),
      bearer(),
      expo(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          if (type === 'sign-in') {
            await emailQueue.signInOTP({ email, otp });
          } else if (type === 'email-verification') {
            await emailQueue.emailVerificationOTP({ email, otp });
          } else {
            await emailQueue.resetPasswordOTP({ email, otp });
          }
        },
      }),
      multiSession(),
      twoFactor({
        issuer: 'kisan-registration',
        otpOptions: {
          sendOTP: async ({ user, otp }) => {
            await emailQueue.OTPEmail({ user, otp });
          },
        },
      }),
      username({
        usernameValidator: (username) => {
          return usernameSchema.safeParse(username).success;
        },
      }),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          await emailQueue.magicLink({ email, url });
        },
      }),
      adminPlugin({
        defaultRole: 'user',
        ac: adminAc,
        roles: {
          admin,
          user,
        },
      }),
      lastLoginMethod(),
      ...(process.env.NODE_ENV !== 'production' ? [openAPI()] : []),
    ],
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60, //seconds
      },
    },
    secret: process.env['BETTER_AUTH_SECRET']!,
    trustedOrigins: [
      ...process.env['TRUSTED_CLIENT_URL']!.split(','),
      ...(process.env['NODE_ENV'] === 'development'
        ? [
            'exp://', // Trust all Expo URLs (prefix matching)
            'exp://**', // Trust all Expo URLs (wildcard matching)
            'exp://192.168.*.*:*/**', // Trust 192.168.x.x IP range with any port and path
          ]
        : []),
    ],
    url: process.env['BETTER_AUTH_URL']!,
  });
};
