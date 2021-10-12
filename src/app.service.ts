import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Investigation, EventType } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Investigation)
    private readonly investigationRepository: Repository<Investigation>,
  ) {}

  async findAll(query: Investigation): Promise<Investigation[]> {
    const invests: Investigation[] = await this.investigationRepository.find(
      query,
    );
    return invests;
  }

  async save(newInvestigation: Array<Investigation>): Promise<Investigation[]> {
    const saved = await this.investigationRepository.save(newInvestigation);

    return saved;
  }
}
