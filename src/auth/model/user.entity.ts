import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from 'bcrypt';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    username: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }
}