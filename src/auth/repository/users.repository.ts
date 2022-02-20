import { EntityRepository, Repository } from 'typeorm';
import { User } from '../model/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(createUserkDto: CreateUserDto): Promise<void> {
        const { username, email, password } = createUserkDto;
        const user = this.create({ username, email, password })
        await this.save(user)
    }
    
}