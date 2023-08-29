import { object, number, TypeOf, string } from "zod"

const payload = {
  body: object({
    name: string({
      required_error: "Name is required"
    }),
    genre: string({
      required_error: "Genres is required"
    }),
    price: number({
      required_error: "Price is required"
    }),
    stock: number({
      required_error: "Stock is required"
    })
  })
}

const params = {
  params: object({
    name: string({
      required_error: "Movie name is required"
    })
  })
}

export const getMovieSchema = object({
  ...params
})

export const createMovieSchema = object({
  ...payload
})

export const updateMovieSchema = object({
  ...payload,
  ...params
})

export const deleteMovieSchema = object({
  ...params
})

export type GetMovieInput = TypeOf<typeof getMovieSchema>
export type CreateMovieInput = TypeOf<typeof createMovieSchema>
export type UpdateMovieInput = TypeOf<typeof updateMovieSchema>
export type DeleteMovieInput = TypeOf<typeof deleteMovieSchema>