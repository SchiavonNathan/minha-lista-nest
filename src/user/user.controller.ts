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

    @Get("find/:email")
    async findByEmail(@Param("email") email: any) {
        return this.userService.findByEmail(email)
    }

    @Post()
    async create(@Body() data: userDTO) {
        return this.userService.create(data)
    }
    
    @Post("login")
    async login(@Body() data) {
        return this.userService.login(data)
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
