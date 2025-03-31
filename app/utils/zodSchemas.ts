import { z } from 'zod';

export const companySchema = z.object({
    name: z.string().min(2, "*"),
    province: z.string().min(1, "*"),
    district: z.string().min(1, "*"),
    subDistrict: z.string().min(1, "*"),
    about: z.string().min(10, "*"),
    logo: z.string().min(1, "*"),
    gmail: z.string().min(1, "*"),
    lineAccount: z.string().optional(),
    tel1: z.string().min(1, "*"),
    tel2: z.string().optional(),
});

export const jobSeekerSchema = z.object({
    name: z.string().min(2, "*"),
    province: z.string().min(1, "*"),
    district: z.string().min(1, "*"),
    subDistrict: z.string().min(1, "*"),
    about: z.string().min(10, "*"),
    resume: z.string().min(1, "*"),
    gmail: z.string().min(1, "*"),
    lineAccount: z.string().optional(),
    tel1: z.string().min(1, "*"),
    tel2: z.string().optional(),
})

export const jobSchema = z.object({
    jobTitle : z.string().min(2, "*"),
    jobType : z.string().min(1, "*"),
    jobProvince: z.string().min(1, "*"),
    jobDistrict: z.string().min(1, "*"),
    jobSubDistrict: z.string().min(1, "*"),
    employmentType: z.string().min(1, "*"),
    salaryFrom: z.number().min(1, "*"),
    salaryTo: z.number().min(1, "*"),
    timeFrom: z.number().min(1, "*"),
    timeTo: z.number().min(1, "*"),
    jobDescription: z.string().min(10, "*"),
    benefits: z.array(z.string()).optional(),
    listingDuration: z.number().min(1, "คุณจำเป็นต้องเลือกระยะเวลาในการประกาศงาน"),

    companyName: z.string().min(2, "*"),
    companyProvince: z.string().min(1, "*"),
    companyDistrict: z.string().min(1, "*"),
    companySubDistrict: z.string().min(1, "*"),
    companyAbout: z.string().min(10, "*"),
    companyLogo: z.string().min(1, "*"),
    companyGmail: z.string().min(1, "*"),
    companyLineAccount: z.string().optional(),
    companyTel1: z.string().min(1, "*"),
    companyTel2: z.string().optional(),
})