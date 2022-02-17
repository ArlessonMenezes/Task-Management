import { EntityRepository, Repository } from 'typeorm';
import { GetTaskFilterDto } from '../dto/get-tasks-filter.dto';
import { Task } from '../model/task-entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task')

        if(status) {
            query.andWhere('task.status = status', { status: 'OPEN' })
        }

        if(search) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}` }
            )
        }

        const tasks = await query.getMany();
        return tasks; 
      }
}