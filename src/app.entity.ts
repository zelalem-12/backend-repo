import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export enum EventType {
  FILECREATED = 'fileCreated',
  FILEACCESSED = 'fileAccessed',
  FILEDOWNLOADED = 'fileDownloaded',
  EVENTRECORDCREATED = 'eventRecordCreated',
  FILEEXECUTED = 'fileExecuted',
}

@Entity()
export class Investigation {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.FILECREATED,
    nullable: false,
  })
  eventType: EventType;

  @Column({ nullable: false })
  deviceName: string;

  @Column()
  userName: string;

  @Column()
  tags: string[];

  @Column({ nullable: false })
  data: any[];

  @Column()
  date: Date;
}
