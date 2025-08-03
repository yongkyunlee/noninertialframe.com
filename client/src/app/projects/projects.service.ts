import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PROJECTS_COLLECTION } from '../shared/constants';
import { ProjectSnippet, ProjectDoc } from './projects.model';


@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private afs: AngularFirestore) { }

    getProjects(): Observable<ProjectDoc[]> {
        return this.afs.collection(PROJECTS_COLLECTION, ref => ref.orderBy('date', 'desc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as ProjectSnippet
                        } as ProjectDoc;
                    });
                })
            );
    }

    getProjectByTitle(titleEng: string): Observable<ProjectDoc[]> {
        return this.afs.collection(PROJECTS_COLLECTION, ref => ref.where('titleEng', '==', titleEng))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as ProjectSnippet
                        } as ProjectDoc;
                    });
                })
            );
    }

    getRecentProjects(count: number): Observable<ProjectDoc[]> {
        return this.afs.collection(PROJECTS_COLLECTION, ref => ref.orderBy('date', 'desc').limit(count))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as ProjectSnippet
                        } as ProjectDoc;
                    });
                })
            );
    }

    uploadProject(project: ProjectSnippet) {
        return this.afs.collection(PROJECTS_COLLECTION).add(project);
    }

    updateProject(docId: string, project: ProjectSnippet) {
        return this.afs.collection(PROJECTS_COLLECTION).doc(docId).set(project);
    }
}
