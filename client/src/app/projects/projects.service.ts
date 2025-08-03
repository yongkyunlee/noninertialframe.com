import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy, limit, where, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PROJECTS_COLLECTION } from '../shared/constants';
import { ProjectSnippet, ProjectDoc } from './projects.model';


@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private firestore: Firestore) { }

    getProjects(): Observable<ProjectDoc[]> {
        const projectsCollection = collection(this.firestore, PROJECTS_COLLECTION);
        const q = query(projectsCollection, orderBy('date', 'desc'));
        return collectionData(q, { idField: 'id' }) as Observable<ProjectDoc[]>;
    }

    getProjectByTitle(titleEng: string): Observable<ProjectDoc[]> {
        const projectsCollection = collection(this.firestore, PROJECTS_COLLECTION);
        const q = query(projectsCollection, where('titleEng', '==', titleEng));
        return collectionData(q, { idField: 'id' }) as Observable<ProjectDoc[]>;
    }

    getRecentProjects(count: number): Observable<ProjectDoc[]> {
        const projectsCollection = collection(this.firestore, PROJECTS_COLLECTION);
        const q = query(projectsCollection, orderBy('date', 'desc'), limit(count));
        return collectionData(q, { idField: 'id' }) as Observable<ProjectDoc[]>;
    }

    uploadProject(project: ProjectSnippet) {
        const projectsCollection = collection(this.firestore, PROJECTS_COLLECTION);
        return addDoc(projectsCollection, project);
    }

    updateProject(docId: string, project: ProjectSnippet) {
        const projectDoc = doc(this.firestore, PROJECTS_COLLECTION, docId);
        return setDoc(projectDoc, project);
    }
}
