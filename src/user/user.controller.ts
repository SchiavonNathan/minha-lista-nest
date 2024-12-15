import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from './DTO/user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @Post()
    async create(@Body() data: userDTO) {
        return this.userService.create(data)
    }

    @Put("/update/:id")
    async update(@Param("id") id: string, @Body() data: userDTO) {
        return this.userService.update(id, data)
    }

    @Delete("/delete/:id")
    async delete(@Param("id") id: string) {
        return this.userService.delete(id)
    } 
}
