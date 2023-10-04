import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

/**
 * @brief 
 */
@Injectable()
export class UsersService {
    private fakeUsers = [
        { username: 'Akadil', email: 'akadil.kalimoldayev@gmail.com' },
        { username: 'Nicolas', email: 'akadil.kalimoldayev@gmail.com' }
    ];

    fetchUsers() {
        return this.fakeUsers;
    }

    createUser(userDetails: CreateUserType) {
        this.fakeUsers.push(userDetails);
        return;
    }
}
