import { object, number, TypeOf, string } from "zod"

const payload = {
  body: object({
    name: string({
      required_error: "Name is required"
    }).nonempty("Name field cannot be empty!"),
    genre: string({
      required_error: "Genres is required"
    }).nonempty("Genre field cannot be empty!"),
    price: number({
      required_error: "Price is required",
      invalid_type_error: "The price value is not valid!"
    }).min(0.01, "The price value is not valid!"),
    stock: number({
      required_error: "Stock is required",
      invalid_type_error: "The stock value is not valid!"
    }).min(0, "The stock value is not valid!")
  }).strict()
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
  body: object({
    genre: string({
      required_error: "Genres is required"
    }).nonempty("Genre field cannot be empty!"),
    price: number({
      required_error: "Price is required",
      invalid_type_error: "The price value is not valid!"
    }).min(0.01, "The price value is not valid!"),
    stock: number({
      required_error: "Stock is required",
      invalid_type_error: "The stock value is not valid!"
    }).min(0, "The stock value is not valid!")
  }),
  ...params
})

export const deleteMovieSchema = object({
  ...params
})

export type GetMovieInput = TypeOf<typeof getMovieSchema>
export type CreateMovieInput = TypeOf<typeof createMovieSchema>
export type UpdateMovieInput = TypeOf<typeof updateMovieSchema>
export type DeleteMovieInput = TypeOf<typeof deleteMovieSchema>