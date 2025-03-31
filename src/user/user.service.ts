import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUsers() {
    return {
      code: 0,
      data: [],
      msg: '请求用户列表成功',
    };
  }
}
