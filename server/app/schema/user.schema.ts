import { object, TypeOf, string, literal } from "zod"

const payload = {
  body: object({
    email: string({
      required_error: "Email is required"
    }).email("Not a valid email address!"),
    reemail: string({
      required_error: "Re-typed email is required"
    }).email("Not a valid email address!"),
    name: string({
      required_error: "Name is required"
    }).min(2, "Name should be at least 2 characters long!"),
    surname: string().min(2, "Surname should be atleast 2 characters long!").optional(),
    password: string({
      required_error: "Password is required"
    }).min(8, "The password should be atleast 8 characters long!"),
    repassword: string({
      required_error: "Re-typed password is required"
    }).min(8, "The password should be atleast 8 characters long!"),
  })
    .strict()
    .superRefine(({ email, reemail, password, repassword }, ctx) => {
      if (email !== reemail && password !== repassword) {
        ctx.addIssue({
          code: "custom",
          message: "Email and password do not match",
        })
      } else if (email !== reemail) {
        ctx.addIssue({
          code: "custom",
          message: "Emails do not match"
        })
      } else if (password !== repassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords do not match"
        })
      }
    })
}

const params = {
  params: object({
    email: string({
      required_error: "User email is required"
    }).email()
  })
}

export const getUserDataSchema = object({
  ...params
})

export const registerUserSchema = object({
  ...payload
})

export const updateUserPasswordSchema = object({
  body: object({
    oldPassword: string({
      required_error: "Current password is required"
    }),
    newPassword: string({
      required_error: "Password is required"
    }).min(8, "The password should be atleast 8 characters long!"),
    confirmNewPassword: string({
      required_error: "Re-typed password is required"
    }).min(8, "The password should be atleast 8 characters long!"),
  })
    .strict()
    .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
      if (newPassword !== confirmNewPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords do not match",
        })
      }
    })
})

export const updateUserEmailSchema = object({
  body: object({
    newEmail: string({
      required_error: "New email is required"
    }).email("Not a valid email address!"),
    confirmNewEmail: string({
      required_error: "New email confirmation is required"
    }).email("Not a valid email address!"),
    password: string({
      required_error: "Current password is required"
    })
  })    
  .strict()
  .superRefine(({ newEmail, confirmNewEmail }, ctx) => {
    if (newEmail !== confirmNewEmail) {
      ctx.addIssue({
        code: "custom",
        message: "Emails do not match",
      })
    }
  })
})

export const delteUserSchema = object({
  ...params
})

export type GetUserDataInput = TypeOf<typeof getUserDataSchema>
export type RegisterUserInput = TypeOf<typeof registerUserSchema>
export type UpdateUserPasswordInput = TypeOf<typeof updateUserPasswordSchema>
export type UpdateUserEmailInput = TypeOf<typeof updateUserEmailSchema>
export type DeleteUserInput = TypeOf<typeof delteUserSchema>