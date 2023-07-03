import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Laporan } from '../laporan/entities/laporan.entity';
import { Notifikasi } from '../notifikasi/entities/notifikasi.entity';
import { NotifikasiUser } from '../notifikasi/entities/notifikasi_user.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  isBlocked: boolean;

  @OneToMany(() => Laporan, (laporan) => laporan.author)
  laporan: Laporan[];

  @OneToMany(() => NotifikasiUser, (notifikasi_user) => notifikasi_user.user)
  notifikasi_user: NotifikasiUser[];

  @OneToMany(() => Notifikasi, (notifikasi) => notifikasi.user)
  notifikasi: Notifikasi[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
