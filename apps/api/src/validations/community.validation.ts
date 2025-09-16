import {z} from "zod"

export const createCommunityValidation = z.object({
    name  : z.string().max(100,"Community name is too long"),
    description : z.string(),
    coverImage : z.string().url("invalid cover image url"),
})

