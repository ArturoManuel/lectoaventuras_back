import { Estudiante } from './models/estudiante.model.js';
import { CreateEstudianteDto, UpdateEstudianteDto } from './dto/estudiante.dto.js';
import { AppError } from '../../shared/utils/app-error.js';
import { firestore } from '../../shared/firebase.js';
import { fromFirestore as mapStudentFs } from './mapper/mapper_studen.js';

// Static collection used for students
const STUDENTS_COLLECTION = 'users';


export class EstudianteService {
  async getAll(): Promise<Estudiante[]> {
    const db = firestore();
    const snap = await db.collection(STUDENTS_COLLECTION).get();
    return snap.docs.map(d => mapStudentFs({ id: d.id, ...d.data() } as any)) as unknown as Estudiante[];
  }

  async getByClassrooms(codes: string[]): Promise<Estudiante[]> {
    if (!codes.length) return this.getAll();
    const db = firestore();
    const chunks: string[][] = [];
    for (let i = 0; i < codes.length; i += 10) chunks.push(codes.slice(i, i + 10));
    const results: Estudiante[] = [] as any;
    for (const chunk of chunks) {
      const q = db.collection(STUDENTS_COLLECTION).where('code_classroom', 'in', chunk);
      const snap = await q.get();
      results.push(
        ...snap.docs.map(d => mapStudentFs({ id: d.id, ...d.data() } as any)) as unknown as Estudiante[]
      );
    }
    return results;
  }

  async search(params: { name?: string; classrooms?: string[] }): Promise<Estudiante[]> {
    const { name, classrooms } = params;
    const base = classrooms && classrooms.length
      ? await this.getByClassrooms(classrooms)
      : await this.getAll();

    if (!name) return base;

    const term = name.trim().toLowerCase();
    return base.filter((s: any) => {
      const n = String(s.name ?? '').toLowerCase();
      return n.includes(term);
    });
  }

  async getById(id: string): Promise<Estudiante> {
    const db = firestore();
    const doc = await db.collection(STUDENTS_COLLECTION).doc(id).get();
    const item = doc.exists ? (mapStudentFs({ id: doc.id, ...doc.data() } as any) as unknown as Estudiante) : null;
    if (!item) throw new AppError('Student not found', 404);
    return item;
  }

  async create(dto: CreateEstudianteDto): Promise<Estudiante> {
    return {
      id: 'temp-id',
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
  }

  async update(id: string, dto: UpdateEstudianteDto): Promise<Estudiante> {
    return {
      id,
      firstName: dto.firstName || 'Name',
      lastName: dto.lastName || 'Last',
      email: dto.email || 'email@example.com',
      isActive: dto.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async remove(id: string): Promise<void> { return; }
}
