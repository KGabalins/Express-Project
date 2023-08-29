import { object, number, string, literal, union } from "zod";
const payload = {
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        genre: string({
            required_error: "Genres is required"
        }),
        time: number({
            required_error: "Time is required"
        }).min(0).max(168),
        price: number({
            required_error: "Price is required"
        }),
        renter: string({
            required_error: "Renter is required"
        })
    })
};
const params = {
    params: object({
        id: string({
            required_error: "Rented movie id is required"
        })
    })
};
const updateTimeMethod = {
    body: object({
        method: union([literal("+"), literal("-")])
    })
};
export const getRentedMovieSchema = object({
    ...params
});
export const addRentedMovieSchema = object({
    ...payload
});
// export const updateRentedMovieSchema = object({
//   ...payload,
//   ...params
// })
export const updateRentedMovieTimeSchema = object({
    ...updateTimeMethod,
    ...params
});
export const removeRentedMovieSchema = object({
    ...params
});
