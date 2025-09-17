import type { PruebaLessonItemDto, PruebaLessonsDto } from '../dto/prueba-lessons.dto.js';
import { toIsoDate } from '../../../shared/utils/date.util.js';

export function mapLessonToDto(src: any): PruebaLessonItemDto {
  const due_date = toIsoDate(src.due_date) || new Date(0).toISOString();
  return {
    uuid_test: String(src.uuid_test ?? ''),
    name_test: String(src.name_test ?? ''),
    due_date,
    cant_complet: Number(src.cant_complet ?? 0),
  };
}

export function mapQuizToDto(src: any): PruebaLessonsDto {
  const lessons = Array.isArray(src.lessons) ? src.lessons : [];
  return {
    uuid: String(src.uuid ?? src.id ?? ''),
    uuid_classroom: String(src.uuid_classroom ?? ''),
    total_student: Number(src.total_student ?? 0),
    lessons: lessons.map(mapLessonToDto),
  };
}
