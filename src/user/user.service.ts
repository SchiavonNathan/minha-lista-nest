import { Injectable } from '@nestjs/common';
import { userDTO } from './DTO/user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async create(data: userDTO) {

        data.email = data.email.toLowerCase();
        
        const userExists = await this.prisma.user.findFirst({
            where:{
                email: data.email
            }
        });

        if (userExists) {
            throw new Error('O Email já está sendo usado')
        }

        const user = await this.prisma.user.create({
            data,
        })

        return user
    }

    async login(data) {

        data.email = data.email.toLowerCase();

        const userExists = await this.prisma.user.findFirst({
            where:{
                email: data.email
            }
        });

        if (!userExists) {
            throw new Error('O Email não possui cadastro!')
        }

        if(
            (data.password !== userExists.password)||(data.email !== userExists.email)
        ) {
            throw new Error('Email ou senha incorretos!')
        }
        
        return userExists
    }

    async update(id: string, data: userDTO) {
        const userExists = await this.prisma.user.findFirst({
            where:{
                id,
            }
        });

        if (!userExists) {
            throw new Error('Usuario inexistente')
        }

        return await this.prisma.user.update({
            data,
            where:{
                id,
            },
        })
    }

    async delete(id: string) {
        const userExists = await this.prisma.user.findFirst({
            where:{
                id,
            },
        });

        if (!userExists) {
            throw new Error('Usuario inexistente')
        }

        return this.prisma.user.delete({
            where:{
                id,
            },
        })
    }

    async findAll() {
        return this.prisma.user.findMany()
    }

}
