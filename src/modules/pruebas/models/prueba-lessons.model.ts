export interface PruebaLessonItem {
  cant_complet: number;
  due_date: Date; // deadline
  name_test: string;
  total_student: number;
  uuid_test: string;
}

export interface PruebaLessons {
  uuid: string; // overall id for this set (e.g., teacher or grouping id)
  uuid_classroom: string; // classroom identifier
  lessons: PruebaLessonItem[];
}
