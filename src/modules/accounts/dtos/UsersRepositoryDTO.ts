export interface IUsersRepositoryDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

export interface IRequestAuthenticateUserUseCaseDTO {
  email: string;
  password: string;
}

export interface IResponseAuthenticateUserUseCaseDTO {
  user: {
    name: string;
    email: string;
  },
  token: string;
}
