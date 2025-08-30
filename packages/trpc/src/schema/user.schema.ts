import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, { message: "이름은 최소 2자 이상이어야 합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
});

export const updateUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().min(3),
});

export const deleteUserSchema = z.object({
  id: z.string(),
});
