import Auth from '../entity/auth.entity';

export interface IloginData {
  userData: Auth;
  token: string;
  refreshToken: string;
}
