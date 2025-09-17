export interface PruebaLessonItemDto {
  uuid_test: string;
  name_test: string;
  due_date: string;
  cant_complet: number;
}

export interface PruebaLessonsDto {
  uuid: string;
  uuid_classroom: string;
  total_student: number;
  lessons: PruebaLessonItemDto[];
}
