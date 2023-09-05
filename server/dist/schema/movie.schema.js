import { object, number, string } from "zod";
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
        }).min(0.01),
        stock: number({
            required_error: "Stock is required"
        }).min(1)
    }).strict()
};
const params = {
    params: object({
        name: string({
            required_error: "Movie name is required"
        })
    })
};
export const getMovieSchema = object({
    ...params
});
export const createMovieSchema = object({
    ...payload
});
export const updateMovieSchema = object({
    body: object({
        genre: string({
            required_error: "Genres is required"
        }),
        price: number({
            required_error: "Price is required"
        }).min(0.01),
        stock: number({
            required_error: "Stock is required"
        }).min(1)
    }),
    ...params
});
export const deleteMovieSchema = object({
    ...params
});
