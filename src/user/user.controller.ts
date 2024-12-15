import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from './DTO/user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() data: userDTO) {
        return this.userService.create(data)
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() data: userDTO) {
        return this.userService.update(id, data)
    }
}
