import { Status } from "./constants";

export type CreateUserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  displayName: string;
  passwordHash: string;
  salt: string;
  profileImage: string;
};
export type loginUserDetails = {
  username: string;
  password: string;
};
export type ValidateUserDetails = {
  password: string;
  email: string;
};
export type filterData = Partial<{
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  dateFrom: Date;
  dateTo: Date;
  status: Status;
}>