import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const verifyUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (verifyUser) throw new ConflictException(
      'This user is already registered in data base',
    );

    const user = this.userRepository.create(dto);
    const saveUser = await this.userRepository.save(user);

    const { password, updatedAt, ...userResponse } = saveUser;

    return userResponse;
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email }) ?? null;
  };
}
