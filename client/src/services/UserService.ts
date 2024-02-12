import axios from 'axios';

import { UserEndpoints } from '../constants/endpoints';

import User from '../types/User';

class UserService {
  static async getProfile(): Promise<any> {
    try {
      const response = await axios.get<User>(
        UserEndpoints.profile,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error('Failed to get user profile');
    }
  }
}

export default UserService;