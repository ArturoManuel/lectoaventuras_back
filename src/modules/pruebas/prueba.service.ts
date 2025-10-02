import type { Prueba } from './models/prueba.model.js';
import { CreatePruebaDto, UpdatePruebaDto } from './dto/prueba.dto.js';
import { AppError } from '../../shared/utils/app-error.js';
import { firestore } from '../../shared/firebase.js';

const GENERAL_TEST_COLLECTION = 'general_test';
const ENROLLMENTS_COLLECTION = 'enrollements';
const RESULTS_COLLECTION = 'result';

export class PruebaService {
  async getAll(): Promise<any[]> {
    const db = firestore();
    
    // 1. Obtener todos los tests de general_test
    const testsSnapshot = await db.collection(GENERAL_TEST_COLLECTION).get();
    const tests = testsSnapshot.docs.map((doc) => ({
      uuid_test: doc.id,
      name_test: doc.data().name || '',
    }));

    // 2. Obtener todos los enrollments agrupados por uuid_classroom
    const enrollmentsSnapshot = await db.collection(ENROLLMENTS_COLLECTION).get();
    const enrollmentsByClassroom = new Map<string, number>();
    
    enrollmentsSnapshot.docs.forEach((doc) => {
      const uuid_classroom = doc.data().uuid_classroom;
      if (uuid_classroom) {
        enrollmentsByClassroom.set(
          uuid_classroom,
          (enrollmentsByClassroom.get(uuid_classroom) || 0) + 1
        );
      }
    });

    // 3. Obtener todos los results para contar completados
    const resultsSnapshot = await db.collection(RESULTS_COLLECTION).get();
    const resultsByTestAndClassroom = new Map<string, number>();
    
    resultsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const key = `${data.uuid_test}_${data.uuid_classroom}`;
      resultsByTestAndClassroom.set(
        key,
        (resultsByTestAndClassroom.get(key) || 0) + 1
      );
    });

    // 4. Agrupar por uuid_classroom
    const classroomMap = new Map<string, any>();

    resultsSnapshot.docs.forEach((doc) => {
      const uuid_classroom = doc.data().uuid_classroom;
      if (!uuid_classroom) return;

      if (!classroomMap.has(uuid_classroom)) {
        classroomMap.set(uuid_classroom, {
          uuid: `quiz_${uuid_classroom}`, // Generar un UUID único para el quiz
          uuid_classroom,
          total_student: enrollmentsByClassroom.get(uuid_classroom) || 0,
          lessons: [],
        });
      }
    });

    // 5. Construir lessons para cada classroom
    classroomMap.forEach((classroom) => {
      const lessonsMap = new Map<string, any>();

      tests.forEach((test) => {
        const key = `${test.uuid_test}_${classroom.uuid_classroom}`;
        const cant_complet = resultsByTestAndClassroom.get(key) || 0;

        // Solo agregar si hay al menos un resultado o queremos mostrar todos los tests
        lessonsMap.set(test.uuid_test, {
          uuid_test: test.uuid_test,
          name_test: test.name_test,
          cant_complet,
        });
      });

      classroom.lessons = Array.from(lessonsMap.values());
    });

    return Array.from(classroomMap.values());
  }

  async getByClassroom(uuid_classroom: string): Promise<any[]> {
    const db = firestore();

    // 1. Obtener todos los tests de general_test
    const testsSnapshot = await db.collection(GENERAL_TEST_COLLECTION).get();
    const tests = testsSnapshot.docs.map((doc) => ({
      uuid_test: doc.id,
      name_test: doc.data().name || '',
    }));

    // 2. Contar enrollments del classroom
    const enrollCount = await db
      .collection(ENROLLMENTS_COLLECTION)
      .where('uuid_classroom', '==', uuid_classroom)
      .count()
      .get();
    
    const total_student = enrollCount.data().count;

    // 3. Obtener results del classroom
    const resultsSnapshot = await db
      .collection(RESULTS_COLLECTION)
      .where('uuid_classroom', '==', uuid_classroom)
      .get();

    // 4. Contar completados por uuid_test
    const resultsByTest = new Map<string, number>();
    resultsSnapshot.docs.forEach((doc) => {
      const uuid_test = doc.data().uuid_test;
      if (uuid_test) {
        resultsByTest.set(uuid_test, (resultsByTest.get(uuid_test) || 0) + 1);
      }
    });

    // 5. Construir lessons con conteos
    const lessons = tests.map((test) => ({
      uuid_test: test.uuid_test,
      name_test: test.name_test,
      cant_complet: resultsByTest.get(test.uuid_test) || 0,
    }));

    // 6. Construir respuesta
    return [
      {
        uuid: `quiz_${uuid_classroom}`,
        uuid_classroom,
        total_student,
        lessons,
      },
    ];
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