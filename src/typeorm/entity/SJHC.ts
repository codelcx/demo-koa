import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'DHY_SJHC' })

export class SJHC {
  @PrimaryGeneratedColumn({ name: 'JLXH', type: 'number' })
  jlxh: number

  @Column({ name: 'PRENUM', type: 'varchar', length: 50, nullable: true })
  prenum: string

  @Column({ name: 'HOSPITALNAME', type: 'varchar', length: 50, nullable: true })
  hospitalname: string

  @Column({ name: 'PRESTATUS', type: 'varchar', length: 50, nullable: true })
  prestatus: string

  @Column({ name: 'PRESTATUSNUM', type: 'varchar', length: 50, nullable: true })
  prestatusnum: string

  @Column({ name: 'OPERATESTARTTIME', type: 'varchar', length: 50, nullable: true })
  operatestarttime: string

  @Column({ name: 'OPERATEENDTIME', type: 'varchar', length: 50, nullable: true })
  operateendtime: string

  @Column({ name: 'OPERATORNAME', type: 'varchar', length: 60, nullable: true })
  operatorname: string

  @Column({ name: 'PACKAGECOUNT', type: 'varchar', length: 200, nullable: true })
  packagecount: string

  @Column({ name: 'IMAGECOUNT', type: 'varchar', length: 200, nullable: true })
  imagecount: string

  @Column({ name: 'IMAGEURL', type: 'varchar', length: 60, nullable: true })
  imageurl: string

  @Column({ name: 'REMARK', type: 'varchar', length: 200, nullable: true })
  remark: string

  @Column({ name: 'EXPRESSNO', type: 'varchar', length: 50, nullable: true })
  expressno: string

  @Column({ name: 'EXPRESSCOMPANY', type: 'varchar', length: 50, nullable: true })
  expresscompany: string

  @Column({ name: 'MACHINEID', type: 'varchar', length: 50, nullable: true })
  machineid: string

  @Column({ name: 'MACHINENAME', type: 'varchar', length: 50, nullable: true })
  machinename: string

  @Column({ name: 'HOSPITALPSPNUM', type: 'varchar', length: 50, nullable: true })
  hospitalpspnum: string

  @Column({ name: 'PTYPE', type: 'number', nullable: true })
  ptype: number

  @Column({ name: 'BARCODE', type: 'varchar', length: 50, nullable: true })
  barcode: string

  @Column({ name: 'JLSJ', nullable: true })
  jlsj: Date
}