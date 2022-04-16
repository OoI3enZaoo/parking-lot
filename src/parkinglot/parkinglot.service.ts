import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Parkinglot, ParkinglotDocument } from './shemas/parkinglot.schema'
import { Model } from 'mongoose'
import { ParkinglotDto, Slot } from './dto/parkinglot.dto'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ParkinglotService {
  constructor(
      @InjectModel(Parkinglot.name) private readonly model: Model<ParkinglotDocument>
  ) {}

  async createParkingLot(parkingLot): Promise<Parkinglot> {
    const {
      rank,
      name,
      slots
    } = parkingLot

    const {
      smalls: smallSlotAmount,
      mediums: mediumSlotAmount,
      larges: largeSlotAmount
    } = slots

    const smallSlots: Slot[] = Array(smallSlotAmount).fill(null).map((_, i) => {
      return {
        slotId: uuidv4(),
        isAvailable: true
      }
    })

    const mediumSlots: Slot[] = Array(mediumSlotAmount).fill(null).map((_, i) => {
      return {
        slotId: uuidv4(),
        isAvailable: true
      }
    }) 

    const largeSlots: Slot[] = Array(largeSlotAmount).fill(null).map((_, i) => {
      return {
        slotId: uuidv4(),
        isAvailable: true
      }
    })

    const parkinglotDetail: ParkinglotDto = {
      rank: rank,
      name: name,
      slots: {
        smalls: smallSlots,
        mediums: mediumSlots,
        larges: largeSlots
      }
    }
    const result = await new this.model({
      ...parkinglotDetail
    }).save()

    return result
  }
}