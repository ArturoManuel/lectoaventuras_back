import type { Prueba } from './models/prueba.model.js';
import { CreatePruebaDto, UpdatePruebaDto } from './dto/prueba.dto.js';
import { AppError } from '../../shared/utils/app-error.js';
import { firestore } from '../../shared/firebase.js';
import { mapQuizToDto } from './mapper/prueba-lessons.mapper.js';
import { toIsoDate } from '../../shared/utils/date.util.js';

const QUIZZES_COLLECTION = 'quizzes';
const ENROLLMENTS_COLLECTION = 'enrollements';
const RESULTS_COLLECTION = 'result';

export class PruebaService {
  async getAll(): Promise<any[]> {
    const db = firestore();
    const snapshot = await db.collection(QUIZZES_COLLECTION).get();
    const quizzes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any));

    // Helper: count enrollments by classroom
    const getEnrollCount = async (uuid_classroom: string): Promise<number> => {
      const agg = await db
        .collection(ENROLLMENTS_COLLECTION)
        .where('uuid_classroom', '==', uuid_classroom)
        .count()
        .get();
      return agg.data().count;
    };

    // Helper: count results by uuid_test within a classroom (per-activity per-classroom)
    const getResultsCount = async (uuid_test: string, uuid_classroom: string): Promise<number> => {
      const agg = await db
        .collection(RESULTS_COLLECTION)
        .where('uuid_test', '==', uuid_test)
        .where('uuid_classroom', '==', uuid_classroom)
        .count()
        .get();
      return agg.data().count;
    };

    // Enrich each quiz with counts per lesson
    const enriched = await Promise.all(
      quizzes.map(async (q) => {
        const uuid_classroom: string = q.uuid_classroom;
        const enrolled = await getEnrollCount(uuid_classroom);

        const lessons = Array.isArray(q.lessons) ? q.lessons : [];
        const lessonsWithCounts = await Promise.all(
          lessons.map(async (l: any) => {
            const uuid_test: string = l.uuid_test;
            const completed = await getResultsCount(uuid_test, uuid_classroom);
            const due_date_iso = toIsoDate(l.due_date);
            return {
              ...l,
              cant_complet: completed,
              ...(due_date_iso ? { due_date: due_date_iso } : {}),
            };
          })
        );

        const enrichedQuiz = {
          ...q,
          total_student: enrolled,
          lessons: lessonsWithCounts,
        };
        return enrichedQuiz;
      })
    );

    // Map to DTOs for consistent API shape (ISO dates, numeric fields)
    return enriched.map(mapQuizToDto);
  }

  async getById(id: string): Promise<Prueba> {
    // TODO: DB fetch
    const prueba = null as any as Prueba | null;
    if (!prueba) throw new AppError('Test not found', 404);
    return prueba;
  }

  async create(dto: CreatePruebaDto, creatorId: string): Promise<Prueba> {
    // TODO: DB create
    const newItem: Prueba = {
      id: 'temp-id',
      title: dto.title,
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      aulaId: dto.aulaId,
      createdBy: creatorId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newItem;
  }

  async update(id: string, dto: UpdatePruebaDto, userId: string): Promise<Prueba> {
    // TODO: DB update with permission check
    return {
      id,
      title: dto.title ?? 't',
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      aulaId: 'a',
      createdBy: userId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async remove(id: string, userId: string): Promise<void> {
    // TODO: DB delete with permission check
    return;
  }
}
