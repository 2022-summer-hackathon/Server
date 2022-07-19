import User from 'src/user/entity/user.entity';

export interface IloginData {
  userData: User;
  token: string;
  refreshToken: string;
}
