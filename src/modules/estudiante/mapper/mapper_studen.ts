import { Timestamp } from 'firebase-admin/firestore';
import { Student } from '../models/student.model.js';
import { StudentResponseDto } from '../dto/student.dto.js';


export function fromFirestore(docData: any): Student {
  const toDate = (v: any): Date | null => {
    if (!v) return null;
    if (v instanceof Timestamp) return v.toDate();
    if (typeof v._seconds === 'number') {
      const ms = v._seconds * 1000 + Math.floor((v._nanoseconds || 0) / 1_000_000);
      return new Date(ms);
    }
    if (typeof v === 'string' || v instanceof Date) return new Date(v);
    return null;
  };

  return {
    uuid: docData.uuid,
    code_classroom: docData.code_classroom,
    name: docData.name,
    name_classroom: docData.name_classroom,
    email: docData.email,
    preferredLanguage: docData.preferredLanguage,
    role: docData.role,
    status: Boolean(docData.status),
    coins: Number(docData.coins ?? 0),
    average: Number(docData.average ?? 0),
    address: docData.address ?? null,
    age: docData.age ?? null,
    gender: docData.gender ?? null,
    phone: docData.phone ?? null,
    special_needs: docData.special_needs ?? null,
    tutor_name: docData.tutor_name ?? null,
    nivel_lectura: docData.nivel_lectura ?? null,
    feedback_student: docData.feedback_student ?? null,
    createdAt: toDate(docData.createdAt),
    date_response: toDate(docData.date_response),
  };
}

export function toResponseDto(model: Student): StudentResponseDto {
  const toIso = (d?: Date | null) => (d ? d.toISOString() : null);
  return {
    uuid: model.uuid,
    code_classroom: model.code_classroom,
    name: model.name,
    name_classroom: model.name_classroom,
    email: model.email,
    preferredLanguage: model.preferredLanguage,
    role: model.role,
    status: model.status,
    coins: model.coins,
    average: model.average,
    address: model.address ?? null,
    age: model.age ?? null,
    gender: model.gender ?? null,
    phone: model.phone ?? null,
    special_needs: model.special_needs ?? null,
    tutor_name: model.tutor_name ?? null,
    nivel_lectura: model.nivel_lectura ?? null,
    feedback_student: model.feedback_student ?? null,
    createdAt: toIso(model.createdAt),
    date_response: toIso(model.date_response),
  };
}