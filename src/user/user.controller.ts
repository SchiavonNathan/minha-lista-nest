import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from './DTO/user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() data: userDTO) {
        return this.userService.create(data)
    }
}
