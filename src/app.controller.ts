import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Investigation } from './app.entity';
import { parseCSV } from './app.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  findAll(@Query() query: any): Promise<Investigation[]> {
    const {
      startDate,
      endDate,
      eventType,
      deviceName,
      userName,
      searchTerm,
      tags,
    } = query;
    let dataQuery: any = {};
    if (startDate && endDate) {
      dataQuery.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    if (eventType) {
      dataQuery.eventType = query.eventType;
    }
    if (deviceName) {
      dataQuery.deviceName = query.deviceName;
    }
    if (userName) {
      dataQuery.userName = query.userName;
    }
    if (tags && Array.isArray(tags)) {
      dataQuery.tags = { $eq: tags };
    } else if (typeof tags === 'string') {
      const tagArr = tags
        .split(',')
        .map((value) =>
          Number(value) || Number(value) === 0 ? Number(value) : value,
        );
      dataQuery.tags = { $eq: tagArr };
    }
    if (searchTerm) {
      const eventType = { $regex: searchTerm, $options: 'i' };
      const deviceName = { $regex: searchTerm, $options: 'i' };
      const userName = { $regex: searchTerm, $options: 'i' };
      dataQuery.$or = [{ eventType }, { deviceName }, { userName }];
    }
    return this.appService.findAll(dataQuery);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createInvestigation(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Investigation[]> {
    const values = parseCSV(file.buffer.toString());
    let csvInvestigations: Array<Investigation> = values.map(
      (value: Investigation) => {
        const instance = new Investigation();
        instance.eventType = value.eventType;
        instance.deviceName = value.deviceName;
        instance.userName = value.userName;
        instance.data = value.data;
        instance.date = new Date(value.date);
        instance.tags = value.tags;
        return instance;
      },
    );
    return this.appService.save(csvInvestigations);
  }
}
