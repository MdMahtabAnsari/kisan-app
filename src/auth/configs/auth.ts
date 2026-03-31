import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
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

export const auth = betterAuth({
  database: prismaAdapter(
    {},
    {
      provider: 'postgresql',
    },
  ),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async () => {},
    },
    additionalFields: {
      aadhaarNumber: {
        required: true,
        type: 'string',
        input: true,
        unique: true,
      },
    },
  },
  emailAndPassword: {
    // requireEmailVerification: true,
    enabled: true,
    sendResetPassword: async () => {},
  },
  emailVerification: {
    sendVerificationEmail: async () => {},
    // sendOnSignUp: true,
    // autoSignInAfterVerification: true,
    afterEmailVerification: async () => {},
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [
    dash(),
    phoneNumber({
      sendOTP: async () => {},
    }),
    bearer(),
    expo(),
    emailOTP({
      async sendVerificationOTP() {},
    }),
    multiSession(),
    twoFactor({
      issuer: 'vaultkey',
      otpOptions: {
        sendOTP: async () => {},
      },
    }),
    username({
      usernameValidator: (username) => {
        return usernameSchema.safeParse(username).success;
      },
    }),
    magicLink({
      sendMagicLink: async () => {},
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
    ...(process.env.NODE_ENV === 'development' ? [openAPI()] : []),
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60, //seconds
    },
  },
  secret: process.env['BETTER_AUTH_SECRET'],
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
  url: process.env['BETTER_AUTH_URL'],
});
