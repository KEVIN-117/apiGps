export class CreateGpDto {
    _id: string
    point: {
        latitud: number
        longitud: number
        _id: string
    }
    speed: number
    time: string
    deviceId: string
    accuracy: number
    direction: number
    createdAt: string
    updatedAt: string
}
