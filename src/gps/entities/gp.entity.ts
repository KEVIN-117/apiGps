
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateGpDto } from '../dto/create-gp.dto';

export type CatDocument = HydratedDocument<CreateGpDto>;

@Schema()
export class PointGPS {
    @Prop({ required: true, type: String })
    _id: string
    @Prop({type: Object})
    point: {
        latitud: { type: String },
        longitud: { type: String },
        _id: { type: String },
    }
    @Prop({ required: true, type: String })
    speed: number
    @Prop({ required: true, type: String })
    time: string
    @Prop({ required: true, type: String })
    deviceId: string
    @Prop({ required: true, type: Number })
    accuracy: number
    @Prop({ required: true, type: Number })
    direction: number
    @Prop({ required: true, type: String })
    createdAt: string
    @Prop({ required: true, type: String })
    updatedAt: string
}

export const CatSchema = SchemaFactory.createForClass(CreateGpDto);
