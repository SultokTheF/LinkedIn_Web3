import axios, { AxiosResponse } from 'axios';

import { AuthEndpoints } from '../constants/endpoints';

import AuthResponse from "../types/AuthResponce";
import User from '../types/User';

class AuthService {
  static async register(user: User): Promise<any> {
    try {
      const response = await axios.post(
        AuthEndpoints.register,
        user
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to register');
    }
  }

  static async registerWithMetaMask(user: User): Promise<any> {
    try {
      const response = await axios.post(
        AuthEndpoints.registerWithMetaMask,
        user
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to register with MetaMask');
    }
  }

  static async login(user: User): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(
        AuthEndpoints.login,
        user
      );

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      return response.data;
    } catch (error) {
      throw new Error('Failed to login');
    }
  }

  static async loginWithMetaMask(user: User): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(
        AuthEndpoints.loginWithMetaMask,
        user
      );

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      return response.data;
    } catch (error) {
      throw new Error('Failed to login with MetaMask');
    }
  }

  static async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(
        AuthEndpoints.refreshToken,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  static async logout(): Promise<void> {
    try {
      await axios.post(
        AuthEndpoints.logout,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
          },
        }
      );

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.replace( '/' );
    } catch (error) {
      throw new Error('Failed to logout');
    }
  }
}

export default AuthService;