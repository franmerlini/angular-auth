export const RoleEnum = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof RoleEnum)[keyof typeof RoleEnum];
