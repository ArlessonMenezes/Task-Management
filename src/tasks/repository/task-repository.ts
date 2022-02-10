import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../model/task-entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}