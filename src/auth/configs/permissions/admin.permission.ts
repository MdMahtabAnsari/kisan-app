import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

const statement = {
  ...defaultStatements,
  wallet: ['create', 'update', 'read', 'delete'],
};

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  wallet: ['create', 'update', 'read', 'delete'],
});

export const user = ac.newRole({
  wallet: ['read', 'update', 'create'],
});
