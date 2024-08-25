import { RoleEnum } from '../enums';

export type Role = (typeof RoleEnum)[keyof typeof RoleEnum];
